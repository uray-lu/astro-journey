import { parseDate, validateDateOrder } from './dateParser';

export interface GapResult {
  gaps: number[];
  error?: string;
}

// Scale: 1 month = 1rem of padding
const DAYS_PER_MONTH = 30;
const BASE_HEIGHT_PER_MONTH = 1;
const MIN_LINE_HEIGHT = 0.5;  // ~1 day minimum
const MAX_LINE_HEIGHT = 8;    // ~8 months maximum
const ROUND_TO = 0.25;        // Round to 0.25rem increments

function roundTo(value: number, increment: number): number {
  return Math.round(value / increment) * increment;
}

/**
 * Calculate proportional gap heights based on date differences.
 * Returns padding values (in rem) for spacing between timeline items.
 * Returns error if dates are invalid or out of order.
 */
export function calculateGaps(dates: string[]): GapResult {
  if (dates.length < 2) {
    return { gaps: [] };
  }

  // Validate dates (single responsibility: dateParser handles validation)
  const validation = validateDateOrder(dates);
  if (!validation.valid) {
    return { gaps: [], error: validation.message };
  }

  // Calculate gaps based on day differences
  const parsed = dates.map(parseDate);
  const gaps: number[] = [];

  for (let i = 0; i < parsed.length - 1; i++) {
    const diffDays = Math.max(parsed[i].date.diff(parsed[i + 1].date, 'day'), 1);
    const rawHeight = (diffDays / DAYS_PER_MONTH) * BASE_HEIGHT_PER_MONTH;
    const clampedHeight = Math.min(Math.max(rawHeight, MIN_LINE_HEIGHT), MAX_LINE_HEIGHT);
    gaps.push(roundTo(clampedHeight, ROUND_TO));
  }

  return { gaps };
}
