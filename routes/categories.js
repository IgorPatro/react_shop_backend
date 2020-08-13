const router = require("express").Router();
const Category = require("../models/Category");

// Getting all categories
router.get("/all", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.send(err);
  }
});

// Adding new category
router.post("/add", async (req, res) => {
  const category = new Category({
    name: req.body.name,
  });

  try {
    const savedCategory = await category.save();
    res.json(savedCategory);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
