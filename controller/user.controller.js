const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.register = async (req, res) => {
  const { fullname, email, password, dob, phone } = req.body;

  const profileImage = req.file ? req.file.filename : null;


    const formattedDob = new Date(dob);
  if (isNaN(formattedDob)) {
    return next(new AppError("Invalid date format for DOB.", 400));
  }

  console.log("profileImage>>>>", profileImage);
  

  if (!fullname || !email || !password || !dob || !phone) {
    return res.status(400).json({
      error: 'All fields (fullname, email, password, dob, phone) are required',
    });
  }

  try {
    const user = await User.create({
      fullname,
      email,
      password,
      profileImage,
      dob,
      phone,
    });

    console.log(user);
    
    res.status(201).json({
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      profileImage: user.profileImage,
      dob: formattedDob,
      phone: user.phone,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// LOGIN USER
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Server error during login' });
  }
};
