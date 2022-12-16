import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString } from "class-validator";
import { ConfigStatus } from "../enums/config-status";
import { CreateConfigParams } from "../params/create-config.params";

export class CreateConfigDto {
  @ApiProperty()
  @IsString()
  word: string;

  @ApiProperty({ enum: ConfigStatus })
  @IsEnum(ConfigStatus)
  status: ConfigStatus;

  toParams(): CreateConfigParams {
    return {
      word: this.word,
      status: this.status
    };
  }
}
