import { validate } from "class-validator";

import { registerAs } from "@nestjs/config";

import { JwtConfigDto } from "./dto/jwtConfig.dto";

export default registerAs("jwtSecretConfig", (): JwtConfigDto => {
  const jwtSecretConfig: JwtConfigDto = {
    secret: process.env["JWT_TOKEN"],
    expirationTime: Number(process.env["JWT_EXPIRATION_TIME"]),
  };

  validate(jwtSecretConfig).then((errors) => {
    if (errors.length > 0) {
      throw new Error(errors.join("\n"));
    }
  });
  return jwtSecretConfig;
});
