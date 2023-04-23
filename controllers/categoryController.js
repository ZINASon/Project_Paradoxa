const Category = require('../models/categoryModel');
const categoryController = {
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createCategories: async (req, res) => {
    try {
      ///if user have role = 1 ---> admin
      ////only admin can create, delete and update category
      const { name } = req.body;
      const category = await Category.findOne({ name });
      ///if category exist
      if (category)
        return res.status(400).json({ msg: 'this category already exists.' });
      ///if not exist category
      const newCategory = new Category({ name });
      await newCategory.save();
      res.json({ msg: 'created a category' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteCategories: async (req, res) => {
    try {
      await Category.findByIdAndDelete(req.params.id);
      res.json({ msg: 'Deleted a category' });
    } catch (err) {
      return res.status(400).json({ msg: err.message });
    }
  },
  updateCategories: async (req, res) => {
    try {
      const { name } = req.body;
      await Category.findOneAndUpdate({ _id: req.params.id }, { name });
      res.json({ msg: 'updated a category' });
    } catch (err) {
      return res.status(400).json({ msg: err.message });
    }
  },
};
module.exports = categoryController;
