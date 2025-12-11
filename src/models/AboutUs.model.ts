import mongoose, { Document, Schema } from "mongoose";

export interface IAboutUs extends Document {
    body : string;
    img : string;
    title : string;
}

const AboutUsSchema: Schema = new Schema({
    body: { type: String, required: true },
    img: { type: String, required: true },
    title: { type: String, required: true },
}
  ,
  { timestamps: true }
);


export const AboutUsModel = mongoose.model<IAboutUs>(
  "aboutUs",
  AboutUsSchema
);
