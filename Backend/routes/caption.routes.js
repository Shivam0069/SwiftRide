const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const captionController = require("../controllers/caption.controller");

router.post(
  "/register",
  [
    // Validate that the email field contains a valid email address
    body("email").isEmail().withMessage("Invalid Email"),
    // Validate that the first name is at least 3 characters long
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    // Validate that the password is at least 6 characters long
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),

    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("Color must be at least 3 characters long"),

    body("vehicle.plate")
      .isLength({ min: 3 })
      .withMessage("Plate must be at least 3 characters long"),

    body("vehicle.capacity")
      .isInt({ min: 1 })
      .withMessage("Capacity must be at least 1"),

    body("vehicle.vehicleType")
      .isIn(["car", "motorcycle", "auto"])
      .withMessage("Invalid vehicle type"),
  ],
  captionController.registerCaption
);

module.exports = router;
