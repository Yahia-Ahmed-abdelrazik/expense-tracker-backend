import multer from "multer";

//storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

//file filter
const fileFilter = (req, file, cb) => {
  //accept only image files
  const allowedMimes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("only .jpg, .jpeg, .png files are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
