/**
 * Newsletter API endpoint
 * Handles newsletter signup with CSRF protection, input validation, and rate limiting
 */

import { NextRequest, NextResponse } from 'next/server'
import { validateAndSanitizeEmail } from '@/lib/validation'
import { checkRateLimit } from '@/lib/rate-limit'
import { validateCsrfToken, invalidateCsrfToken } from '@/lib/csrf'

/**
 * Newsletter subscription request body
 */
interface NewsletterRequestBody {
  email: string
  csrfToken?: string
}

/**
 * API response interface
 */
interface ApiResponse {
  success: boolean
  message: string
  error?: string
}

/**
 * POST /api/newsletter
 * Subscribe an email address to the newsletter
 *
 * Request body:
 * - email: string (required) - Email address to subscribe
 * - csrfToken: string (required) - CSRF token for protection
 *
 * Returns:
 * - 200: Successfully subscribed
 * - 400: Bad request (invalid email, missing fields)
 * - 403: Forbidden (invalid CSRF token)
 * - 429: Too many requests (rate limited)
 * - 500: Internal server error
 */
export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    // Parse request body
    let body: NewsletterRequestBody
    try {
      body = await request.json()
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid request body',
          error: 'Request body must be valid JSON',
        },
        { status: 400 }
      )
    }

    // Extract email and CSRF token
    const { email, csrfToken } = body

    // Validate CSRF token first - this is a security check
    const csrfResult = validateCsrfToken(csrfToken)
    if (!csrfResult.valid) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid CSRF token',
          error: csrfResult.error || 'CSRF token is required for form submission',
        },
        { status: 403 }
      )
    }

    // Validate email
    const emailValidation = validateAndSanitizeEmail(email)
    if (!emailValidation.isValid) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid email address',
          error: emailValidation.error,
        },
        { status: 400 }
      )
    }

    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
               request.headers.get('x-real-ip') ||
               'unknown'

    // Check rate limit (5 requests per minute)
    const rateLimitResult = checkRateLimit(ip, 5, 60 * 1000)
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: 'Too many requests',
          error: `Rate limit exceeded. Try again after ${rateLimitResult.resetAt.toISOString()}`,
        },
        {
          status: 429,
          headers: {
            'Retry-After': Math.ceil((rateLimitResult.resetAt.getTime() - Date.now()) / 1000).toString(),
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': rateLimitResult.resetAt.toISOString(),
          },
        }
      )
    }

    // Invalidate the CSRF token after successful validation (one-time use)
    invalidateCsrfToken(csrfToken as string)

    // TODO: Add actual newsletter subscription logic here
    // For example:
    // - Add email to database
    // - Send confirmation email
    // - Integrate with newsletter service (Mailchimp, SendGrid, etc.)
    const sanitizedEmail = emailValidation.sanitized

    // Log the subscription for demonstration purposes
    // In production, replace this with actual newsletter service integration
    // console.log('Newsletter subscription:', { email: sanitizedEmail, ip })

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully subscribed to newsletter',
      },
      {
        status: 200,
        headers: {
          'X-RateLimit-Limit': rateLimitResult.limit.toString(),
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': rateLimitResult.resetAt.toISOString(),
        },
      }
    )

  } catch (error) {
    // Handle unexpected errors
    console.error('Newsletter subscription error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
        error: 'An unexpected error occurred. Please try again later.',
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/newsletter
 * Returns method not allowed for GET requests
 */
export async function GET(): Promise<NextResponse<ApiResponse>> {
  return NextResponse.json(
    {
      success: false,
      message: 'Method not allowed',
      error: 'Only POST requests are supported for this endpoint',
    },
    { status: 405 }
  )
}
