import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdminAuthenticated } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function GET() {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    if (!isAuthenticated) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const rules = await prisma.businessEthicsRules.findFirst({ orderBy: { updatedAt: 'desc' } })
    return NextResponse.json(rules)
  } catch (error) {
    console.error('Business ethics rules getirilirken hata:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    if (!isAuthenticated) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const data = await request.json()

    await prisma.businessEthicsRules.updateMany({ where: { isActive: true }, data: { isActive: false } })

    const created = await prisma.businessEthicsRules.create({ data: { ...data, isActive: true } })

    // Cache'i temizle
    revalidatePath('/is-etigi-kurallarimiz')
    revalidatePath('/api/business-ethics-rules')

    return NextResponse.json(created)
  } catch (error) {
    console.error('Business ethics rules oluşturulurken hata:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    if (!isAuthenticated) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })

    const data = await request.json()

    const existing = await prisma.businessEthicsRules.findFirst({ orderBy: { updatedAt: 'desc' } })
    if (existing) {
      const updated = await prisma.businessEthicsRules.update({ where: { id: existing.id }, data })

      // Cache'i temizle
      revalidatePath('/is-etigi-kurallarimiz')
      revalidatePath('/api/business-ethics-rules')

      return NextResponse.json(updated)
    }

    const created = await prisma.businessEthicsRules.create({ data: { ...data, isActive: true } })

    // Cache'i temizle
    revalidatePath('/is-etigi-kurallarimiz')
    revalidatePath('/api/business-ethics-rules')

    return NextResponse.json(created)
  } catch (error) {
    console.error('Business ethics rules güncellenirken hata:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}
