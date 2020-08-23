const express = require("express");
const { asyncMiddleware } = require("../../../utils/errors");
const authenticationService = require("../services/auth");

module.exports = (app) => {
  const router = express.Router();
  app.use("/auth", router);

  router.post(
    "/login",
    asyncMiddleware(async (req, res) => {
      const { email, password } = req.body;

      const accessToken = await authenticationService.login(email, password);

      res.json(accessToken);
    })
  );
};
