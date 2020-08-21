const express = require("express");

const { asyncMiddleware } = require("../../../utils/errors");
const productService = require("../services/product");

module.exports = (app) => {
  const router = express.Router();
  app.use("/products", router);

  router.get(
    "/",
    asyncMiddleware(async (_req, res) => {
      const products = await productService.getProducts();

      res.json({ products });
    })
  );

  router.post(
    "/",
    asyncMiddleware(async (req, res) => {
      const { name, categoryId, price } = req.body;

      const id = await productService.createProduct({
        name,
        categoryId,
        price,
      });

      res.json({
        id,
      });
    })
  );
};
