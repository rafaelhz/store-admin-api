const { getPasswordHash } = require("../src/utils/crypto");

exports.seed = async (knex) => {
  await knex("users").del();

  const password = await getPasswordHash("123456");

  return knex("users").insert([
    {
      name: "Admin",
      email: "admin@gmail.com",
      password,
      role: "ROLE_ADMIN",
      created_at: new Date(),
    },
    {
      name: "Customer",
      email: "customer@gmail.com",
      password,
      role: "ROLE_CUSTOMER",
      created_at: new Date(),
    },
  ]);
};
