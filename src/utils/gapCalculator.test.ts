import { describe, it, expect } from 'vitest';
import { calculateGaps } from './gapCalculator';

describe('calculateGaps', () => {
  it('returns empty gaps for single item', () => {
    const result = calculateGaps(['2024-06']);
    expect(result.gaps).toEqual([]);
    expect(result.error).toBeUndefined();
  });

  it('returns empty gaps for empty array', () => {
    const result = calculateGaps([]);
    expect(result.gaps).toEqual([]);
    expect(result.error).toBeUndefined();
  });

  it('calculates gap for 1 month difference', () => {
    const result = calculateGaps(['2024-02', '2024-01']);
    expect(result.error).toBeUndefined();
    expect(result.gaps[0]).toBeCloseTo(1, 1); // ~1rem for 1 month
  });

  it('calculates gap for 1 day difference (minimum)', () => {
    const result = calculateGaps(['2024-01-02', '2024-01-01']);
    expect(result.error).toBeUndefined();
    expect(result.gaps[0]).toBe(0.5); // min height
  });

  it('caps gap at maximum for large differences', () => {
    const result = calculateGaps(['2024-01', '2020-01']); // 4 years
    expect(result.error).toBeUndefined();
    expect(result.gaps[0]).toBe(8); // max height
  });

  it('rounds to 0.25rem increments', () => {
    const result = calculateGaps(['2024-03', '2024-01']); // 2 months
    expect(result.error).toBeUndefined();
    expect(result.gaps[0] % 0.25).toBe(0);
  });

  it('returns error for invalid date', () => {
    const result = calculateGaps(['2024-06', 'invalid']);
    expect(result.error).toContain('Invalid date format');
    expect(result.gaps).toEqual([]);
  });

  it('returns error for wrong order', () => {
    const result = calculateGaps(['2023-01', '2024-06']);
    expect(result.error).toContain('descending order');
    expect(result.gaps).toEqual([]);
  });

  it('handles mixed date formats', () => {
    const result = calculateGaps(['2024-08', 'July 31, 2024', '2023-06-13']);
    expect(result.error).toBeUndefined();
    expect(result.gaps.length).toBe(2);
  });

  it('calculates multiple gaps correctly', () => {
    const result = calculateGaps(['2024-06', '2024-03', '2024-01']); // 3mo, 2mo
    expect(result.error).toBeUndefined();
    expect(result.gaps.length).toBe(2);
    expect(result.gaps[0]).toBeGreaterThan(result.gaps[1]); // first gap larger
  });
});
