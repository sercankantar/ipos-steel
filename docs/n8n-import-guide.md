# 🚀 n8n Workflow Import Rehberi - 10 Dakika

## 📦 DOSYA

**Import Edilecek:** `docs/n8n-smart-chatbot-v2.json`

---

## ⚡ HIZLI KURULUM (10 Dakika)

### ADIM 1: Workflow Import Et (2 dk)

1. n8n'i aç
2. **Workflows** sekmesine git
3. Sağ üst köşede **"..."** → **Import from File**
4. `docs/n8n-smart-chatbot-v2.json` dosyasını seç
5. **Import** tıkla
6. ✅ Workflow yüklendi!

---

### ADIM 2: Credentials Ayarla (5 dk)

#### A) Telegram Bot Credential

**Aşağıdaki 3 node'da aynı Telegram credential'ı seçin:**

1. **Telegram Trigger** node
   - Credential: Telegram Bot
   - Token: `7XXXXXXXXX:AAH...`

2. **Telegram Reply** node
   - Credential: Aynı Telegram Bot

3. **Telegram Reply (Command)** node
   - Credential: Aynı Telegram Bot

**Eğer Telegram credential yoksa:**
```
1. n8n → Settings → Credentials → New
2. Type: Telegram
3. Access Token: 7XXXXXXXXX:AAH... (BotFather'dan aldığınız)
4. Save
```

#### B) OpenAI Credential (Opsiyonel ama önerilen)

**Sadece 1 node'da:**

**Intelligence API** node
- Credential: OpenAI API
- API Key: `sk-proj-...`

**Eğer OpenAI credential yoksa:**
```
1. n8n → Settings → Credentials → New
2. Type: OpenAI
3. API Key: sk-proj-... (OpenAI'dan aldığınız)
4. Save
```

---

### ADIM 3: Domain Değiştir (2 dk)

**Aşağıdaki 2 node'da YOUR-DOMAIN.com'u değiştirin:**

#### 1. **Clear Conversation API** node
```
Eski: https://YOUR-DOMAIN.com/api/chatbot/conversation
Yeni: https://ipossteel.com/api/chatbot/conversation
```

#### 2. **Intelligence API** node
```
Eski: https://YOUR-DOMAIN.com/api/chatbot/intelligence
Yeni: https://ipossteel.com/api/chatbot/intelligence
```

**Test için localhost:**
```
http://localhost:3000/api/chatbot/intelligence
```

---

### ADIM 4: Test ve Aktifleştir (1 dk)

1. **Test Et:**
   - Workflow'da sağ üstte **"Execute Workflow"** tıkla
   - Telegram'dan botunuza mesaj gönder: "/start"
   - n8n'de execution'ı gör ✅

2. **Aktifleştir:**
   - Sağ üst köşede **"Inactive"** → **"Active"**
   - ✅ Bot artık çalışıyor!

---

## 📋 WORKFLOW YAPISI

### 14 Node

```
1. Telegram Trigger          → Mesaj geldiğinde tetiklenir
2. Prepare Context           → User ID, komut kontrolü
3. Is Command?               → Komut mu yoksa mesaj mı?
4. Handle Command            → Komut işle
5. Should Clear?             → Memory temizlensin mi?
6. Clear Conversation API    → Memory temizle
7. Intelligence API          → Akıllı analiz (Ana beyin)
8. Route by Intent           → Intent'e göre yönlendir
9. Format Search Results     → Arama sonuçlarını formatla
10. Format Question          → Soru formatla (butonlar)
11. Format Info              → Bilgi formatla
12. Format General           → Genel yanıt
13. Telegram Reply           → Ana yanıt gönder
14. Telegram Reply (Command) → Komut yanıtı gönder
```

### Akış Şeması

```
[Telegram Trigger]
    ↓
[Prepare Context]
    ↓
[Is Command?]
    ├─ YES → [Handle Command]
    │           ↓
    │        [Should Clear?]
    │           ├─ YES → [Clear API]
    │           └─ NO ↓
    │        [Telegram Reply (Command)]
    │
    └─ NO → [Intelligence API]
               ↓
            [Route by Intent]
               ├─ product_search → [Format Results]
               ├─ incomplete_search → [Format Question]
               ├─ follow_up_search → [Format Results]
               ├─ company_info → [Format Info]
               ├─ contact_info → [Format Info]
               ├─ product_accessories → [Format Results]
               ├─ product_details → [Format Results]
               └─ general → [Format General]
               ↓
            [Telegram Reply]
```

---

## 🔧 YAPILANDIRMA DETAYLARI

### Değiştirilmesi Gereken Yerler

#### 1. Domain (2 yerde)
```javascript
// Clear Conversation API node
https://YOUR-DOMAIN.com → https://ipossteel.com

// Intelligence API node  
https://YOUR-DOMAIN.com → https://ipossteel.com
```

#### 2. Credentials (3 yerde)
```
Telegram Trigger → Telegram credential seç
Telegram Reply → Telegram credential seç
Telegram Reply (Command) → Telegram credential seç
Intelligence API → OpenAI credential seç (opsiyonel)
```

#### 3. Telefon Numarası (Opsiyonel)
```javascript
// Format Search Results node içinde
'📞 Teklif: +90 XXX XXX XX XX'
→ Kendi numaranızı yazın
```

---

## ✅ KONTROL LİSTESİ

Import öncesi:
- [ ] n8n kurulu ve çalışıyor
- [ ] Telegram bot oluşturulmuş (BotFather)
- [ ] OpenAI API key alınmış (opsiyonel)
- [ ] Backend API'ler deploy edilmiş

Import sırasında:
- [ ] JSON dosyası import edildi
- [ ] Telegram credential eklendi (3 node)
- [ ] OpenAI credential eklendi (1 node)
- [ ] Domain değiştirildi (2 node)
- [ ] Telefon numarası güncellendi (opsiyonel)

Import sonrası:
- [ ] Workflow aktifleştirildi
- [ ] Test edildi: /start
- [ ] Test edildi: /help
- [ ] Test edildi: /clear
- [ ] Test edildi: "kablo kanalı"
- [ ] Test edildi: "50lik pregal"

---

## 🧪 TEST SENARYOLARI

### Test 1: Komutlar
```
👤: /start
🤖: ✅ Hoş geldin mesajı geldi mi?

👤: /help
🤖: ✅ Yardım mesajı geldi mi?

👤: /clear
🤖: ✅ "Konuşma temizlendi" mesajı geldi mi?
```

### Test 2: Basit Arama
```
👤: kablo kanalı
🤖: ✅ Soru soruyor mu? (Boyut soruyor)

👤: 50lik
🤖: ✅ Ürün buluyor mu?
```

### Test 3: Follow-up Search
```
👤: 50lik pregal kanal
🤖: ✅ Ürün buldu

👤: 40lıkları getir
🤖: ✅ Önceki aramayı hatırladı mı?
     (40mm pregal kanal bulmalı)
```

### Test 4: Şirket Bilgisi
```
👤: hakkınızda
🤖: ✅ Şirket bilgisi geldi mi?

👤: iletişim
🤖: ✅ İletişim bilgileri geldi mi?
```

### Test 5: İlişkisel Sorgu
```
👤: 50lik kanal
🤖: ✅ Ürün buldu

👤: bunun aksesuarları
🤖: ✅ İlgili aksesuarları gösterdi mi?
```

---

## 🐛 SORUN GİDERME

### ❌ "Workflow import edilemiyor"

**Sorun:** JSON formatı hatalı

**Çözüm:**
1. Dosyayı text editor ile aç
2. JSON validator'dan geçir (jsonlint.com)
3. Tekrar import et

---

### ❌ "Telegram credential bulunamıyor"

**Sorun:** Credential düzgün eklenmemiş

**Çözüm:**
1. n8n → Settings → Credentials
2. Telegram credential'ı kontrol et
3. Test et: Telegram → API → Send Message

---

### ❌ "Intelligence API timeout"

**Sorun:** Backend API çalışmıyor veya yavaş

**Çözüm:**
1. Backend API'yi test et:
   ```bash
   curl -X POST https://ipossteel.com/api/chatbot/intelligence \
     -H "Content-Type: application/json" \
     -d '{"userId":"test","message":"test"}'
   ```
2. Timeout'u artır: HTTP Request node → Options → Timeout: 60000

---

### ❌ "OpenAI error"

**Sorun:** API key yanlış veya kredisi yok

**Çözüm:**
1. OpenAI dashboard → API Keys kontrol et
2. Billing → Credits kontrol et
3. Yeni key oluştur ve n8n'e ekle

---

### ❌ "Context hatırlanmıyor"

**Sorun:** Backend memory store çalışmıyor

**Çözüm:**
1. Backend logları kontrol et
2. `/api/chatbot/conversation` endpoint'i test et
3. In-memory store production'da Redis'e çevrilmeli

---

## 📊 EXECUTION LOGS

### Nasıl Kontrol Edilir?

1. n8n → **Executions** sekmesi
2. Son execution'a tıkla
3. Her node'un input/output'unu gör
4. Hata varsa kırmızı ile işaretli

### Debug İpuçları

```javascript
// Function node'larda console.log kullanın
console.log('User Message:', userMessage);
console.log('API Response:', response);
console.log('Intent:', intent);

// n8n execution logs'da görürsünüz
```

---

## 🚀 PRODUCTION İYİLEŞTİRMELERİ

### 1. Error Handling

Her HTTP Request node'a **Error Workflow** ekleyin:

```
HTTP Request node → Settings → On Error → 
  ✅ Continue on Fail
  ✅ Error Workflow seç
```

### 2. Rate Limiting

Intelligence API'ye çok fazla request gidiyorsa:

```javascript
// Function node ekle
const userId = $json.userId;
const lastRequest = global.get(`lastRequest_${userId}`) || 0;
const now = Date.now();

// 1 saniyede 1 request
if (now - lastRequest < 1000) {
  throw new Error('Rate limit exceeded');
}

global.set(`lastRequest_${userId}`, now);
```

### 3. Monitoring

Sentry veya LogRocket ile hata takibi:

```javascript
// Function node
try {
  // İşlem
} catch (error) {
  // Sentry'ye gönder
  await fetch('https://sentry.io/api/...', {
    method: 'POST',
    body: JSON.stringify({
      error: error.message,
      userId,
      timestamp: new Date()
    })
  });
  throw error;
}
```

---

## 📞 DESTEK

### Dokümantasyon
- Import rehberi: Bu dosya
- Detaylı döküman: `docs/n8n-smart-chatbot-v2.md`
- API referansı: `src/app/api/chatbot/`

### Community
- n8n Community: https://community.n8n.io/
- n8n Discord: https://discord.gg/n8n

### Bizimle İletişim
Sorunlarınız için dokümantasyonu kontrol edin veya n8n community'den destek alın.

---

## ✅ BAŞARILI KURULUM

Tebrikler! 🎉

Eğer tüm testler başarılı olduysa, chatbotunuz artık:

- ✅ Konuşmaları hatırlıyor
- ✅ Eksik bilgi soruyor
- ✅ Bağlamsal aramalar yapıyor
- ✅ Şirket bilgilerini veriyor
- ✅ İlişkisel sorguları anlıyor

**Kullanıma hazır!** 🚀

---

## 📈 SONRAKİ ADIMLAR

1. **Production'a Al:**
   - Webhook URL'i ayarla
   - SSL sertifikası kontrol et
   - Monitoring ekle

2. **Optimize Et:**
   - Redis ile memory store
   - Rate limiting ekle
   - Analytics ekle

3. **Genişlet:**
   - WhatsApp desteği ekle
   - Ses mesajı desteği (Whisper)
   - Görsel arama (GPT-4 Vision)

---

**Başarılar!** 🎯


