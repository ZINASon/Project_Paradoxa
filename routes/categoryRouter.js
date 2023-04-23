const router = require('express').Router();
const categoryController = require('../controllers/categoryController');
const auth = require('../middelware/auth');
const authAdmin = require('../middelware/authAdmin');

router
  .route('/category')
  .get(categoryController.getCategories)
  .post(auth, authAdmin, categoryController.createCategories);
router
  .route('/category/:id')
  .delete(auth, authAdmin, categoryController.deleteCategories)
  .put(auth, authAdmin, categoryController.updateCategories);

module.exports = router;
