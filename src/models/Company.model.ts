import mongoose, { Document, Schema } from "mongoose";

export interface ICompany extends Document {
  name: string;
  company_kind: string;
  national_id: string;
  reg_number: string;
  reg_place: number;
  reg_date: String;
  owner_name: string;
  owner_national_id: string;
  owner_phone: string;
  owner_contact: string;
  owner_contact_phone: string;
  climate_control: boolean;
  feeding_control: boolean;
  province: string;
  city: string;
  address: string;
  postal_code: number;
  trademark: string;
  google_map_link: string;
lat : string;
  lng : string;
  logo: string;                     
  license_number_image: string;    
  trademark_logo: string;           
  trademark_license_image: string;  
  newspaper_image: string;           
  company_tel: string;
  company_phone?: string;
  company_site: string;
  company_email: string;
  token : string;
  status : string;
  isConfirmed : string;
}

const CompanySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    token : { type: String, required: true },
    company_kind: { type: String, required: true },
    national_id: { type: String, required: true },
    reg_number: { type: String, required: true },
    reg_place: { type: String, required: true },
    reg_date: { type: String, required: true },

    lat : { type : String, required : true },
    lng : { type : String, required : true },
    owner_name: { type: String, required: true },
    owner_national_id: { type: String, required: true },
    owner_phone: { type: String, required: true },
    owner_contact: { type: String, required: true },
    owner_contact_phone: { type: String, required: true },

    climate_control: { type: Boolean, default: false },
    feeding_control: { type: Boolean, default: false },

    province: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    postal_code: { type: Number, required: true },

    trademark: { type: String, required: true },
    google_map_link: { type: String, required: true },

    logo: { type: String, required: true },
    license_number_image: { type: String, required: true },
    trademark_logo: { type: String, required: true },
    trademark_license_image: { type: String, required: true },
    newspaper_image: { type: String, required: true },

    company_tel: { type: String,required: true },
    company_phone: { type: String },
    company_site: { type: String, required: true },
    company_email: { type: String, required: true },
    status: { type: String, default: "غیرفعال" },
    isConfirmed : { type : Boolean, default : "در انتظار تایید" },
  },
  {
    timestamps: true,
  }
);

export const CompanyModel = mongoose.model<ICompany>(
  "Company",
  CompanySchema
);
