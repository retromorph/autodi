import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DeviceEntity } from "../device/device.entity";

export enum UserStatusEnum {
  UNVERIFIED,
  VERIFIED,
  BLOCKED,
}

@Entity("user")
export class UserEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    unique: true,
  })
  public login: string;

  @Column()
  public isOfferAccepted: boolean;

  @Column({
    type: "enum",
    enum: UserStatusEnum,
    default: UserStatusEnum.UNVERIFIED,
  })
  public status: UserStatusEnum;

  @Column()
  public password: string;

  @OneToOne(() => DeviceEntity)
  @JoinColumn()
  public device: DeviceEntity;
}
