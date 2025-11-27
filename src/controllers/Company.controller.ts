import { Request, Response } from "express";
import { CompanyService } from "../services/Company.service";
import { CompanyModel } from "../models/Company.model";
import crypto from "crypto";
export const CompanyController = {
async create(req: Request, res: Response) {
  try {
    const files = req.files as any;
    const token = await crypto.randomBytes(32).toString("hex");

    const files_uploaded = {
      logo: files?.logo?.[0]?.path,
      license_number_image: files?.license_number_image?.[0]?.path,
      trademark_logo: files?.trademark_logo?.[0]?.path,
      trademark_license_image: files?.trademark_license_image?.[0]?.path,
      newspaper_image: files?.newspaper_image?.[0]?.path,
    };

    const { google_map_link, address } = req.body;

    let lat = "";
    let lng = "";

    const match = google_map_link?.match(/@([-0-9.]+),([-0-9.]+)/);
    if (match) {
      lat = match[1];
      lng = match[2];
    } else {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            address
          )}`
        );

      
      const data : any = await response.json()

      if (data.length > 0) {
        const best = data.sort(
          (a: any, b: any) => b.importance - a.importance
        )[0];

        lat = best.lat;
        lng = best.lon;
      }
    }
      console.log(lat,lng);

    if (lat === "" || lng === "") {
      return res.status(400).json({ message: "نشانی نامعتبر است" });
    }

    const finalData = { ...req.body, ...files_uploaded, token, lat, lng };

    await CompanyService.create(finalData);

    res.status(201).json({ message: "شرکت ایجاد شد" });
  } catch (error) {
    console.error("Create error:", error);
    res.status(500).json({ error });
  }
},

  async getAll(req: Request, res: Response) {
    try {
      const result = await CompanyService.getAll();
      res.json(result);
    } catch (error) {
      console.error("GetAll error:", error);
      res.status(500).json({ error });
    }
  },

  async getOne(req: Request, res: Response) {
    try {
      const result = await CompanyService.getOne(req.params.id);
      res.json(result);
    } catch (error) {
      console.error("GetOne error:", error);
      res.status(500).json({ error });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const files = req.files as any;

      const files_uploaded = {
        logo: files?.logo?.[0]?.path,
        license_number_image: files?.license_number_image?.[0]?.path,
        trademark_logo: files?.trademark_logo?.[0]?.path,
        trademark_license_image: files?.trademark_license_image?.[0]?.path,
        newspape_image: files?.newspape_image?.[0]?.path,
      };

      const data = { ...req.body, ...files_uploaded };

      const result = await CompanyService.update(req.params.id, data);

      res.json(result);
    } catch (error) {
      console.error("Update error:", error);
      res.status(500).json({ error });
    }
  },

  async remove(req: Request, res: Response) {
    try {
      await CompanyService.remove(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Remove error:", error);
      res.status(500).json({ error });
    }
  },
  async Login(req: Request, res: Response) {
    try {
      const { national_id, phone } = req.body;
      const token = await crypto.randomBytes(32).toString("hex");
      const data = await CompanyModel.findOne({ national_id, owner_contact_phone: phone });
      if (data) {
        res.status(200).json({ message: "ورود موفقیت امیز", token });
      } else {
        res.status(404).json({ message: "شماره پروانه یا شماره تلفن گلخانه اشتباه است" });
      }
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error });
    }
  },
};
