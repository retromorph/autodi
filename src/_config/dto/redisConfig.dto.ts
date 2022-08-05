import { IsIP, IsNumber, IsUrl, Max, Min } from "class-validator";

import { Or } from "../../shared/validators/or.validator";

export class RedisConfigDto {
  @Or([IsIP(), IsUrl()])
  public host: string;

  @IsNumber()
  @Min(1)
  @Max(65535)
  public port: number;
}
