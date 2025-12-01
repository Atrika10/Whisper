import mongoose, { Document, Schema } from 'mongoose';
import { trim } from 'zod';

export interface Message extends Document {
    content : string;
    createdAt : Date;
}

const MessageSchema : Schema<Message> = new Schema({
    content: {
        type : String,
        required :true
    },
    createdAt :{
        type: Date,
        required :true,
        default : Date.now
    }
})

export interface User extends Document {
    username :string;
    email: string;
    password :string;
    verifyCode: string;
    verifyCodeExpiry : Date;
    isVerified : boolean;
    isAcceptingMsg : boolean;
    message : Message[]
}

const UserSchema : Schema<User> = new Schema({
    username: {
        type : String,
        required :[true,"Username is required"],
        unique:true,
        trim : true,
    },
    email :{
        type: String,
        required :true,
        unique:true,
        trim : true,
        lowercase : true,
        match: [/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, "Please use a valid Email"],
        

    },
    password :{
        type : String,
        required :[true,"Username is required"],
        min: [6, "password must be atleast 6 character"],
        max: [64, "password must be atmost 64 character"],
        trim : true,
    },
    verifyCode :{
        type : String,
        required: [true, "Verification code is required"]
    },
    verifyCodeExpiry :{
        type : Date,
        required : [true, "Verification code expiry is required"]
    },
    isVerified :{
        type : Boolean,
       default : false
    },
    isAcceptingMsg :{
        type : Boolean,
        default : true
    },
    message :[MessageSchema]
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema);

export default UserModel;