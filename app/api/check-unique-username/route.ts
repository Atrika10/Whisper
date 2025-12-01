import dbConnect from "@/src/lib/dbConnect";
import UserModel from "@/src/Model/User";
import { usernameValidation } from "@/src/Schemas/signUpSchema";
import z, { success } from "zod";

// here in usernameQuerySchema we are validating only username from query params
const usernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {
  await dbConnect();
  try {
    // get query from url
    const { searchParams } = new URL(request.url);
    const queryParam = {
      username: searchParams.get("username"),
    };

    // validate with ZOD
    const result = usernameQuerySchema.safeParse(queryParam);
    if (!result.success) {
      return Response.json(
        {
          success: false,
          message: "Invalid username",
        },
        { status: 400 }
      );
    }
    const { username } = result.data;

    // check in db if username exists or not
    const existingUser = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingUser) {
      return Response.json(
        {
          success: false,
          message: "Username is already taken",
        },
        { status: 200 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Username is available",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking username uniqueness:", error);
    return Response.json(
      {
        success: false,
        message: "Error checking username uniqueness",
      },
      { status: 500 }
    );
  }
}
