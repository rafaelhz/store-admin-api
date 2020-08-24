const { db } = require("../../../db");

const mapProductToDb = (product) => ({
  name: product.name,
  description: product.description,
  price: product.price,
  image_url: product.imageUrl,
  category_id: product.categoryId,
});

const getProducts = () => {
  return db("products").whereNull("deleted_at").orderBy("name");
};

const getProductById = (id) => {
  return db("products").where({ id });
};

const createProduct = async (product) => {
  return (
    await db("products")
      .insert({
        ...mapProductToDb(product),
        created_at: new Date(),
      })
      .returning("id")
  )[0];
};

const updateProduct = async (product) => {
  return (
    (await db("products")
      .where({ id: product.id })
      .update({
        ...mapProductToDb(product),
        updated_at: new Date(),
      })) > 0
  );
};

const deleteProduct = async (productId) => {
  return (
    (await db("products").where({ id: productId }).update({
      deleted_at: new Date(),
    })) > 0
  );
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
