import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const job = await prisma.jobPosition.findFirst({
      where: {
        id: params.id,
        isActive: true
      },
      include: {
        department: true
      }
    })

    if (!job) {
      return NextResponse.json({ error: 'İş pozisyonu bulunamadı' }, { status: 404 })
    }

    return NextResponse.json(job)
  } catch (error) {
    console.error('İş pozisyonu yüklenirken hata:', error)
    return NextResponse.json({ error: 'Veri yüklenirken hata oluştu' }, { status: 500 })
  }
}
