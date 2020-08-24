const productRepository = require("../repositories/product");

const getProducts = () => {
  return productRepository.getProducts();
};

const getProductById = (id) => {
  return productRepository.getProductById(id);
};

const createProduct = async (product) => {
  const id = await productRepository.createProduct(product);
  return getProductById(id);
};

const updateProduct = async (product) => {
  await productRepository.updateProduct(product);
  return getProductById(product.id);
};

const deleteProduct = (product) => {
  return productRepository.deleteProduct(product);
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
