const express = require("express");

const { asyncMiddleware } = require("../../../utils/errors");
const categoryService = require("../services/category");

module.exports = (app) => {
  const router = express.Router();
  app.use("/categories", router);

  router.get(
    "/",
    asyncMiddleware(async (_req, res) => {
      const categories = await categoryService.getCategories();

      res.json({ categories });
    })
  );

  router.post(
    "/",
    asyncMiddleware(async (req, res) => {
      const { name } = req.body;

      const id = await categoryService.createCategory({
        name,
      });

      res.json({
        id,
      });
    })
  );
};
