import { StatusCodeGroupEnum } from '../../utils/enums/status-code-groups.enum';

export function getStatusCodeGroup(statusCode: number): StatusCodeGroupEnum {
  if (statusCode >= 100 && statusCode <= 199) {
    return StatusCodeGroupEnum.INFORMATIONAL;
  }
  if (statusCode >= 200 && statusCode <= 299) {
    return StatusCodeGroupEnum.SUCCESS;
  }
  if (statusCode >= 300 && statusCode <= 399) {
    return StatusCodeGroupEnum.REDIRECTION;
  }
  if (statusCode >= 400 && statusCode <= 499) {
    return StatusCodeGroupEnum.CLIENT_ERROR;
  }
  if (statusCode >= 500 && statusCode <= 599) {
    return StatusCodeGroupEnum.SERVER_ERROR;
  }
  return StatusCodeGroupEnum.UNKNOWN;
}
