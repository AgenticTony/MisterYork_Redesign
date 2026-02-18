/**
 * Rate limiting utilities for API endpoint protection
 * Provides in-memory rate limiting using sliding window algorithm
 */

/**
 * Rate limit check result
 */
export interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetAt: Date
  limit: number
}

/**
 * Request record for tracking
 */
interface RequestRecord {
  count: number
  windowStart: number
}

/**
 * Default rate limit configuration
 * Allows 5 requests per 60-second window for newsletter signup
 */
const DEFAULT_LIMIT = 5
const DEFAULT_WINDOW_MS = 60 * 1000 // 1 minute

/**
 * In-memory storage for rate limit records
 * Map structure: identifier -> { count, windowStart }
 */
const rateLimitStore = new Map<string, RequestRecord>()

/**
 * Cleanup interval to prevent memory leaks
 * Removes entries older than the window duration
 */
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000 // 5 minutes

/**
 * Set up periodic cleanup of expired rate limit entries
 */
setInterval(() => {
  const now = Date.now()
  const cutoffTime = now - DEFAULT_WINDOW_MS

  for (const [identifier, record] of rateLimitStore.entries()) {
    if (record.windowStart < cutoffTime) {
      rateLimitStore.delete(identifier)
    }
  }
}, CLEANUP_INTERVAL_MS)

/**
 * Checks if a request should be rate limited
 *
 * @param identifier - Unique identifier for the requester (IP address, user ID, etc.)
 * @param limit - Maximum number of requests allowed in the time window (default: 5)
 * @param windowMs - Time window in milliseconds (default: 60000ms = 1 minute)
 * @returns RateLimitResult with allowed status, remaining requests, and reset time
 *
 * @example
 * ```ts
 * const result = checkRateLimit('192.168.1.1')
 * if (result.allowed) {
 *   // Process the request
 * } else {
 *   // Return 429 Too Many Requests
 *   console.log(`Rate limited. Reset at ${result.resetAt}`)
 * }
 * ```
 */
export function checkRateLimit(
  identifier: string,
  limit: number = DEFAULT_LIMIT,
  windowMs: number = DEFAULT_WINDOW_MS
): RateLimitResult {
  const now = Date.now()

  // Get or create record for this identifier
  let record = rateLimitStore.get(identifier)

  // If no record exists, create a new one
  if (!record) {
    record = {
      count: 0,
      windowStart: now,
    }
    rateLimitStore.set(identifier, record)
  }

  // Check if the window has expired
  const windowAge = now - record.windowStart
  if (windowAge >= windowMs) {
    // Reset the window
    record.count = 0
    record.windowStart = now
  }

  // Check if the limit has been exceeded
  if (record.count >= limit) {
    // Calculate when the limit will reset
    const resetAt = new Date(record.windowStart + windowMs)
    const remaining = 0

    return {
      allowed: false,
      remaining,
      resetAt,
      limit,
    }
  }

  // Increment the counter
  record.count++

  // Calculate remaining requests and reset time
  const remaining = limit - record.count
  const resetAt = new Date(record.windowStart + windowMs)

  return {
    allowed: true,
    remaining,
    resetAt,
    limit,
  }
}

/**
 * Resets rate limit for a specific identifier
 * Use this to manually clear a rate limit (e.g., after admin intervention)
 *
 * @param identifier - The identifier to reset
 *
 * @example
 * ```ts
 * resetRateLimit('192.168.1.1')
 * ```
 */
export function resetRateLimit(identifier: string): void {
  rateLimitStore.delete(identifier)
}

/**
 * Gets current rate limit status without incrementing the counter
 * Useful for displaying rate limit information to users
 *
 * @param identifier - Unique identifier for the requester
 * @param limit - Maximum number of requests allowed (default: 5)
 * @param windowMs - Time window in milliseconds (default: 60000ms)
 * @returns RateLimitResult with current status
 *
 * @example
 * ```ts
 * const status = getRateLimitStatus('192.168.1.1')
 * console.log(`${status.remaining} requests remaining`)
 * ```
 */
export function getRateLimitStatus(
  identifier: string,
  limit: number = DEFAULT_LIMIT,
  windowMs: number = DEFAULT_WINDOW_MS
): RateLimitResult {
  const now = Date.now()
  const record = rateLimitStore.get(identifier)

  // No record means no requests have been made
  if (!record) {
    return {
      allowed: true,
      remaining: limit,
      resetAt: new Date(now + windowMs),
      limit,
    }
  }

  // Check if the window has expired
  const windowAge = now - record.windowStart
  if (windowAge >= windowMs) {
    return {
      allowed: true,
      remaining: limit,
      resetAt: new Date(now + windowMs),
      limit,
    }
  }

  // Return current status
  const remaining = Math.max(0, limit - record.count)
  const resetAt = new Date(record.windowStart + windowMs)

  return {
    allowed: remaining > 0,
    remaining,
    resetAt,
    limit,
  }
}

/**
 * Clears all rate limit records
 * Use with caution - this removes all rate limits for all users
 *
 * @example
 * ```ts
 * clearAllRateLimits()
 * ```
 */
export function clearAllRateLimits(): void {
  rateLimitStore.clear()
}

/**
 * Gets statistics about the current rate limit store
 * Useful for monitoring and debugging
 *
 * @returns Object with store statistics
 *
 * @example
 * ```ts
 * const stats = getRateLimitStats()
 * console.log(`Tracking ${stats.totalIdentifiers} unique identifiers`)
 * ```
 */
export function getRateLimitStats(): {
  totalIdentifiers: number
  totalRequests: number
} {
  let totalRequests = 0

  for (const record of rateLimitStore.values()) {
    totalRequests += record.count
  }

  return {
    totalIdentifiers: rateLimitStore.size,
    totalRequests,
  }
}
