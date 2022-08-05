import { DeviceType } from "../../device/device.entity";
import { Or } from "../../shared/validators/or.validator";
import { IsPhoneNumber, IsEmail, IsString, Equals, IsNumber, Max } from "class-validator";

export class SignUpDto {
  @Or([IsPhoneNumber(), IsEmail()])
  public identity: string;
  @IsNumber()
  public type: DeviceType;
  @IsString()
  public password: string;
  @Equals(true)
  public isOfferAccepted: boolean;
}