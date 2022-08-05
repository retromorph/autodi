import { validate } from "class-validator";
import { registerAs } from "@nestjs/config";
import { MongooseModuleOptions } from "@nestjs/mongoose/dist/interfaces/mongoose-options.interface";
import { MongoConfigDto } from "./dto/mongoConfig.dto";

export default registerAs(
  "mongoConfig",
  (): [string, MongooseModuleOptions] => {

    const mongoConfig: MongoConfigDto = {
      host: process.env["MONGO_HOST"],
      port: parseInt(process.env["MONGO_PORT"]),
      username: process.env["MONGO_USERNAME"],
      password: process.env["MONGO_PASSWORD"],
    };

    validate(mongoConfig).then((errors) => {
      if (errors.length > 0) {
        throw new Error(errors.join("\n"));
      }
    });

    return [
      `
      mongodb://${mongoConfig.username}:${mongoConfig.password}@${mongoConfig.host}:${mongoConfig.port}
      `,
      {},
    ];
  },
);