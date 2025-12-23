import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const revalidate = 0

// Conversation context store (production'da Redis!)
const contextStore = new Map<string, {
  lastSearchQuery?: any,
  lastSearchResults?: any[],
  lastProductId?: string,
  conversationHistory?: any[]
}>()

export async function POST(req: NextRequest) {
  try {
    const { 
      userId, 
      message, 
      conversationHistory = []
    } = await req.json()

    if (!userId || !message) {
      return NextResponse.json({
        success: false,
        error: 'userId ve message gerekli'
      }, { status: 400 })
    }

    // OpenAI key'i environment variable'dan al
    const openaiKey = process.env.OPENAI_API_KEY || undefined

    // Context'i al veya oluştur
    let context = contextStore.get(userId) || {
      conversationHistory: []
    }

    // Mesajı history'ye ekle
    context.conversationHistory = context.conversationHistory || []
    context.conversationHistory.push({
      role: 'user',
      content: message,
      timestamp: new Date().toISOString()
    })

    // Intent ve parametreleri analiz et (GPT ile)
    const analysis = await analyzeMessage(message, context, openaiKey)

    let response: any = {
      success: true,
      intent: analysis.intent,
      requiresMoreInfo: false,
      response: '',
      searchResults: null,
      productDetails: null
    }

    // Intent'e göre işlem yap
    switch (analysis.intent) {
      case 'company_info':
        response = await handleCompanyInfo(analysis)
        break
      
      case 'contact_info':
        response = await handleContactInfo(analysis)
        break
      
      case 'product_search':
        response = await handleProductSearch(analysis, context)
        break
      
      case 'incomplete_search':
        response = await handleIncompleteSearch(analysis, context)
        break
      
      case 'follow_up_search':
        response = await handleFollowUpSearch(analysis, context)
        break
      
      case 'product_details':
        response = await handleProductDetails(analysis, context)
        break
      
      case 'product_accessories':
        response = await handleProductAccessories(analysis, context)
        break
      
      default:
        response.response = 'Üzgünüm, tam olarak anlayamadım. Şunları sorabilirsiniz:\n• Ürün arama: "50lik pregal kanal"\n• Şirket bilgisi: "hakkınızda"\n• İletişim: "nasıl ulaşabilirim"'
    }

    // Context'i güncelle ve kaydet
    if (analysis.searchQuery) {
      context.lastSearchQuery = analysis.searchQuery
    }
    if (response.searchResults) {
      context.lastSearchResults = response.searchResults
    }
    if (response.productDetails) {
      context.lastProductId = response.productDetails.id
    }

    // Assistant yanıtını history'ye ekle
    context.conversationHistory.push({
      role: 'assistant',
      content: response.response,
      timestamp: new Date().toISOString()
    })

    // History'yi maksimum 20 mesaja sınırla
    if (context.conversationHistory.length > 20) {
      context.conversationHistory = context.conversationHistory.slice(-20)
    }

    contextStore.set(userId, context)

    return NextResponse.json({
      ...response,
      context: {
        hasLastSearch: !!context.lastSearchQuery,
        hasLastProduct: !!context.lastProductId,
        messageCount: context.conversationHistory.length
      }
    })

  } catch (error) {
    console.error('Chatbot intelligence error:', error)
    return NextResponse.json({
      success: false,
      error: 'İşlem başarısız',
      details: error instanceof Error ? error.message : 'Bilinmeyen hata'
    }, { status: 500 })
  }
}

// GPT ile mesaj analizi
async function analyzeMessage(message: string, context: any, openaiKey?: string): Promise<any> {
  const systemPrompt = `Sen IPOS Steel'in akıllı chatbot asistanısın. Kullanıcının mesajını analiz edip intent ve parametreleri çıkarıyorsun.

**Context Bilgisi:**
${context.lastSearchQuery ? `Son arama: ${JSON.stringify(context.lastSearchQuery)}` : 'İlk mesaj'}
${context.lastSearchResults ? `Son sonuçlar: ${context.lastSearchResults.length} ürün` : ''}
${context.lastProductId ? `Son ürün ID: ${context.lastProductId}` : ''}

**Intent Tipleri:**
1. company_info - Şirket hakkında bilgi ("hakkınızda", "kimsiniz", "ne yapıyorsunuz")
2. contact_info - İletişim bilgisi ("iletişim", "telefon", "adres", "nasıl ulaşabilirim")
3. product_search - Tam ürün arama (tüm parametreler var)
4. incomplete_search - Eksik parametreli arama (kullanıcıya soru sor)
5. follow_up_search - Önceki aramayı güncelleyen arama ("40lıkları getir", "pregalvaniz olanları")
6. product_details - Ürün detayı ("bu ürünün özellikleri", "daha fazla bilgi")
7. product_accessories - İlişkili ürünler ("bunun aksesuarları", "modülleri neler")
8. general - Genel sohbet

**Önemli:**
- Eğer kullanıcı "40lıkları", "pregalvaniz olanları" derse → follow_up_search (context'teki son aramayı güncelle)
- Eğer "bunun", "bu ürünün" derse → context'teki lastProductId'yi kullan
- Eksik parametre varsa → incomplete_search ve neyin eksik olduğunu belirt

**Örnekler:**
- "50lik kablo kanalı" → product_search (tam arama)
- "kablo kanalı" → incomplete_search (boyut eksik, sor!)
- "40lıkları getir" (context'te son arama var) → follow_up_search
- "pregalvaniz olanları göster" (context'te son arama var) → follow_up_search
- "bunun aksesuarları" (context'te son ürün var) → product_accessories
- "hakkınızda" → company_info
- "iletişim" → contact_info`

  try {
    // Basit regex tabanlı analiz (OpenAI key yoksa)
    if (!openaiKey) {
      return simpleAnalysis(message, context)
    }

    // OpenAI ile gelişmiş analiz
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        functions: [{
          name: 'analyze_intent',
          description: 'Kullanıcının mesajını analiz et',
          parameters: {
            type: 'object',
            properties: {
              intent: {
                type: 'string',
                enum: ['company_info', 'contact_info', 'product_search', 'incomplete_search', 'follow_up_search', 'product_details', 'product_accessories', 'general']
              },
              searchQuery: {
                type: 'string',
                description: 'Arama terimi'
              },
              coatingType: { type: 'string' },
              height: { type: 'string' },
              width: { type: 'string' },
              missingParams: {
                type: 'array',
                items: { type: 'string' },
                description: 'Eksik parametreler'
              },
              clarificationNeeded: {
                type: 'string',
                description: 'Kullanıcıya sorulacak soru'
              }
            },
            required: ['intent']
          }
        }],
        function_call: { name: 'analyze_intent' },
        temperature: 0.3
      })
    })

    const data = await response.json()
    const result = JSON.parse(data.choices[0].message.function_call.arguments)
    
    return result

  } catch (error) {
    console.error('GPT analysis error:', error)
    // Fallback to simple analysis
    return simpleAnalysis(message, context)
  }
}

// Basit analiz (fallback)
function simpleAnalysis(message: string, context: any): any {
  const lower = message.toLowerCase()

  // Company info
  if (lower.includes('hakkın') || lower.includes('kimsin') || lower.includes('ne yapıyor')) {
    return { intent: 'company_info' }
  }

  // Contact info
  if (lower.includes('iletişim') || lower.includes('telefon') || lower.includes('adres') || lower.includes('ulaş')) {
    return { intent: 'contact_info' }
  }

  // Follow-up search (context varsa)
  if (context.lastSearchQuery && (
    lower.match(/\d+\s*lik/i) ||
    lower.includes('pregal') ||
    lower.includes('sıcak daldırma') ||
    lower.includes('olanları') ||
    lower.includes('getir')
  )) {
    return {
      intent: 'follow_up_search',
      searchQuery: context.lastSearchQuery.q
    }
  }

  // Product accessories
  if ((lower.includes('bunun') || lower.includes('bu ürün')) && 
      (lower.includes('aksesuar') || lower.includes('modül') || lower.includes('kapak'))) {
    return { intent: 'product_accessories' }
  }

  // Product search
  return {
    intent: 'product_search',
    searchQuery: message
  }
}

// Şirket bilgisi
async function handleCompanyInfo(analysis: any) {
  try {
    const about = await prisma.about.findFirst({
      where: { isActive: true },
      orderBy: { updatedAt: 'desc' }
    })

    const missionVision = await prisma.missionVision.findFirst({
      where: { isActive: true },
      orderBy: { updatedAt: 'desc' }
    })

    let response = '🏢 *IPOS Steel Hakkında*\n\n'
    
    if (about) {
      response += `${about.title}\n\n`
      response += `${about.description}\n\n`
    }

    if (missionVision) {
      response += `🎯 *Misyonumuz:*\n${missionVision.mission}\n\n`
      response += `👁️ *Vizyonumuz:*\n${missionVision.vision}\n\n`
    }

    response += `📞 Daha fazla bilgi için: /iletisim`

    return {
      success: true,
      intent: 'company_info',
      response,
      requiresMoreInfo: false
    }
  } catch (error) {
    return {
      success: true,
      intent: 'company_info',
      response: '🏢 IPOS Steel, çelik konstrüksiyon ve kablo kanalı sistemleri alanında öncü bir şirkettir.\n\n📞 Detaylı bilgi için: +90 XXX XXX XX XX',
      requiresMoreInfo: false
    }
  }
}

// İletişim bilgisi
async function handleContactInfo(analysis: any) {
  const response = `📞 *İletişim Bilgileri*\n\n☎️ Telefon: +90 XXX XXX XX XX\n✉️ Email: info@ipossteel.com\n🌐 Website: https://ipossteel.com\n📍 Adres: [Şirket Adresi]\n\n💬 Mesai Saatleri:\nPazartesi - Cuma: 08:30 - 17:30\n\n📋 Katalog indirmek için: /catalog`

  return {
    success: true,
    intent: 'contact_info',
    response,
    requiresMoreInfo: false
  }
}

// Ürün arama
async function handleProductSearch(analysis: any, context: any) {
  // API'yi çağır (mevcut search API)
  const params = new URLSearchParams()
  if (analysis.searchQuery) params.append('q', analysis.searchQuery)
  if (analysis.coatingType) params.append('coatingType', analysis.coatingType)
  if (analysis.height) params.append('height', analysis.height)
  if (analysis.width) params.append('width', analysis.width)

  // Production'da domain kullan, local'de localhost
  const baseUrl = process.env.NODE_ENV === 'production'
    ? 'https://ipos-steel.vercel.app'
    : 'http://localhost:3000'
  const searchUrl = `${baseUrl}/api/search/products?${params.toString()}`
  
  try {
    const response = await fetch(searchUrl)
    const data = await response.json()

    if (data.success && data.results.length > 0) {
      return {
        success: true,
        intent: 'product_search',
        response: `✅ ${data.totalResults} ürün bulundu!`,
        searchResults: data.results,
        requiresMoreInfo: false
      }
    } else {
      return {
        success: true,
        intent: 'product_search',
        response: `❌ Ürün bulunamadı.\n\n💡 Farklı aramalar deneyin veya bizimle iletişime geçin.`,
        searchResults: [],
        requiresMoreInfo: false
      }
    }
  } catch (error) {
    return {
      success: false,
      intent: 'product_search',
      response: 'Arama sırasında bir hata oluştu.',
      searchResults: [],
      requiresMoreInfo: false
    }
  }
}

// Eksik parametreli arama
async function handleIncompleteSearch(analysis: any, context: any) {
  return {
    success: true,
    intent: 'incomplete_search',
    response: analysis.clarificationNeeded || '🤔 Aradığınız ürünü daha iyi anlayabilmem için:\n\n• Boyut belirtin (örn: 50lik, 45x60)\n• Kaplama tipi (pregalvaniz, sıcak daldırma)\n• Ürün tipi (kanal, modül, aksesuar)\n\nÖrnek: "50lik pregalvaniz kablo kanalı"',
    requiresMoreInfo: true,
    missingParams: analysis.missingParams
  }
}

// Follow-up arama (önceki aramayı güncelle)
async function handleFollowUpSearch(analysis: any, context: any) {
  if (!context.lastSearchQuery) {
    return {
      success: true,
      intent: 'follow_up_search',
      response: 'Henüz bir arama yapmadınız. Lütfen aramak istediğiniz ürünü belirtin.',
      requiresMoreInfo: true
    }
  }

  // Önceki aramayla birleştir
  const updatedQuery = {
    ...context.lastSearchQuery,
    ...(analysis.coatingType && { coatingType: analysis.coatingType }),
    ...(analysis.height && { height: analysis.height }),
    ...(analysis.width && { width: analysis.width })
  }

  // Yeni arama yap
  return await handleProductSearch({ searchQuery: updatedQuery.q, ...updatedQuery }, context)
}

// Ürün aksesuarları
async function handleProductAccessories(analysis: any, context: any) {
  if (!context.lastProductId) {
    return {
      success: true,
      intent: 'product_accessories',
      response: 'Hangi ürünün aksesuarlarını merak ediyorsunuz? Lütfen önce bir ürün arayın.',
      requiresMoreInfo: true
    }
  }

  // Aksesuar ara (API'den)
  const params = new URLSearchParams()
  params.append('q', 'aksesuar')
  
  // Production'da domain kullan, local'de localhost
  const baseUrl = process.env.NODE_ENV === 'production'
    ? 'https://ipos-steel.vercel.app'
    : 'http://localhost:3000'
  const searchUrl = `${baseUrl}/api/search/products?${params.toString()}`
  
  try {
    const response = await fetch(searchUrl)
    const data = await response.json()

    return {
      success: true,
      intent: 'product_accessories',
      response: `📦 İlgili aksesuarlar:`,
      searchResults: data.results.filter((r: any) => r.type === 'accessory'),
      requiresMoreInfo: false
    }
  } catch (error) {
    return {
      success: false,
      intent: 'product_accessories',
      response: 'Aksesuar bilgisi alınamadı.',
      requiresMoreInfo: false
    }
  }
}

// Ürün detayları
async function handleProductDetails(analysis: any, context: any) {
  if (!context.lastProductId) {
    return {
      success: true,
      intent: 'product_details',
      response: 'Hangi ürünün detaylarını merak ediyorsunuz? Lütfen önce bir ürün arayın.',
      requiresMoreInfo: true
    }
  }

  // Ürün detayını getir
  return {
    success: true,
    intent: 'product_details',
    response: `📋 Ürün detayları:`,
    productDetails: context.lastSearchResults?.[0] || null,
    requiresMoreInfo: false
  }
}

