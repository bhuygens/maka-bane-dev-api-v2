module.exports = [
  {
    type: 'postgres',
    host: process.env.POSTGRESQL_ADDON_HOST,
    port: 5432,
    username: process.env.POSTGRESQL_ADDON_USER,
    password: process.env.POSTGRESQL_ADDON_PASSWORD,
    database: process.env.POSTGRESQL_ADDON_DB,
    entities: ['dist/src/**/*.entity{.js,.ts}'],
    migrations: ['dist/migrations/*.js'],
    cli: {
      migrationsDir: 'migrations',
    },
  },
];
