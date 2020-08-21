exports.seed = async (knex) => {
  await knex("categories").del();

  return knex("categories").insert([
    {
      name: "Category 1",
      created_at: new Date(),
    },
    {
      name: "Category 2",
      created_at: new Date(),
    },
    {
      name: "Category 3",
      created_at: new Date(),
    },
  ]);
};
