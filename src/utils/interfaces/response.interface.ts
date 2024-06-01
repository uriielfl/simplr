import { StatusCodeGroupEnum } from "../enums/status-code-groups.enum";

export interface IResponse {
  status: number;
  data: any;
  statusText: string;
  statusGroup: StatusCodeGroupEnum
}
