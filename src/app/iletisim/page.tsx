import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Send,
  Building2,
  Users,
  MessageSquare,
  Globe,
  Award,
  Zap,
  ArrowRight,
  CheckCircle
} from 'lucide-react'

export default function IletisimPage() {
  return (
    <>
      {/* Hero Section - Modern ve Etkileyici */}
      <section className="relative min-h-[70vh] bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-blue/20 to-transparent"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <MaxWidthWrapper className="relative z-10">
          <div className="flex flex-col justify-center min-h-[70vh] text-center">
            <div className="mb-8">
              <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
                🤝 Profesyonel İletişim
              </span>
              <h1 className="font-neuropol text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
                İletişim
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto text-blue-100 leading-relaxed">
                Elektrik dağıtım sistemleri alanında <span className="text-cyan-300 font-semibold">25+ yıllık</span> deneyimimizle 
                projeleriniz için en uygun çözümleri sunuyoruz.
              </p>
            </div>
            
            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button className="h-14 px-8 bg-white text-slate-900 hover:bg-gray-100 font-semibold text-lg group">
                <Phone className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                Hemen Arayın
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button className="h-14 px-8 bg-transparent border-2 border-white text-white hover:bg-white hover:text-slate-900 font-semibold text-lg group">
                <MessageSquare className="mr-2 h-5 w-5" />
                Form Doldurun
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-300">500+</div>
                <div className="text-blue-200">Başarılı Proje</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-300">25+</div>
                <div className="text-blue-200">Yıl Deneyim</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-300">24/7</div>
                <div className="text-blue-200">Teknik Destek</div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* İletişim Yöntemleri - Modern Kartlar */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <MaxWidthWrapper>
          <div className="text-center mb-16">
            <h2 className="font-neuropol text-4xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-blue-800 bg-clip-text text-transparent">
              Size En Uygun İletişim Yolunu Seçin
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Acil durumlar için telefon, detaylı projeler için form, teknik sorular için e-posta
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Telefon */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative card-modern p-8 text-center h-full group-hover:scale-102 transition-all duration-500">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-6 transition-transform duration-500">
                  <Phone className="h-10 w-10 text-white" />
                </div>
                <h3 className="font-neuropol text-2xl font-bold mb-4">Anında Görüşme</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Acil durumlar ve hızlı bilgi için uzman ekibimizle direkt konuşun
                </p>
                <div className="space-y-2 mb-6">
                  <a href="tel:+902323281500" className="block text-2xl font-bold text-blue-600 hover:text-blue-800 transition-colors">
                    (232) 328 15 00
                  </a>
                  <p className="text-sm text-gray-500">Pazartesi - Cuma: 08:00 - 17:30</p>
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0 hover:from-blue-600 hover:to-cyan-600">
                  <Phone className="mr-2 h-4 w-4" />
                  Şimdi Ara
                </Button>
              </div>
            </div>

            {/* E-posta */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative card-modern p-8 text-center h-full group-hover:scale-102 transition-all duration-500">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-6 transition-transform duration-500">
                  <Mail className="h-10 w-10 text-white" />
                </div>
                <h3 className="font-neuropol text-2xl font-bold mb-4">Detaylı Bilgi</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Teknik sorular, fiyat talepleri ve detaylı projeler için
                </p>
                <div className="space-y-2 mb-6">
                  <a href="mailto:info@ipossteel.com" className="block text-xl font-bold text-purple-600 hover:text-purple-800 transition-colors break-all">
                    info@ipossteel.com
                  </a>
                  <p className="text-sm text-gray-500">24 saat içinde yanıt garantisi</p>
                </div>
                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 hover:from-purple-600 hover:to-pink-600">
                  <Mail className="mr-2 h-4 w-4" />
                  E-posta Gönder
                </Button>
              </div>
            </div>

            {/* Ziyaret */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative card-modern p-8 text-center h-full group-hover:scale-102 transition-all duration-500">
                <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-6 transition-transform duration-500">
                  <Building2 className="h-10 w-10 text-white" />
                </div>
                <h3 className="font-neuropol text-2xl font-bold mb-4">Fabrika Ziyareti</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Üretim tesislerimizi görün, ekibimizle yüz yüze görüşün
                </p>
                <div className="space-y-2 mb-6">
                  <p className="font-bold text-emerald-600">Atatürk OSB</p>
                  <p className="text-sm text-gray-500">Çiğli / İzmir</p>
                  <p className="text-sm text-gray-500">Randevu ile</p>
                </div>
                <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0 hover:from-emerald-600 hover:to-teal-600">
                  <MapPin className="mr-2 h-4 w-4" />
                  Randevu Al
                </Button>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* İletişim Formu - Modern Tasarım */}
      <section className="py-20">
        <MaxWidthWrapper>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            
            {/* Sol Taraf - Form */}
            <div className="lg:col-span-3">
              <div className="mb-10">
                <h2 className="font-neuropol text-4xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-blue-800 bg-clip-text text-transparent">
                  Ücretsiz Proje Danışmanlığı
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Projeleriniz için profesyonel çözüm önerisi almak üzere detayları paylaşın. 
                  <span className="text-blue-600 font-semibold"> Uzman ekibimiz 24 saat içinde</span> size geri dönüş yapacak.
                </p>
              </div>
              
              <div className="card-modern p-8 lg:p-10">
                <form className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-base font-semibold text-gray-700 mb-2 block">
                        Ad Soyad *
                      </Label>
                      <Input 
                        id="name" 
                        placeholder="Adınızı ve soyadınızı girin"
                        className="h-12 text-base border-2 border-gray-200 focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <div>
                      <Label htmlFor="company" className="text-base font-semibold text-gray-700 mb-2 block">
                        Şirket / Kurum
                      </Label>
                      <Input 
                        id="company" 
                        placeholder="Şirket veya kurum adınız"
                        className="h-12 text-base border-2 border-gray-200 focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="email" className="text-base font-semibold text-gray-700 mb-2 block">
                        E-posta Adresi *
                      </Label>
                      <Input 
                        id="email" 
                        type="email"
                        placeholder="ornek@email.com"
                        className="h-12 text-base border-2 border-gray-200 focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-base font-semibold text-gray-700 mb-2 block">
                        Telefon Numarası
                      </Label>
                      <Input 
                        id="phone" 
                        placeholder="(5xx) xxx xx xx"
                        className="h-12 text-base border-2 border-gray-200 focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="service" className="text-base font-semibold text-gray-700 mb-2 block">
                      İhtiyacınız Olan Hizmet
                    </Label>
                    <select 
                      id="service"
                      className="h-12 w-full text-base border-2 border-gray-200 focus:border-blue-500 transition-colors rounded-md px-3 bg-white"
                    >
                      <option value="">Hizmet türünü seçin</option>
                      <option value="busbar">🔌 Busbar Sistemleri</option>
                      <option value="aski">🔧 Askı Sistemleri</option>
                      <option value="kablo">📡 Kablo Kanalı Sistemleri</option>
                      <option value="ic-tesisat">💡 İç Tesisat Çözümleri</option>
                      <option value="trolley">🚛 Trolley Busbar Sistemleri</option>
                      <option value="danismanlik">🎯 Proje Danışmanlığı</option>
                      <option value="other">❓ Diğer</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="text-base font-semibold text-gray-700 mb-2 block">
                      Proje Detayları ve Özel Gereksinimler *
                    </Label>
                    <textarea 
                      id="message"
                      rows={6}
                      placeholder="Projeniz hakkında ayrıntılı bilgi verin:&#10;• Kapasite ve alan bilgileri&#10;• Özel teknik gereksinimler&#10;• Zaman çizelgesi&#10;• Bütçe aralığı (isteğe bağlı)"
                      className="w-full text-base border-2 border-gray-200 focus:border-blue-500 transition-colors rounded-md px-4 py-3 resize-none"
                    />
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <input type="checkbox" id="agreement" className="mt-1 h-5 w-5 text-blue-600" />
                    <label htmlFor="agreement" className="text-sm text-gray-600">
                      <span className="font-semibold">KVKK ve Gizlilik Politikası</span>'nı okudum, anladım ve kabul ediyorum. 
                      Kişisel verilerimin işlenmesine onay veriyorum.
                    </label>
                  </div>
                  
                  <Button className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 group">
                    <Send className="mr-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    Ücretsiz Teklif ve Danışmanlık Al
                    <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
              </div>
            </div>

            {/* Sağ Taraf - Bilgiler */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Avantajlar */}
              <div className="card-modern p-8">
                <h3 className="font-neuropol text-2xl font-bold mb-6 text-gray-900">
                  🎯 Neden IPOS Steel?
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">25+ Yıl Sektör Deneyimi</h4>
                      <p className="text-sm text-gray-600">Elektrik dağıtım sistemlerinde köklü uzmanlık</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Zap className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">24 Saat Geri Dönüş</h4>
                      <p className="text-sm text-gray-600">Tüm taleplere hızlı ve profesyonel yanıt</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Award className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">500+ Başarılı Proje</h4>
                      <p className="text-sm text-gray-600">Kanıtlanmış kalite ve güvenilirlik</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Globe className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Türkiye Geneli Hizmet</h4>
                      <p className="text-sm text-gray-600">Coğrafi sınır tanımayan proje desteği</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Çalışma Saatleri */}
              <div className="card-modern p-8 bg-gradient-to-br from-slate-900 to-blue-900 text-white">
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="h-6 w-6 text-cyan-300" />
                  <h3 className="font-neuropol text-xl font-bold">Çalışma Saatlerimiz</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-white/20 pb-2">
                    <span className="text-gray-300">Pazartesi - Cuma</span>
                    <span className="font-bold text-cyan-300">08:00 - 17:30</span>
                  </div>
                  <div className="flex justify-between border-b border-white/20 pb-2">
                    <span className="text-gray-300">Cumartesi</span>
                    <span className="font-bold text-cyan-300">09:00 - 13:00</span>
                  </div>
                  <div className="flex justify-between pb-2">
                    <span className="text-gray-300">Pazar</span>
                    <span className="font-bold text-red-400">Kapalı</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                  <p className="text-sm text-cyan-100">
                    🚨 <strong>Acil Durumlar:</strong> 7/24 teknik destek hattımız mevcuttur
                  </p>
                </div>
              </div>

              {/* İletişim Özeti */}
              <div className="card-modern p-8 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                <h3 className="font-neuropol text-xl font-bold mb-4 text-blue-900">
                  📍 Hızlı İletişim Bilgileri
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-blue-600" />
                    <span className="font-semibold text-blue-900">(232) 328 15 00</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-blue-600" />
                    <span className="font-semibold text-blue-900">info@ipossteel.com</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-blue-600 mt-0.5" />
                    <span className="font-semibold text-blue-900">
                      Atatürk OSB, 10003 Sk. No:5<br />
                      35620 Çiğli / İzmir
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  )
}
