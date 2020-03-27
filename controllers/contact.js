const Contact = require("../models/Contact");
const asyncHandler = require("../utils/asyncHandler");

// @desc      Create a contact
// @route     POST  /api/contacts
// @access    Private
const createContact = asyncHandler(async (req, res) => {
  const user = req.user._id;
  const payload = req.body;

  const contact = await Contact.create({ ...payload, user });

  res.json({ data: contact });
});

// @desc      Get contacts
// @route     GET  /api/contacts
// @access    Private
const getContacts = asyncHandler(async (req, res) => {
  const user = req.user._id;

  const contacts = await Contact.find({ user });

  res.json({ data: contacts });
});

// @desc      Update contact
// @route     PUT  /api/contacts/:id
// @access    Private
const updateContact = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    return res.status(400).json({ msg: "No such contact" });
  }

  if (contact.user.toString() !== userId.toString()) {
    return res.status(400).json({ msg: "No auth to update this contact" });
  }

  await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

  res.json({msg: 'Update contact succeed'})
});

// @desc      Delete contact
// @route     DELETE  /api/contacts/:id
// @access    Private
const deleteContact = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    return res.status(400).json({ msg: "No such contact" });
  }

  if (contact.user.toString() !== userId.toString()) {
    return res.status(400).json({ msg: "No auth to delete this contact" });
  }

  await Contact.findByIdAndRemove(req.params.id);

  res.json({ msg: "Delete contact succeed" });
})

module.exports = {
  createContact,
  getContacts,
  updateContact,
  deleteContact
};
