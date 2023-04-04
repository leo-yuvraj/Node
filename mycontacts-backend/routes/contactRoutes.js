// const { Router } = require("express");
const express = require("express");
const router = express.Router();
const {getContacts,getContact,createContacts,updateContacts,deleteContacts}=require("../controllers/contactController.js");
const validateToken = require("../middleware/validateTokenHandler.js");


router.use(validateToken);
router.route("/").get(getContacts).post(createContacts); // Simple / is used because in server.js /api/contacts is used in use
router.route("/:id").get(getContact).put(updateContacts).delete(deleteContacts);


module.exports=router;//Necessary to export it