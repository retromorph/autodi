import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type RefreshTokenDocument = RefreshToken & Document;

@Schema()
export class RefreshToken {
  @Prop({
    required: true,
  })
  userId: number;

  @Prop({
    required: true,
  })
  token: string;

  @Prop({
    default: false,
  })
  isBlackListed: boolean;

  @Prop({
    required: true,
  })
  browserFingerprint: string;

  @Prop({
    required: true,
  })
  geolocation: string;

  @Prop({
    required: true,
  })
  expires: Date;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
