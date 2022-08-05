import { validate } from "class-validator";

import { registerAs } from "@nestjs/config";

import { RedisConfigDto } from "./dto/redisConfig.dto";

export default registerAs("redisConfig", (): RedisConfigDto => {
  const redisConfigDto: RedisConfigDto = {
    host: process.env["REDIS_HOST"],
    port: parseInt(process.env["REDIS_PORT"]),
  };

  validate(redisConfigDto).then((errors) => {
    if (errors.length > 0) {
      throw new Error(errors.join("\n"));
    }
  });

  return redisConfigDto;
});
