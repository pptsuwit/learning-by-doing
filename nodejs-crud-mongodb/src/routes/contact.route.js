const express = require("express");
const router = express.Router();

const ContactController = require("../controllers/contact.controller");

router.get("/contact", ContactController.gets);
router.post("/contact", ContactController.create);
router.get("/contact/:id", ContactController.getById);
router.put("/contact/:id", ContactController.update);
router.delete("/contact/:id", ContactController.deleteById);

module.exports = router;
