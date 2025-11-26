import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const uploadOrganizationFiles = multer({ storage }).fields([
  { name: "national_card_img", maxCount: 1 },
  { name: "personnel_card_img", maxCount: 1 },
  { name: "introduction_img", maxCount: 1 },
]);
