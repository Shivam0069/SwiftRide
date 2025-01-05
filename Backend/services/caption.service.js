const captionModel = require("../models/captain.model");
module.exports.createCaption = async ({
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

  const caption = await captionModel.create({
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
  return caption;
};
