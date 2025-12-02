// Goal :  Return all messages of the logged‑in user using MongoDB aggregation for better control (sorting, pagination etc.)

import dbConnect from "@/src/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import mongoose from "mongoose";
import UserModel from "@/src/Model/User";

export async function GET(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!session || !user) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
  const userId = new mongoose.Types.ObjectId(user._id);

  try {
    const user = await UserModel.aggregate([
      { $match: { _id: userId } }, // Match the logged-in user
      { $unwind: "$messages" }, // Deconstruct messages array
      { $sort: { "messages.createdAt": -1 } }, // Sort messages by createdAt descending
      { $group: { _id: "$_id", messages: { $push: "$messages" } } }, // Reconstruct messages array
    ]);

    if (!user || user.length === 0) {
      return Response.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Messages retrieved successfully",
        messages: user[0].messages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving messages:", error);
    return Response.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
