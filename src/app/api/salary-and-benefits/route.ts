import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const data = await prisma.salaryAndBenefitsManagement.findFirst({
      where: { isActive: true }
    })

    return NextResponse.json(data)
  } catch (error) {
    console.error('Ücret ve yan haklar verisi yüklenirken hata:', error)
    return NextResponse.json({ error: 'Veri yüklenirken hata oluştu' }, { status: 500 })
  }
}
