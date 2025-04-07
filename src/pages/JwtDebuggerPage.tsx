import React, { useState } from 'react';

const JwtDebuggerPage: React.FC = () => {
  const [jwtToken, setJwtToken] = useState<string>('');
  const [decodedHeader, setDecodedHeader] = useState<Record<string, unknown> | null>(null);
  const [decodedPayload, setDecodedPayload] = useState<Record<string, unknown> | null>(null);
  const [signature, setSignature] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isExpired, setIsExpired] = useState<boolean | null>(null);

  // Base64 URL decode function
  const base64UrlDecode = (input: string): string => {
    // Replace non-url compatible chars with standard base64 chars
    let output = input
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    
    // Add padding if needed
    switch (output.length % 4) {
      case 0:
        break; // No padding needed
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        throw new Error('Invalid base64 string');
    }

    try {
      // Decode the base64 string
      return decodeURIComponent(
        Array.from(atob(output), (c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join('')
      );
    } catch (error) {
      throw new Error('Failed to decode base64 string: ' + error);
    }
  };

  const decodeJwt = () => {
    try {
      setError('');
      setDecodedHeader(null);
      setDecodedPayload(null);
      setSignature('');
      setIsExpired(null);

      // Split the JWT token into its three parts
      const parts = jwtToken.trim().split('.');
      
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format. Expected three parts separated by dots.');
      }

      // Decode the header (first part)
      const headerJson = base64UrlDecode(parts[0]);
      const header = JSON.parse(headerJson);
      setDecodedHeader(header);

      // Decode the payload (second part)
      const payloadJson = base64UrlDecode(parts[1]);
      const payload = JSON.parse(payloadJson);
      setDecodedPayload(payload);

      // Set the signature (third part) - we don't decode this, just display it
      setSignature(parts[2]);

      // Check if the token is expired
      if ('exp' in payload && typeof payload.exp === 'number') {
        const expirationTime = payload.exp * 1000; // Convert to milliseconds
        const currentTime = Date.now();
        setIsExpired(currentTime > expirationTime);
      }
    } catch (err) {
      setError(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const handleCopyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // Optional: Show a temporary success message
    } catch (err) {
      setError(`Copy Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  // Format JSON with indentation for display
  const formatJson = (json: Record<string, unknown>): string => {
    return JSON.stringify(json, null, 2);
  };

  return (
    <div className="p-4 space-y-8">
      <header>
        <h1 className="text-2xl font-bold border-b-2 border-border-color dark:border-dark-border-color pb-2 mb-4 dark:text-dark-primary-text">
          JWT Debugger
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Decode and inspect JSON Web Tokens. This tool decodes the header, payload, and signature parts of a JWT 
          for inspection purposes. <span className="font-semibold text-red-600 dark:text-red-400">Note: This tool does not verify the signature.</span>
        </p>
      </header>

      {error && (
        <div className="p-3 border-2 border-red-500 bg-red-100 dark:bg-red-900 dark:border-red-700 text-red-700 dark:text-red-100">
          {error}
        </div>
      )}

      <div className="space-y-6">
        <section className="space-y-3 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
          <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 dark:text-dark-primary-text">
            JWT Input
          </h3>
          <div>
            <label
              htmlFor="jwt-input"
              className="block mb-1 font-semibold dark:text-dark-primary-text"
            >
              Enter JWT Token:
            </label>
            <textarea
              id="jwt-input"
              value={jwtToken}
              onChange={(e) => setJwtToken(e.target.value)}
              placeholder="Paste your JWT token here (e.g., eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)"
              className="w-full h-32 p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text font-mono text-sm shadow-inner mb-2"
            />
            <div className="flex space-x-2">
              <button
                onClick={decodeJwt}
                className="px-3 py-1 border-2 border-border-color dark:border-dark-border-color bg-accent dark:bg-dark-accent text-primary-text dark:text-dark-primary-bg font-semibold shadow-solid dark:shadow-dark-solid hover:bg-primary-bg dark:hover:bg-dark-primary-bg"
              >
                Decode
              </button>
            </div>
          </div>
        </section>

        {decodedHeader && (
          <section className="space-y-3 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 dark:text-dark-primary-text">
                Header
              </h3>
              <button
                onClick={() => handleCopyToClipboard(formatJson(decodedHeader))}
                className="px-2 py-0.5 text-xs border-2 border-border-color dark:border-dark-border-color bg-gray-200 dark:bg-gray-600 font-semibold shadow-solid dark:shadow-dark-solid hover:bg-gray-300 dark:hover:bg-gray-500"
              >
                Copy
              </button>
            </div>
            <pre className="w-full p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text font-mono text-sm shadow-inner overflow-x-auto">
              {decodedHeader ? formatJson(decodedHeader) : ''}
            </pre>
          </section>
        )}

        {decodedPayload && (
          <section className="space-y-3 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 dark:text-dark-primary-text">
                Payload
              </h3>
              <button
                onClick={() => handleCopyToClipboard(formatJson(decodedPayload))}
                className="px-2 py-0.5 text-xs border-2 border-border-color dark:border-dark-border-color bg-gray-200 dark:bg-gray-600 font-semibold shadow-solid dark:shadow-dark-solid hover:bg-gray-300 dark:hover:bg-gray-500"
              >
                Copy
              </button>
            </div>
            {isExpired !== null && (
              <div className={`p-2 border-2 ${isExpired ? 'border-red-500 bg-red-100 dark:bg-red-900 dark:border-red-700 text-red-700 dark:text-red-100' : 'border-green-500 bg-green-100 dark:bg-green-900 dark:border-green-700 text-green-700 dark:text-green-100'}`}>
                <span className="font-semibold">
                  {isExpired ? 'Token is expired!' : 'Token is not expired'}
                </span>
                {decodedPayload && 'exp' in decodedPayload && (
                  <span className="ml-2">
                    (Expires: {new Date(Number(decodedPayload.exp) * 1000).toLocaleString()})
                  </span>
                )}
              </div>
            )}
            <pre className="w-full p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text font-mono text-sm shadow-inner overflow-x-auto">
              {decodedPayload ? formatJson(decodedPayload) : ''}
            </pre>
          </section>
        )}

        {signature && (
          <section className="space-y-3 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 dark:text-dark-primary-text">
                Signature
              </h3>
              <button
                onClick={() => handleCopyToClipboard(signature)}
                className="px-2 py-0.5 text-xs border-2 border-border-color dark:border-dark-border-color bg-gray-200 dark:bg-gray-600 font-semibold shadow-solid dark:shadow-dark-solid hover:bg-gray-300 dark:hover:bg-gray-500"
              >
                Copy
              </button>
            </div>
            <div className="p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text font-mono text-sm shadow-inner overflow-x-auto">
              {signature}
            </div>
          </section>
        )}
      </div>

      <section className="mt-8 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
        <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 mb-3 dark:text-dark-primary-text">
          About JWT
        </h3>
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p>
            <strong>JSON Web Token (JWT)</strong> is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.
          </p>
          <p>
            <strong>JWT Structure:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li><strong>Header</strong> - Contains metadata about the token (type and signing algorithm)</li>
            <li><strong>Payload</strong> - Contains claims (statements about an entity) and data</li>
            <li><strong>Signature</strong> - Verifies the sender and ensures the message wasn't changed</li>
          </ul>
          <p className="mt-2">
            <strong>Common JWT Claims:</strong>
          </p>
          <ul className="list-none space-y-1 font-mono text-xs">
            <li><span className="inline-block w-12">iss</span> <span className="text-gray-500">→</span> Issuer of the token</li>
            <li><span className="inline-block w-12">sub</span> <span className="text-gray-500">→</span> Subject (typically the user ID)</li>
            <li><span className="inline-block w-12">exp</span> <span className="text-gray-500">→</span> Expiration time</li>
            <li><span className="inline-block w-12">iat</span> <span className="text-gray-500">→</span> Issued at time</li>
            <li><span className="inline-block w-12">aud</span> <span className="text-gray-500">→</span> Audience (recipient)</li>
          </ul>
          <p className="mt-2 text-red-600 dark:text-red-400 font-semibold">
            Security Note: This tool only decodes JWTs for inspection and does not verify signatures. 
            Never trust a JWT without proper signature verification in production environments.
          </p>
        </div>
      </section>
    </div>
  );
};

export default JwtDebuggerPage;
