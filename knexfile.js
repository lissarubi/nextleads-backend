// Update with your config settings.
require('dotenv').config()

module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: process.env.DATABASE,
      user: process.env.USERNAME,
      password: process.env.PASSWORD,
    },
  },

  staging: {
    client: 'pg',
    connection: {
      database: 'nextleads',
      user: 'ederson',
      password: '1234',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'pg',
    connection: {
      database: 'nextleads',
      user: 'ederson',
      password: '1234',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
