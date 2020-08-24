const express = require("express");

const { asyncMiddleware } = require("../../../utils/errors");
const { CUSTOMER, ADMIN } = require("../../authentication/roles");
const authorize = require("../../authentication/authorize");
const validate = require("../../../utils/validation");
const productSchema = require("../validation-schemas/product");
const productService = require("../services/product");

module.exports = (app) => {
  const router = express.Router();
  app.use("/products", router);

  router.get(
    "/",
    authorize([CUSTOMER, ADMIN]),
    asyncMiddleware(async (_req, res) => {
      const products = await productService.getProducts();

      res.json(products);
    })
  );

  router.get(
    "/:id",
    authorize([CUSTOMER, ADMIN]),
    asyncMiddleware(async (req, res) => {
      const product = await productService.getProductById(req.params.id);

      res.json(product);
    })
  );

  router.post(
    "/",
    validate(productSchema),
    authorize([ADMIN]),
    asyncMiddleware(async (req, res) => {
      const { name, description, imageUrl, categoryId, price } = req.body;

      const product = await productService.createProduct({
        name,
        description,
        imageUrl,
        categoryId,
        price: parseInt(price),
      });

      res.json(product);
    })
  );

  router.put(
    "/:id",
    validate(productSchema),
    authorize([ADMIN]),
    asyncMiddleware(async (req, res) => {
      const { name, description, imageUrl, categoryId, price } = req.body;

      const product = await productService.updateProduct({
        id: req.params.id,
        name,
        description,
        imageUrl,
        categoryId,
        price: parseInt(price),
      });

      res.json(product);
    })
  );

  router.delete(
    "/:id",
    authorize([ADMIN]),
    asyncMiddleware(async (req, res) => {
      const deleted = await productService.deleteProduct(req.params.id);

      res.json({ deleted });
    })
  );
};
