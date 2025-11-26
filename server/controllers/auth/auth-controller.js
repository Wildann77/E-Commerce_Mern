// regsiter

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;
  const checkUser = await User.findOne({ email });
  if (checkUser) {
    return res.json({
      success: false,
      message: 'User already exists with same email',
    });
  }
  try {
    const hashPasword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashPasword,
    });

    await newUser.save();
    return res.status(200).json({
      success: true,
      message: 'Registered successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'some error ocured',
    });
  }
};

// login

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message: "User doesn't exists! Please register first",
      });

    const checkPasswordMatch = await bcrypt.compare(password, checkUser.password);
    if (!checkPasswordMatch)
      return res.json({
        success: false,
        message: 'Incorrect password! Please try again',
      });

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      'CLIENT_SECRET_KEY',
      { expiresIn: '60m' }
    );

    res.cookie('token', token, { httpOnly: true, secure: false }).json({
      success: true,
      message: 'Logged in successfully',
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        userName: checkUser.userName,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: 'Some error occured',
    });
  }
};

// logout

const logoutUser = (req, res) => {
  res.clearCookie('token').json({
    success: true,
    message: 'Logged out successfully',
  });
};
// auth middleware



const authMiddleware = async (req, res, next) => {
 

  const token = req.cookies.token;

  if (!token)
    return res.status(401).json({
      success: false,
      message: 'Unauthorized user !',
    });
  try {
   
    const decoded = jwt.verify(token, 'CLIENT_SECRET_KEY');
    req.user = decoded;

    next()
  } catch (error) {

    res.status(401).json({
      success: false,
      message: 'Unauthorised user!',
    });
  }
};

module.exports = { registerUser, loginUser, logoutUser, authMiddleware };
