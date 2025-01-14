const mapService = require("../services/maps.service");
const { validationResult } = require("express-validator");
module.exports.getCoordinates = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { address } = req.query;
  try {
    const coordinates = await mapService.getAddressCoordinate(address);
    res.status(200).json(coordinates);
  } catch (error) {
    res.status(404).json({ message: "Coordinates not found" });
  }
};

module.exports.getDistanceTime = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { origin, destination } = req.query;
  if (!origin || !destination) {
    return res
      .status(400)
      .json({ message: "Origin and destination are required" });
  }
  try {
    const result = await mapService.getDistanceTime(origin, destination);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);

    res.status(404).json({ message: "Distance and time not found" });
  }
};

module.exports.getSuggestions = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { input } = req.query;
  try {
    const suggestions = await mapService.getSuggestions(input);
    res.status(200).json(suggestions);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
