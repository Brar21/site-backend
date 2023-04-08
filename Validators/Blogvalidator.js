const BlogValidator = (req, res, next) => {
  const { title, description, userId, image, slug, category } = req.body;
  if (!userId) {
    return res.status(400).json({ msg: "You have to Login first" });
  } else if (!title || !description || !slug || !category) {
    return res.status(400).json({ msg: "All fields are mandatory!" });
  } 
  next();
};

module.exports = { BlogValidator };
