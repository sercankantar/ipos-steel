import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(request: Request) {
  try {
    const requestListSubmissions = await prisma.requestListSubmission.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(requestListSubmissions, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    })
  } catch (error) {
    console.error('İstek listesi talepleri listeleme hatası:', error)
    return NextResponse.json(
      { error: 'İstek listesi talepleri listelenemedi' },
      { status: 500 }
    )
  }
}

