import { BadRequestException, Injectable } from "@nestjs/common";
import { SignUpDto } from "./dto/sign-up.dto";
import { DeviceService } from "../device/device.service";
import { pipe } from "fp-ts/function";
import { UserService } from "../user/user.service";
import * as TE from "fp-ts/TaskEither";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { SignInDto } from "./dto/sign-in.dto";
import { UserEntity } from "../user/user.entity";

@Injectable()
export class AuthService {
  public constructor(
    private readonly userService: UserService,
    private readonly deviceService: DeviceService,
  ) {
  }

  public readonly signUp = (
    signUpDto: SignUpDto,
  ): TE.TaskEither<BadRequestException, UserEntity> =>
    pipe(
      signUpDto,
      this.deviceService.create,
      TE.map(
        CreateUserDto.of(signUpDto.isOfferAccepted)(signUpDto.password),
      ),
      TE.chain(
        this.userService.create,
      ),
    );

  public readonly signIn = (
    signIn: SignInDto,
  ) => {
    pipe(
      signIn,
      this.userService.match,
    );
  };


}