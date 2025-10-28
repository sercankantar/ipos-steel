import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const requestListSubmissions = await prisma.requestListSubmission.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(requestListSubmissions)
  } catch (error) {
    console.error('İstek listesi talepleri listeleme hatası:', error)
    return NextResponse.json(
      { error: 'İstek listesi talepleri listelenemedi' },
      { status: 500 }
    )
  }
}

