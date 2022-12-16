import { ConfigStatus } from "../enums/config-status";

export class CreateConfigParams {
  readonly word: string;
  readonly status: ConfigStatus;
}
