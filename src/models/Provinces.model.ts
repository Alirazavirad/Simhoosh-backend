import mongoose, { Document, Schema } from "mongoose";

export interface IProvince extends Document {
  title: string;
  cities: string[];
  status: string;
  order: string;
}

const ProvinceSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    cities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "city",
      },
    ],
    status: { type: String, required: true },
    order: { type: String, required: true },
  },
  { timestamps: true }
);

export const ProvinceModel = mongoose.model<IProvince>("province", ProvinceSchema);
