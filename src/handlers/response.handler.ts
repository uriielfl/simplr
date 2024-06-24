import { getStatusCodeGroup } from '../utils/helpers/get-status-code-group';

export class SimplrResponse {
  status: number;
  data: any;
  statusText: string;
  statusGroup: string;

  constructor(status: number, data: any, statusText: string) {
    this.status = status;
    this.data = data;
    this.statusText = statusText;
    this.statusGroup = getStatusCodeGroup(status);
  }
}
