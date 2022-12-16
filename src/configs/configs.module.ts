import { Module } from "@nestjs/common";
import { ConfigsService } from "./configs.service";
import { ConfigsController } from "./configs.controller";
import { Config, ConfigSchema } from "./schemas/configSchema";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigsRepository } from "./configs.repository";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Config.name, schema: ConfigSchema }])
  ],
  providers: [ConfigsService, ConfigsRepository],
  controllers: [ConfigsController]
})
export class ConfigsModule {}
