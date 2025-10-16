import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/auth'

export async function GET() {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    if (!isAuthenticated) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    
    const categories = await prisma.referenceCategory.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(categories)
  } catch (error) {
    console.error('Reference categories fetch error:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    if (!isAuthenticated) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

    const { name, color } = await request.json()
    
    if (!name) {
      return NextResponse.json({ error: 'Kategori adı gerekli' }, { status: 400 })
    }

    const created = await prisma.referenceCategory.create({
      data: {
        name,
        color: color || 'bg-gray-100 text-gray-800',
        isActive: true
      }
    })
    
    return NextResponse.json(created)
  } catch (error) {
    console.error('Reference category creation error:', error)
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Bu kategori adı zaten mevcut' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}
