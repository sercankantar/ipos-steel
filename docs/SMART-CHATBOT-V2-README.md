# 🧠 IPOS Steel Akıllı Chatbot v2.0

## 🎯 NE DEĞİŞTİ?

### v1.0 → v2.0 Karşılaştırma

| Özellik | v1.0 | v2.0 |
|---------|------|------|
| **Konuşma Hafızası** | ❌ Yok | ✅ Var (context-aware) |
| **Eksik Bilgi Tespiti** | ❌ Yok | ✅ Kullanıcıya sorar |
| **Follow-up Search** | ❌ Her seferinde tam sorgu | ✅ "40lıkları getir" yeterli |
| **Şirket Bilgileri** | ❌ Yok | ✅ /hakkimizda'dan çeker |
| **İletişim Bilgileri** | ❌ Hardcoded | ✅ API'den çeker |
| **İlişkisel Sorgular** | ❌ Yok | ✅ "bunun aksesuarları" anlar |
| **Akıllı Öneri** | ❌ Yok | ✅ Butonlarla seçenekler |

---

## 💬 KULLANICI DENEYİMİ

### Senaryo 1: Eksik Parametre

**v1.0:**
```
👤: "kablo kanalı"
🤖: ❌ Sonuç yok veya çok fazla sonuç
```

**v2.0:**
```
👤: "kablo kanalı"
🤖: 🤔 Hangi boyutta arıyorsunuz?
    [40mm] [45mm] [50mm]
    [60mm] [80mm] [100mm]

👤: "50mm" (veya butona tıklar)
🤖: ✅ 50mm kablo kanalı - 8 ürün bulundu!
```

### Senaryo 2: Bağlamsal Arama

**v1.0:**
```
👤: "50lik pregal kanal"
🤖: ✅ 8 ürün

👤: "40lıkları getir"
🤖: ❌ "40lıkları" anlamadı, yeni arama yaptı
```

**v2.0:**
```
👤: "50lik pregal kanal"
🤖: ✅ 8 ürün bulundu

👤: "40lıkları getir"
🤖: ✅ 40mm pregal kablo kanalı - 5 ürün
    (Önceki "kablo kanalı" aramanızı hatırladım!)

👤: "pregalvaniz olanları"
🤖: ✅ Pregalvaniz 40mm kablo kanalı
    (Hem boyutu hem kaplama tipini hatırladım!)
```

### Senaryo 3: İlişkisel Sorgular

**v1.0:**
```
👤: "bunun aksesuarları"
🤖: ❌ Anlamadı
```

**v2.0:**
```
👤: "50lik pregal kanal"
🤖: ✅ 8 ürün bulundu
    1. Standart Kablo Kanalı SK-5050-PG...

👤: "bunun aksesuarları neler?"
🤖: ✅ İlgili aksesuarlar:
    1. Köşe Bağlantı Parçası
    2. Dirsek 90°
    3. T Bağlantı...
    (Son ürünü hatırladım!)

👤: "modülleri de var mı?"
🤖: ✅ İlgili modüller:
    1. Solar Modül...
```

### Senaryo 4: Kurumsal Bilgiler

**v2.0 (Yeni!):**
```
👤: "hakkınızda bilgi"
🤖: 🏢 *IPOS Steel Hakkında*
    
    IPOS Steel, 2005 yılından beri...
    
    🎯 Misyonumuz: ...
    👁️ Vizyonumuz: ...
    
    [📞 İletişim] [📋 Katalog]

👤: "iletişim bilgileri"
🤖: 📞 *İletişim Bilgileri*
    
    ☎️ Telefon: +90 XXX XXX XX XX
    ✉️ Email: info@ipossteel.com
    🌐 Website: ...
```

---

## 🏗️ TEKNİK MİMARİ

### Sistem Akışı

```
[Telegram User]
    ↓ mesaj
[n8n Workflow]
    ↓ userId + message
┌─────────────────────────┐
│ Intelligence API        │ ← Akıllı beyin
│ /api/chatbot/intelligence│
│                          │
│ • Intent analizi         │
│ • Context yönetimi       │
│ • Memory management      │
│ • GPT entegrasyonu       │
└────────┬────────────────┘
         ↓
    ┌────┴────┐
    ↓         ↓         ↓         ↓
[Search]  [About]  [Contact]  [Memory]
  API       API       API       Store
```

### Yeni API Endpoint'leri

```typescript
POST   /api/chatbot/intelligence
GET    /api/chatbot/conversation?userId=X
POST   /api/chatbot/conversation
DELETE /api/chatbot/conversation?userId=X

// Mevcut API'ler
GET    /api/search/products
GET    /api/about
GET    /api/mission-vision
```

---

## 🚀 KURULUM (15 Dakika)

### 1. Backend API'leri Deploy Et (5 dk)

```bash
# Yeni dosyalar eklendi:
✅ src/app/api/chatbot/intelligence/route.ts
✅ src/app/api/chatbot/conversation/route.ts

# Deploy
git add .
git commit -m "Add smart chatbot v2 APIs"
vercel deploy
```

### 2. n8n Workflow Import Et (5 dk)

```
1. n8n → Workflows → Import from File
2. docs/n8n-smart-chatbot-v2.json seç
3. Credential'ları yapılandır:
   - Telegram Bot Token
   - OpenAI API Key
4. YOUR-DOMAIN.com değiştir
5. Save & Activate ✅
```

### 3. Test Et (5 dk)

```
✅ "kablo kanalı" → Bot soru sordu mu?
✅ "50lik" → Buldu mu?
✅ "40lıkları getir" → Context'i hatırladı mı?
✅ "bunun aksesuarları" → İlgili ürünleri gösterdi mi?
✅ "hakkınızda" → Şirket bilgisi geldi mi?
✅ "/clear" → Memory temizlendi mi?
```

---

## 📊 CONVERSATION ÖRNEKLER

### Örnek 1: Adım Adım Arama

```
Session Start
─────────────

👤: kablo kanalı

🤖: 🤔 Hangi boyutta arıyorsunuz?
    
    Popüler boyutlar:
    [40mm] [45mm] [50mm]
    [60mm] [80mm] [100mm]
    
    💡 Veya "50lik" yazabilirsiniz.

[Memory: lastSearchQuery = {q: "kablo kanalı"}]

👤: 50lik

🤖: ✅ 50mm kablo kanalı - 8 ürün bulundu!
    
    1. Standart Kablo Kanalı 50x50
       📏 50×50mm | 🎨 Pregalvaniz
    
    2. Premium Kablo Kanalı 50x60
       📏 50×60mm | 🎨 Sıcak Daldırma
    
    ...
    
    💡 İpucu: "pregalvaniz olanları" 
       diyerek filtreleyebilirsiniz.

[Memory: lastSearchQuery = {q:"kablo kanalı", height:"50", width:"50"}]
[Memory: lastSearchResults = [8 products]]

👤: pregalvaniz olanları

🤖: ✅ Pregalvaniz 50mm kablo kanalı - 5 ürün
    
    1. Standart Kablo Kanalı SK-5050-PG
    2. Deluxe Kablo Kanalı SK-5060-PG
    ...

[Memory: updated lastSearchQuery.coatingType = "pregalvaniz"]

👤: bunun aksesuarları neler?

🤖: 📦 İlgili aksesuarlar:
    
    1. Köşe Bağlantı Parçası KP-50
    2. L Dirsek 90° LD-50-PG
    3. T Bağlantı TB-50
    ...
    
    [🔍 Yeni Arama] [📋 Filtrele]

[Memory: lastProductId = "clxx123"]
```

### Örnek 2: Şirket Bilgisi

```
👤: hakkınızda bilgi verir misiniz?

🤖: 🏢 *IPOS Steel Hakkında*
    
    IPOS Steel, 2005 yılından beri çelik
    konstrüksiyon ve kablo kanalı sistemleri
    alanında faaliyet göstermektedir.
    
    🎯 *Misyonumuz:*
    Müşterilerimize en kaliteli ürünleri,
    en uygun fiyatlarla sunmak...
    
    👁️ *Vizyonumuz:*
    Sektörde lider olmak ve sürdürülebilir
    büyüme ile...
    
    [📞 İletişim] [📋 Katalog] [🔍 Ürün Ara]

👤: iletişim

🤖: 📞 *İletişim Bilgileri*
    
    ☎️ Telefon: +90 XXX XXX XX XX
    ✉️ Email: info@ipossteel.com
    🌐 Website: https://ipossteel.com
    📍 Adres: [Adres]
    
    💬 Mesai Saatleri:
    Pazartesi - Cuma: 08:30 - 17:30
```

---

## 🎯 YENİ ÖZELLİKLER DETAY

### 1. Konuşma Hafızası (Memory)

**Nasıl Çalışır:**
- Her kullanıcı için unique ID (telegram_CHATID)
- Son 20 mesaj saklanır
- Context bilgisi: son arama, son sonuçlar, son ürün
- In-memory store (production'da Redis)

**Kullanım:**
```javascript
// Context store
{
  lastSearchQuery: {q: "kanal", height: "50"},
  lastSearchResults: [...],
  lastProductId: "clxx123",
  conversationHistory: [...]
}
```

### 2. Intent Analizi (GPT-powered)

**Intent Tipleri:**
- `product_search` - Tam arama (parametreler tamam)
- `incomplete_search` - Eksik parametre var (kullanıcıya sor)
- `follow_up_search` - Önceki aramayı güncelle
- `product_details` - Ürün detayı iste
- `product_accessories` - İlişkili ürünler
- `company_info` - Şirket bilgisi
- `contact_info` - İletişim bilgisi
- `general` - Genel sohbet

### 3. Akıllı Soru Sorma

**Eksik parametre varsa:**
```
Bot: 🤔 Hangi boyutta arıyorsunuz?
     [40mm] [45mm] [50mm]
```

**Belirsizlik varsa:**
```
Bot: 🤔 Şunlardan hangisini arıyorsunuz?
     • Kablo Kanalı
     • Solar Modül
     • Aksesuar
```

### 4. Bağlamsal Yanıtlar

**Follow-up Search:**
```
Context: {lastSearchQuery: {q: "kanal", height: "50"}}
User: "40lıkları getir"
→ Update: height = "40"
→ Search: kanal + 40mm
```

**İlişkisel Sorgu:**
```
Context: {lastProductId: "SK-5050-PG"}
User: "bunun aksesuarları"
→ Search: accessories for SK-5050-PG
```

---

## 💰 MALİYET ANALİZİ

### v1.0 vs v2.0

| Metrik | v1.0 | v2.0 |
|--------|------|------|
| Token/mesaj | ~600 | ~1200 |
| Maliyet/mesaj | $0.000135 | $0.0003 |
| 1000 mesaj/ay | $0.13 | $0.30 |
| 10,000 mesaj/ay | $1.35 | $3.00 |

**Neden biraz daha pahalı?**
- Conversation history GPT'ye gönderiliyor
- Context management (+300 token)
- Daha detaylı system prompt (+200 token)

**Ama yine de ÇOK UCUZ!** ☕
- 1 kahve = 10,000 akıllı mesaj!

---

## 🔧 PRODUCTION İYİLEŞTİRMELERİ

### 1. Redis ile Memory Store

```typescript
// Şimdi: In-memory Map
const conversations = new Map()

// Production: Redis
import Redis from 'ioredis'
const redis = new Redis(process.env.REDIS_URL)

await redis.setex(
  `conversation:${userId}`, 
  86400, // 24 saat
  JSON.stringify(context)
)
```

### 2. Rate Limiting

```typescript
import { Ratelimit } from '@upstash/ratelimit'

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '1 m') // 10 mesaj/dk
})

const { success } = await ratelimit.limit(userId)
if (!success) return 'Too many requests'
```

### 3. Analytics & Monitoring

```typescript
// Prisma model
model ChatLog {
  id String @id @default(cuid())
  userId String
  message String
  intent String
  success Boolean
  responseTime Int
  timestamp DateTime @default(now())
}

// Log every interaction
await prisma.chatLog.create({
  data: {
    userId,
    message,
    intent,
    success: true,
    responseTime: Date.now() - startTime
  }
})
```

### 4. Error Handling & Fallbacks

```typescript
try {
  // GPT ile analiz
  const analysis = await analyzeWithGPT()
} catch (error) {
  // Fallback: Regex-based analysis
  const analysis = simpleAnalysis()
}
```

---

## 📋 KONTROL LİSTESİ

### Backend
- [ ] API'leri deploy et
- [ ] Environment variables ayarla
- [ ] Redis setup (production)
- [ ] Test et (Postman)

### n8n
- [ ] Workflow import et
- [ ] Telegram credential
- [ ] OpenAI credential
- [ ] Domain değiştir
- [ ] Activate

### Test
- [ ] Komutlar (/start, /help, /clear)
- [ ] Basit arama
- [ ] Eksik parametre testi
- [ ] Follow-up search
- [ ] İlişkisel sorgu
- [ ] Şirket bilgisi
- [ ] İletişim bilgisi

---

## 📚 DOKÜMANTASYON

### Ana Dosyalar
- `docs/SMART-CHATBOT-V2-README.md` - Bu dosya (özet)
- `docs/n8n-smart-chatbot-v2.md` - Detaylı teknik döküman
- `docs/n8n-smart-chatbot-v2.json` - Import dosyası

### API Dosyaları
- `src/app/api/chatbot/intelligence/route.ts` - Ana beyin
- `src/app/api/chatbot/conversation/route.ts` - Memory store

---

## 🎉 SONUÇ

### Öncesi (v1.0)
- ✅ Basit arama
- ✅ GPT ile doğal dil
- ❌ Hafıza yok
- ❌ Bağlam yok

### Sonrası (v2.0)
- ✅ Akıllı arama
- ✅ Konuşma hafızası ⭐
- ✅ Bağlamsal sorgular ⭐
- ✅ Eksik bilgi tespiti ⭐
- ✅ İlişkisel sorgular ⭐
- ✅ Şirket bilgileri ⭐
- ✅ Akıllı öneri sistemi ⭐

### Kullanıcı Memnuniyeti
```
v1.0: 😊 İyi
v2.0: 🤩 Mükemmel!
```

**Artık botunuz gerçekten akıllı!** 🧠🚀

---

## 📞 DESTEK

Sorularınız için:
- Teknik detay: `docs/n8n-smart-chatbot-v2.md`
- API referansı: Kod içi açıklamalar
- n8n workflow: Import JSON dosyası

**Başarılar!** 🎯

