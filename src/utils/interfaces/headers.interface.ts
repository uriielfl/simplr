export interface IResponseHeaders {
  [key: string]: string | undefined;
  'Access-Control-Allow-Origin'?: string;
  Connection?: string;
  'Content-Encoding'?: string;
  'Content-Type'?: string;
  Date?: string;
  Etag?: string;
  'Keep-Alive'?: string;
  'Last-Modified'?: string;
  Server?: string;
  'Set-Cookie'?: string;
  'Transfer-Encoding'?: string;
  Vary?: string;
  'X-Backend-Server'?: string;
  'X-Cache-Info'?: string;
  'X-kuma-revision'?: string;
  'x-frame-options'?: string;
}

export interface IRequestHeaders {
  [key: string]: string | undefined;
  Host?: string;
  'User-Agent'?: string;
  Accept?: string;
  'Accept-Language'?: string;
  'Accept-Encoding'?: string;
  Referer?: string;
  Connection?: string;
  'Upgrade-Insecure-Requests'?: string;
  'If-Modified-Since'?: string;
  'If-None-Match'?: string;
  'Cache-Control'?: string;
}
