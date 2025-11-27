import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const uploadCompanyFiles = multer({ storage }).fields([
  { name: "logo", maxCount: 1 },
  { name: "license_number_image", maxCount: 1 },
  { name: "trademark_logo", maxCount: 1 },
  { name: "trademark_license_image", maxCount: 1 },
  { name: "newspaper_image", maxCount: 1 },
]);
