module.exports = {
  type: "mysql",
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [__dirname + "/src/**/*.entity.ts"],
  synchronize: false,
  migrations: ["src/migrations/**/*.ts"],
  subscribers: ["src/subscribers/**/*.ts", "dist/subscribers/**/.js"],
  cli: {
    entitiesDir: "src",
    migrationsDir: "src/migrations",
    subscribersDir: "src/subscribers",
  },
};
