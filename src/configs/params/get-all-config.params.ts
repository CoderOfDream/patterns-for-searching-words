import { SortBy, SortDirection } from "../queries/get-configs.query";
import { ConfigStatus } from "../enums/config-status";

export class GetAllConfigParams {
  readonly status?: ConfigStatus;
  readonly sortBy?: SortBy;
  readonly sortDirection?: SortDirection;
  readonly limit: number;
  readonly offset: number;
}
