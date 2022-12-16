import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { UpdateConfigParams } from "../params/update-config.params";
import { ConfigStatus } from "../enums/config-status";

export class UpdateConfigDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  word?: string;

  @ApiProperty({ enum: ConfigStatus })
  @IsOptional()
  @IsEnum(ConfigStatus)
  status?: ConfigStatus;

  toParams(): UpdateConfigParams {
    return {
      word: this.word,
      status: this.status
    };
  }
}
