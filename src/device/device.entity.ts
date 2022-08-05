import {
  Column,
  Entity,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserEntity } from "../user/user.entity";

export enum DeviceStatus {
  VERIFIED,
  UNVERIFIED,
}

export enum DeviceType {
  EMAIL,
}

export const deviceTypesNeedVerification = [DeviceType.EMAIL];

@Entity("device")
export class DeviceEntity {
  @PrimaryColumn()
  public identity: string;

  @Column({
    type: "enum",
    enum: DeviceType,
  })
  public type: DeviceType;

  @Column({
    type: "enum",
    enum: DeviceStatus,
  })
  public status: DeviceStatus;
}
