import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query
} from "@nestjs/common";
import { ConfigsService } from "./configs.service";
import { PaginationResult } from "../libs/pagination-container";
import { CreateConfigDto } from "./dtos/create-config.dto";
import { GetConfigsQuery } from "./queries/get-configs.query";
import { UpdateConfigDto } from "./dtos/update-config.dto";

@Controller("configs")
export class ConfigsController {
  constructor(private readonly _configService: ConfigsService) {}

  @Post()
  async create(@Body() dto: CreateConfigDto) {
    return this._configService.create(dto.toParams());
  }

  @Get()
  async findAll(@Query() query: GetConfigsQuery) {
    const [configs, count] = await this._configService.findAllAndCount(
      query.toParams()
    );

    return PaginationResult.from(configs, count, {
      limit: query.limit,
      page: query.page
    });
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this._configService.findOne(id);
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() dto: UpdateConfigDto) {
    return this._configService.update(id, dto.toParams());
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this._configService.remove(id);
  }
}
