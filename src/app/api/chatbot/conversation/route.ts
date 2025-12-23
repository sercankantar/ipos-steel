import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const revalidate = 0

// In-memory conversation store (production'da Redis kullanın!)
const conversations = new Map<string, any[]>()

export async function POST(req: NextRequest) {
  try {
    const { userId, message, conversationHistory, lastSearchResults, lastProductId } = await req.json()

    if (!userId || !message) {
      return NextResponse.json({
        success: false,
        error: 'userId ve message gerekli'
      }, { status: 400 })
    }

    // Conversation history'yi al veya oluştur
    let history = conversations.get(userId) || []
    
    // Kullanıcı mesajını ekle
    history.push({
      role: 'user',
      content: message,
      timestamp: new Date().toISOString()
    })

    // Maksimum 20 mesaj tut (memory overflow önleme)
    if (history.length > 20) {
      history = history.slice(-20)
    }

    // History'yi kaydet
    conversations.set(userId, history)

    return NextResponse.json({
      success: true,
      conversationHistory: history,
      conversationId: userId
    })

  } catch (error) {
    console.error('Conversation error:', error)
    return NextResponse.json({
      success: false,
      error: 'Conversation kaydedilemedi'
    }, { status: 500 })
  }
}

// Conversation history'yi getir
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({
        success: false,
        error: 'userId gerekli'
      }, { status: 400 })
    }

    const history = conversations.get(userId) || []

    return NextResponse.json({
      success: true,
      conversationHistory: history,
      messageCount: history.length
    })

  } catch (error) {
    console.error('Get conversation error:', error)
    return NextResponse.json({
      success: false,
      error: 'Conversation alınamadı'
    }, { status: 500 })
  }
}

// Conversation'ı temizle
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({
        success: false,
        error: 'userId gerekli'
      }, { status: 400 })
    }

    conversations.delete(userId)

    return NextResponse.json({
      success: true,
      message: 'Conversation temizlendi'
    })

  } catch (error) {
    console.error('Delete conversation error:', error)
    return NextResponse.json({
      success: false,
      error: 'Conversation silinemedi'
    }, { status: 500 })
  }
}

