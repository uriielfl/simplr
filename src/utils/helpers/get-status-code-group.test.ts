import { StatusCodeGroupEnum } from '../enums/status-code-groups.enum';
import { StatusCodeEnum } from '../enums/status-code.enum';
import { getStatusCodeGroup } from './get-status-code-group';

describe('Get status code group function', () => {
  it('should return INFORMATIONAL status code group from 1xx status code', () => {
    const status = StatusCodeEnum.CONTINUE;
    const result = getStatusCodeGroup(status);
    expect(result).toBe(StatusCodeGroupEnum.INFORMATIONAL);
  });

  it('should return SUCCESS status code group from 2xx status code', () => {
    const status = StatusCodeEnum.OK;
    const result = getStatusCodeGroup(status);
    expect(result).toBe(StatusCodeGroupEnum.SUCCESS);
  });

  it('should return REDIRECTION status code group from 3xx status code', () => {
    const status = StatusCodeEnum.MOVED_PERMANENTLY;
    const result = getStatusCodeGroup(status);
    expect(result).toBe(StatusCodeGroupEnum.REDIRECTION);
  });

  it('should return CLIENT ERROR status code group from 4xx status code', () => {
    const status = StatusCodeEnum.NOT_FOUND;
    const result = getStatusCodeGroup(status);
    expect(result).toBe(StatusCodeGroupEnum.CLIENT_ERROR);
  });

  it('should return SERVER ERROR status code group from 5xx status code', () => {
    const status = StatusCodeEnum.INTERNAL_SERVER_ERROR;
    const result = getStatusCodeGroup(status);
    expect(result).toBe(StatusCodeGroupEnum.SERVER_ERROR);
  });

  it('should return UNKNOWN status code group from not listed status code', () => {
    const status = 999;
    const result = getStatusCodeGroup(status);
    expect(result).toBe(StatusCodeGroupEnum.UNKNOWN);
  });
});
