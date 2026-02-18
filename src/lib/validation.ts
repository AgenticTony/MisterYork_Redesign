/**
 * Validation utilities for user input
 * Provides email validation with sanitization to prevent injection attacks
 */

/**
 * Email validation result
 */
export interface ValidationResult {
  isValid: boolean
  sanitized: string
  error?: string
}

/**
 * Regular expression for email validation
 * Follows RFC 5322 standard with practical simplifications
 * Allows: alphanumeric, dots, hyphens, underscores in local part
 * Requires: @ symbol
 * Allows: alphanumeric, dots, hyphens in domain
 * Requires: at least one dot in domain with TLD
 */
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

/**
 * Maximum allowed email length to prevent DoS attacks
 */
const MAX_EMAIL_LENGTH = 254

/**
 * Dangerous characters that should be stripped from email input
 * Prevents header injection and other attacks
 */
const DANGEROUS_CHARS = /[\r\n\x00-\x1F\x7F]/g

/**
 * Validates and sanitizes an email address
 *
 * @param email - The email address to validate
 * @returns ValidationResult with validation status, sanitized email, and optional error
 *
 * @example
 * ```ts
 * const result = validateAndSanitizeEmail('  Test@Example.com  ')
 * console.log(result) // { isValid: true, sanitized: 'test@example.com' }
 * ```
 */
export function validateAndSanitizeEmail(email: unknown): ValidationResult {
  // Reject non-string input
  if (typeof email !== 'string') {
    return {
      isValid: false,
      sanitized: '',
      error: 'Email must be a string',
    }
  }

  // Trim whitespace
  let sanitized = email.trim()

  // Check for empty input
  if (!sanitized) {
    return {
      isValid: false,
      sanitized: '',
      error: 'Email is required',
    }
  }

  // Check length before processing to prevent DoS
  if (sanitized.length > MAX_EMAIL_LENGTH) {
    return {
      isValid: false,
      sanitized: '',
      error: 'Email is too long',
    }
  }

  // Remove dangerous characters (newlines, control characters)
  sanitized = sanitized.replace(DANGEROUS_CHARS, '')

  // Convert to lowercase for consistency
  sanitized = sanitized.toLowerCase()

  // Validate email format
  if (!EMAIL_REGEX.test(sanitized)) {
    return {
      isValid: false,
      sanitized,
      error: 'Invalid email format',
    }
  }

  // Additional checks
  const [localPart, domain] = sanitized.split('@')

  // Check local part length (max 64 characters per RFC)
  if (localPart.length > 64) {
    return {
      isValid: false,
      sanitized,
      error: 'Email local part is too long',
    }
  }

  // Check domain part length (max 253 characters per RFC)
  if (domain.length > 253) {
    return {
      isValid: false,
      sanitized,
      error: 'Email domain is too long',
    }
  }

  // Check for consecutive dots
  if (sanitized.includes('..')) {
    return {
      isValid: false,
      sanitized,
      error: 'Invalid email format',
    }
  }

  // Check for leading/trailing dots in local or domain part
  if (localPart.startsWith('.') || localPart.endsWith('.')) {
    return {
      isValid: false,
      sanitized,
      error: 'Invalid email format',
    }
  }

  return {
    isValid: true,
    sanitized,
  }
}

/**
 * Quick validation check for email format
 * Returns true if the email is valid, false otherwise
 *
 * @param email - The email address to validate
 * @returns boolean indicating if email is valid
 *
 * @example
 * ```ts
 * if (isValidEmail('test@example.com')) {
 *   // Proceed with email
 * }
 * ```
 */
export function isValidEmail(email: unknown): email is string {
  const result = validateAndSanitizeEmail(email)
  return result.isValid
}

/**
 * Sanitizes email input without validation
 * Use with caution - only for display purposes
 *
 * @param email - The email address to sanitize
 * @returns Sanitized email string
 */
export function sanitizeEmail(email: string): string {
  if (typeof email !== 'string') {
    return ''
  }

  return email
    .trim()
    .replace(DANGEROUS_CHARS, '')
    .toLowerCase()
}
