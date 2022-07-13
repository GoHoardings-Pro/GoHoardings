const express = require("express")
const router = express.Router();
const { updateStaffPermission, getUser, getPermissions, createPermission,makePermission} = require('../controller/permissionController')


router.post("/createPermission",createPermission);
router.post("/getPermissions",getPermissions);
router.post("/getUser",getUser);
router.post("/updateStaffPermission",updateStaffPermission);
router.get("/makePermission",makePermission);


module.exports = router