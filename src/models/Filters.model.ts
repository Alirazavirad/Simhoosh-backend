import mongoose, { Document, Schema } from "mongoose";

export interface IFilters extends Document {
  title: string;
  base: string;
  isActive : boolean;
}

const FiltersSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    base: { type: String, required: true },
    isActive : { type: Boolean, required: true },
  },
  { timestamps: true }
);

export const FiltersModel = mongoose.model<IFilters>("filters", FiltersSchema);