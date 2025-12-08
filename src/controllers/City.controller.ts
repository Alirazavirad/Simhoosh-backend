import { Request, Response } from "express";
import { CityModel } from "../models/City.model"
import { ProvinceModel } from "../models/Provinces.model"
export const createCity = async (req: Request, res: Response) => {
  try {
    const { title, province, status, order } = req.body;
    const city: any = await CityModel.create({
      title,
      province,
      status,
      order,
    });
    const provinces = await ProvinceModel.findOne({ _id: province });
    await provinces?.cities.push(city?._id);
    await provinces?.save();
    res.status(201).json(city);
  } catch (error) {
    console.log(error);
  }
};
export const getAllCities = async (req: Request, res: Response) => {
  try {
    const cities = await CityModel.find({}).populate("province");
    res.status(200).json(cities);
  } catch (error) {
    console.log(error);
  }
};

export const UpdateCity = async (req: Request, res: Response) => {
  try {
    const { title, province, status, order } = req.body;
    console.log({title, province, status, order});
    
    const city = await CityModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title,
          province,
          status,
          order,
        },
      },
      { new: true }
    );
    
    res.status(200).json(city);
  } catch (error) {
    console.log(error);
  }
}

export const DeleteCity = async (req: Request, res: Response) => {
  try {
    const city = await CityModel.findOneAndDelete(
      { _id: req.params.id }
    );
    
    res.status(200).json(city);
  } catch (error) {
    console.log(error);
  }
}
