import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function GET() {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    if (!isAuthenticated) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
    const items = await prisma.news.findMany({ orderBy: { publishedAt: 'desc' } })
    return NextResponse.json(items)
  } catch (error) {
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    if (!isAuthenticated) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })

    const { title, category, publishedAt, summary, content, imageUrl, imagePublicId, isActive } = await request.json()
    const created = await prisma.news.create({
      data: { title, category, publishedAt: new Date(publishedAt), summary, content, imageUrl, imagePublicId, isActive: isActive ?? true }
    })

    // Cache'i temizle
    revalidatePath('/haberler')
    revalidatePath('/api/news')

    return NextResponse.json(created)
  } catch (error) {
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}


