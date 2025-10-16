import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    
    // Önce slug olarak dene
    let reference = await prisma.reference.findFirst({
      where: { 
        slug: id,
        isActive: true 
      }
    })
    
    // Slug bulunamazsa id olarak dene
    if (!reference) {
      reference = await prisma.reference.findFirst({
        where: { 
          id: id,
          isActive: true 
        }
      })
    }
    
    if (!reference) {
      return NextResponse.json({ error: 'Referans bulunamadı' }, { status: 404 })
    }
    
    return NextResponse.json(reference)
  } catch (error) {
    console.error('Reference fetch error:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}
