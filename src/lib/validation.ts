/**
 * Email validation utilities
 */

/**
 * Validates an email address using a regex pattern
 * @param email - The email address to validate
 * @returns true if the email is valid, false otherwise
 */
export function validateEmail(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false
  }

  // Basic email validation regex
  // Matches: local-part@domain.tld
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
