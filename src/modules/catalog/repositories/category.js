const { db } = require("../../../db");

const getCategories = () => {
  return db("categories").orderBy("name");
};

const createCategory = async category => {
  return (await db("categories")
  .insert({
    name: category.name,
    created_at: new Date()
   })
  .returning("id"))[0];
}

const updateCategory = async category => {
  return (
    (await db("categories")
      .where({ id: category.id })
      .update({
        name: category.name,
        updated_at: new Date()
      })) > 0
  );
};

module.exports = {
  getCategories,
  createCategory,
  updateCategory
};
