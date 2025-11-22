import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connect to database");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {});

    console.log("db details", db);
    console.log("db connections details", db.connections);
    
    connection.isConnected = db.connections[0].readyState;

    console.log("Connected to database");
  } catch (error) {
    console.log("Error connecting to database", error);

    process.exit(1); // Exit the process with failure
  }
}

export default dbConnect;
