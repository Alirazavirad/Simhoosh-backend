import { Request, Response } from "express";
import { GreenHouseService } from "../services/GreenHouse.service";

export const GreenHouseController = {
  async create(req: Request, res: Response) {
    try {
      const files_uploaded = {
        logo: (req.files as any)?.logo?.[0]?.path,
        license_number_image: (req.files as any)?.license_number_image?.[0]
          ?.path,
      };

      const data = { ...req.body, ...files_uploaded };


        const result = await GreenHouseService.create(data);
        res.status(201).json({message : "گلخانه ایجاد شد"})
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
};
