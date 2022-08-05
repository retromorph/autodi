import { Module } from "@nestjs/common";
import { MessageModule } from "./message/message.module";
import { ChatModule } from "./chat/chat.module";
import { MessengerGateway } from "./messenger.gateway";

@Module({
  imports: [MessageModule, ChatModule],
  providers: [MessengerGateway],
})
export class MessengerModule {}
