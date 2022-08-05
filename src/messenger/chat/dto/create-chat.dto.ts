import { IsString, IsArray } from "class-validator";

export class CreateChatDto {
  @IsString()
  title: string;

  @IsArray()
  members: string[];
}
