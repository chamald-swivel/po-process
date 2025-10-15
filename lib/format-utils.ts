/**
 * Utility functions for safely formatting data with null/undefined checks
 */

/**
 * Safely formats a number as currency with 2 decimal places
 * @param value - The number to format (can be null/undefined)
 * @param fallback - The fallback string to return if value is null/undefined
 * @returns Formatted number string or fallback
 */
export function formatCurrency(value: number | null | undefined, fallback = "0.00"): string {
  if (value === null || value === undefined || isNaN(value)) {
    return fallback
  }
  return value.toFixed(2)
}

/**
 * Safely returns a string value or fallback
 * @param value - The string value (can be null/undefined)
 * @param fallback - The fallback string to return if value is null/undefined/empty
 * @returns The value or fallback
 */
export function formatString(value: string | null | undefined, fallback = "N/A"): string {
  if (!value || value.trim() === "") {
    return fallback
  }
  return value
}

/**
 * Safely returns a number value or fallback
 * @param value - The number value (can be null/undefined)
 * @param fallback - The fallback number to return if value is null/undefined
 * @returns The value or fallback
 */
export function formatNumber(value: number | null | undefined, fallback = 0): number {
  if (value === null || value === undefined || isNaN(value)) {
    return fallback
  }
  return value
}
