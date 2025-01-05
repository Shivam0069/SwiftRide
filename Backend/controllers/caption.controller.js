const captionModel = require("../models/captain.model");
const captionService = require("../services/caption.service");
const { validationResult } = require("express-validator");

module.exports.registerCaption = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // If there are validation errors, return a 400 status with the errors
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructure fullname, email, and password from the request body
    const { fullname, email, password, vehicle } = req.body;

    const hashedPassword = await captionModel.hashPassword(password);

    const existingCaption = await captionModel.findOne({ email });
    if (existingCaption) {
      return res.status(400).json({ message: "Captain already exists" });
    }

    const caption = await captionService.createCaption({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,

      color: vehicle.color,
      capacity: vehicle.capacity,
      plate: vehicle.plate,
      vehicleType: vehicle.vehicleType,
    });

    const token = caption.generateAuthToken();
    res.status(201).json({ token, caption });
  } catch (error) {
    // Log any errors to the console
    console.error(error);
    // Return a 500 status with an error message
    res.status(500).json({ message: "Internal Server Error" });
  }
};
