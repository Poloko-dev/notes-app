import { Schema, model, models, Document, Types } from "mongoose";

export interface INote extends Document {
  userId: Types.ObjectId;
  title: string;
  content: string;
}

const NoteSchema = new Schema<INote>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export default models.Note<INote> || model<INote>("Note", NoteSchema);
