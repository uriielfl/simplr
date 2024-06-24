import { HttpMethodsEnum } from '../../utils/enums/http-methods.enum';
import { getStatusCodeGroup } from '../../utils/helpers/get-status-code-group';
import { IRequestOptions } from '../../utils/interfaces/request-options.interface';
import { IResponse } from '../../utils/interfaces/response.interface';

export class Delete {
  constructor(
    public url: string,
    public path: string,
    public options: IRequestOptions,
  ) {}

  async runIt(): Promise<IResponse> {
    const fullUrl = `${this.url}/${this.path}`;
    const HEADER = {
      'Content-Type': 'application/json',
      ...(this.options.headers as Record<string, string>),
    };

    const response = await fetch(fullUrl, {
      method: HttpMethodsEnum.DELETE,
      headers: HEADER,
    });

    const data = await response.json();
    return {
      status: response.status,
      data,
      statusText: response.statusText,
      statusGroup: getStatusCodeGroup(response.status),
      ok: response.ok,
    };
  }
}
