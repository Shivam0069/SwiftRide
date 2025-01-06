const captainModel = require("../models/captain.model");
module.exports.createCaptain = async ({
  email,
  firstname,
  lastname,
  password,
  color,
  capacity,
  plate,
  vehicleType,
}) => {
  if (
    !email ||
    !firstname ||
    !password ||
    !color ||
    !capacity ||
    !plate ||
    !vehicleType
  ) {
    throw new Error("All fields are required");
  }

  const captain = await captainModel.create({
    email,
    fullname: {
      firstname,
      lastname,
    },
    password,
    vehicle: {
      color,
      capacity,
      plate,
      vehicleType,
    },
  });
  return captain;
};
