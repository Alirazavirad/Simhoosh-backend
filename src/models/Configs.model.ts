import mongoose, { Document, Schema } from "mongoose";

export interface IConfigs extends Document {
  title: string;
  value: any;
}

const ConfigsSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    value: { type: Array, required: true },    
  },
  { timestamps: true }
);

export const ConfigsModel = mongoose.model<IConfigs>("config", ConfigsSchema);
