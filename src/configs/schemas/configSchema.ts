import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, now } from "mongoose";
import { ConfigStatus } from "../enums/config-status";

export type ConfigDocument = HydratedDocument<Config>;

@Schema()
export class Config {
  @Prop({ required: true })
  word: string;

  @Prop({ enum: ConfigStatus, required: true })
  status: ConfigStatus;

  @Prop({ default: now() })
  createdAt: Date;
}

export const ConfigSchema = SchemaFactory.createForClass(Config);
