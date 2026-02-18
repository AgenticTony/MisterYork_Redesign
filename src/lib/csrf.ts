/**
 * CSRF (Cross-Site Request Forgery) protection utilities
 * Provides secure token generation and verification for API endpoints
 */

/**
 * CSRF token validation result
 */
export interface CsrfValidationResult {
  valid: boolean
  error?: string
}

/**
 * CSRF token information
 */
export interface CsrfToken {
  token: string
  expiresAt: Date
}

/**
 * Default token expiration time (1 hour)
 * Tokens should expire to limit the window for potential attacks
 */
const DEFAULT_EXPIRATION_MS = 60 * 60 * 1000 // 1 hour

/**
 * Token length in bytes (32 bytes = 256 bits when hex encoded)
 * Provides 256 bits of entropy for strong security
 */
const TOKEN_LENGTH_BYTES = 32

/**
 * Character set for hex encoding
 */
const HEX_CHARS = '0123456789abcdef'

/**
 * In-memory storage for CSRF tokens
 * In production, this should be replaced with a session store or database
 * Map structure: token -> { expiresAt }
 */
const tokenStore = new Map<string, Date>()

/**
 * Cleanup interval to prevent memory leaks
 * Removes expired tokens from the store
 */
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000 // 5 minutes

/**
 * Set up periodic cleanup of expired CSRF tokens
 */
setInterval(() => {
  const now = Date.now()

  for (const [token, expiresAt] of tokenStore.entries()) {
    if (expiresAt.getTime() < now) {
      tokenStore.delete(token)
    }
  }
}, CLEANUP_INTERVAL_MS)

/**
 * Generates a cryptographically secure random token
 *
 * @returns Hex-encoded random string
 *
 * @example
 * ```ts
 * const token = generateRandomToken()
 * console.log(token) // 'a1b2c3d4e5f6...'
 * ```
 */
function generateRandomToken(): string {
  // Use Web Crypto API for secure random number generation
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const array = new Uint8Array(TOKEN_LENGTH_BYTES)
    crypto.getRandomValues(array)

    // Convert to hex string
    let token = ''
    for (let i = 0; i < array.length; i++) {
      token += HEX_CHARS[array[i] >> 4]
      token += HEX_CHARS[array[i] & 0x0f]
    }
    return token
  }

  // Fallback to Math.random (less secure, but works in non-secure contexts)
  // This should only happen in environments without Web Crypto API
  let token = ''
  for (let i = 0; i < TOKEN_LENGTH_BYTES * 2; i++) {
    token += HEX_CHARS[Math.floor(Math.random() * HEX_CHARS.length)]
  }
  return token
}

/**
 * Creates a new CSRF token for protection against cross-site request forgery
 *
 * @param expirationMs - Token expiration time in milliseconds (default: 3600000ms = 1 hour)
 * @returns CsrfToken with the token string and expiration time
 *
 * @example
 * ```ts
 * const csrfToken = createCsrfToken()
 * console.log(csrfToken.token) // 'a1b2c3d4e5f6...'
 * console.log(csrfToken.expiresAt) // Date object
 * ```
 */
export function createCsrfToken(expirationMs: number = DEFAULT_EXPIRATION_MS): CsrfToken {
  const token = generateRandomToken()
  const expiresAt = new Date(Date.now() + expirationMs)

  // Store the token with its expiration time
  tokenStore.set(token, expiresAt)

  return {
    token,
    expiresAt,
  }
}

/**
 * Validates a CSRF token against the stored tokens
 *
 * @param token - The CSRF token to validate
 * @returns CsrfValidationResult with validation status and optional error message
 *
 * @example
 * ```ts
 * const result = validateCsrfToken('a1b2c3d4e5f6...')
 * if (result.valid) {
 *   // Process the request
 * } else {
 *   console.log(result.error) // 'Invalid CSRF token'
 * }
 * ```
 */
export function validateCsrfToken(token: unknown): CsrfValidationResult {
  // Reject non-string input
  if (typeof token !== 'string') {
    return {
      valid: false,
      error: 'CSRF token must be a string',
    }
  }

  // Check for empty token
  if (!token) {
    return {
      valid: false,
      error: 'CSRF token is required',
    }
  }

  // Check minimum token length (hex encoded, should be TOKEN_LENGTH_BYTES * 2 characters)
  const expectedLength = TOKEN_LENGTH_BYTES * 2
  if (token.length !== expectedLength) {
    return {
      valid: false,
      error: 'Invalid CSRF token format',
    }
  }

  // Verify token contains only valid hex characters
  if (!/^[0-9a-f]+$/.test(token)) {
    return {
      valid: false,
      error: 'Invalid CSRF token format',
    }
  }

  // Check if token exists in store
  const expiresAt = tokenStore.get(token)
  if (!expiresAt) {
    return {
      valid: false,
      error: 'Invalid CSRF token',
    }
  }

  // Check if token has expired
  const now = Date.now()
  if (expiresAt.getTime() < now) {
    // Remove expired token
    tokenStore.delete(token)
    return {
      valid: false,
      error: 'CSRF token has expired',
    }
  }

  // Token is valid
  // For one-time use tokens, uncomment the following line:
  // tokenStore.delete(token)

  return {
    valid: true,
  }
}

/**
 * Invalidates a CSRF token, removing it from the store
 * Use this after successful validation to enforce one-time use
 *
 * @param token - The CSRF token to invalidate
 *
 * @example
 * ```ts
 * const result = validateCsrfToken(token)
 * if (result.valid) {
 *   invalidateCsrfToken(token) // Remove token to prevent replay
 *   // Process the request
 * }
 * ```
 */
export function invalidateCsrfToken(token: string): void {
  tokenStore.delete(token)
}

/**
 * Gets the expiration time for a token without validating it
 * Useful for checking token age and refresh decisions
 *
 * @param token - The CSRF token to check
 * @returns Date when the token expires, or undefined if token doesn't exist
 *
 * @example
 * ```ts
 * const expiresAt = getTokenExpiration('a1b2c3d4e5f6...')
 * if (expiresAt && expiresAt < new Date()) {
 *   // Token has expired, request a new one
 * }
 * ```
 */
export function getTokenExpiration(token: string): Date | undefined {
  return tokenStore.get(token)
}

/**
 * Clears all CSRF tokens from the store
 * Use with caution - this invalidates all active tokens
 *
 * @example
 * ```ts
 * clearAllCsrfTokens()
 * ```
 */
export function clearAllCsrfTokens(): void {
  tokenStore.clear()
}

/**
 * Gets statistics about the current CSRF token store
 * Useful for monitoring and debugging
 *
 * @returns Object with store statistics
 *
 * @example
 * ```ts
 * const stats = getCsrfTokenStats()
 * console.log(`Active tokens: ${stats.activeTokens}`)
 * ```
 */
export function getCsrfTokenStats(): {
  activeTokens: number
  expiredTokens: number
} {
  const now = Date.now()
  let activeTokens = 0
  let expiredTokens = 0

  for (const expiresAt of tokenStore.values()) {
    if (expiresAt.getTime() < now) {
      expiredTokens++
    } else {
      activeTokens++
    }
  }

  return {
    activeTokens,
    expiredTokens,
  }
}
