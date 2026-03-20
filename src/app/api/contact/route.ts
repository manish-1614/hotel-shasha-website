import { NextRequest, NextResponse } from 'next/server'
import { fullFormSchema } from '@/lib/schemas'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const parsed = fullFormSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Request validation failed',
            details: parsed.error.flatten(),
          },
        },
        { status: 400 },
      )
    }

    if (parsed.data.website && parsed.data.website.length > 0) {
      return NextResponse.json({ ok: true })
    }

    // Phase 1: Log the enquiry (no DB yet)
    // Phase 2: Write to NeonDB + send emails via Resend
    console.log('[enquiry]', {
      name: parsed.data.name,
      roomType: parsed.data.roomType,
      checkin: parsed.data.checkin,
      checkout: parsed.data.checkout,
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json(
      {
        error: {
          code: 'INTERNAL_ERROR',
          message: 'An unexpected error occurred. Please try again.',
        },
      },
      { status: 500 },
    )
  }
}
