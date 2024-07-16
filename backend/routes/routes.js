var express = require("express");

const router = express.Router();
var userController = require("../src/user/userController");

router.route("/user/getAll").get(userController.getDataConntrollerfn);
router.route("/user/create").post(userController.createUserControllerfn);
router.route("/user/update/:id").put(userController.updateUserControllerfn);
router.route("/user/delete/:id").delete(userController.deleteUserControllerfn);


module.exports = router;


