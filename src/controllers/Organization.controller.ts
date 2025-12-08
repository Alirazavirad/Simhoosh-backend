import { Request, Response } from "express";
import { OrganizationService } from "../services/Organization.service";
import { OrganizationModel } from "../models/Organization.model";
import { UserModel } from "../models/User.model";
import crypto from "crypto";
export const OrganizationController = {
  async create(req: Request, res: Response) {
    try {
      const files = req.files as any;

      const token = await crypto.randomBytes(32).toString("hex")
      const files_uploaded = {
        national_card_img: files?.national_card_img?.[0]?.path,
        personnel_card_img: files?.personnel_card_img?.[0]?.path,
        introduction_img: files?.introduction_img?.[0]?.path,
      };

      const data = { ...req.body, ...files_uploaded,token };
       const { national_id, user_name, last_name,phone } = req.body;

       await UserModel.findOneAndUpdate(
        { national_id: national_id },
        {
          name: user_name,
          last_name: last_name,
          phone: phone,
          role: "organization_owner",
        },
        { upsert: true, new: true }
      );
      await OrganizationService.create(data);

      res.status(201).json({ message: "سازمان ایجاد شد" });
    } catch (error) {
      console.error("Create error:", error);
      res.status(500).json({ error });
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const result = await OrganizationService.getAll();
      res.json(result);
    } catch (error) {
      console.error("GetAll error:", error);
      res.status(500).json({ error });
    }
  },

  async getOne(req: Request, res: Response) {
    try {
      const result = await OrganizationService.getOne(req.params.id);
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

      const result = await OrganizationService.update(req.params.id, data);

      res.json(result);
    } catch (error) {
      console.error("Update error:", error);
      res.status(500).json({ error });
    }
  },

  async remove(req: Request, res: Response) {
    try {
      await OrganizationService.remove(req.params.id);
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
      const data = await OrganizationModel.findOne({
        national_id,
        phone: phone,
      });
      if (data) {
        res.status(200).json({ message: "ورود موفقیت امیز", token });
      } else {
        res.status(404).json({
          message: "شماره پروانه یا شماره تلفن گلخانه اشتباه است",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error });
    }
  },
};
