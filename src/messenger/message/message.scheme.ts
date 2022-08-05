import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Chat } from "../chat/chat.scheme";
import * as mongoose from "mongoose";

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Prop({
    required: [true, "Message is required"],
  })
  message: string;

  @Prop({
    required: [true, "Originator is required"],
  })
  originator: number;

  @Prop()
  attachments: string[];

  @Prop({
    default: false,
  })
  isRevoked: boolean;

  @Prop({
    default: new Date(),
  })
  date: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Chat" })
  owner: Chat;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
