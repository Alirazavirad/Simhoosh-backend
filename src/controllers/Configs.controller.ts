import { ConfigsModel } from "../models/Configs.model";
import { Response, Request } from "express";
const createConfig = async (req: Request, res: Response) => {
  try {
    const config = await ConfigsModel.create(req.body);
    res.status(200).json(config);
  } catch (error) {
    res.status(500).json({ message: "خطا در ایجاد تنظیمات" });
  }
};

const getConfig = async (req: Request, res: Response) => {
  try {
    const config = await ConfigsModel.find();
    res.status(200).json(config);
  } catch (error) {
    res.status(500).json({ message: "خطا در بازیابی تنظیمات" });
  }
};

const updateConfig = async (req: Request, res: Response) => {
  try {
    const { value, title } = req.body;

    const config = await ConfigsModel.findById(req.params.id);

    if (!config) {
      return res.status(404).json({ message: "تنظیم مورد نظر پیدا نشد" });
    }

    if (typeof title === "string") {
      config.title = title;
    }
    if (config.value.length > 1) {
      config.value = value;
    } else {
      config.value = [value];
    }

    await config.save();

    return res.status(200).json(config);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "خطا در بروزرسانی تنظیمات",
    });
  }
};
const deleteConfig = async (req: Request, res: Response) => {
  try {
    const config = await ConfigsModel.findByIdAndDelete(req.params.id);
    res.status(200).json(config);
  } catch (error) {
    res.status(500).json({ message: "خطا در حذف تنظیمات" });
  }
};

const deleteValue = async (req: Request, res: Response) => {
  try {
    const { value } = req.body;
    const config: any = await ConfigsModel.findOne({ _id: req.params.id });
    config.value = config.value.filter((item: any) => item != value);
    await config.save();
    res.status(200).json(config);
  } catch (error) {
    res.status(500).json({ message: "خطا در حذف مقدار" });
  }
};

export { createConfig, getConfig, updateConfig, deleteConfig,deleteValue };
