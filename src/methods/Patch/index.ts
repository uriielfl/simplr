import { SimplrError } from '../../handlers/error.handler';
import { HttpMethodsEnum } from '../../utils/enums/http-methods.enum';
import { getStatusCodeGroup } from '../../utils/helpers/get-status-code-group';
import { IRequestOptions } from '../../utils/interfaces/request-options.interface';
import { IResponse } from '../../utils/interfaces/response.interface';

export class Patch  {
  constructor(
    public url: string,
    public path?: string,
    public options?: IRequestOptions,
  ) {
  }
  async runIt(): Promise<IResponse> {
    const fullUrl = `${this.url}/${this.path}`;
    const BODY = JSON.stringify(this.options?.body);

    const HEADER = {
      'Content-Type': 'application/json',
      ...(this.options?.headers as Record<string, string>),
    };

    const response = await fetch(fullUrl, {
      method: HttpMethodsEnum.PATCH,
      body: BODY,
      headers: HEADER,
    });

    if (!response.ok) {
      const errorData = await response.json();

      throw new SimplrError(response.status, response.statusText, errorData);
    }

    return {
      status: response.status,
      data: JSON.parse(await response.text()),
      statusText: response.statusText,
      statusGroup: getStatusCodeGroup(response.status),
    };
  }
}
