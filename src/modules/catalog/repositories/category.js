const { db } = require("../../../db");

const getCategories = () => {
  return db("categories").whereNull("deleted_at").orderBy("name");
};

const getCategoryById = (id) => {
  return db("categories").where({ id });
};

const createCategory = async (category) => {
  return (
    await db("categories")
      .insert({
        name: category.name,
        created_at: new Date(),
      })
      .returning("id")
  )[0];
};

const updateCategory = async (category) => {
  return (
    (await db("categories").where({ id: category.id }).update({
      name: category.name,
      updated_at: new Date(),
    })) > 0
  );
};

const deleteCategory = async (categoryId) => {
  return (
    (await db("categories").where({ id: categoryId }).update({
      deleted_at: new Date(),
    })) > 0
  );
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
