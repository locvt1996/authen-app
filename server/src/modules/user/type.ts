import { ObjectId } from "mongoose";

export interface UserDoc extends Document {
  _id: ObjectId;
  email: string;
  password: string;
  correctPassword: (candidatePassword: string, userPassword: string) => boolean;
}
