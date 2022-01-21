module.exports = [
  {
    type: 'postgres',
    host: 'btlgaenyvp7aak8f9msy-postgresql.services.clever-cloud.com',
    port: 5432,
    username: 'utxrngabylwicyhlt3io',
    password: 'lEozILeDfj2R7OArSd5p',
    database: 'btlgaenyvp7aak8f9msy',
    entities: ['dist/src/**/*.entity{.js,.ts}'],
    migrations: ['dist/migrations/*.js'],
    synchronize: false,
    cli: {
      migrationsDir: 'migrations',
    },
  },
];
