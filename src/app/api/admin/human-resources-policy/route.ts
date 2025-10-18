import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function GET() {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    if (!isAuthenticated) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const policy = await prisma.humanResourcesPolicy.findFirst({ orderBy: { updatedAt: 'desc' } })
    return NextResponse.json(policy)
  } catch (error) {
    console.error('HR policy getirilirken hata:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    if (!isAuthenticated) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const data = await request.json()

    await prisma.humanResourcesPolicy.updateMany({ where: { isActive: true }, data: { isActive: false } })

    const created = await prisma.humanResourcesPolicy.create({ data: { ...data, isActive: true } })

    // Cache'i temizle
    revalidatePath('/insan-kaynaklari-politikamiz')
    revalidatePath('/api/human-resources-policy')

    return NextResponse.json(created)
  } catch (error) {
    console.error('HR policy oluşturulurken hata:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    if (!isAuthenticated) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const data = await request.json()

    const existing = await prisma.humanResourcesPolicy.findFirst({ orderBy: { updatedAt: 'desc' } })
    if (existing) {
      const updated = await prisma.humanResourcesPolicy.update({ where: { id: existing.id }, data })

      // Cache'i temizle
      revalidatePath('/insan-kaynaklari-politikamiz')
      revalidatePath('/api/human-resources-policy')

      return NextResponse.json(updated)
    }

    const created = await prisma.humanResourcesPolicy.create({ data: { ...data, isActive: true } })

    // Cache'i temizle
    revalidatePath('/insan-kaynaklari-politikamiz')
    revalidatePath('/api/human-resources-policy')

    return NextResponse.json(created)
  } catch (error) {
    console.error('HR policy güncellenirken hata:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}


