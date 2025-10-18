import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/auth'

export async function GET() {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    if (!isAuthenticated) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    
    const categories = await prisma.newsCategory.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(categories)
  } catch (error) {
    console.error('News categories fetch error:', error)
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

    const existingCategory = await prisma.newsCategory.findUnique({
      where: { name }
    })

    if (existingCategory) {
      return NextResponse.json({ error: 'Bu kategori adı zaten mevcut' }, { status: 409 })
    }

    const newCategory = await prisma.newsCategory.create({
      data: {
        name,
        color: color || 'bg-gray-100 text-gray-800'
      }
    })

    return NextResponse.json(newCategory, { status: 201 })
  } catch (error) {
    console.error('News category creation error:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}
