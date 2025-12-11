import { AboutUsModel } from "../models/AboutUs.model";
const createOrUpdateAboutUs = async (req: any, res: any) => {
  const { body, title } = req.body;

  try {
    const img = (req.files as any)?.img?.[0]?.path || null;

    let aboutUs = await AboutUsModel.findOne();

    if (aboutUs) {
      aboutUs.body = body;
      aboutUs.title = title;
      if (img) aboutUs.img = img;

      await aboutUs.save();
    } else {
      aboutUs = await AboutUsModel.create({
        body,
        title,
        img,
      });
    }

    res.status(200).json(aboutUs);
  } catch (error) {
    res.status(500).json({ message: "خطا در ثبت اطلاعات درباره ما" });
  }
};

const getAllAboutUs = async (req: any, res: any) => {
  try {
    const aboutUs = await AboutUsModel.findOne()
    res.status(200).json(aboutUs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "خطا در ارسال اطلاعات تماس با مشکل رخ داد" });
  }
};

export default {
  createOrUpdateAboutUs,
  getAllAboutUs,
};
