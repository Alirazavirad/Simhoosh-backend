import { OrganizationModel } from "../models/Organization.model";
export const OrganizationService = {
  async create(data: any) {
    return await OrganizationModel.create(data);
  },

  async getAll() {
    return await OrganizationModel.find().sort({ createdAt: -1 });
  },

  async getOne(id: string) {
    return await OrganizationModel.findById(id);
  },

  async update(id: string, data: any) {
    return await OrganizationModel.findByIdAndUpdate(id, data, { new: true });
  },

  async remove(id: string) {
    return await OrganizationModel.findByIdAndDelete(id)
  }
};
