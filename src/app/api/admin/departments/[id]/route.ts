import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    
    const department = await prisma.department.update({
      where: { id: params.id },
      data: {
        name: body.name,
        color: body.color,
        isActive: body.isActive !== undefined ? body.isActive : true
      }
    })

    return NextResponse.json(department)
  } catch (error) {
    console.error('Departman güncellenirken hata:', error)
    return NextResponse.json({ error: 'Veri güncellenirken hata oluştu' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Önce bu departmana ait iş pozisyonları var mı kontrol et
    const jobPositions = await prisma.jobPosition.findMany({
      where: { departmentId: params.id }
    })

    if (jobPositions.length > 0) {
      return NextResponse.json({ 
        error: 'Bu departmana ait iş pozisyonları bulunduğu için silinemez' 
      }, { status: 400 })
    }

    await prisma.department.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Departman silinirken hata:', error)
    return NextResponse.json({ error: 'Veri silinirken hata oluştu' }, { status: 500 })
  }
}
