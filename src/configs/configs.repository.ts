import { InjectModel } from "@nestjs/mongoose";
import { Config, ConfigDocument } from "./schemas/configSchema";
import { Model } from "mongoose";
import { CreateConfigParams } from "./params/create-config.params";
import { GetAllConfigParams } from "./params/get-all-config.params";
import { UpdateConfigParams } from "./params/update-config.params";

export class ConfigsRepository {
  constructor(
    @InjectModel(Config.name) private configModel: Model<ConfigDocument>
  ) {}

  async create(params: CreateConfigParams) {
    const config = new this.configModel(params);
    await config.validate();

    return config.save();
  }

  findOneById(id: string) {
    return this.configModel.findById(id);
  }

  async findAllAndCount(
    params: GetAllConfigParams
  ): Promise<[Config[], number]> {
    const configs = await this.configModel
      .find(
        {
          ...(params.status ? { status: params.status } : {})
        },
        {},
        { limit: params.limit, skip: params.offset }
      )
      .sort({ [params.sortBy]: params.sortDirection })
      .limit(params.limit)
      .skip(params.offset)
      .exec();

    return [configs, await this.configModel.countDocuments()];
  }

  async update(id: string, { word, status }: UpdateConfigParams) {
    return this.configModel.findByIdAndUpdate(
      id,
      {
        ...(word ? { word } : {}),
        ...(status ? { status } : {})
      },
      { new: true }
    );
  }

  async remove(id: string) {
    return await this.configModel.findByIdAndRemove(id);
  }
}
