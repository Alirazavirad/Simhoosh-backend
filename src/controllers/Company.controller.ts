import { Request, Response } from "express";
import { CompanyService } from "../services/Company.service";

export const CompanyController = {
  async create(req: Request, res: Response) {
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

      await CompanyService.create(data);

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
};
