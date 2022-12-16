import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsPositive } from "class-validator";

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

export class PaginationQuery {
  @ApiProperty({ type: Number, required: false })
  @IsPositive()
  @Type(() => Number)
  limit: number = DEFAULT_LIMIT;

  @ApiProperty({ type: Number, required: false })
  @IsPositive()
  @Type(() => Number)
  page: number = 1;

  constructor(props: { limit: number; page: number } = { limit: 20, page: 1 }) {
    this.page = props.page;
    this.limit = props.limit > MAX_LIMIT ? MAX_LIMIT : props.limit;
  }

  calculateOffset() {
    return (this.page - 1) * this.limit;
  }

  nextPage() {
    this.page += 1;
    return this;
  }

  firstPage() {
    this.page = 1;
    return this;
  }
}

class PaginationMeta {
  limit: number;
  page: number;
}

export class PaginationResult<T> {
  @ApiProperty()
  limit: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  totalPages: number;

  @ApiProperty()
  totalItems: number;

  @ApiProperty({ isArray: true, type: Type })
  data: T[];

  isEmpty() {
    return this.totalItems === 0;
  }

  static from<T>(
    data: T[],
    totalItems: number,
    meta: PaginationMeta
  ): PaginationResult<T> {
    const result = new PaginationResult<T>();
    result.totalItems = totalItems;
    result.limit = meta.limit;
    result.page = meta.page;
    result.totalPages = Math.ceil(result.totalItems / result.limit);
    result.data = data;
    return result;
  }

  static empty(meta: PaginationMeta = { limit: DEFAULT_LIMIT, page: 1 }) {
    return PaginationResult.from([], 0, meta);
  }
}
