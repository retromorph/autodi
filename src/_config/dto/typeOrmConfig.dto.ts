import {
  IsIn,
  IsIP,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  Max,
  Min,
} from "class-validator";

import { Or } from "../../shared/validators/or.validator";

export const providerNames = ["postgres"] as const;
export type ProviderName = typeof providerNames[number];

export class TypeOrmConfigDto {
  @IsIn(providerNames)
  public type: ProviderName;

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

  @IsNotEmpty()
  @IsString()
  public database: string;
}
