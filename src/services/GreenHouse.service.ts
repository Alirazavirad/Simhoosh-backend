import { GreenHouseModel } from "../models/GreenHouse.model";

export const GreenHouseService = {
  async create(data: any) {
    return await GreenHouseModel.create(data);
  },

  async getAll() {
    return await GreenHouseModel.find().sort({ createdAt: -1 });
  },

  async getOne(id: string) {
    return await GreenHouseModel.findById(id);
  },

  async update(id: string, data: any) {
    return await GreenHouseModel.findByIdAndUpdate(id, data, { new: true });
  },

  async remove(id: string) {
    return await GreenHouseModel.findByIdAndDelete(id);
  }
};
