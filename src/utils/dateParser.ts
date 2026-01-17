import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';

dayjs.extend(customParseFormat);

/**
 * Supported date formats (order matters - most specific first):
 * - "2024-06-15"     → Jun 15, 2024
 * - "2024-06"        → Jun 1, 2024
 * - "2024"           → Jan 1, 2024
 * - "Jun 2024"       → Jun 1, 2024
 * - "June 2024"      → Jun 1, 2024
 * - "June 23, 2024"  → Jun 23, 2024
 * - "Jun 23, 2024"   → Jun 23, 2024
 */
const DATE_FORMATS = [
  'YYYY-MM-DD',
  'YYYY-MM',
  'YYYY',
  'MMM YYYY',
  'MMMM YYYY',
  'MMMM D, YYYY',
  'MMM D, YYYY',
];

export interface ParsedDate {
  date: dayjs.Dayjs;
  isValid: boolean;
  original: string;
}

/**
 * Parse a date string into a dayjs object.
 * Tries each format until one succeeds (strict mode).
 */
export function parseDate(dateStr: string): ParsedDate {
  const trimmed = dateStr.trim();

  for (const format of DATE_FORMATS) {
    const parsed = dayjs(trimmed, format, true); // true = strict parsing
    if (parsed.isValid()) {
      return { date: parsed, isValid: true, original: dateStr };
    }
  }

  return { date: dayjs(), isValid: false, original: dateStr };
}

/**
 * Validate dates for timeline usage:
 * 1. Format - all dates must match a supported format
 * 2. Order - dates must be in descending order (newest first)
 * Returns error message for developer feedback.
 */
export function validateDateOrder(dates: string[]): { valid: boolean; message?: string } {
  const parsed = dates.map(parseDate);

  const invalidDates = parsed.filter(p => !p.isValid);
  if (invalidDates.length > 0) {
    return {
      valid: false,
      message: `Invalid date format: "${invalidDates[0].original}". Supported formats: YYYY, YYYY-MM, YYYY-MM-DD, "Month YYYY", "Month Day, YYYY"`,
    };
  }

  for (let i = 0; i < parsed.length - 1; i++) {
    if (parsed[i].date.isBefore(parsed[i + 1].date)) {
      return {
        valid: false,
        message: `Dates must be in descending order (newest first). "${parsed[i].original}" should come after "${parsed[i + 1].original}"`,
      };
    }
  }

  return { valid: true };
}
