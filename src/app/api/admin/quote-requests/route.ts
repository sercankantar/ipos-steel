import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const quoteRequests = await prisma.quoteRequest.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(quoteRequests)
  } catch (error) {
    console.error('Teklif talepleri listeleme hatası:', error)
    return NextResponse.json(
      { error: 'Teklif talepleri listelenemedi' },
      { status: 500 }
    )
  }
}

