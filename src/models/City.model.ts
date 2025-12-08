import mongoose, { Document, Schema } from "mongoose";

export interface ICity extends Document {
  title: string;
  province: string;
  status: string;
  order: string;
}

const CitySchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    province: { type: mongoose.Schema.Types.ObjectId, ref: "province" },
    status: { type: String, required: true },
    order: { type: String, required: true },
  },
  { timestamps: true }
);

export const CityModel = mongoose.model<ICity>("city", CitySchema);
