import mongoose, { Document, Schema } from "mongoose";

export interface IGreenHouse extends Document {
  name: string;
  license_number: string;
  kind: string;
  product_type: string;
  meterage: number;
  status: string;
  build_time: string;
  finish_time: string;
  owner_name: string;
  owner_national_id: string;
  owner_phone: string;
  climate_control: boolean;
  feeding_control: boolean;
  province: string;
  city: string;
  address: string;
  postal_code: number;
  google_map_link: string;
  license_number_image: string;
  logo: string;
  lat : string;
  lng : string;
  token: string;
}

const GreenHouseSchema: Schema = new Schema(
  {
    name: { type: String, required: true},

    token: { type: String, required: true},
    license_number: { type: String, required: true},

    kind: { type: String, required: true },

    product_type: { type: String, required: true },

    meterage: { type: Number, required: true },

    status: { type: String, required: true },
    lat : { type : String, required : true },
    lng : { type : String, required : true },

    build_time: { type: String,  },

    finish_time: { type: String,  },

    owner_name: { type: String, required: true },

    owner_national_id: { type: String, required: true},

    owner_phone: { type: String, required: true },

    climate_control: { type: Boolean, required: true },

    feeding_control: { type: Boolean, required: true },

    province: { type: String, required: true },

    city: { type: String, required: true },

    address: { type: String, required: true },

    postal_code: { type: Number, required: true },

    google_map_link: { type: String, required: true },

    license_number_image: { type: String, required: true },

    logo: { type: String, required: true },

  },
  { timestamps: true }
);

export const GreenHouseModel = mongoose.model<IGreenHouse>(
  "GreenHouse",
  GreenHouseSchema
);
