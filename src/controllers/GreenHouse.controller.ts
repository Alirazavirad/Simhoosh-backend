import { Request, Response } from "express";
import { GreenHouseService } from "../services/GreenHouse.service";
import { GreenHouseModel } from "../models/GreenHouse.model";
import { UserModel } from "../models/User.model";
import crypto from "crypto";
export const GreenHouseController = {
  async create(req: Request, res: Response) {
    try {
      const files_uploaded = {
        logo: (req.files as any)?.logo?.[0]?.path,
        license_number_image: (req.files as any)?.license_number_image?.[0]
          ?.path,
      };

      const token = await crypto.randomBytes(32).toString("hex");

      const { google_map_link, address } = req.body;

      const match = google_map_link?.match(/@([-0-9.]+),([-0-9.]+)/);

      let lat = "";
      let lng = "";

      if (match) {
        lat = match[1];
        lng = match[2];
      } else {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            address
          )}`
        );

        const data: any = await response.json();

        if (data.length > 0) {
          const best = data.sort(
            (a: any, b: any) => b.importance - a.importance
          )[0];

          lat = best.lat;
          lng = best.lon;
        }
      }

      if (!lat || !lng) {
        return res.status(404).json({ message: "نشانی نامعتبر" });
      }

      const dataToSave = { ...req.body, ...files_uploaded, token, lat, lng };
      const { license_number, owner_name, owner_phone } = req.body;

      await UserModel.findOneAndUpdate(
        { phone: owner_phone },
        {
          $addToSet: { greenhouse_ids: license_number },
          name: owner_name,
          phone: owner_phone,
          role: "greenhouse_owner",
        },
        { upsert: true, new: true }
      );

      await GreenHouseService.create(dataToSave);

      res.status(201).json({ message: "گلخانه ایجاد شد" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  },
  async getAll(req: Request, res: Response) {
    try {
      const data = await GreenHouseService.getAll();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  },

  async getOne(req: Request, res: Response) {
    try {
      const data = await GreenHouseService.getOne(req.params.id);
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const files = (req as any).files_uploaded;

      const data = {
        ...req.body,
        license_number_image: files?.license_number_image?.[0]?.path,
        logo: files?.logo?.[0]?.path,
      };

      const result = await GreenHouseService.update(req.params.id, data);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  },

  async remove(req: Request, res: Response) {
    try {
      await GreenHouseService.remove(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  },
  async Login(req: Request, res: Response) {
    try {
      const { license_number, phone } = req.body;
      const token = await crypto.randomBytes(32).toString("hex");
      const data = await GreenHouseModel.findOne({
        license_number,
        owner_phone: phone,
      });
      if (data) {
        res.status(200).json({ message: "ورود موفقیت امیز", token });
      } else {
        res
          .status(404)
          .json({ message: "شماره پروانه یا شماره تلفن گلخانه اشتباه است" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  },
};
