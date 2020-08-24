const express = require("express");

const { asyncMiddleware } = require("../../../utils/errors");
const { CUSTOMER, ADMIN } = require("../../authentication/roles");
const authorize = require("../../authentication/authorize");
const validate = require("../../../utils/validation");
const categorySchema = require("../validation-schemas/category");
const categoryService = require("../services/category");

module.exports = (app) => {
  const router = express.Router();
  app.use("/categories", router);

  router.get(
    "/",
    authorize([CUSTOMER, ADMIN]),
    asyncMiddleware(async (_req, res) => {
      const categories = await categoryService.getCategories();

      res.json(categories);
    })
  );

  router.get(
    "/:id",
    authorize([CUSTOMER, ADMIN]),
    asyncMiddleware(async (req, res) => {
      const category = await categoryService.getCategoryById(req.params.id);

      res.json(category);
    })
  );

  router.post(
    "/",
    validate(categorySchema),
    authorize([ADMIN]),
    asyncMiddleware(async (req, res) => {
      const { name } = req.body;

      const category = await categoryService.createCategory({
        name,
      });

      res.json(category);
    })
  );

  router.put(
    "/:id",
    validate(categorySchema),
    authorize([ADMIN]),
    asyncMiddleware(async (req, res) => {
      const { name } = req.body;

      const category = await categoryService.updateCategory({
        id: req.params.id,
        name,
      });

      res.json(category);
    })
  );

  router.delete(
    "/:id",
    authorize([ADMIN]),
    asyncMiddleware(async (req, res) => {
      const deleted = await categoryService.deleteCategory(req.params.id);

      res.json({ deleted });
    })
  );
};
