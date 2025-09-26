import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  // Geçici: auth kontrolünü devre dışı bırak
  return NextResponse.next()
}
