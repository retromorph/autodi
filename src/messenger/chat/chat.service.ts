import * as TE from "fp-ts/TaskEither";
import * as A from "fp-ts/Array";

import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Chat, ChatDocument } from "./chat.scheme";
import { CreateChatDto } from "./dto/create-chat.dto";
import { UserService } from "../../user/user.service";
import { pipe } from "fp-ts/function";
import { tryCatch } from "../../shared/fp/task-either-contrib";

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name)
    private chatModel: Model<ChatDocument>,
    private userService: UserService,
  ) {
  }

  readonly create = (
    createChatDto: CreateChatDto,
  ): TE.TaskEither<BadRequestException, ChatDocument> =>
    pipe(
      createChatDto.members,
      this.userService.findByLogins,
      TE.map(
        A.map((user) => user.id),
      ),
      TE.map(
        (ids) => ({
          title: createChatDto.title,
          members: ids,
        }),
      ),
      TE.chain(
        tryCatch(
          (x) => this.chatModel.create(x),
          (e) => new BadRequestException(e),
        ),
      ),
    );
}