import { DeviceEntity } from "../../device/device.entity";

export class CreateUserDto {
  public login: string;
  public isOfferAccepted: boolean;
  public password: string;
  public device: DeviceEntity;

  public static of =
    (login: string) =>
    (isOfferAccepted: boolean) =>
    (password: string) =>
    (device: DeviceEntity): CreateUserDto => {
      return {
        login,
        isOfferAccepted,
        password,
        device,
      };
    };
}
