exports.up = async knex => {
  await knex.schema.createTable("categories", table => {
    table.increments();
    table.string("name", 80).notNullable();
    table.timestamps();
  });

  return knex.schema.createTable("products", table => {
    table.increments();
    table.string("name", 80).notNullable();
    table
      .integer("category_id")
      .notNullable()
      .references("id")
      .inTable("categories")
      .index();
    table.integer("price").notNullable();
    table.timestamps();
  });
};

exports.down = async knex => {
  await knex.schema.dropTable("categories");
  return knex.schema.dropTable("products");
};
