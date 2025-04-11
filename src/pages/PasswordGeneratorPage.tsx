import React, { useCallback, useEffect, useState } from 'react';
import { FaCopy, FaEye, FaEyeSlash, FaRedo } from 'react-icons/fa';
import zxcvbn from 'zxcvbn';

interface StrengthResult {
  score: number;
  feedback: {
    warning: string;
    suggestions: string[];
  };
  crackTimesDisplay: {
    online_throttling_100_per_hour?: string | number;
    online_no_throttling_10_per_second?: string | number;
    offline_slow_hashing_1e4_per_second?: string | number;
    offline_fast_hashing_1e10_per_second?: string | number;
  };
}

const PasswordGeneratorPage: React.FC = () => {
  const [passwordLength, setPasswordLength] = useState<number>(16);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [generatedPassword, setGeneratedPassword] = useState<string>('');
  const [copyStatus, setCopyStatus] = useState<string>('Copy');

  // Password strength tester states
  const [testPassword, setTestPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [strengthResult, setStrengthResult] = useState<StrengthResult | null>(
    null
  );
  const [isTyping, setIsTyping] = useState<boolean>(false);

  // Character sets
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

  // Function to generate a cryptographically secure random password
  const generatePassword = () => {
    // Validate that at least one character set is selected
    if (
      !includeUppercase &&
      !includeLowercase &&
      !includeNumbers &&
      !includeSymbols
    ) {
      setGeneratedPassword('Please select at least one character type');
      return;
    }

    // Build the character pool based on selected options
    let charPool = '';
    if (includeUppercase) charPool += uppercaseChars;
    if (includeLowercase) charPool += lowercaseChars;
    if (includeNumbers) charPool += numberChars;
    if (includeSymbols) charPool += symbolChars;

    // Create an array to store required characters (at least one from each selected set)
    const requiredChars: string[] = [];

    if (includeUppercase) {
      requiredChars.push(getRandomChar(uppercaseChars));
    }
    if (includeLowercase) {
      requiredChars.push(getRandomChar(lowercaseChars));
    }
    if (includeNumbers) {
      requiredChars.push(getRandomChar(numberChars));
    }
    if (includeSymbols) {
      requiredChars.push(getRandomChar(symbolChars));
    }

    // Generate the remaining characters randomly from the pool
    const remainingLength = Math.max(0, passwordLength - requiredChars.length);
    const randomChars: string[] = [];

    for (let i = 0; i < remainingLength; i++) {
      randomChars.push(getRandomChar(charPool));
    }

    // Combine required and random characters
    const allChars = [...requiredChars, ...randomChars];

    // Shuffle the array using Fisher-Yates algorithm with crypto.getRandomValues
    for (let i = allChars.length - 1; i > 0; i--) {
      const j = getSecureRandomInt(0, i);
      [allChars[i], allChars[j]] = [allChars[j], allChars[i]];
    }

    // Set the generated password
    const newPassword = allChars.join('');
    setGeneratedPassword(newPassword);

    // Also set it as the test password and analyze its strength
    setTestPassword(newPassword);
    analyzePasswordStrength(newPassword);
  };

  // Helper function to get a random character from a string using crypto.getRandomValues
  const getRandomChar = (charSet: string): string => {
    const randomIndex = getSecureRandomInt(0, charSet.length - 1);
    return charSet.charAt(randomIndex);
  };

  // Helper function to get a cryptographically secure random integer between min and max (inclusive)
  const getSecureRandomInt = (min: number, max: number): number => {
    const range = max - min + 1;
    const byteArray = new Uint8Array(1);
    window.crypto.getRandomValues(byteArray);

    // Convert to a number between 0 and 1, then scale to our range
    const randomNum = byteArray[0] / 256;
    return Math.floor(randomNum * range) + min;
  };

  const copyToClipboard = async () => {
    if (
      !generatedPassword ||
      generatedPassword === 'Please select at least one character type'
    )
      return;

    try {
      await navigator.clipboard.writeText(generatedPassword);
      setCopyStatus('Copied!');

      // Reset copy button text after 2 seconds
      setTimeout(() => {
        setCopyStatus('Copy');
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setCopyStatus('Copy Failed!');

      // Reset copy button text after 2 seconds
      setTimeout(() => {
        setCopyStatus('Copy');
      }, 2000);
    }
  };

  // Function to analyze password strength using zxcvbn
  const analyzePasswordStrength = useCallback((password: string) => {
    if (!password) {
      setStrengthResult(null);
      return;
    }

    try {
      const result = zxcvbn(password);

      setStrengthResult({
        score: result.score,
        feedback: {
          warning: result.feedback.warning,
          suggestions: result.feedback.suggestions,
        },
        crackTimesDisplay: result.crack_times_display || {},
      });
    } catch (error) {
      console.error('Error analyzing password strength:', error);
      // Set a default result in case of error
      setStrengthResult({
        score: 0,
        feedback: {
          warning: 'Unable to analyze password strength',
          suggestions: ['Try a different password'],
        },
        crackTimesDisplay: {},
      });
    }
  }, []);

  // Debounced password strength analysis
  useEffect(() => {
    if (isTyping) {
      const timer = setTimeout(() => {
        analyzePasswordStrength(testPassword);
        setIsTyping(false);
      }, 300); // 300ms debounce

      return () => clearTimeout(timer);
    }
  }, [isTyping, testPassword, analyzePasswordStrength]);

  // Handle test password input change
  const handleTestPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTestPassword(e.target.value);
    setIsTyping(true);
  };

  // Get strength level text and color based on score
  const getStrengthInfo = (score: number) => {
    switch (score) {
      case 0:
        return { text: 'Very Weak', color: 'bg-red-500', width: '20%' };
      case 1:
        return { text: 'Weak', color: 'bg-orange-500', width: '40%' };
      case 2:
        return { text: 'Fair', color: 'bg-yellow-500', width: '60%' };
      case 3:
        return { text: 'Good', color: 'bg-blue-500', width: '80%' };
      case 4:
        return { text: 'Strong', color: 'bg-green-500', width: '100%' };
      default:
        return { text: 'Unknown', color: 'bg-gray-500', width: '0%' };
    }
  };

  // Get crack time estimate based on score
  const getCrackTimeEstimate = (score: number) => {
    switch (score) {
      case 0:
        return 'seconds';
      case 1:
        return 'hours';
      case 2:
        return 'months';
      case 3:
        return 'years';
      case 4:
        return 'centuries';
      default:
        return 'unknown';
    }
  };

  // Format crack time for display
  const formatCrackTime = (result: StrengthResult | null): string => {
    if (!result) return 'unknown';

    // Use a more realistic attack scenario by default
    // offline_slow_hashing_1e4_per_second represents a more common attacker capability
    const crackTime =
      result.crackTimesDisplay?.offline_slow_hashing_1e4_per_second;

    if (typeof crackTime === 'string' && crackTime.trim() !== '') {
      return crackTime;
    }

    return getCrackTimeEstimate(result.score);
  };

  // Generate a password on initial render
  useEffect(() => {
    generatePassword();
  }, []);

  return (
    <div className="p-4 space-y-8">
      <header>
        <h1 className="text-2xl font-bold border-b-2 border-border-color dark:border-dark-border-color pb-2 mb-4 dark:text-dark-primary-text">
          Password Generator & Strength Tester
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Generate strong, random passwords based on your criteria and test the
          strength of any password. Uses cryptographically secure methods for
          maximum security.
        </p>
      </header>

      <div className="space-y-6">
        <section className="space-y-3 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
          <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 dark:text-dark-primary-text">
            Generated Password
          </h3>

          <div className="flex items-center">
            <div className="flex-1 p-3 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 shadow-inner font-mono text-lg break-all text-primary-text dark:text-dark-primary-text">
              {generatedPassword}
            </div>
            <div className="flex ml-2 space-x-2">
              <button
                onClick={copyToClipboard}
                disabled={
                  !generatedPassword ||
                  generatedPassword ===
                    'Please select at least one character type'
                }
                className="p-3 border-2 border-border-color dark:border-dark-border-color bg-gray-200 dark:bg-gray-600 text-sm font-semibold shadow-solid dark:shadow-dark-solid hover:bg-gray-300 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Copy to clipboard"
              >
                <FaCopy className="text-primary-text dark:text-dark-primary-text" />
                <span className="sr-only">{copyStatus}</span>
              </button>
              <button
                onClick={generatePassword}
                className="p-3 border-2 border-border-color dark:border-dark-border-color bg-accent dark:bg-sky-900 text-sm font-semibold shadow-solid dark:shadow-dark-solid hover:bg-primary-bg dark:hover:bg-sky-700"
                title="Generate new password"
              >
                <FaRedo className="text-primary-text dark:text-dark-primary-text" />
                <span className="sr-only">Generate</span>
              </button>
            </div>
          </div>
        </section>

        <section className="space-y-3 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
          <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 dark:text-dark-primary-text">
            Password Options
          </h3>

          {/* Password Length Slider */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold dark:text-dark-primary-text">
              Password Length: {passwordLength} characters
            </label>
            <div className="flex items-center">
              <span className="mr-2 text-sm dark:text-dark-primary-text">
                8
              </span>
              <input
                type="range"
                min="8"
                max="64"
                value={passwordLength}
                onChange={(e) => setPasswordLength(parseInt(e.target.value))}
                className="flex-1 h-2 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
              />
              <span className="ml-2 text-sm dark:text-dark-primary-text">
                64
              </span>
            </div>
          </div>

          {/* Character Type Checkboxes */}
          <div className="p-3 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
            <h4 className="font-semibold mb-2 dark:text-dark-primary-text">
              Character Types:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center gap-2 dark:text-dark-primary-text cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeUppercase}
                  onChange={() => setIncludeUppercase(!includeUppercase)}
                  className="form-checkbox"
                />
                <span>Uppercase Letters (A-Z)</span>
              </label>

              <label className="flex items-center gap-2 dark:text-dark-primary-text cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeLowercase}
                  onChange={() => setIncludeLowercase(!includeLowercase)}
                  className="form-checkbox"
                />
                <span>Lowercase Letters (a-z)</span>
              </label>

              <label className="flex items-center gap-2 dark:text-dark-primary-text cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={() => setIncludeNumbers(!includeNumbers)}
                  className="form-checkbox"
                />
                <span>Numbers (0-9)</span>
              </label>

              <label className="flex items-center gap-2 dark:text-dark-primary-text cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeSymbols}
                  onChange={() => setIncludeSymbols(!includeSymbols)}
                  className="form-checkbox"
                />
                <span>Special Characters (!@#$%^&*...)</span>
              </label>
            </div>
          </div>
        </section>

        {/* Password Strength Tester Section */}
        <section className="space-y-3 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
          <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 dark:text-dark-primary-text">
            Password Strength Tester
          </h3>

          <div className="space-y-4">
            {/* Password Input Field */}
            <div className="relative">
              <label className="block mb-2 font-semibold dark:text-dark-primary-text">
                Enter a password to test:
              </label>
              <div className="flex">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={testPassword}
                  onChange={handleTestPasswordChange}
                  placeholder="Enter password to test..."
                  className="flex-1 p-3 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text font-mono shadow-inner"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-3 border-2 border-l-0 border-border-color dark:border-dark-border-color bg-gray-200 dark:bg-gray-600 text-primary-text dark:text-dark-primary-text"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Strength Meter */}
            {strengthResult && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold dark:text-dark-primary-text">
                    Strength:
                  </span>
                  <span
                    className={`font-semibold ${
                      strengthResult.score <= 1
                        ? 'text-red-500'
                        : strengthResult.score === 2
                          ? 'text-yellow-500'
                          : strengthResult.score === 3
                            ? 'text-blue-500'
                            : 'text-green-500'
                    }`}
                  >
                    {getStrengthInfo(strengthResult.score).text}
                  </span>
                </div>

                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getStrengthInfo(strengthResult.score).color}`}
                    style={{
                      width: getStrengthInfo(strengthResult.score).width,
                    }}
                  ></div>
                </div>

                {/* Crack Time Estimate */}
                <div className="mt-2 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <div>
                    <span className="font-semibold">
                      Estimated crack time:{' '}
                    </span>
                    {formatCrackTime(strengthResult)}
                    <span className="ml-1 text-xs text-gray-500">
                      (moderate attacker)
                    </span>
                  </div>

                  <details className="text-xs">
                    <summary className="cursor-pointer text-blue-600 dark:text-blue-400">
                      View all attack scenarios
                    </summary>
                    <div className="mt-2 pl-2 border-l-2 border-gray-300 dark:border-gray-600">
                      <div className="mb-1">
                        <span className="font-semibold">
                          Online (throttled):{' '}
                        </span>
                        {strengthResult.crackTimesDisplay
                          ?.online_throttling_100_per_hour || 'unknown'}
                        <span className="ml-1 text-gray-500">
                          (100 attempts/hour)
                        </span>
                      </div>
                      <div className="mb-1">
                        <span className="font-semibold">
                          Online (unthrottled):{' '}
                        </span>
                        {strengthResult.crackTimesDisplay
                          ?.online_no_throttling_10_per_second || 'unknown'}
                        <span className="ml-1 text-gray-500">
                          (10 attempts/second)
                        </span>
                      </div>
                      <div className="mb-1">
                        <span className="font-semibold">
                          Offline (slow hash):{' '}
                        </span>
                        {strengthResult.crackTimesDisplay
                          ?.offline_slow_hashing_1e4_per_second || 'unknown'}
                        <span className="ml-1 text-gray-500">
                          (10k attempts/second)
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold">
                          Offline (fast hash):{' '}
                        </span>
                        {strengthResult.crackTimesDisplay
                          ?.offline_fast_hashing_1e10_per_second || 'unknown'}
                        <span className="ml-1 text-gray-500">
                          (10B attempts/second)
                        </span>
                      </div>
                    </div>
                  </details>
                </div>
              </div>
            )}
          </div>

          {/* Feedback */}
          <div className="mt-2 space-y-2">
            {strengthResult?.feedback.warning && (
              <div className="p-2 bg-red-100 dark:bg-red-900 border border-red-200 dark:border-red-800 rounded text-red-800 dark:text-red-200">
                <span className="font-semibold">Warning: </span>
                {strengthResult.feedback.warning}
              </div>
            )}

            {strengthResult?.feedback.suggestions &&
              strengthResult.feedback.suggestions.length > 0 && (
                <div className="p-2 bg-blue-100 dark:bg-blue-900 border border-blue-200 dark:border-blue-800 rounded text-blue-800 dark:text-blue-200">
                  <span className="font-semibold">Suggestions:</span>
                  <ul className="list-disc list-inside mt-1">
                    {strengthResult?.feedback.suggestions.map(
                      (suggestion, index) => <li key={index}>{suggestion}</li>
                    )}
                  </ul>
                </div>
              )}
          </div>
        </section>

        <section className="space-y-3 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
          <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 dark:text-dark-primary-text">
            Password Strength Tips
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>Use a minimum of 12 characters for better security</li>
            <li>
              Include a mix of uppercase, lowercase, numbers, and special
              characters
            </li>
            <li>Avoid using personal information in your passwords</li>
            <li>Use different passwords for different accounts</li>
            <li>
              Consider using a password manager to store your complex passwords
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default PasswordGeneratorPage;
