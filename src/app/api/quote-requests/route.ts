import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const {
      productName,
      productId,
      productType,
      firstName,
      lastName,
      phone,
      city,
      email,
      description
    } = body

    // Validasyon
    if (!productName || !firstName || !lastName || !phone || !city || !email) {
      return NextResponse.json(
        { error: 'Gerekli alanlar eksik' },
        { status: 400 }
      )
    }

    // Teklif talebini oluştur
    const quoteRequest = await prisma.quoteRequest.create({
      data: {
        productName,
        productId,
        productType,
        firstName,
        lastName,
        phone,
        city,
        email,
        description
      }
    })

    return NextResponse.json(quoteRequest, { status: 201 })
  } catch (error) {
    console.error('Teklif talebi oluşturma hatası:', error)
    return NextResponse.json(
      { error: 'Teklif talebi oluşturulamadı' },
      { status: 500 }
    )
  }
}

