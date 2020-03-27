const express = require("express");
const { protect } = require("../middlewares/auth");
const {
  createContact,
  getContacts,
  updateContact,
  deleteContact
} = require("../controllers/contact");

const router = express.Router();

router
  .route("/")
  .post(protect, createContact)
  .get(protect, getContacts);

router
  .route("/:id")
  .put(protect, updateContact)
  .delete(protect, deleteContact);

module.exports = router;
