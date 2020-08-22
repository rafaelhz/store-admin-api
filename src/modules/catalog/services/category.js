const categoryRepository = require("../repositories/category");

const getCategories = () => {
  return categoryRepository.getCategories();
};

const getCategoryById = (id) => {
  return categoryRepository.getCategoryById(id);
};

const createCategory = async (category) => {
  const id = await categoryRepository.createCategory(category);
  return getCategoryById(id);
};

const updateCategory = async (category) => {
  await categoryRepository.updateCategory(category);
  return getCategoryById(category.id);
};

const deleteCategory = (categoryId) => {
  return categoryRepository.deleteCategory(categoryId);
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
