// Goal: Anyone (no login required) can send a message to a specific user, if that user is accepting messages.

import dbConnect from "@/src/lib/dbConnect";
import UserModel, { Message } from "@/src/Model/User";

export async function POST(request: Request) {
  await dbConnect();

  const { username, content } = await request.json();

  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    if (!user.isAcceptingMsg) {
      return Response.json(
        {
          success: false,
          message: "User is not accepting messages",
        },
        { status: 403 }
      );
    }

    // Create new message
    const newMessage = {
      content,
      createdAt: new Date(),
    };

    // push the new message to the user's messages array
    user.message.push(newMessage as Message);
    await user.save();

    // Return success response
    return Response.json(
      {
        success: true,
        message: "Message sent successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending message:", error);
    return Response.json({
      success: false,
      message: "An error occurred while sending the message",
    },
    { status: 500 }
  );
  }
}
