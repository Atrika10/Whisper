// Toggle “accepting messages” on/off for the logged‑in user (POST + GET API).
// a) POST /api/accept-message
// Goal: Logged‑in user can toggle whether they are accepting messages.

import dbConnect from "@/src/lib/dbConnect";
import UserModel from "@/src/Model/User";
import { getServerSession } from "next-auth";

export async function POST(request: Request) {
  await dbConnect();

  const session = await getServerSession();
  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not authenticated",
      },
      { status: 401 }
    );
  }

  const userId = session.user._id;
  const { acceptMessages } = await request.json();

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isAcceptingMsg: acceptMessages },
      { new: true }
    );

    if (!updatedUser) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Message acceptance status updated.",
        updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating message acceptance status:", error);
    return Response.json(
      {
        success: false,
        message: "Error updating message acceptance status",
      },
      { status: 500 }
    );
  }
}

// Goal: Frontend can check current “accepting messages” status for logged‑in user.

export async function GET(request: Request) {
  await dbConnect();
  const session = await getServerSession();
  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not authenticated",
      },
      { status: 401 }
    );
  }

  const userId = session.user._id;

  try {
    const user = await UserModel.findById(userId);

    if(!user) {
         return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    // if user found, return isAcceptingMsg status
    return Response.json(
        {
            success: true,
            isAcceptingMessage : user.isAcceptingMsg,

        },
        { status: 200 }
    )

  } catch (error) {
    console.log("Error while fetching message acceptance status:", error);
    return Response.json(
      {
        success: false,
        message: "Error fetching message acceptance status",
      },
      { status: 500 }
    );
  }
}
