const userService = require("./userService");

const getDataConntrollerfn = async (req, res) => {
  const empolyee = await userService.getDataFromDBService();
  res.send({ status: true, data: empolyee });
};

const createUserControllerfn = async (req, res) => {
  //console.log(req.body);
  const status = await userService.createUserDBService(req.body);
  //console.log(status);

  if (status) {
    res.send({ status: true, mensage: "User created successfully" });
  } else {
    res.send({ status: false, mensage: "Error creating user" });
  }
};

const updateUserControllerfn = async (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  const result = await userService.updateOneUserBDService(
    req.params.id,
    req.body
  );
  if (result) {
    res.send({ status: true, message: "User updateeeee" });
  } else {
    res.send({ status: true, message: "User update Fallido" });
  }
};

const deleteUserControllerfn = async (req, res) => {  
  try{
    const result = await userService.removeOneUserDBService(req.params.id);
    if (result) {
      res.send({ status: true, message: "user deleteddd successfully" });
    } else {
      res.send({ status: false, message: "user deleted fallido" });
    }

  }catch(error){
    res.status(500).send({status:false, message: "An error occurred whiel delete "})
  }
};

module.exports = {
  getDataConntrollerfn,
  createUserControllerfn,
  updateUserControllerfn,
  deleteUserControllerfn
};
