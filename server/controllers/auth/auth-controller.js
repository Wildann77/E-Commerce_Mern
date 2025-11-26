// regsiter

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.json({
        success: false,
        message: 'User already exists with same email',
      });
    }

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
    console.error('Registration Error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error.message
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
      process.env.JWT_SECRET || 'CLIENT_SECRET_KEY',
      { expiresIn: '60m' }
    );

    // Cookie options
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // True in production (HTTPS)
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // Needed for cross-site cookies
    };

    res.cookie('token', token, cookieOptions).json({
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
    console.error('Login Error:', e);
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: e.message
    });
  }
};

// logout

const logoutUser = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  }).json({
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
      message: 'Unauthorized user!',
    });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'CLIENT_SECRET_KEY');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Unauthorized user!',
    });
  }
};

module.exports = { registerUser, loginUser, logoutUser, authMiddleware };
