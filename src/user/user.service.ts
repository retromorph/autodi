import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { pipe } from "fp-ts/function";
import { Repository } from "typeorm";
import { UserEntity } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import * as TE from "fp-ts/TaskEither";
import { tryCatch } from "../shared/fp/task-either-contrib";
import { createHmac } from "crypto";
import { With } from "../shared/types/with";
import { MatchUserDto } from "./dto/match-user.dto";

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
  }

  private readonly hashPassword =
    <A extends With<{ password: string }>>(withPassword: A): A =>
      ({
        ...withPassword,
        password: createHmac("sha256", withPassword.password).digest("hex"),
      });

  public readonly create = (
    createUser: CreateUserDto,
  ): TE.TaskEither<BadRequestException, UserEntity> =>
    pipe(
      createUser,
      this.hashPassword,
      this.userRepository.create,
      tryCatch(
        (x) => this.userRepository.save(x),
        (e) => new BadRequestException(e),
      ),
    );

  public readonly match = (
    matchUser: MatchUserDto,
  ): TE.TaskEither<BadRequestException, boolean> =>
    pipe(
      matchUser,
      this.hashPassword,
      tryCatch(
        (matchUser) => this.userRepository.findOne({
          where: {
            device: {
              identity: matchUser.identity,
            },
            password: matchUser.password,
          },
          relations: ["device"],
        }),
        (e) => new BadRequestException(e),
      ),
      TE.map(
        user => Boolean(user),
      ),
    );

  public readonly findByLogins = (
    logins: string[],
  ): TE.TaskEither<BadRequestException, UserEntity[]> =>
    pipe(
      logins,
      tryCatch(
        (logins) => this.userRepository
          .createQueryBuilder("user")
          .where("user.login IN(:...logins)", { logins })
          .getMany(),
        (e) => new BadRequestException(e),
      ),
    );
}