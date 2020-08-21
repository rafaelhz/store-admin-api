const categoryRepository = require("../repositories/category");

const getCategories = () => {
  return categoryRepository.getCategories();
}

const createCategory = category => {
  return categoryRepository.createCategory(category);
}

const updateCategory = category => {
  return categoryRepository.updateCategory(category);
}

module.exports = {
  getCategories,
  createCategory,
  updateCategory
};