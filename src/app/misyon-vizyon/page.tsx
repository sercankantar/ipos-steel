import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Target, Eye } from 'lucide-react'
import { headers } from 'next/headers'

function getBaseUrl() {
  const h = headers()
  const proto = h.get('x-forwarded-proto') || 'https'
  const host = h.get('host')
  return `${proto}://${host}`
}

async function getMissionVision() {
  try {
    const base = process.env.NEXT_PUBLIC_SERVER_URL || getBaseUrl()
    const response = await fetch(`${base}/api/mission-vision`, {
      cache: 'no-store'
    })
    
    if (!response.ok) {
      return null
    }
    
    return await response.json()
  } catch (error) {
    console.error('Misyon-vizyon verisi alınırken hata:', error)
    return null
  }
}

export default async function MisyonVizyonPage() {
  const missionVision = await getMissionVision()
  
  // Varsayılan değerler
  const defaultMission = "Sektöründe lider olmak, rekabetçi ve sürdürülebilir büyüme potansiyelini paydaslarına değer yaratacak şekilde yönetmek, işletme kaynaklarını sermayesini en üst seviyelere çıkarmak, şeffaflık, üstün iş ahlâkı ve dürüst çalışma ilkelerine uymak."
  const defaultVision = "IPOS-Steel, uluslararası kalite ve standartlarda müşterilerine kaliteli ürün ve hizmetler sunarak tecrübeli kadrosuyla birlikte sürekli gelişmektedir. Kablo kanalı üretim makineleri imalatından gelen tecrübeyi elektrik sektöründeki iş çevresi ile katlayarak Asya, Avrupa ve Afrika pazarlarında en çok tercih edilen markalar arasında yer almayı hedeflemektedir."
  
  const mission = missionVision?.mission || defaultMission
  const vision = missionVision?.vision || defaultVision
  const missionImageUrl = missionVision?.missionImageUrl || null
  const visionImageUrl = missionVision?.visionImageUrl || null
  return (
    <>
      {/* Hero Section */}
      <section className="bg-white py-16 border-b border-gray-200">
        <MaxWidthWrapper>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-neuropol text-4xl lg:text-5xl font-bold mb-6 text-slate-900">
              Misyonumuz ve Vizyonumuz
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Elektrik dağıtım sistemleri sektöründe güvenilir ve sürdürülebilir çözümlerle 
              geleceği şekillendiriyoruz.
            </p>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Misyon */}
      <section className="py-20 bg-white">
        <MaxWidthWrapper>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center">
                  <Target className="h-8 w-8 text-slate-700" />
                </div>
                <h2 className="font-neuropol text-4xl font-bold text-slate-900">Misyon</h2>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-lg border-l-4 border-slate-700">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {mission}
                </p>
              </div>
            </div>
            
            <div className="relative">
              {missionImageUrl ? (
                <img src={missionImageUrl} alt="Misyon" className="rounded-lg h-80 w-full object-cover border border-gray-200" />
              ) : (
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg h-80 flex items-center justify-center border border-gray-200">
                  <div className="text-center">
                    <Target className="h-20 w-20 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 text-sm font-medium">Misyon Fotoğrafı</p>
                    <p className="text-gray-400 text-xs mt-1">(Güncellenecek)</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Vizyon */}
      <section className="py-20 bg-gray-50">
        <MaxWidthWrapper>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="lg:order-2">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center">
                  <Eye className="h-8 w-8 text-slate-700" />
                </div>
                <h2 className="font-neuropol text-4xl font-bold text-slate-900">Vizyon</h2>
              </div>
              
              <div className="bg-white p-8 rounded-lg border-l-4 border-slate-700">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {vision}
                </p>
              </div>
            </div>
            
            <div className="lg:order-1 relative">
              {visionImageUrl ? (
                <img src={visionImageUrl} alt="Vizyon" className="rounded-lg h-80 w-full object-cover border border-gray-200" />
              ) : (
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg h-80 flex items-center justify-center border border-gray-200">
                  <div className="text-center">
                    <Eye className="h-20 w-20 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 text-sm font-medium">Vizyon Fotoğrafı</p>
                    <p className="text-gray-400 text-xs mt-1">(Güncellenecek)</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* İlkelerimiz */}
      <section className="py-20 bg-white">
        <MaxWidthWrapper>
          <div className="text-center mb-16">
            <h2 className="font-neuropol text-3xl font-bold mb-4 text-slate-900">
              Temel İlkelerimiz
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Misyon ve vizyonumuzu gerçekleştirmek için benimsediğimiz temel ilkeler.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <h3 className="font-neuropol text-lg font-bold text-slate-900 mb-3">Liderlik</h3>
              <p className="text-gray-600 text-sm">
                Sektöründe öncü ve lider konumda olmak
              </p>
            </div>

            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <h3 className="font-neuropol text-lg font-bold text-slate-900 mb-3">Sürdürülebilirlik</h3>
              <p className="text-gray-600 text-sm">
                Rekabetçi ve sürdürülebilir büyüme
              </p>
            </div>

            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <h3 className="font-neuropol text-lg font-bold text-slate-900 mb-3">Şeffaflık</h3>
              <p className="text-gray-600 text-sm">
                Şeffaf ve dürüst çalışma ilkeleri
              </p>
            </div>

            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <h3 className="font-neuropol text-lg font-bold text-slate-900 mb-3">Kalite</h3>
              <p className="text-gray-600 text-sm">
                Uluslararası kalite standartları
              </p>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Hedeflerimiz */}
      <section className="py-20 bg-gray-100">
        <MaxWidthWrapper>
          <div className="text-center mb-16">
            <h2 className="font-neuropol text-3xl font-bold mb-4 text-slate-900">
              Stratejik Hedeflerimiz
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Gelecek vizyonumuzu hayata geçirmek için belirlediğimiz stratejik hedefler.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="text-3xl font-bold mb-4 text-slate-900">2025</div>
              <h3 className="font-neuropol text-lg font-bold mb-3 text-slate-900">Avrupa Pazarı</h3>
              <p className="text-gray-600 text-sm">
                Avrupa pazarında güçlü konuma ulaşmak
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="text-3xl font-bold mb-4 text-slate-900">2026</div>
              <h3 className="font-neuropol text-lg font-bold mb-3 text-slate-900">Afrika Genişlemesi</h3>
              <p className="text-gray-600 text-sm">
                Afrika pazarlarında faaliyet alanını genişletmek
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="text-3xl font-bold mb-4 text-slate-900">2027</div>
              <h3 className="font-neuropol text-lg font-bold mb-3 text-slate-900">Global Marka</h3>
              <p className="text-gray-600 text-sm">
                Dünya çapında tanınan marka olmak
              </p>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  )
}
