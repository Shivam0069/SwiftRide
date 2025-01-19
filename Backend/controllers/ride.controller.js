const { validationResult } = require("express-validator");
const rideService = require("../services/ride.service");
const { getCaptainsInRadius } = require("../services/maps.service");
const mapService = require("../services/maps.service");
const { sendMessageToSocketId } = require("../socket");
const rideModel = require("../models/ride.model");
module.exports.createRide = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { pickup, destination, vehicleType } = req.body;
    const ride = await rideService.createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });
    res.status(201).json({ ride });
    const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
    console.log(pickupCoordinates, "pickupcoordinates");

    const captainsInRadius = await getCaptainsInRadius(
      pickupCoordinates.ltd,
      pickupCoordinates.lng,
      2
    );
    console.log(captainsInRadius, "captainInRadius");

    ride.otp = "";

    const rideWithUser = await rideModel
      .findOne({ _id: ride._id })
      .populate("user");

    console.log(rideWithUser, "data");

    captainsInRadius.map((captain) => {
      sendMessageToSocketId(captain.socketId, {
        event: "new-ride",
        data: rideWithUser,
      });
    });
  } catch (error) {
    console.log(error);

    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
module.exports.getFare = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination } = req.query;

  try {
    const fare = await rideService.getFare(pickup, destination);
    return res.status(200).json(fare);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
module.exports.confirmRide = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId } = req.body;

  try {
    const ride = await rideService.confirmRide({
      rideId,
      captain: req.captain,
    });

    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-confirmed",
      data: ride,
    });

    return res.status(200).json(ride);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};
module.exports.startRide = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId, otp } = req.query;
  console.log(rideId, otp);

  try {
    const ride = await rideService.startRide({
      rideId,
      otp,
      captain: req.captain,
    });
    console.log("start-ride", ride);

    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-started",
      data: ride,
    });

    return res.status(200).json(ride);
  } catch (err) {
    console.log(err);

    return res.status(500).json({ message: err.message });
  }
};
module.exports.endRide = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId } = req.body;

  try {
    const ride = await rideService.endRide({ rideId, captain: req.captain });

    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-ended",
      data: ride,
    });
    return res.status(200).json(ride);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
