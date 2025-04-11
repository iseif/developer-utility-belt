// HTTP Headers data for reference
export interface HttpHeader {
  name: string;
  type: 'Request' | 'Response' | 'General';
  description: string;
  link?: string;
}

export const httpHeadersData: HttpHeader[] = [
  // General Headers
  {
    name: 'Cache-Control',
    type: 'General',
    description:
      'Directives for caching mechanisms in both requests and responses.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control',
  },
  {
    name: 'Connection',
    type: 'General',
    description:
      'Controls whether the network connection stays open after the current transaction finishes.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Connection',
  },
  {
    name: 'Content-Encoding',
    type: 'General',
    description:
      'The type of encoding used on the data, such as gzip or deflate.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Encoding',
  },
  {
    name: 'Content-Length',
    type: 'General',
    description: 'The size of the resource, in decimal number of bytes.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Length',
  },
  {
    name: 'Content-Type',
    type: 'General',
    description: 'Indicates the media type of the resource.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type',
  },
  {
    name: 'Date',
    type: 'General',
    description: 'The date and time at which the message was originated.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Date',
  },
  {
    name: 'Pragma',
    type: 'General',
    description:
      'Implementation-specific header that may have various effects along the request-response chain.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Pragma',
  },
  {
    name: 'Transfer-Encoding',
    type: 'General',
    description:
      'Specifies the form of encoding used to safely transfer the payload body to the user.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Transfer-Encoding',
  },
  {
    name: 'Via',
    type: 'General',
    description: 'Added by proxies to track message forwarding.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Via',
  },

  // Request Headers
  {
    name: 'Accept',
    type: 'Request',
    description: 'Media types that are acceptable for the response.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept',
  },
  {
    name: 'Accept-Charset',
    type: 'Request',
    description: 'Character sets that are acceptable for the response.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Charset',
  },
  {
    name: 'Accept-Encoding',
    type: 'Request',
    description: 'Acceptable encodings for the response.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Encoding',
  },
  {
    name: 'Accept-Language',
    type: 'Request',
    description: 'Acceptable languages for the response.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language',
  },
  {
    name: 'Authorization',
    type: 'Request',
    description: 'Authentication credentials for HTTP authentication.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization',
  },
  {
    name: 'Cookie',
    type: 'Request',
    description: 'Contains stored HTTP cookies previously sent by the server.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cookie',
  },
  {
    name: 'Expect',
    type: 'Request',
    description:
      'Indicates expectations that need to be fulfilled by the server to handle the request.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Expect',
  },
  {
    name: 'From',
    type: 'Request',
    description: 'Email address of the user making the request.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/From',
  },
  {
    name: 'Host',
    type: 'Request',
    description:
      'Specifies the domain name of the server and optionally the port number.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Host',
  },
  {
    name: 'If-Match',
    type: 'Request',
    description: 'Makes the request conditional based on the ETag value.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/If-Match',
  },
  {
    name: 'If-Modified-Since',
    type: 'Request',
    description:
      'Makes the request conditional based on the modification date.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/If-Modified-Since',
  },
  {
    name: 'If-None-Match',
    type: 'Request',
    description: 'Makes the request conditional based on the ETag value.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/If-None-Match',
  },
  {
    name: 'If-Range',
    type: 'Request',
    description: 'Makes a range request conditional based on an ETag or date.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/If-Range',
  },
  {
    name: 'If-Unmodified-Since',
    type: 'Request',
    description:
      'Makes the request conditional based on the modification date.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/If-Unmodified-Since',
  },
  {
    name: 'Max-Forwards',
    type: 'Request',
    description:
      'Limits the number of times the message can be forwarded through proxies or gateways.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Max-Forwards',
  },
  {
    name: 'Origin',
    type: 'Request',
    description: 'Indicates where a fetch originates from (for CORS).',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin',
  },
  {
    name: 'Proxy-Authorization',
    type: 'Request',
    description: 'Authorization credentials for connecting to a proxy.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Proxy-Authorization',
  },
  {
    name: 'Range',
    type: 'Request',
    description: 'Requests only part of a resource.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Range',
  },
  {
    name: 'Referer',
    type: 'Request',
    description:
      'The address of the previous web page from which a link was followed.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer',
  },
  {
    name: 'User-Agent',
    type: 'Request',
    description:
      'Information about the user agent (browser, client) making the request.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent',
  },

  // Response Headers
  {
    name: 'Access-Control-Allow-Origin',
    type: 'Response',
    description:
      'Indicates whether the response can be shared with resources with the given origin (CORS).',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin',
  },
  {
    name: 'Access-Control-Allow-Credentials',
    type: 'Response',
    description:
      'Indicates whether the response can be shared when request credentials mode is "include" (CORS).',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials',
  },
  {
    name: 'Access-Control-Allow-Headers',
    type: 'Response',
    description:
      'Used in response to a preflight request to indicate which HTTP headers can be used during the actual request (CORS).',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Headers',
  },
  {
    name: 'Access-Control-Allow-Methods',
    type: 'Response',
    description:
      'Specifies the method or methods allowed when accessing the resource in response to a preflight request (CORS).',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Methods',
  },
  {
    name: 'Access-Control-Expose-Headers',
    type: 'Response',
    description:
      'Indicates which headers can be exposed as part of the response by listing their names (CORS).',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Expose-Headers',
  },
  {
    name: 'Access-Control-Max-Age',
    type: 'Response',
    description:
      'Indicates how long the results of a preflight request can be cached (CORS).',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Max-Age',
  },
  {
    name: 'Age',
    type: 'Response',
    description: 'The time in seconds the object has been in a proxy cache.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Age',
  },
  {
    name: 'Allow',
    type: 'Response',
    description:
      'Lists the set of HTTP request methods supported by a resource.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Allow',
  },
  {
    name: 'Content-Disposition',
    type: 'Response',
    description:
      'Indicates if the content should be displayed inline or as an attachment.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Disposition',
  },
  {
    name: 'Content-Language',
    type: 'Response',
    description: 'Describes the language(s) intended for the audience.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Language',
  },
  {
    name: 'Content-Location',
    type: 'Response',
    description: 'Indicates an alternate location for the returned data.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Location',
  },
  {
    name: 'Content-Range',
    type: 'Response',
    description:
      'Indicates where in a full body message a partial message belongs.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Range',
  },
  {
    name: 'ETag',
    type: 'Response',
    description: 'An identifier for a specific version of a resource.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag',
  },
  {
    name: 'Expires',
    type: 'Response',
    description: 'The date/time after which the response is considered stale.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Expires',
  },
  {
    name: 'Last-Modified',
    type: 'Response',
    description: 'The last modification date of the resource.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Last-Modified',
  },
  {
    name: 'Location',
    type: 'Response',
    description: 'Used in redirection or when a new resource has been created.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Location',
  },
  {
    name: 'Proxy-Authenticate',
    type: 'Response',
    description:
      'Defines the authentication method that should be used to gain access to a proxy.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Proxy-Authenticate',
  },
  {
    name: 'Retry-After',
    type: 'Response',
    description:
      'Indicates how long the user agent should wait before making a follow-up request.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After',
  },
  {
    name: 'Server',
    type: 'Response',
    description:
      'Contains information about the software used by the origin server to handle the request.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Server',
  },
  {
    name: 'Set-Cookie',
    type: 'Response',
    description: 'Sends cookies from the server to the user agent.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie',
  },
  {
    name: 'Strict-Transport-Security',
    type: 'Response',
    description: 'Force communication using HTTPS instead of HTTP.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security',
  },
  {
    name: 'Vary',
    type: 'Response',
    description:
      'Determines how to match future request headers to decide whether a cached response can be used.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Vary',
  },
  {
    name: 'WWW-Authenticate',
    type: 'Response',
    description:
      'Defines the authentication method that should be used to access a resource.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/WWW-Authenticate',
  },

  // Security Headers
  {
    name: 'Content-Security-Policy',
    type: 'Response',
    description:
      'Controls resources the user agent is allowed to load for a given page.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy',
  },
  {
    name: 'Feature-Policy',
    type: 'Response',
    description:
      'Allows a site to control which features and APIs can be used in the browser.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy',
  },
  {
    name: 'Permissions-Policy',
    type: 'Response',
    description:
      'Provides a mechanism to allow and deny the use of browser features in a document or within any iframe elements in the document.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy',
  },
  {
    name: 'Referrer-Policy',
    type: 'Response',
    description:
      'Controls how much referrer information should be included with requests.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy',
  },
  {
    name: 'X-Content-Type-Options',
    type: 'Response',
    description:
      'Prevents browsers from MIME-sniffing a response away from the declared content-type.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options',
  },
  {
    name: 'X-Frame-Options',
    type: 'Response',
    description:
      'Indicates whether a browser should be allowed to render a page in a <frame>, <iframe>, <embed> or <object>.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options',
  },
  {
    name: 'X-XSS-Protection',
    type: 'Response',
    description: 'Enables cross-site scripting filtering.',
    link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection',
  },
];
