import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { 
  Building2, 
  Users, 
  Award, 
  Target, 
  Eye, 
  Globe,
  Shield,
  CheckCircle,
  Factory,
  TrendingUp
} from 'lucide-react'

export default function HakkimizdaPage() {
  return (
    <>
      {/* Hero Section - Kurumsal */}
      <section className="bg-white py-16 border-b border-gray-200">
        <MaxWidthWrapper>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-neuropol text-4xl lg:text-5xl font-bold text-slate-900">
              Hakkımızda
            </h1>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Şirket Profili */}
      <section className="py-20 bg-white">
        <MaxWidthWrapper>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <h2 className="font-neuropol text-3xl font-bold mb-8 text-slate-900">
                Şirket Profili
              </h2>
              <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
                <p>
                  <strong>35 yılı aşkın tecrübeye sahip, alanında uzman mühendis ve imalat personelinin 
                  vermiş olduğu güven sayesinde kuruluşundan bu yana onlarca projeye imza atan 
                  IPOS-Steel Dış. Tic. A.Ş. bünyesinde, yenilenen kimliğimiz ile faaliyetlerimizi 
                  geliştirip büyütmeye devam etmekteyiz.</strong>
                </p>
                <p>
                  Kablo kanalı üreticisi olmanın yanında elektrik ve endüstriyel malzeme ihtiyaçlarınız için 
                  "Hepsi tek bir noktadan" çözümler sunmaktayız. Ana amacımız müşterilerimize rekabetçi 
                  fiyatlarla yüksek hizmet standardını en kaliteli ürünlerle sunmaktır.
                </p>
                <p>
                  Sizin zamanınız değerli! Tedarikçileri aramak ve her seferinde iş ilişkileri geliştirmek için 
                  zaman ve para harcamak yerine, tüm elektrik ve yapı malzemelerinizi tek bir kaynaktan 
                  sağlamanın avantajını sunmaya çalışıyoruz. Müşterilerimizin her zaman ihtiyaç duyduğu 
                  ve en çok tercih ettiği gerçek bir iş ortağı olma felsefemize bağlıyız.
                </p>
                <p>
                  Avrupa, Orta Doğu, Afrika ve Asya pazarlarındaki ülkeler gibi uluslararası pazarlarda 
                  deneyim sahibiyiz. IPOS-Steel Dış. Tic. A.Ş. olarak müşteri odaklı bir şirket kültürüne 
                  sahip ve Toplam Kalite Yönetimi yaklaşımını benimsemekteyiz.
                </p>
              </div>
            </div>
            
            <div className="rounded-lg overflow-hidden border border-gray-200 h-full">
              {/* Temsili Şirket Fotoğrafı */}
              <div className="relative h-full bg-gradient-to-br from-gray-100 to-gray-200">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 text-sm font-medium">
                      Şirket Fotoğrafı
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      (Güncellenecek)
                    </p>
                  </div>
                </div>
                
                {/* Overlay efekti */}
                <div className="absolute inset-0 bg-white/10"></div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>


      {/* Kurumsal Değerler */}
      <section className="py-20 bg-white">
        <MaxWidthWrapper>
          <div className="text-center mb-16">
            <h2 className="font-neuropol text-3xl font-bold mb-4 text-slate-900">
              Kurumsal Değerlerimiz
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              İş yapış şeklimizi belirleyen temel değerler, tüm faaliyetlerimizde rehber ilkelerimizdir.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Kalite */}
            <div className="text-center p-8 border border-gray-200 rounded-lg">
              <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-slate-700" />
              </div>
              <h3 className="font-neuropol text-xl font-bold text-slate-900 mb-4">Kalite</h3>
              <p className="text-gray-600 leading-relaxed">
                Üretimden teslimat aşamasına kadar her süreçte en yüksek kalite standartlarını korumak.
              </p>
            </div>

            {/* Güvenilirlik */}
            <div className="text-center p-8 border border-gray-200 rounded-lg">
              <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-slate-700" />
              </div>
              <h3 className="font-neuropol text-xl font-bold text-slate-900 mb-4">Güvenilirlik</h3>
              <p className="text-gray-600 leading-relaxed">
                Verilen sözleri tutmak, zamanında teslimat ve uzun vadeli iş ortaklıkları kurmak.
              </p>
            </div>

            {/* Sürdürülebilirlik */}
            <div className="text-center p-8 border border-gray-200 rounded-lg">
              <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Globe className="h-8 w-8 text-slate-700" />
              </div>
              <h3 className="font-neuropol text-xl font-bold text-slate-900 mb-4">Sürdürülebilirlik</h3>
              <p className="text-gray-600 leading-relaxed">
                Çevre dostu üretim yaklaşımı ve gelecek nesillere karşı sorumlu davranış.
              </p>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>


    </>
  )
}