import { CompanyModel } from "../models/Company.model";

export const CompanyService = {
  async create(data: any) {
    return await CompanyModel.create(data);
  },

  async getAll() {
    return await CompanyModel.find().sort({ createdAt: -1 });
  },

  async getOne(id: string) {
    return await CompanyModel.findById(id);
  },

  async update(id: string, data: any) {
    return await CompanyModel.findByIdAndUpdate(id, data, { new: true });
  },

  async remove(id: string) {
    return await CompanyModel.findByIdAndDelete(id);
  },
};
