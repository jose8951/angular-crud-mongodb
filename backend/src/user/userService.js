const { model } = require("mongoose");
const userModel = require("./userModel");

const getDataFromDBService = async () => {
  try {
    const result = await userModel.find({});
    return result;
  } catch (error) {
    throw new Error(
      "Error obtenido datos de la base de datos " + error.message
    );
  }
};

const createUserDBService = async (userDetails) => {
  try {
    const userModelData = new userModel({
      name: userDetails.name,
      address: userDetails.address,
      phone: userDetails.phone,
    });
    await userModelData.save();
    return true;
  } catch (e) {
    return false;
  }
};

const updateOneUserBDService = async (id, userDetails) => {
  try {
    const result = await userModel.findByIdAndUpdate(id, userDetails, {
      new: true,
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const removeOneUserDBService = async (id) => {
  try {
    const result = await userModel.findByIdAndDelete(id);
    return result;
  } catch (error) {
    throw new Error("Failed to delete user");
  }
};

module.exports = {
  getDataFromDBService,
  createUserDBService,
  updateOneUserBDService,
  removeOneUserDBService,
};
