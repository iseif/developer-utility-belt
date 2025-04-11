// HTTP Status Codes data structure
export interface HttpStatusCode {
  code: number;
  name: string;
  description: string;
  category: string;
}

export const httpStatusCodes: HttpStatusCode[] = [
  // 1xx - Informational responses
  {
    code: 100,
    name: 'Continue',
    description:
      'The server has received the request headers and the client should proceed to send the request body.',
    category: '1xx Informational',
  },
  {
    code: 101,
    name: 'Switching Protocols',
    description:
      'The requester has asked the server to switch protocols and the server has agreed to do so.',
    category: '1xx Informational',
  },
  {
    code: 102,
    name: 'Processing',
    description:
      'The server has received and is processing the request, but no response is available yet.',
    category: '1xx Informational',
  },
  {
    code: 103,
    name: 'Early Hints',
    description:
      'Used to return some response headers before final HTTP message.',
    category: '1xx Informational',
  },

  // 2xx - Success responses
  {
    code: 200,
    name: 'OK',
    description:
      'The request has succeeded. The meaning of the success depends on the HTTP method.',
    category: '2xx Success',
  },
  {
    code: 201,
    name: 'Created',
    description:
      'The request has succeeded and a new resource has been created as a result.',
    category: '2xx Success',
  },
  {
    code: 202,
    name: 'Accepted',
    description: 'The request has been received but not yet acted upon.',
    category: '2xx Success',
  },
  {
    code: 203,
    name: 'Non-Authoritative Information',
    description:
      'The returned metadata is not exactly the same as is available from the origin server.',
    category: '2xx Success',
  },
  {
    code: 204,
    name: 'No Content',
    description: 'The request has succeeded, but returns no message body.',
    category: '2xx Success',
  },
  {
    code: 205,
    name: 'Reset Content',
    description:
      'The request has succeeded, and the user agent should reset the document view.',
    category: '2xx Success',
  },
  {
    code: 206,
    name: 'Partial Content',
    description:
      'The server is delivering only part of the resource due to a range header sent by the client.',
    category: '2xx Success',
  },
  {
    code: 207,
    name: 'Multi-Status',
    description:
      'A Multi-Status response conveys information about multiple resources in situations where multiple status codes might be appropriate.',
    category: '2xx Success',
  },
  {
    code: 208,
    name: 'Already Reported',
    description:
      'Used inside a DAV: propstat response element to avoid enumerating the internal members of multiple bindings to the same collection repeatedly.',
    category: '2xx Success',
  },
  {
    code: 226,
    name: 'IM Used',
    description:
      'The server has fulfilled a GET request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance.',
    category: '2xx Success',
  },

  // 3xx - Redirection messages
  {
    code: 300,
    name: 'Multiple Choices',
    description:
      'The request has more than one possible response. The user agent or user should choose one of them.',
    category: '3xx Redirection',
  },
  {
    code: 301,
    name: 'Moved Permanently',
    description:
      'The URL of the requested resource has been changed permanently. The new URL is given in the response.',
    category: '3xx Redirection',
  },
  {
    code: 302,
    name: 'Found',
    description:
      'The URI of requested resource has been changed temporarily. New changes in the URI might be made in the future.',
    category: '3xx Redirection',
  },
  {
    code: 303,
    name: 'See Other',
    description:
      'The server sent this response to direct the client to get the requested resource at another URI with a GET request.',
    category: '3xx Redirection',
  },
  {
    code: 304,
    name: 'Not Modified',
    description:
      'This is used for caching purposes. It tells the client that the response has not been modified, so the client can continue to use the same cached version of the response.',
    category: '3xx Redirection',
  },
  {
    code: 307,
    name: 'Temporary Redirect',
    description:
      'The server sends this response to direct the client to get the requested resource at another URI with the same method that was used in the prior request.',
    category: '3xx Redirection',
  },
  {
    code: 308,
    name: 'Permanent Redirect',
    description:
      'This means that the resource is now permanently located at another URI, specified by the Location: HTTP Response header.',
    category: '3xx Redirection',
  },

  // 4xx - Client error responses
  {
    code: 400,
    name: 'Bad Request',
    description:
      'The server cannot or will not process the request due to something that is perceived to be a client error.',
    category: '4xx Client Error',
  },
  {
    code: 401,
    name: 'Unauthorized',
    description:
      'Authentication is required and has failed or has not yet been provided.',
    category: '4xx Client Error',
  },
  {
    code: 402,
    name: 'Payment Required',
    description:
      'Reserved for future use. The original intention was that this code might be used as part of some form of digital cash or micropayment scheme.',
    category: '4xx Client Error',
  },
  {
    code: 403,
    name: 'Forbidden',
    description:
      'The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource.',
    category: '4xx Client Error',
  },
  {
    code: 404,
    name: 'Not Found',
    description: 'The server can not find the requested resource.',
    category: '4xx Client Error',
  },
  {
    code: 405,
    name: 'Method Not Allowed',
    description:
      'The request method is known by the server but is not supported by the target resource.',
    category: '4xx Client Error',
  },
  {
    code: 406,
    name: 'Not Acceptable',
    description:
      "The server cannot produce a response matching the list of acceptable values defined in the request's proactive content negotiation headers.",
    category: '4xx Client Error',
  },
  {
    code: 407,
    name: 'Proxy Authentication Required',
    description:
      'Similar to 401 but authentication is needed to be done by a proxy.',
    category: '4xx Client Error',
  },
  {
    code: 408,
    name: 'Request Timeout',
    description: 'The server timed out waiting for the request.',
    category: '4xx Client Error',
  },
  {
    code: 409,
    name: 'Conflict',
    description:
      'This response is sent when a request conflicts with the current state of the server.',
    category: '4xx Client Error',
  },
  {
    code: 410,
    name: 'Gone',
    description:
      'This response is sent when the requested content has been permanently deleted from server, with no forwarding address.',
    category: '4xx Client Error',
  },
  {
    code: 411,
    name: 'Length Required',
    description:
      'Server rejected the request because the Content-Length header field is not defined and the server requires it.',
    category: '4xx Client Error',
  },
  {
    code: 412,
    name: 'Precondition Failed',
    description:
      'The client has indicated preconditions in its headers which the server does not meet.',
    category: '4xx Client Error',
  },
  {
    code: 413,
    name: 'Payload Too Large',
    description: 'Request entity is larger than limits defined by server.',
    category: '4xx Client Error',
  },
  {
    code: 414,
    name: 'URI Too Long',
    description:
      'The URI requested by the client is longer than the server is willing to interpret.',
    category: '4xx Client Error',
  },
  {
    code: 415,
    name: 'Unsupported Media Type',
    description:
      'The media format of the requested data is not supported by the server.',
    category: '4xx Client Error',
  },
  {
    code: 416,
    name: 'Range Not Satisfiable',
    description:
      'The range specified by the Range header field in the request cannot be fulfilled.',
    category: '4xx Client Error',
  },
  {
    code: 417,
    name: 'Expectation Failed',
    description:
      'This response code means the expectation indicated by the Expect request header field cannot be met by the server.',
    category: '4xx Client Error',
  },
  {
    code: 418,
    name: "I'm a teapot",
    description: 'The server refuses the attempt to brew coffee with a teapot.',
    category: '4xx Client Error',
  },
  {
    code: 421,
    name: 'Misdirected Request',
    description:
      'The request was directed at a server that is not able to produce a response.',
    category: '4xx Client Error',
  },
  {
    code: 422,
    name: 'Unprocessable Entity',
    description:
      'The request was well-formed but was unable to be followed due to semantic errors.',
    category: '4xx Client Error',
  },
  {
    code: 423,
    name: 'Locked',
    description: 'The resource that is being accessed is locked.',
    category: '4xx Client Error',
  },
  {
    code: 424,
    name: 'Failed Dependency',
    description: 'The request failed due to failure of a previous request.',
    category: '4xx Client Error',
  },
  {
    code: 425,
    name: 'Too Early',
    description:
      'Indicates that the server is unwilling to risk processing a request that might be replayed.',
    category: '4xx Client Error',
  },
  {
    code: 426,
    name: 'Upgrade Required',
    description:
      'The server refuses to perform the request using the current protocol but might be willing to do so after the client upgrades to a different protocol.',
    category: '4xx Client Error',
  },
  {
    code: 428,
    name: 'Precondition Required',
    description: 'The origin server requires the request to be conditional.',
    category: '4xx Client Error',
  },
  {
    code: 429,
    name: 'Too Many Requests',
    description:
      'The user has sent too many requests in a given amount of time ("rate limiting").',
    category: '4xx Client Error',
  },
  {
    code: 431,
    name: 'Request Header Fields Too Large',
    description:
      'The server is unwilling to process the request because its header fields are too large.',
    category: '4xx Client Error',
  },
  {
    code: 451,
    name: 'Unavailable For Legal Reasons',
    description:
      'The user agent requested a resource that cannot legally be provided, such as a web page censored by a government.',
    category: '4xx Client Error',
  },

  // 5xx - Server error responses
  {
    code: 500,
    name: 'Internal Server Error',
    description:
      'The server has encountered a situation it does not know how to handle.',
    category: '5xx Server Error',
  },
  {
    code: 501,
    name: 'Not Implemented',
    description:
      'The request method is not supported by the server and cannot be handled.',
    category: '5xx Server Error',
  },
  {
    code: 502,
    name: 'Bad Gateway',
    description:
      'This error response means that the server, while working as a gateway to get a response needed to handle the request, got an invalid response.',
    category: '5xx Server Error',
  },
  {
    code: 503,
    name: 'Service Unavailable',
    description:
      'The server is not ready to handle the request. Common causes are a server that is down for maintenance or that is overloaded.',
    category: '5xx Server Error',
  },
  {
    code: 504,
    name: 'Gateway Timeout',
    description:
      'This error response is given when the server is acting as a gateway and cannot get a response in time.',
    category: '5xx Server Error',
  },
  {
    code: 505,
    name: 'HTTP Version Not Supported',
    description:
      'The HTTP version used in the request is not supported by the server.',
    category: '5xx Server Error',
  },
  {
    code: 506,
    name: 'Variant Also Negotiates',
    description:
      'The server has an internal configuration error: the chosen variant resource is configured to engage in transparent content negotiation itself, and is therefore not a proper end point in the negotiation process.',
    category: '5xx Server Error',
  },
  {
    code: 507,
    name: 'Insufficient Storage',
    description:
      'The method could not be performed on the resource because the server is unable to store the representation needed to successfully complete the request.',
    category: '5xx Server Error',
  },
  {
    code: 508,
    name: 'Loop Detected',
    description:
      'The server detected an infinite loop while processing the request.',
    category: '5xx Server Error',
  },
  {
    code: 510,
    name: 'Not Extended',
    description:
      'Further extensions to the request are required for the server to fulfill it.',
    category: '5xx Server Error',
  },
  {
    code: 511,
    name: 'Network Authentication Required',
    description:
      'Indicates that the client needs to authenticate to gain network access.',
    category: '5xx Server Error',
  },
];
