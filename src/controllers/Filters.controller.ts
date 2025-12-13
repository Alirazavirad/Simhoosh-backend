import { FiltersModel } from "../models/Filters.model";
import { Response, Request } from "express";
const createFilters = async (req: Request, res: Response) => {
  try {
    const filters = await FiltersModel.create(req.body);
    res.status(200).json(filters);
  } catch (error) {
    console.log({error});
    
    res.status(500).json({ message: "خطا در ایجاد فیلتر" });
  }
};

const getFilters = async (req: Request, res: Response) => {
  try {
    const filters = await FiltersModel.find();
    res.status(200).json(filters);
  } catch (error) {
    res.status(500).json({ message: "خطا در بازیابی فیلتر" });
  }
};

const updateFilters = async (req: Request, res: Response) => {
  try {
    const { value, title } = req.body;

    const filters = await FiltersModel.findById(req.params.id);

    if (!filters) {
      return res.status(404).json({ message: "فیلتر مورد نظر پیدا نشد" });
    }

    if (typeof title === "string") {
      filters.title = title;
    }
    // if (filters.value.length > 1) {
    //   filters.value = value;
    // } else {
    //   filters.value = [value];
    // }

    await filters.save();

    return res.status(200).json(filters);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "خطا در بروزرسانی فیلتر",
    });
  }
};
const deleteFilters = async (req: Request, res: Response) => {
  try {
    const filters = await FiltersModel.findByIdAndDelete(req.params.id);
    res.status(200).json(filters);
  } catch (error) {
    res.status(500).json({ message: "خطا در حذف فیلتر" });
  }
};

export { createFilters, getFilters, updateFilters, deleteFilters };