import { sendVerificationEmail } from "@/src/helpers/sendVerificationEmail";
import dbConnect from "@/src/lib/dbConnect";
import UserModel from "@/src/Model/User";
import bcrypt from "bcryptjs";
import { signUpSchema } from "@/src/Schemas/signUpSchema";

// import sendverificationEmail from "@/src/lib/sendVerificationEmail";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const body = await request.json();
    const result = signUpSchema.safeParse(body);

    if (!result.success) {
      const errorMessage = result.error;
      return Response.json(
        { success: false, message: errorMessage },
        { status: 400 }
      );
    }

    const { username, email, password } = result.data;

    const existingVerifiedUserByUsername = await UserModel.findOne({
        username,
        isVerified : true,
    });

    if(existingVerifiedUserByUsername) {
        return Response.json(
            {
                success : false,
                message: 'Username is already taken',
            },
            {
                status : 400
            }
        )
    }

    const existingUserByEmail = await UserModel.findOne({ email });
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (existingUserByEmail) {
      // if email exist, we'll check is this email has verified or not
      if (existingUserByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "User already exist with this email",
          },
          { status: 400 }
        );
      } else {
        // if user is not verified verify & update the details
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);

        await existingUserByEmail.save();
      }
    } else {
      // create new user
      const hashedPassword = await bcrypt.hash(password, 10);
      const verifyCodeExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry,
        isVerified: false,
        isAcceptingMsg: true,
        message: [],
      });

      await newUser.save();
    }

    // send verification email
    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode
    );

    if (!emailResponse.success) {
      return Response.json({
        success: false,
        message: emailResponse.message,
      }, {status : 500});
    }

    return Response.json(
        {
            success : true,
            message : 'User registered successfully. Please verify your account.',
        },
        {
            status : 201
        }
    )
  } catch (error) {
    console.error("Error in sign-up route:", error);
    return Response.json(
      {
        success: false,
        message: "Error while signing up a user",
      },
      {
        status: 500,
      }
    );
  }
}
