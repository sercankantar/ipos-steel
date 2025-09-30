import { NextRequest, NextResponse } from 'next/server'
import { clearAdminAuth } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    await clearAdminAuth()
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    )
  }
}
