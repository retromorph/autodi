import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type ChatDocument = Chat & Document;

@Schema()
export class Chat {
  @Prop({
    required: [true, "Title is required"],
  })
  title: string;

  @Prop({
    required: [true, "Members is required"],
  })
  members: number[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
