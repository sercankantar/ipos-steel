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

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getAbout() {
  try {
    const base = process.env.NEXT_PUBLIC_SERVER_URL || 'https://ipos-steel.vercel.app'
    const res = await fetch(`${base}/api/about`, { cache: 'no-store' })
    if (!res.ok) return null
    return await res.json()
  } catch (e) {
    return null
  }
}

export default async function HakkimizdaPage() {
  const about = await getAbout()
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
                {about?.title || 'Şirket Profili'}
              </h2>
              <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: about?.description || 'Şirket açıklaması yakında güncellenecek.' }}
                />
              </div>
            </div>
            
            <div className="rounded-lg overflow-hidden border border-gray-200 h-full">
              {about?.imageUrl ? (
                <img src={about.imageUrl} alt="Şirket Fotoğrafı" className="h-full w-full object-cover" />
              ) : (
                <div className="relative h-full bg-gradient-to-br from-gray-100 to-gray-200">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 text-sm font-medium">Şirket Fotoğrafı</p>
                      <p className="text-gray-400 text-xs mt-1">(Güncellenecek)</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-white/10"></div>
                </div>
              )}
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