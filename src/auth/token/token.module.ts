import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RefreshToken, RefreshTokenSchema } from "./refresh-token.scheme";
import { TokenService } from "./token.service";

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: RefreshToken.name, schema: RefreshTokenSchema }],
    ),
  ],
  providers: [TokenService]
})
export class TokenModule {
}