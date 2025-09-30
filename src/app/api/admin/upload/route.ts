import { NextRequest, NextResponse } from 'next/server'
import { isAdminAuthenticated } from '@/lib/auth'
import { cloudinary } from '@/lib/cloudinary'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get('file') as File | null
    const folder = (formData.get('folder') as string | null) || 'ipos-steel/mission-vision'

    if (!file) {
      return NextResponse.json({ error: 'Dosya bulunamadı' }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // PDF'ler için resource_type raw kullanılmalı
    const isPdf = (file.type && file.type.toLowerCase() === 'application/pdf') || file.name?.toLowerCase?.().endsWith('.pdf')

    const uploadResult = await new Promise<{ secure_url: string; public_id: string; resource_type?: string }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ folder, resource_type: isPdf ? 'raw' : 'auto' }, (error, result) => {
        if (error || !result) return reject(error)
        resolve({ secure_url: result.secure_url, public_id: result.public_id, resource_type: (result as any).resource_type })
      })
      stream.end(buffer)
    })

    return NextResponse.json(uploadResult)
  } catch (error) {
    console.error('Yükleme hatası:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const publicId = searchParams.get('public_id')

    if (!publicId) {
      return NextResponse.json({ error: 'public_id gerekli' }, { status: 400 })
    }

    await cloudinary.uploader.destroy(publicId, { resource_type: 'auto' })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Silme hatası:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}


