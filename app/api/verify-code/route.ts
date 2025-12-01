import dbConnect from "@/src/lib/dbConnect";
import UserModel from "@/src/Model/User";
import { success } from "zod";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, code } = await request.json();

    // optional : decode username if it came url-encoded
    const decodedUsername = decodeURIComponent(username);

    // find user with username and code
    const user = await UserModel.findOne({
      username: decodedUsername,
    });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    // if user exist then check code as well as the expiry of the code
    const isCodeValid = user.verifyCode === code;

    const isCodeNotExpired =
      user.verifyCodeExpiry && user.verifyCodeExpiry > new Date();

    if (isCodeValid && isCodeNotExpired) {
      // update user isVerified to true and remove verifyCode and verifyCodeExpiry
      user.isVerified = true;
      await user.save();

      return Response.json(
        {
          success: true,
          message: "Account verified successfully",
        },
        { status: 200 }
      );
    }

    if (!isCodeNotExpired) {
      return Response.json(
        {
          success: false,
          message:
            "Verification code has expired, please sign up again to get a new code",
        },
        { status: 400 }
      );
    }

    return Response.json({
        success : false,
        message : "Incorrect verification code"
    }, {status : 400});
    
  } catch (error) {
    console.error("Error verifying code:", error);
    return Response.json(
      {
        success: false,
        message: "Error verifying code",
      },
      { status: 500 }
    );
  }
}
