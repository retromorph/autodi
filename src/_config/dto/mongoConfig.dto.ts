import {
  IsIP,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  Max,
  Min,
} from "class-validator";

import { Or } from "../../shared/validators/or.validator";

export class MongoConfigDto {
  @Or([IsIP(), IsUrl()])
  public host: string;

  @IsNumber()
  @Min(1)
  @Max(65535)
  public port: number;

  @IsNotEmpty()
  @IsString()
  public username: string;

  @IsNotEmpty()
  @IsString()
  public password: string;
}
