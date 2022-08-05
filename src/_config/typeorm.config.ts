import { validate } from "class-validator";

import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

import { TypeOrmConfigDto } from "./dto/typeOrmConfig.dto";

export default registerAs(
  "mysqlConfig",
  (): TypeOrmModuleOptions & TypeOrmConfigDto => {
    const typeOrmConfig: TypeOrmConfigDto = {
      type: "postgres",
      host: process.env["POSTGRES_HOST"],
      port: parseInt(process.env["POSTGRES_PORT"]),
      username: process.env["POSTGRES_USER"],
      password: process.env["POSTGRES_PASSWORD"],
      database: process.env["POSTGRES_NAME"],
    };

    validate(typeOrmConfig).then((errors) => {
      if (errors.length > 0) {
        throw new Error(errors.join("\n"));
      }
    });

    return {
      ...typeOrmConfig,
      entities: [__dirname + "/../**/*.entity.js"],
      synchronize: false,
      keepConnectionAlive: process.env["NODE_ENV"] === "development",
    };
  },
);
