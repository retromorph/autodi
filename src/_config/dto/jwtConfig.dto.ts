import {
  IsNotEmpty,
  IsNotIn,
  IsNumber,
  IsString,
  Length,
} from "class-validator";

export class JwtConfigDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 512)
  public secret: string;

  @IsNotIn([0])
  @IsNumber()
  public expirationTime: number;
}
