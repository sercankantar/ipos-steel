import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const departments = await prisma.department.findMany({
      orderBy: { name: 'asc' }
    })

    return NextResponse.json(departments)
  } catch (error) {
    console.error('Departmanlar yüklenirken hata:', error)
    return NextResponse.json({ error: 'Veri yüklenirken hata oluştu' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const department = await prisma.department.create({
      data: {
        name: body.name,
        color: body.color || 'bg-gray-100 text-gray-800',
        isActive: body.isActive !== undefined ? body.isActive : true
      }
    })

    return NextResponse.json(department)
  } catch (error) {
    console.error('Departman oluşturulurken hata:', error)
    return NextResponse.json({ error: 'Veri kaydedilirken hata oluştu' }, { status: 500 })
  }
}
