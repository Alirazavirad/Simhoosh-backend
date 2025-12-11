import mongoose, { Document, Schema } from "mongoose";

export interface IOrganization extends Document {
  first_name: string;
  last_name: string;
  token : string;
  national_id: string;
  organization: string;
  organization_role: string;
  province: string;
  city: string;
  address: string;
  postal_code: number;
  phone: string;
  tel : string;
  national_card_img: string;
  personnel_card_img: string;
  introduction_img: string;
  status: string;
}

const OrganizationSchema: Schema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  token: { type: String, required: true },
  national_id: { type: String, required: true },
  organization: { type: String, required: true },
  organization_role: { type: String, required: true },
  province: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  postal_code: { type: String, required: true },
  phone: { type: String, required: true },
  tel: { type: String, required: true },
  national_card_img: { type: String, required: true },
  personnel_card_img: { type: String, required: true }, 
  introduction_img: { type: String, required: true },
  status: { type: String, default : "در انتظار تایید" },
}
  ,
  { timestamps: true }
);

export const OrganizationModel = mongoose.model<IOrganization>(
  "organization",
  OrganizationSchema
);
