import { StatusTextEnum } from '../utils/enums/status-text.enum';

export class SimplrError {
  public statusText: string;

  constructor(
    public status: number,
    public message: any = 'No message provided',
    statusText?: string,
  ) {
    this.statusText =
      statusText ||
      StatusTextEnum[`_${this.status}` as keyof typeof StatusTextEnum] ||
      'Unknown Status';
  }
}
