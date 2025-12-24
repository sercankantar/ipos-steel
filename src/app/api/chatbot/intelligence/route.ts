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
        response.response = 'Üzgünüm, tam olarak anlayamadım. Şunları sorabilirsiniz:\n• Ürün arama: "50lik kablo kanallari"\n• Şirket bilgisi: "hakkınızda"\n• İletişim: "nasıl ulaşabilirim"'
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
      details: error instanceof Error ? error.message : 'Bilinmeyen hata',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
}

// GPT ile mesaj analizi
async function analyzeMessage(message: string, context: any, openaiKey?: string): Promise<any> {
  const systemPrompt = `Sen IPOS Steel'in akıllı chatbot asistanısın. ÜRÜN YAPISINI BİLİYORSUN!

**CONTEXT:**
${context.lastSearchQuery ? `Son arama: ${JSON.stringify(context.lastSearchQuery)}` : 'İlk mesaj'}
${context.lastSearchResults ? `${context.lastSearchResults.length} ürün bulunmuştu` : ''}

**ÜRÜN HİYERARŞİSİ (ÖNEMLİ!):**
Kablo Kanalları
  ├─ SCT (Standart Tip) → 40H, 50H, 60H, 80H, 100H
  ├─ CT (Ağır Hizmet) → 40H, 50H, 60H, 80H, 100H
  ├─ SUCT (Deliksiz Standart) → 40H, 50H, 60H
  ├─ HUCT (Deliksiz Ağır Hizmet) → 50H, 60H, 80H
  ├─ ICT (Formlu/Geçmeli) → 40H, 50H, 60H
  ├─ TRU (Trunking) → 80H, 100H, 120H, 150H
  └─ Her ürünün KENDİ aksesuarları var!

**İNTENT TİPLERİ:**
- **product_search**: Ürün/kanal arama
- **product_accessories**: "aksesuarları", "aksesuarları neler", "bunun aksesuarları"
- **contact_info**: İletişim
- **company_info**: Hakkımızda
- **follow_up_search**: Filtre (context varsa)
- **incomplete_search**: Bilgi eksik
- **general**: Diğer

**QUERY HAZıRLAMA KURALLARI:**

1. **ÜRÜN TİPİ + BOYUT + KELİMELER:**
   - "50lik sct kanal" → searchQuery: "sct 50", productType: "sct"
   - "pregalvaniz 40lık standart tip" → searchQuery: "sct 40 pregal", productType: "sct"
   - "60mm trunking kablo kanalı" → searchQuery: "tru 60", productType: "tru"

2. **AKSESUAR SORGUSU:**
   - "50lik sct kanalının aksesuarları" → intent: "product_accessories", searchQuery: "sct 50", productType: "sct"
   - "bu ürünün aksesuarları" → intent: "product_accessories" (context kullan)

3. **NORMALİZE:**
   - Türkçe karakter yok (ş→s, ğ→g)
   - "lik" ekini kaldır
   - Gereksiz kelime yok

**ÖRNEKLER:**

"50lik pregalvaniz sct kablo kanallarının aksesuarları neler"
→ {"intent": "product_accessories", "searchQuery": "sct 50 pregal", "productType": "sct", "size": "50"}

"40lık standart tip kanal"
→ {"intent": "product_search", "searchQuery": "sct 40", "productType": "sct", "size": "40"}

"trunking kablo kanalları 80mm"
→ {"intent": "product_search", "searchQuery": "tru 80", "productType": "tru", "size": "80"}

**ÜRÜN TİPLERİNİ MUTLAKA ÇIKAR: sct, ct, suct, huct, ict, tru**`

  try {
    // Basit regex tabanlı analiz (OpenAI key yoksa)
    if (!openaiKey) {
      console.log('⚠️ OpenAI key yok, fallback kullanılıyor')
      return simpleAnalysis(message, context)
    }
    
    console.log('🤖 GPT analizi başlıyor:', { message, hasContext: !!context.lastSearchQuery })

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
          description: 'Kullanıcı mesajını analiz et, günlük Türkçeyi arama query\'sine çevir',
          parameters: {
            type: 'object',
            properties: {
              intent: {
                type: 'string',
                enum: ['company_info', 'contact_info', 'product_search', 'incomplete_search', 'follow_up_search', 'product_details', 'product_accessories', 'general'],
                description: 'Kullanıcının niyeti'
              },
              searchQuery: {
                type: 'string',
                description: 'TEMİZ arama terimi. MUTLAKA ürün tipini içersin! Örnek: "50lik sct kanal" → "sct 50", "trunking 80mm" → "tru 80"'
              },
              productType: {
                type: 'string',
                enum: ['sct', 'ct', 'suct', 'huct', 'ict', 'tru', 'other'],
                description: 'Ürün tipi kodu: sct (standart), ct (ağır hizmet), suct (deliksiz standart), huct (deliksiz ağır), ict (formlu), tru (trunking)'
              },
              size: {
                type: 'string',
                description: 'Boyut (40, 50, 60, 80, 100, vb.) - sadece sayı'
              },
              coatingType: { 
                type: 'string',
                enum: ['pregalvaniz', 'sıcak daldırma', 'boyalı', 'elektro'],
                description: 'Kaplama tipi - sadece mesajda açıkça belirtilmişse'
              },
              height: { 
                type: 'string',
                description: 'Yükseklik (mm) - sadece açıkça belirtilmişse (örn: "60mm yükseklik")'
              },
              width: { 
                type: 'string',
                description: 'Genişlik (mm) - sadece açıkça belirtilmişse'
              },
              missingParams: {
                type: 'array',
                items: { type: 'string' },
                description: 'Eksik parametreler listesi'
              },
              clarificationNeeded: {
                type: 'string',
                description: 'Kullanıcıya sorulacak açıklayıcı soru'
              }
            },
            required: ['intent']
          }
        }],
        function_call: { name: 'analyze_intent' },
        temperature: 0
      })
    })

    const data = await response.json()
    
    if (!data.choices || !data.choices[0]?.message?.function_call) {
      console.error('❌ GPT response invalid:', JSON.stringify(data))
      return simpleAnalysis(message, context)
    }
    
    const result = JSON.parse(data.choices[0].message.function_call.arguments)
    
    console.log('✅ GPT Analysis SUCCESS:', {
      original: message,
      intent: result.intent,
      searchQuery: result.searchQuery,
      coatingType: result.coatingType,
      height: result.height,
      width: result.width
    })
    
    return result

  } catch (error) {
    console.error('GPT analysis error:', error)
    // Fallback to simple analysis
    return simpleAnalysis(message, context)
  }
}

// Türkçe karakter normalize
function normalizeTurkish(text: string): string {
  return text
    .replace(/İ/g, 'i')
    .replace(/ı/g, 'i')
    .replace(/ş/g, 's')
    .replace(/Ş/g, 's')
    .replace(/ğ/g, 'g')
    .replace(/Ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/Ü/g, 'u')
    .replace(/ö/g, 'o')
    .replace(/Ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/Ç/g, 'c')
}

// Basit analiz (fallback)
function simpleAnalysis(message: string, context: any): any {
  const lower = message.toLowerCase().trim()
  const normalized = normalizeTurkish(lower)
  
  console.log('🔄 Fallback Analysis:', { message: lower, normalized, hasContext: !!context.lastSearchQuery })

  // Company info - ÖNCE KONTROL ET!
  if (normalized.includes('hakkin') || normalized.includes('hakkim') ||
      normalized.includes('kimsin') || normalized.includes('ne yapiyor') ||
      normalized.includes('sirket') || normalized.includes('firma') ||
      normalized.includes('ipos steel') || normalized.includes('biz kimiz')) {
    console.log('✅ Intent: company_info')
    return { intent: 'company_info' }
  }

  // Contact info - İKİNCİ KONTROL
  if (normalized.includes('iletisim') || 
      normalized.includes('telefon') || normalized.includes('tel') || 
      normalized.includes('adres') || normalized.includes('nerede') || 
      normalized.includes('mail') || normalized.includes('email') ||
      normalized.includes('ulas') || normalized.includes('irtibat')) {
    console.log('✅ Intent: contact_info')
    return { intent: 'contact_info' }
  }

  // Follow-up search - CONTEXT VARSA
  if (context.lastSearchQuery) {
    // "80mm olanları", "pregalvaniz olanları", "40lıkları getir"
    if (normalized.match(/(\d+\s*mm|lik).*olan|olan.*(\d+)|getir|goster|filtrele|bunlari/i) ||
        normalized.match(/pregal|sicak|boyali|elektro.*olan/i)) {
      
      let searchQuery = message.replace(/(\d+)\s*l[ıi]k(lar[ıi])?/gi, '$1').trim()
      let coatingType = normalized.includes('pregal') ? 'pregalvaniz' : 
                       normalized.includes('sicak') ? 'sıcak daldırma' :
                       normalized.includes('boyali') ? 'boyalı' : undefined
      
      console.log('✅ Intent: follow_up_search', { searchQuery, coatingType })
      return {
        intent: 'follow_up_search',
        searchQuery: searchQuery,
        coatingType: coatingType
      }
    }
  }

  // Product accessories
  if ((normalized.includes('bunun') || normalized.includes('bu urun')) && 
      (normalized.includes('aksesuar') || normalized.includes('modul') || normalized.includes('kapak'))) {
    console.log('✅ Intent: product_accessories')
    return { intent: 'product_accessories' }
  }

  // Incomplete search - çok kısa ve belirsiz
  if (normalized.length < 5 || normalized === 'kanal' || normalized === 'urun') {
    console.log('✅ Intent: incomplete_search (too vague)')
    return { 
      intent: 'incomplete_search',
      clarificationNeeded: '🤔 Hangi ürünü arıyorsunuz?\n\nÖrnek: "50lik pregalvaniz kablo kanalı"'
    }
  }

  // Product search - Türkçe normalize et
  let searchQuery = message
    .replace(/(\d+)\s*l[ıi]k(lar[ıi])?/gi, '$1')  // "50lik" → "50"
    .replace(/pregalvaniz/gi, 'pregal')
    .trim()
  
  console.log('✅ Intent: product_search', { searchQuery })
  return {
    intent: 'product_search',
    searchQuery: searchQuery
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
      response += `*${about.title}*\n\n`
      
      // Description'ı kısalt (max 800 karakter)
      const description = about.description.length > 800 
        ? about.description.substring(0, 800) + '...' 
        : about.description
      response += `${description}\n\n`
    }

    if (missionVision) {
      // Misyon - max 300 karakter
      const mission = missionVision.mission.length > 300
        ? missionVision.mission.substring(0, 300) + '...'
        : missionVision.mission
      response += `🎯 *Misyonumuz:*\n${mission}\n\n`
      
      // Vizyon - max 300 karakter
      const vision = missionVision.vision.length > 300
        ? missionVision.vision.substring(0, 300) + '...'
        : missionVision.vision
      response += `👁️ *Vizyonumuz:*\n${vision}\n\n`
    }

    response += `📞 Detaylı bilgi: /iletisim\n🌐 Web: https://ipossteel.com`

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
      response: '🏢 *IPOS Steel*\n\nÇelik konstrüksiyon ve kablo kanalı sistemleri alanında öncü şirketiz.\n\n📦 Ürünlerimiz: Kablo kanalları, modüller, aksesuarlar\n🏭 Üretim: Yüksek kalite standartları\n\n📞 İletişim: /iletisim',
      requiresMoreInfo: false
    }
  }
}

// İletişim bilgisi
async function handleContactInfo(analysis: any) {
  const response = `📞 *İletişim Bilgileri*\n\n☎️ Telefon: +90 (262) 674 47 67\n✉️ Email: info@ipos-steel.com\n🌐 Website: https://ipossteel.com\n📍 Adres: Köseler, Kocaeli Kafe OSB, 1. Cd. No:22, 41420 Dilovası/Kocaeli\n\n💬 Mesai Saatleri:\nPazartesi - Cuma: 08:30 - 17:30\n\n📋 Katalog indirmek için: /catalog`

  return {
    success: true,
    intent: 'contact_info',
    response,
    requiresMoreInfo: false
  }
}

// Ürün arama
async function handleProductSearch(analysis: any, context: any) {
  // GPT'nin hazırladığı parametreleri AYNEN kullan
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
  
  console.log('🔍 Search Starting...')
  console.log('   URL:', searchUrl)
  console.log('   GPT Query:', analysis.searchQuery)
  console.log('   Coating:', analysis.coatingType || 'none')
  
  try {
    const response = await fetch(searchUrl)
    const data = await response.json()

    console.log('📦 Search results:', { 
      success: data.success, 
      totalResults: data.totalResults,
      query: data.query 
    })

    if (data.success && data.results && data.results.length > 0) {
      return {
        success: true,
        intent: 'product_search',
        response: `✅ ${data.totalResults} ürün bulundu!`,
        searchResults: data.results.slice(0, 20),
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
    console.error('Product search error:', error)
    return {
      success: false,
      intent: 'product_search',
      response: `Arama sırasında bir hata oluştu: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}`,
      searchResults: [],
      requiresMoreInfo: false,
      errorDetails: error instanceof Error ? error.stack : undefined
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

// Ürün aksesuarları - SubProduct bazlı!
async function handleProductAccessories(analysis: any, context: any) {
  // Aksesuarları bulmak için ürün bilgisi lazım
  const productQuery = analysis.searchQuery || context.lastSearchQuery?.q
  
  if (!productQuery) {
    return {
      success: true,
      intent: 'product_accessories',
      response: '❓ Hangi ürünün aksesuarlarını merak ediyorsunuz?\n\nÖrnek: "50lik sct kanalının aksesuarları"',
      requiresMoreInfo: true
    }
  }

  try {
    console.log('🔧 Aksesuar arama:', { productQuery, productType: analysis.productType, size: analysis.size })
    
    // 1. Önce ana ürünü/kanalı bul
    const params = new URLSearchParams()
    params.append('q', productQuery)
    if (analysis.productType) params.append('productType', analysis.productType)
    if (analysis.size) params.append('size', analysis.size)
    
    const baseUrl = process.env.NODE_ENV === 'production'
      ? 'https://ipos-steel.vercel.app'
      : 'http://localhost:3000'
    const searchUrl = `${baseUrl}/api/search/products?${params.toString()}`
    
    const productResponse = await fetch(searchUrl)
    const productData = await productResponse.json()

    if (!productData.success || productData.results.length === 0) {
      return {
        success: true,
        intent: 'product_accessories',
        response: '❌ Ürün bulunamadı. Lütfen ürün adını kontrol edin.',
        requiresMoreInfo: true
      }
    }

    // 2. İlk ürünün SubProduct ID'sini al
    const firstProduct = productData.results[0]
    const subProductId = firstProduct.subProductId

    if (!subProductId) {
      return {
        success: true,
        intent: 'product_accessories',
        response: '⚠️ Bu ürün için SubProduct bilgisi bulunamadı.',
        requiresMoreInfo: false
      }
    }

    // 3. Bu SubProduct'ın aksesuarlarını getir
    const accessoryParams = new URLSearchParams()
    accessoryParams.append('subProductId', subProductId)
    accessoryParams.append('type', 'accessory')
    
    const accessoryUrl = `${baseUrl}/api/search/products?${accessoryParams.toString()}`
    const accessoryResponse = await fetch(accessoryUrl)
    const accessoryData = await accessoryResponse.json()

    if (accessoryData.success && accessoryData.results.length > 0) {
      const accessories = accessoryData.results.filter((r: any) => r.type === 'accessory')
      
      return {
        success: true,
        intent: 'product_accessories',
        response: `🔧 *${firstProduct.name}* için ${accessories.length} aksesuar bulundu:`,
        searchResults: accessories,
        requiresMoreInfo: false
      }
    } else {
      return {
        success: true,
        intent: 'product_accessories',
        response: `ℹ️ *${firstProduct.name}* için tanımlı aksesuar bulunamadı.`,
        searchResults: [],
        requiresMoreInfo: false
      }
    }

  } catch (error) {
    console.error('Aksesuar arama hatası:', error)
    return {
      success: false,
      intent: 'product_accessories',
      response: 'Aksesuar bilgisi alınırken hata oluştu.',
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

