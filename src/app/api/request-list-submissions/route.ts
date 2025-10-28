import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const {
      items,
      firstName,
      lastName,
      phone,
      city,
      email,
      description
    } = body

    // Validasyon
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Ürün listesi eksik veya boş' },
        { status: 400 }
      )
    }

    if (!firstName || !lastName || !phone || !city || !email) {
      return NextResponse.json(
        { error: 'Gerekli alanlar eksik' },
        { status: 400 }
      )
    }

    // İstek listesi talebini oluştur
    const requestListSubmission = await prisma.requestListSubmission.create({
      data: {
        items,
        firstName,
        lastName,
        phone,
        city,
        email,
        description
      }
    })

    return NextResponse.json(requestListSubmission, { status: 201 })
  } catch (error) {
    console.error('İstek listesi talebi oluşturma hatası:', error)
    return NextResponse.json(
      { error: 'İstek listesi talebi oluşturulamadı' },
      { status: 500 }
    )
  }
}

