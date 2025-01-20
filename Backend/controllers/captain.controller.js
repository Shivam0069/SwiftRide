const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");
const blacklistTokenModel = require("../models/blacklistToken.model");
module.exports.registerCaptain = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // If there are validation errors, return a 400 status with the errors
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructure fullname, email, and password from the request body
    const { fullname, email, password, vehicle } = req.body;

    const hashedPassword = await captainModel.hashPassword(password);

    const existingCaptain = await captainModel.findOne({ email });
    if (existingCaptain) {
      return res.status(400).json({ message: "Captain already exists" });
    }

    const captain = await captainService.createCaptain({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,

      color: vehicle.color,
      capacity: vehicle.capacity,
      plate: vehicle.plate,
      vehicleType: vehicle.vehicleType,
    });

    const token = captain.generateAuthToken();
    res.cookie("token", token, {
      httpOnly: true, // Prevents JavaScript from accessing cookies
      secure: true, // Ensures the cookie is sent over HTTPS
      sameSite: "strict", // Prevents cross-site request forgery
      maxAge: 3600000, // 1 hour
    });

    captain.password = undefined;
    res.status(201).json({ token, captain });
  } catch (error) {
    // Log any errors to the console
    console.error(error);
    // Return a 500 status with an error message
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.loginCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // If there are validation errors, return a 400 status with the errors
    return res.status(400).json({ errors: errors.array() });
  }

  // Destructure email and password from the request body
  const { email, password } = req.body;

  try {
    const captain = await captainModel.findOne({ email }).select("+password");

    if (!captain) {
      return res.status(400).json({ message: "Captain not found" });
    }

    const isMatch = await captain.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = captain.generateAuthToken();

    // Remove password from captain object before sending it in response
    captain.password = undefined;

    res.cookie("token", token, {
      httpOnly: true, // Prevents JavaScript from accessing cookies
      secure: true, // Ensures the cookie is sent over HTTPS
      sameSite: "strict", // Prevents cross-site request forgery
      maxAge: 3600000, // 1 hour
    });
    res.status(200).json({ token, captain });
  } catch (error) {
    // Log any errors to the console
    console.error(error);
    // Return a 500 status with an error message
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.logoutCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  // Add the token to the blacklist
  await blacklistTokenModel.create({ token });
  // Clear the token cookie
  res.clearCookie("token");
  // Return a 200 status with a success message
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports.getCaptainProfile = async (req, res, next) => {
  res.status(200).json({ captain: req.captain });
};
