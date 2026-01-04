import { Request, Response } from "express";
import { UserModel } from "../models/User.model";
import crypto from "crypto";
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { phone, license_number, national_id } = req.body;
    const user: any = await UserModel.findOne({ phone });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (license_number != undefined) {
      if (!user.greenhouse_ids.includes(license_number)) {
        return res.status(404).json({ message: "User not found" });
      }else {
        const token = await crypto.randomBytes(32).toString("hex");
        user.token = token;
        await user.save();
        res.status(200).json({ message: "User logged in", token });
      }
    }
    if (national_id) {
      if (!user.company_ids.includes(national_id)) {
        return res.status(404).json({ message: "User not found" });
      } else {
        const token = await crypto.randomBytes(32).toString("hex");
        user.token = token;
        await user.save();
        res.status(200).json({ message: "User logged in", token });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Error logging in user" });
  }
};



