import { SimplrError } from '@/handlers/error.handler';
import { SimplrResponse } from '@/handlers/response.handler';
import { HttpMethodsEnum } from '@/utils/enums/http-methods.enum';
import { IRequestOptions } from '@/utils/interfaces/request-options.interface';

export class Delete {
  constructor(
    public url: string,
    public path?: string,
    public options?: IRequestOptions,
  ) {}
  async runIt(): Promise<SimplrResponse> {
    const fullUrl = `${this.url}/${this.path}`;
    const HEADER = {
      'Content-Type': 'application/json',
      ...(this.options?.headers as Record<string, string>),
    };

    const response = await fetch(fullUrl, {
      method: HttpMethodsEnum.DELETE,
      headers: HEADER,
    });

    if (!response.ok) {
      const errorData = await response.json();

      throw new SimplrError(response.status, response.statusText, errorData);
    }

    const simplrResponse = await SimplrResponse.fromResponse(response);
    return simplrResponse
  }
}
