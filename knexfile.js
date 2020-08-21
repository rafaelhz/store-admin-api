module.exports = {
  client: "postgres",
  connection: {
    host: "localhost",
    user: "postgres",
    port: "5433",
    password: "1234",
    database: "store"
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: "knex_migrations"
  }
};