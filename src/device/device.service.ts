import { BadRequestException, Injectable } from "@nestjs/common";
import {
  DeviceEntity,
  deviceTypesNeedVerification,
  DeviceStatus,
} from "./device.entity";
import { CreateDeviceDto } from "./dto/create-device.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import * as TE from "fp-ts/TaskEither";
import { pipe } from "fp-ts/function";
import { tryCatch } from "../shared/fp/task-either-contrib";

@Injectable()
export class DeviceService {
  public constructor(
    @InjectRepository(DeviceEntity)
    private readonly deviceRepository: Repository<DeviceEntity>,
  ) {}

  private readonly addStatus = (createDevice: CreateDeviceDto) => ({
    ...createDevice,
    status:
      createDevice.type in deviceTypesNeedVerification
        ? DeviceStatus.UNVERIFIED
        : DeviceStatus.VERIFIED,
  });

  public readonly create = (
    createDevice: CreateDeviceDto,
  ): TE.TaskEither<BadRequestException, DeviceEntity> =>
    pipe(
      createDevice,
      this.addStatus,
      this.deviceRepository.create,
      tryCatch(
        (x) => this.deviceRepository.save(x),
        (e) => new BadRequestException(e),
      ),
    );
}
