const { connection } = require("../middleware/mongoose");
const { Blogs } = require("../models/Getblogs");
const express = require("express");

const single = express.Router();

single.get(`/:slug`, async (req, res) => {

  try {
    const slug = req.params.slug;
    let blog = await Blogs.find({slug:slug});

    res.status(200).send(blog);
  } catch (err) {
    console.log({ err: err.message });
    res.status(404).send({ err: err.message });
  }
});
module.exports = {single};
