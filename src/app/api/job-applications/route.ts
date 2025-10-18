import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    console.log('Gelen başvuru verisi:', body)
    
    // Gerekli alanları kontrol et
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'city', 'birthDate', 'positionTitle', 'experience', 'education']
    const missingFields = requiredFields.filter(field => !body[field])
    
    if (missingFields.length > 0) {
      return NextResponse.json({ 
        error: `Eksik alanlar: ${missingFields.join(', ')}` 
      }, { status: 400 })
    }
    
    const application = await prisma.jobApplication.create({
      data: {
        jobPositionId: body.jobPositionId || null,
        positionTitle: body.positionTitle,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        city: body.city,
        birthDate: new Date(body.birthDate),
        experience: body.experience,
        education: body.education,
        cvFileName: body.cvFileName || null,
        cvFileUrl: body.cvFileUrl || null,
        portfolioFileName: body.portfolioFileName || null,
        portfolioFileUrl: body.portfolioFileUrl || null,
        coverLetter: body.coverLetter || null,
        consentGiven: body.consentGiven || false
      }
    })

    console.log('Başvuru başarıyla oluşturuldu:', application.id)
    return NextResponse.json(application, { status: 201 })
  } catch (error) {
    console.error('Başvuru oluşturulurken hata:', error)
    return NextResponse.json({ 
      error: 'Başvuru gönderilirken hata oluştu',
      details: error instanceof Error ? error.message : 'Bilinmeyen hata'
    }, { status: 500 })
  }
}
