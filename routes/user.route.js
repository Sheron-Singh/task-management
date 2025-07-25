const express = require("express");
const router = express.Router();
const {
  register,
  login
} = require("../controller/user.controller.js");

const upload = require('../middleware/multer.middleware.js');


router.post("/register", upload.single('image'),register);

router.post("/login", login);


module.exports = router;