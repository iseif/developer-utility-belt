import React, { useEffect, useState } from 'react';
import cronstrue from 'cronstrue';
import { CronExpressionParser } from 'cron-parser';
import { FaCalendarAlt, FaCopy } from 'react-icons/fa';

const CronHelperPage: React.FC = () => {
  const [minute, setMinute] = useState<string>('*');
  const [hour, setHour] = useState<string>('*');
  const [dayOfMonth, setDayOfMonth] = useState<string>('*');
  const [month, setMonth] = useState<string>('*');
  const [dayOfWeek, setDayOfWeek] = useState<string>('*');
  const [generatedCron, setGeneratedCron] = useState<string>('* * * * *');
  const [generatedExplanation, setGeneratedExplanation] = useState<string>('');
  const [generatedNextRuns, setGeneratedNextRuns] = useState<string[]>([]);

  const [inputCron, setInputCron] = useState<string>('');
  const [explanation, setExplanation] = useState<string>('');
  const [nextRuns, setNextRuns] = useState<string[]>([]);
  const [error, setError] = useState<string>('');
  const [copyButtonText, setCopyButtonText] = useState<string>('Copy');

  // Get the browser's timezone
  const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Update generated cron expression when any field changes
  useEffect(() => {
    const cronExpression = `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;
    setGeneratedCron(cronExpression);
    try {
      const explained = cronstrue.toString(cronExpression);
      setGeneratedExplanation(explained);

      // Calculate next run times with browser timezone
      console.log(browserTimezone);
      try {
        const options = {
          tz: browserTimezone,
        };

        const interval = CronExpressionParser.parse(cronExpression, options);
        const nextDates: string[] = [];
        for (let i = 0; i < 5; i++) {
          nextDates.push(interval.next().toDate().toLocaleString());
        }
        setGeneratedNextRuns(nextDates);
      } catch (err) {
        console.log(err);

        // If strict mode fails, try with 6 fields format (adding seconds field)
        try {
          const sixFieldCron = `0 ${cronExpression}`;
          const options = {
            strict: false,
            tz: browserTimezone,
          };

          const interval = CronExpressionParser.parse(sixFieldCron, options);
          const nextDates: string[] = [];
          for (let i = 0; i < 5; i++) {
            nextDates.push(interval.next().toDate().toLocaleString());
          }
          setGeneratedNextRuns(nextDates);
        } catch (innerErr) {
          console.error('Error parsing cron expression:', innerErr);
          setGeneratedNextRuns([]);
        }
      }
    } catch (err) {
      console.log(err);

      setGeneratedExplanation('Invalid cron expression');
      setGeneratedNextRuns([]);
    }
  }, [minute, hour, dayOfMonth, month, dayOfWeek, browserTimezone]);

  // Handle explanation of input cron expression
  const handleExplain = () => {
    setError('');
    setExplanation('');
    setNextRuns([]);

    if (!inputCron.trim()) {
      setError('Please enter a cron expression');
      return;
    }

    try {
      const explained = cronstrue.toString(inputCron);
      setExplanation(explained);

      // Calculate next run times with browser timezone
      try {
        const options = {
          tz: browserTimezone,
        };

        const interval = CronExpressionParser.parse(inputCron, options);
        const nextDates: string[] = [];
        for (let i = 0; i < 5; i++) {
          nextDates.push(interval.next().toDate().toLocaleString());
        }
        setNextRuns(nextDates);
      } catch (err) {
        console.log(err);

        // If strict mode fails, try with 6 fields format (adding seconds field)
        try {
          const sixFieldCron = `0 ${inputCron}`;
          const options = {
            strict: false,
            tz: browserTimezone,
          };

          const interval = CronExpressionParser.parse(sixFieldCron, options);
          const nextDates: string[] = [];
          for (let i = 0; i < 5; i++) {
            nextDates.push(interval.next().toDate().toLocaleString());
          }
          setNextRuns(nextDates);
        } catch (innerErr) {
          console.error('Error parsing cron expression:', innerErr);
          setNextRuns([]);
          setError(
            `Could not parse cron expression for next run times: ${innerErr instanceof Error ? innerErr.message : 'Unknown error'}`
          );
        }
      }
    } catch (err) {
      console.error('Explanation error:', err);
      setError(err instanceof Error ? err.message : 'Invalid cron expression');
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedCron);
      setCopyButtonText('Copied!');
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setCopyButtonText('Copy Failed!');
    } finally {
      setTimeout(() => setCopyButtonText('Copy'), 2000);
    }
  };

  return (
    <div className="p-4 space-y-8">
      <header>
        <h1 className="text-2xl font-bold border-b-2 border-border-color dark:border-dark-border-color pb-2 mb-4 dark:text-dark-primary-text">
          Cron Job Helper
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Build, test, and understand cron expressions for scheduling jobs.
          Generate cron expressions visually or explain existing ones in
          human-readable language.
        </p>
      </header>

      <div className="space-y-6">
        {/* Generator Section */}
        <section className="space-y-3 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
          <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 dark:text-dark-primary-text">
            Cron Expression Generator
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
            {/* Minute */}
            <div>
              <label
                htmlFor="minute-select"
                className="block font-semibold mb-1 dark:text-dark-primary-text"
              >
                Minute (0-59)
              </label>
              <input
                id="minute-select"
                type="text"
                value={minute}
                onChange={(e) => setMinute(e.target.value)}
                className="w-full p-2 border-2 border-border-color dark:border-dark-border-color bg-primary-bg dark:bg-dark-primary-bg text-primary-text dark:text-dark-primary-text shadow-solid dark:shadow-dark-solid"
                placeholder="*"
              />
            </div>

            {/* Hour */}
            <div>
              <label
                htmlFor="hour-select"
                className="block font-semibold mb-1 dark:text-dark-primary-text"
              >
                Hour (0-23)
              </label>
              <input
                id="hour-select"
                type="text"
                value={hour}
                onChange={(e) => setHour(e.target.value)}
                className="w-full p-2 border-2 border-border-color dark:border-dark-border-color bg-primary-bg dark:bg-dark-primary-bg text-primary-text dark:text-dark-primary-text shadow-solid dark:shadow-dark-solid"
                placeholder="*"
              />
            </div>

            {/* Day of Month */}
            <div>
              <label
                htmlFor="day-of-month-select"
                className="block font-semibold mb-1 dark:text-dark-primary-text"
              >
                Day of Month (1-31)
              </label>
              <input
                id="day-of-month-select"
                type="text"
                value={dayOfMonth}
                onChange={(e) => setDayOfMonth(e.target.value)}
                className="w-full p-2 border-2 border-border-color dark:border-dark-border-color bg-primary-bg dark:bg-dark-primary-bg text-primary-text dark:text-dark-primary-text shadow-solid dark:shadow-dark-solid"
                placeholder="*"
              />
            </div>

            {/* Month */}
            <div>
              <label
                htmlFor="month-select"
                className="block font-semibold mb-1 dark:text-dark-primary-text"
              >
                Month (1-12)
              </label>
              <input
                id="month-select"
                type="text"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full p-2 border-2 border-border-color dark:border-dark-border-color bg-primary-bg dark:bg-dark-primary-bg text-primary-text dark:text-dark-primary-text shadow-solid dark:shadow-dark-solid"
                placeholder="*"
              />
            </div>

            {/* Day of Week */}
            <div>
              <label
                htmlFor="day-of-week-select"
                className="block font-semibold mb-1 dark:text-dark-primary-text"
              >
                Day of Week (0-6)
              </label>
              <input
                id="day-of-week-select"
                type="text"
                value={dayOfWeek}
                onChange={(e) => setDayOfWeek(e.target.value)}
                className="w-full p-2 border-2 border-border-color dark:border-dark-border-color bg-primary-bg dark:bg-dark-primary-bg text-primary-text dark:text-dark-primary-text shadow-solid dark:shadow-dark-solid"
                placeholder="*"
              />
            </div>
          </div>

          {/* Generated Cron Expression */}
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <label
                htmlFor="generated-cron"
                className="font-semibold dark:text-dark-primary-text"
              >
                Generated Cron Expression:
              </label>
              <button
                onClick={handleCopy}
                className="px-3 py-1 border-2 border-border-color dark:border-dark-border-color bg-gray-200 dark:bg-gray-600 text-sm font-semibold shadow-solid dark:shadow-dark-solid hover:bg-gray-300 dark:hover:bg-gray-500 flex items-center gap-1"
              >
                <FaCopy className="text-xs" /> {copyButtonText}
              </button>
            </div>
            <input
              id="generated-cron"
              type="text"
              value={generatedCron}
              readOnly
              className="w-full p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text font-mono shadow-inner"
            />
          </div>

          {/* Generated Explanation */}
          <div className="mt-4">
            <label
              htmlFor="generated-explanation"
              className="block font-semibold mb-1 dark:text-dark-primary-text"
            >
              Human-Readable Explanation:
            </label>
            <div
              id="generated-explanation"
              className="w-full p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text shadow-inner min-h-[40px]"
            >
              {generatedExplanation}
            </div>
          </div>

          {/* Next Run Times */}
          {generatedNextRuns.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold mb-1 dark:text-dark-primary-text">
                Next 5 Run Times:
              </h4>
              <ul className="list-disc list-inside ml-4 space-y-1 text-gray-700 dark:text-gray-300">
                {generatedNextRuns.map((date, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <FaCalendarAlt className="text-xs" /> {date}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* Explainer Section */}
        <section className="space-y-3 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
          <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 dark:text-dark-primary-text">
            Cron Expression Explainer
          </h3>

          <div className="mb-4">
            <label
              htmlFor="input-cron"
              className="block font-semibold mb-1 dark:text-dark-primary-text"
            >
              Enter Cron Expression:
            </label>
            <div className="flex gap-2">
              <input
                id="input-cron"
                type="text"
                value={inputCron}
                onChange={(e) => setInputCron(e.target.value)}
                placeholder="e.g. 0 12 * * 1-5"
                className="flex-1 p-2 border-2 border-border-color dark:border-dark-border-color bg-primary-bg dark:bg-dark-primary-bg text-primary-text dark:text-dark-primary-text shadow-solid dark:shadow-dark-solid"
              />
              <button
                onClick={handleExplain}
                className="p-2 border-2 border-border-color dark:border-dark-border-color bg-accent dark:bg-sky-900 text-primary-text dark:text-dark-primary-text font-semibold shadow-solid dark:shadow-dark-solid hover:bg-primary-bg dark:hover:bg-sky-700"
              >
                Explain
              </button>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border-2 border-red-600 text-red-800 dark:bg-red-900 dark:text-red-100 dark:border-red-400">
              <span className="font-bold">Error:</span> {error}
            </div>
          )}

          {/* Explanation */}
          {explanation && (
            <div className="mt-4">
              <label
                htmlFor="explanation"
                className="block font-semibold mb-1 dark:text-dark-primary-text"
              >
                Human-Readable Explanation:
              </label>
              <div
                id="explanation"
                className="w-full p-2 border-2 border-border-color dark:border-dark-border-color bg-gray-100 dark:bg-gray-700 text-primary-text dark:text-dark-primary-text shadow-inner min-h-[40px]"
              >
                {explanation}
              </div>
            </div>
          )}

          {/* Next Run Times */}
          {nextRuns.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold mb-1 dark:text-dark-primary-text">
                Next 5 Run Times:
              </h4>
              <ul className="list-disc list-inside ml-4 space-y-1 text-gray-700 dark:text-gray-300">
                {nextRuns.map((date, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <FaCalendarAlt className="text-xs" /> {date}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </div>

      {/* About Cron Expressions Section */}
      <section className="mt-8 p-4 border-2 border-border-color dark:border-dark-border-color shadow-solid dark:shadow-dark-solid">
        <h3 className="text-lg font-semibold border-b-2 border-border-color dark:border-dark-border-color pb-1 mb-3 dark:text-dark-primary-text">
          About Cron Expressions
        </h3>
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p>
            <strong>Cron expressions</strong> are used to define recurring
            schedules for jobs, tasks, or other operations in Unix-like
            operating systems and software applications.
          </p>
          <p>
            <strong>Standard cron expression format:</strong>{' '}
            <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
              * * * * *
            </code>
          </p>
          <p>The five fields from left to right represent:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>
              <strong>Minute</strong> (0-59)
            </li>
            <li>
              <strong>Hour</strong> (0-23)
            </li>
            <li>
              <strong>Day of Month</strong> (1-31)
            </li>
            <li>
              <strong>Month</strong> (1-12 or JAN-DEC)
            </li>
            <li>
              <strong>Day of Week</strong> (0-6 or SUN-SAT, where 0=Sunday)
            </li>
          </ul>
          <p className="mt-2">
            <strong>Special characters:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>
              <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                *
              </code>{' '}
              - any value (wildcard)
            </li>
            <li>
              <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                ,
              </code>{' '}
              - value list separator (e.g., <code>1,3,5</code>)
            </li>
            <li>
              <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                -
              </code>{' '}
              - range of values (e.g., <code>1-5</code>)
            </li>
            <li>
              <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                /
              </code>{' '}
              - step values (e.g., <code>*/2</code> means every 2 units)
            </li>
          </ul>
          <p className="mt-2">
            <strong>Common examples:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>
              <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                0 * * * *
              </code>{' '}
              - Every hour at minute 0
            </li>
            <li>
              <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                0 0 * * *
              </code>{' '}
              - Every day at midnight
            </li>
            <li>
              <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                0 12 * * 1-5
              </code>{' '}
              - Every weekday at noon
            </li>
            <li>
              <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                */15 * * * *
              </code>{' '}
              - Every 15 minutes
            </li>
            <li>
              <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">
                0 0 1 * *
              </code>{' '}
              - At midnight on the first day of every month
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default CronHelperPage;
