import { NextRequest, NextResponse } from 'next/server'
import { authenticateAdmin, setAdminAuth } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    const isValid = await authenticateAdmin(username, password)
    
    if (isValid) {
      await setAdminAuth()
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json(
        { error: 'Geçersiz kimlik bilgileri' },
        { status: 401 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    )
  }
}
