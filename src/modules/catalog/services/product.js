const productRepository = require("../repositories/product");

const getProducts = () => {
  return productRepository.getProducts();
};

const createProduct = (product) => {
  return productRepository.createProduct(product);
};

const updateProduct = (product) => {
  return productRepository.updateProduct(product);
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
};
