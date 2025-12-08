import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  token?: string;
  national_id?: string;
  phone: string;
  role: string;
  company_ids?: [];
  greenhouse_ids?: [];
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    token: { type: String},
    national_id: { type: String },
    phone: { type: String, required: true },
    role: { type: String, required: true },

    company_ids: [
      {
        type: String
      },
    ],

    greenhouse_ids: [
      {
        type: String
      },
    ],
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<IUser>("user", UserSchema);
