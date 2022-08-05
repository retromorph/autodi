import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserModule } from "../user/user.module";
import { DeviceModule } from "../device/device.module";
import { AuthController } from "./auth.controller";
import { ConfigModule } from "@nestjs/config";
import jwtConfig from "../_config/jwt.config";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [jwtConfig],
      ignoreEnvFile: process.env["NODE_ENV"] === "production",
    }),
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      ...jwtConfig(),
      signOptions: { expiresIn: "3d" },
    }),
    UserModule,
    DeviceModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {
}