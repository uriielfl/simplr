import { SimplrError } from '../../handlers/error.handler';
import { SimplrResponse } from '../../handlers/response.handler';
import { HttpMethodsEnum } from '../../utils/enums/http-methods.enum';
import { IRequestOptions } from '../../utils/interfaces/request-options.interface';
import { Base } from '../Base';

export class Get {
  constructor(
    public url: string,
    public path?: string,
    public option?: IRequestOptions,
  ) {
    const base = new Base(this.url, this.path, this.option);
    this.url = base.url;
    this.path = base.path;
    this.option = base.option;
  }


  async runIt(): Promise<SimplrResponse> {
    const HEADERS = {
      'Content-Type': 'application/json',
      ...(this.option?.headers as Record<string, string>),
    };

    const response = await fetch(`${this.url}${this.path}`, {
      method: HttpMethodsEnum.GET,
      headers: HEADERS,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new SimplrError(response.status, response.statusText, errorData);
    }
    
    const simplrResponse = await SimplrResponse.fromResponse(response);
    return simplrResponse
  }
}
