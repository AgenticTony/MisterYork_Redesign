import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    // Validate email exists
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Simulate newsletter signup (log to console)
    // In production, this would integrate with a newsletter service like Mailchimp, SendGrid, etc.
    console.log(`Newsletter signup request for email: ${email}`)

    // Simulate a slight delay to mimic API call
    await new Promise(resolve => setTimeout(resolve, 500))

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for subscribing to our newsletter!'
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Newsletter signup error:', error)
    return NextResponse.json(
      { success: false, message: 'An error occurred. Please try again later.' },
      { status: 500 }
    )
  }
}
