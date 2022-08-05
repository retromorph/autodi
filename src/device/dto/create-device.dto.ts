import { DeviceType } from "../device.entity";

export class CreateDeviceDto {
  public identity: string;
  public type: DeviceType;

  public static of =
    (identity: string) =>
      (type: DeviceType): CreateDeviceDto => {
        return {
          identity,
          type,
        };
      };
}