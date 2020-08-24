exports.up = async (knex) => {
  await knex.schema.createTable("categories", (table) => {
    table.increments();
    table.string("name", 80).notNullable();
    table.datetime("created_at");
    table.datetime("updated_at");
    table.datetime("deleted_at");
  });

  return knex.schema.createTable("products", (table) => {
    table.increments();
    table.string("name", 80).notNullable();
    table.string("description").notNullable();
    table.string("image_url").notNullable();
    table
      .integer("category_id")
      .notNullable()
      .references("id")
      .inTable("categories")
      .index();
    table.integer("price").notNullable();
    table.datetime("created_at");
    table.datetime("updated_at");
    table.datetime("deleted_at");
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable("categories");
  return knex.schema.dropTable("products");
};
