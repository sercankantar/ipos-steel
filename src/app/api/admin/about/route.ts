import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/auth'

export async function GET() {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    if (!isAuthenticated) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

    const about = await prisma.about.findFirst({ orderBy: { updatedAt: 'desc' } })
    return NextResponse.json(about)
  } catch (error) {
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    if (!isAuthenticated) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

    const { title, description, imageUrl, imagePublicId } = await request.json()

    const existing = await prisma.about.findFirst({ orderBy: { updatedAt: 'desc' } })
    if (existing) {
      const updated = await prisma.about.update({
        where: { id: existing.id },
        data: {
          title,
          description,
          imageUrl: imageUrl ?? existing.imageUrl,
          imagePublicId: imagePublicId ?? existing.imagePublicId,
        }
      })
      return NextResponse.json(updated)
    } else {
      const created = await prisma.about.create({
        data: { title, description, imageUrl, imagePublicId, isActive: true }
      })
      return NextResponse.json(created)
    }
  } catch (error) {
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}


