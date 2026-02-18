/**
 * CSRF token API endpoint
 * Generates and returns CSRF tokens for form protection
 */

import { NextResponse } from 'next/server'
import { createCsrfToken } from '@/lib/csrf'

/**
 * CSRF token response interface
 */
interface CsrfTokenResponse {
  success: boolean
  token: string
  expiresAt: string
}

/**
 * GET /api/csrf-token
 * Generates and returns a new CSRF token
 *
 * Returns:
 * - 200: CSRF token generated successfully
 * - 500: Internal server error
 *
 * @example
 * ```ts
 * const response = await fetch('/api/csrf-token')
 * const { token, expiresAt } = await response.json()
 * ```
 */
export async function GET(): Promise<NextResponse<CsrfTokenResponse>> {
  try {
    // Generate a new CSRF token
    const csrfToken = createCsrfToken()

    // Return the token with its expiration time
    return NextResponse.json(
      {
        success: true,
        token: csrfToken.token,
        expiresAt: csrfToken.expiresAt.toISOString(),
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, private',
          'Pragma': 'no-cache',
          'X-Content-Type-Options': 'nosniff',
        },
      }
    )
  } catch (error) {
    // Handle unexpected errors
    console.error('CSRF token generation error:', error)

    return NextResponse.json(
      {
        success: false,
        token: '',
        expiresAt: '',
      },
      { status: 500 }
    )
  }
}

/**
 * POST /api/csrf-token
 * Returns method not allowed for POST requests
 */
export async function POST(): Promise<NextResponse<CsrfTokenResponse>> {
  return NextResponse.json(
    {
      success: false,
      token: '',
      expiresAt: '',
    },
    {
      status: 405,
      statusText: 'Method Not Allowed',
    }
  )
}
