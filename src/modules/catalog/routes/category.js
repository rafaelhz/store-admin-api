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
      const { id } = req.params;
      const category = await categoryService.getCategoryById(id);

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
      const { id } = req.params;
      const { name } = req.body;
      const category = await categoryService.updateCategory({
        id,
        name,
      });

      res.json(category);
    })
  );

  router.delete(
    "/:id",
    authorize([ADMIN]),
    asyncMiddleware(async (req, res) => {
      const id = req.params.id;
      const deleted = await categoryService.deleteCategory(id);

      res.json({ deleted });
    })
  );
};
