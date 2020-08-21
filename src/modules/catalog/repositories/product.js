const { db } = require("../../../db");

const getProducts = () => {
  return db("products").orderBy("name");
};

const createProduct = async (product) => {
  return (
    await db("products")
      .insert({
        name: product.name,
        category_id: product.categoryId,
        price: product.price,
        created_at: new Date(),
      })
      .returning("id")
  )[0];
};

const updateProduct = async (product) => {
  return (
    (await db("products").where({ id: product.id }).update({
      name: product.name,
      categoryId: product.categoryId,
      price: product.price,
      updated_at: new Date(),
    })) > 0
  );
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
};
