import { Request, Response } from "express";
import { ProvinceModel } from "../models/Provinces.model";
// export const getProvince = async (req : Request, res : Response) => {
//     try {
//         const response = await fetch("https://www.iran-locations-api.ir/api/v1/fa/states")
//         const data : any = await response.json();
//         const provinces : any = await data.map((item : any) => ({
//             value : item.name,
//             label : item.name,
//             id : item.id
//         }))
//         if (provinces.length > 0) {
//             res.status(200).json(provinces);
//         }else {
//             res.status(404).json({
//                 message : "No data found"
//             })
//         }

//     }catch(err) {
//         console.log(err);
//     }
// }
// export const getCity = async (req : Request, res : Response) => {
//     try {
//         const {state} = req.body
//         const response = await fetch(`https://www.iran-locations-api.ir/api/v1/fa/cities?state=${state}`)
//         const data : any = await response.json();
        
//         const cities : any = await data[0].cities.map((item : any) => ({
//             value : item.name,
//             label : item.name,
//         }))
//         if (cities.length > 0) {
//             res.status(200).json(cities);
//         }else {
//             res.status(404).json({
//                 message : "No data found"
//             })
//         }
//     }catch (err) {
//         console.log(err);
//     }
// }



export const createProvince = async (req: Request, res: Response) => {
  try {
    const { title, status, order } = req.body;
    const province = await ProvinceModel.create({
      title,
      status,
      order,
    });
    res.status(201).json(province);
  } catch (error) {
    console.log(error);
  }
};

export const getAllProvinces = async (req: Request, res: Response) => {
  try {
    const provinces = await ProvinceModel.find({});
    res.status(200).json(provinces);
  } catch (error) {
    console.log(error);
  }
};

export const UpdateProvince = async (req: Request, res: Response) => {
  try {
    const { title, status, order } = req.body;
    
    const province = await ProvinceModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title,
          status,
          order,
        },
      },
      { new: true }
    );
    res.status(200).json(province);
  } catch (error) {
    console.log(error);
  }
};
export const DeleteProvince = async (req: Request, res: Response) => {
  try {
    const province = await ProvinceModel.findOneAndDelete(
      { _id: req.params.id }
    );
    
    res.status(200).json(province);
  } catch (error) {
    console.log(error);
  }
};