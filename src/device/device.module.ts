import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DeviceEntity } from "./device.entity";

@Module({
  imports: [TypeOrmModule.forFeature([DeviceEntity])],
  providers: [DeviceModule],
  exports: [DeviceModule],
})
export class DeviceModule {}
