const entity = require("../models/contact.model");

const create = async (req, res) => {
  try {
    const data = new entity({
      name: req.body.name,
      email: req.body.email,
      picture: req.body.picture,
      status: req.body.status,
      tel1: req.body.tel1,
      tel2: req.body.tel2,
      tel3: req.body.tel3,
      tel4: req.body.tel4,
      tel5: req.body.tel5,
      companyId: req.body.companyId,
    });
    console.log(data);
    await data.save().then(() => {
      res.json(data);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not create item." });
  }
};

const gets = async (req, res) => {
  try {
    const data = await entity.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch " });
  }
};

const getById = async (req, res) => {
  try {
    const data = await entity.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch " });
  }
};

const update = async (req, res) => {
  try {
    const data = await entity.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Could not update " });
  }
};

const deleteById = async (req, res) => {
  try {
    const data = await entity.findByIdAndRemove(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Could not delete " });
  }
};

module.exports = {
  create,
  gets,
  getById,
  update,
  deleteById,
};
