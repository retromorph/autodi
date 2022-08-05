import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type FileDocument = File & Document;

@Schema()
export class File {
  @Prop({
    required: [true, "Title is required"],
  })
  title: string;

  @Prop({
    required: [true, "Members is required"],
  })
  members: number[];
}

export const FileSchema = SchemaFactory.createForClass(File);
