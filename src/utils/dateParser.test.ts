import { describe, it, expect } from 'vitest';
import { parseDate, validateDateOrder } from './dateParser';

describe('parseDate', () => {
  it('parses YYYY-MM-DD format', () => {
    const result = parseDate('2024-06-15');
    expect(result.isValid).toBe(true);
    expect(result.date.format('YYYY-MM-DD')).toBe('2024-06-15');
  });

  it('parses YYYY-MM format', () => {
    const result = parseDate('2024-06');
    expect(result.isValid).toBe(true);
    expect(result.date.format('YYYY-MM-DD')).toBe('2024-06-01');
  });

  it('parses YYYY format', () => {
    const result = parseDate('2024');
    expect(result.isValid).toBe(true);
    expect(result.date.format('YYYY-MM-DD')).toBe('2024-01-01');
  });

  it('parses "MMMM YYYY" format', () => {
    const result = parseDate('June 2024');
    expect(result.isValid).toBe(true);
    expect(result.date.format('YYYY-MM-DD')).toBe('2024-06-01');
  });

  it('parses "MMM YYYY" format', () => {
    const result = parseDate('Jun 2024');
    expect(result.isValid).toBe(true);
    expect(result.date.format('YYYY-MM-DD')).toBe('2024-06-01');
  });

  it('parses "MMMM D, YYYY" format', () => {
    const result = parseDate('June 15, 2024');
    expect(result.isValid).toBe(true);
    expect(result.date.format('YYYY-MM-DD')).toBe('2024-06-15');
  });

  it('parses "MMM D, YYYY" format', () => {
    const result = parseDate('Jun 15, 2024');
    expect(result.isValid).toBe(true);
    expect(result.date.format('YYYY-MM-DD')).toBe('2024-06-15');
  });

  it('trims whitespace', () => {
    const result = parseDate('  2024-06-15  ');
    expect(result.isValid).toBe(true);
  });

  it('returns invalid for unsupported format', () => {
    const result = parseDate('15/06/2024');
    expect(result.isValid).toBe(false);
    expect(result.original).toBe('15/06/2024');
  });

  it('returns invalid for garbage input', () => {
    const result = parseDate('not a date');
    expect(result.isValid).toBe(false);
  });
});

describe('validateDateOrder', () => {
  it('returns valid for descending order', () => {
    const result = validateDateOrder(['2024-06', '2024-01', '2023-06']);
    expect(result.valid).toBe(true);
  });

  it('returns valid for single date', () => {
    const result = validateDateOrder(['2024-06']);
    expect(result.valid).toBe(true);
  });

  it('returns valid for empty array', () => {
    const result = validateDateOrder([]);
    expect(result.valid).toBe(true);
  });

  it('returns error for ascending order', () => {
    const result = validateDateOrder(['2023-01', '2024-06']);
    expect(result.valid).toBe(false);
    expect(result.message).toContain('descending order');
  });

  it('returns error for invalid date format', () => {
    const result = validateDateOrder(['2024-06', 'invalid', '2023-06']);
    expect(result.valid).toBe(false);
    expect(result.message).toContain('Invalid date format');
  });

  it('works with mixed formats in correct order', () => {
    const result = validateDateOrder(['2024-08', 'July 31, 2024', '2023-06-13', '2018']);
    expect(result.valid).toBe(true);
  });
});
