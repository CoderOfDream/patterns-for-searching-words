import { ApiProperty } from "@nestjs/swagger";
import { PaginationQuery } from "../../libs/pagination-container";
import { ConfigStatus } from "../enums/config-status";
import { IsEnum, IsOptional } from "class-validator";
import { GetAllConfigParams } from "../params/get-all-config.params";

export enum SortBy {
  CreatedAt = "createdAt"
}

export enum SortDirection {
  Desc = "desc",
  Asc = "asc"
}

export class GetConfigsQuery extends PaginationQuery {
  @ApiProperty({ enum: ConfigStatus })
  @IsOptional()
  @IsEnum(ConfigStatus)
  status?: ConfigStatus;

  @ApiProperty({ enum: SortBy, required: false })
  @IsOptional()
  @IsEnum(SortBy)
  sortBy: SortBy = SortBy.CreatedAt;

  @ApiProperty({ enum: SortDirection, required: false })
  @IsOptional()
  @IsEnum(SortDirection)
  sortDirection: SortDirection = SortDirection.Desc;

  toParams(): GetAllConfigParams {
    return {
      status: this.status,
      sortBy: this.sortBy,
      sortDirection: this.sortDirection,
      limit: this.limit,
      offset: this.calculateOffset()
    };
  }
}
