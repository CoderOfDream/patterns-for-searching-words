import {
  BadRequestException,
  Injectable,
  NotFoundException
} from "@nestjs/common";
import { Config } from "./schemas/configSchema";
import { ConfigsRepository } from "./configs.repository";
import { CreateConfigParams } from "./params/create-config.params";
import { GetAllConfigParams } from "./params/get-all-config.params";
import { UpdateConfigParams } from "./params/update-config.params";
import mongoose from "mongoose";

@Injectable()
export class ConfigsService {
  constructor(private readonly _configsRepository: ConfigsRepository) {}

  async create(params: CreateConfigParams) {
    return this._configsRepository.create(params);
  }

  async findAllAndCount(
    params: GetAllConfigParams
  ): Promise<[Config[], number]> {
    return this._configsRepository.findAllAndCount(params);
  }

  async findOne(id: string) {
    if (!this.isIdValid(id)) {
      throw new BadRequestException("Invalid id");
    }

    const config = await this._configsRepository.findOneById(id);
    if (!config) {
      throw new NotFoundException("Config not found");
    }
  }

  async update(id: string, params: UpdateConfigParams) {
    if (!this.isIdValid(id)) {
      throw new BadRequestException("Invalid id");
    }

    return this._configsRepository.update(id, params);
  }

  async remove(id: string) {
    if (!this.isIdValid(id)) {
      throw new BadRequestException("Invalid id");
    }

    return this._configsRepository.remove(id);
  }

  private isIdValid(id: string): boolean {
    return mongoose.Types.ObjectId.isValid(id);
  }
}
