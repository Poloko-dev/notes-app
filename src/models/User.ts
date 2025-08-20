import { Schema, model, models, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
});

export default models.User<IUser> || model<IUser>("User", UserSchema);
