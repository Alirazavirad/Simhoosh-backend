import mongoose, { Document, Schema } from "mongoose";

export interface IAutoMation extends Document {
  greenhouse: string;
  climate_company: string;
  climate_start : string;
  climate_end: string;
  climate_api: string;
  feeding_company: string;
  feeding_start : string;
  feeding_end: string;
  feeding_api: string;
  status : string;
}

const AutoMationSchema: Schema = new Schema({
  greenhouse: { type: mongoose.Schema.Types.ObjectId, ref: "GreenHouse", required: true },
  climate_company: { type: mongoose.Schema.Types.ObjectId, ref: "Company"},
  climate_start : { type : String, required : true },
  climate_end: { type: String, required: true },
  climate_api: { type: String, required: true },
  feeding_company: { type: mongoose.Schema.Types.ObjectId, ref: "Company"},
  feeding_start : { type : String, required : true },
  feeding_end: { type: String, required: true },
  feeding_api: { type: String, required: true },
  status: { type: String, default : "در انتظار تایید" },
}
  ,
  { timestamps: true }
);


export const AutomationModel = mongoose.model<IAutoMation>(
  "automation",
  AutoMationSchema
);
