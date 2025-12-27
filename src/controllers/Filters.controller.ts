import { FiltersModel } from "../models/Filters.model";
import { Response, Request } from "express";
const createFilters = async (req: Request, res: Response) => {
  try {
    const filters = await FiltersModel.create(req.body);
    res.status(200).json(filters);
  } catch (error) {
    console.log({ error });

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
    const { filters } = req.body;

    if (!Array.isArray(filters)) {
      return res.status(400).json({ message: "داده‌ها باید آرایه باشند" });
    }

    const updatedFilters = await Promise.all(
      filters.map(
        async (f: { _id: string; isActive?: boolean; title?: string }) => {
          const filter = await FiltersModel.findById(f._id);
          if (!filter) return null;

          if (typeof f.isActive === "boolean") filter.isActive = f.isActive;
          if (typeof f.title === "string") filter.title = f.title;

          await filter.save();
          return filter;
        }
      )
    );

    const filteredResult = updatedFilters.filter((f) => f !== null);

    res.status(200).json(filteredResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "خطا در بروزرسانی فیلترها" });
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
