import { secureUrl } from '../../utils/helpers/secure-url';
import { IRequestOptions } from '../../utils/interfaces/request-options.interface';

export class Base {
  constructor(
    public url: string,
    public path?: string,
    public option?: IRequestOptions,
  ) {
    const { URL, PATH } = secureUrl(this.url, this.path);
    this.url = URL;
    this.path = PATH;
    
    return this;
  }
}
