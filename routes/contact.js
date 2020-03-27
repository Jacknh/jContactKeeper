const express = require("express");
const { protect } = require("../middlewares/auth");
const {
  createContact,
  getContacts,
  updateContact
} = require("../controllers/contact");

const router = express.Router();

router
  .route("/")
  .post(protect, createContact)
  .get(protect, getContacts);

router.route("/:id").put(protect, updateContact);

module.exports = router;
