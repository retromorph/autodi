import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Chat, ChatSchema } from "./chat.scheme";
import { ChatService } from "./chat.service";
import { UserModule } from "../../user/user.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
    UserModule,
  ],
  providers: [ChatService],
})
export class ChatModule {}
