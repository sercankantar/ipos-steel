import { prisma } from '@/lib/prisma'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getKVKKPolicy() {
  try {
    const policy = await prisma.kvkkPrivacyPolicy.findFirst({
      where: { isActive: true },
      orderBy: { updatedAt: 'desc' }
    })
    return policy
  } catch (error) {
    console.error('KVKK Gizlilik Politikası getirme hatası:', error)
    return null
  }
}

export default async function KVKKGizlilikPolitikasi() {
  const policy = await getKVKKPolicy()

  if (!policy) {
    return (
      <MaxWidthWrapper className="py-10">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">KVKK Gizlilik Politikası</h1>
          <p className="text-gray-600">Politika bulunamadı.</p>
        </div>
      </MaxWidthWrapper>
    )
  }

  return (
    <MaxWidthWrapper className="py-10">
      <div className="prose prose-lg max-w-none">
        <h1 className="text-4xl font-bold mb-8 text-center">{policy.title}</h1>
        
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">İçindekiler</h2>
          <ul className="space-y-2">
            <li><a href="#amac" className="text-blue-600 hover:underline">{policy.amacTitle}</a></li>
            <li><a href="#kapsam" className="text-blue-600 hover:underline">{policy.kapsamTitle}</a></li>
            <li><a href="#tanimlar" className="text-blue-600 hover:underline">{policy.tanimlarTitle}</a></li>
            <li><a href="#roller" className="text-blue-600 hover:underline">{policy.rollerTitle}</a></li>
            <li><a href="#yukumlulukler" className="text-blue-600 hover:underline">{policy.yukumluluklerTitle}</a></li>
            <li><a href="#siniflandirma" className="text-blue-600 hover:underline">{policy.siniflandirmaTitle}</a></li>
            <li><a href="#islenmesi" className="text-blue-600 hover:underline">{policy.islenmesiTitle}</a></li>
            <li><a href="#aktarilmasi" className="text-blue-600 hover:underline">{policy.aktarilmasiTitle}</a></li>
            <li><a href="#saklanmasi" className="text-blue-600 hover:underline">{policy.saklanmasiTitle}</a></li>
            <li><a href="#guvenligi" className="text-blue-600 hover:underline">{policy.guvenligiTitle}</a></li>
            <li><a href="#haklari" className="text-blue-600 hover:underline">{policy.haklariTitle}</a></li>
            <li><a href="#gizlilik" className="text-blue-600 hover:underline">{policy.gizlilikTitle}</a></li>
            <li><a href="#giris-cikis" className="text-blue-600 hover:underline">{policy.girisCikisTitle}</a></li>
            <li><a href="#silinmesi" className="text-blue-600 hover:underline">{policy.silinmesiTitle}</a></li>
            <li><a href="#yayinlanmasi" className="text-blue-600 hover:underline">{policy.yayinlanmasiTitle}</a></li>
            <li><a href="#guncelleme" className="text-blue-600 hover:underline">{policy.guncellemeTitle}</a></li>
            <li><a href="#yururluk" className="text-blue-600 hover:underline">{policy.yururlukTitle}</a></li>
          </ul>
        </div>

        <div className="space-y-8">
          {policy.amac && (
            <section id="amac">
              <h2 className="text-3xl font-semibold mb-4 text-gray-800">{policy.amacTitle}</h2>
              <div className="prose prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: policy.amac }} />
            </section>
          )}

          {policy.kapsam && (
            <section id="kapsam">
              <h2 className="text-3xl font-semibold mb-4 text-gray-800">{policy.kapsamTitle}</h2>
              <div className="prose prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: policy.kapsam }} />
            </section>
          )}

          {policy.tanimlar && (
            <section id="tanimlar">
              <h2 className="text-3xl font-semibold mb-4 text-gray-800">{policy.tanimlarTitle}</h2>
              <div className="prose prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: policy.tanimlar }} />
            </section>
          )}

          {policy.roller && (
            <section id="roller">
              <h2 className="text-3xl font-semibold mb-4 text-gray-800">{policy.rollerTitle}</h2>
              <div className="prose prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: policy.roller }} />
            </section>
          )}

          {policy.yukumlulukler && (
            <section id="yukumlulukler">
              <h2 className="text-3xl font-semibold mb-4 text-gray-800">{policy.yukumluluklerTitle}</h2>
              <div className="prose prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: policy.yukumlulukler }} />
            </section>
          )}

          {policy.siniflandirma && (
            <section id="siniflandirma">
              <h2 className="text-3xl font-semibold mb-4 text-gray-800">{policy.siniflandirmaTitle}</h2>
              <div className="prose prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: policy.siniflandirma }} />
            </section>
          )}

          {policy.islenmesi && (
            <section id="islenmesi">
              <h2 className="text-3xl font-semibold mb-4 text-gray-800">{policy.islenmesiTitle}</h2>
              <div className="prose prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: policy.islenmesi }} />
            </section>
          )}

          {policy.aktarilmasi && (
            <section id="aktarilmasi">
              <h2 className="text-3xl font-semibold mb-4 text-gray-800">{policy.aktarilmasiTitle}</h2>
              <div className="prose prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: policy.aktarilmasi }} />
            </section>
          )}

          {policy.saklanmasi && (
            <section id="saklanmasi">
              <h2 className="text-3xl font-semibold mb-4 text-gray-800">{policy.saklanmasiTitle}</h2>
              <div className="prose prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: policy.saklanmasi }} />
            </section>
          )}

          {policy.guvenligi && (
            <section id="guvenligi">
              <h2 className="text-3xl font-semibold mb-4 text-gray-800">{policy.guvenligiTitle}</h2>
              <div className="prose prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: policy.guvenligi }} />
            </section>
          )}

          {policy.haklari && (
            <section id="haklari">
              <h2 className="text-3xl font-semibold mb-4 text-gray-800">{policy.haklariTitle}</h2>
              <div className="prose prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: policy.haklari }} />
            </section>
          )}

          {policy.gizlilik && (
            <section id="gizlilik">
              <h2 className="text-3xl font-semibold mb-4 text-gray-800">{policy.gizlilikTitle}</h2>
              <div className="prose prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: policy.gizlilik }} />
            </section>
          )}

          {policy.girisCikis && (
            <section id="giris-cikis">
              <h2 className="text-3xl font-semibold mb-4 text-gray-800">{policy.girisCikisTitle}</h2>
              <div className="prose prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: policy.girisCikis }} />
            </section>
          )}

          {policy.silinmesi && (
            <section id="silinmesi">
              <h2 className="text-3xl font-semibold mb-4 text-gray-800">{policy.silinmesiTitle}</h2>
              <div className="prose prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: policy.silinmesi }} />
            </section>
          )}

          {policy.yayinlanmasi && (
            <section id="yayinlanmasi">
              <h2 className="text-3xl font-semibold mb-4 text-gray-800">{policy.yayinlanmasiTitle}</h2>
              <div className="prose prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: policy.yayinlanmasi }} />
            </section>
          )}

          {policy.guncelleme && (
            <section id="guncelleme">
              <h2 className="text-3xl font-semibold mb-4 text-gray-800">{policy.guncellemeTitle}</h2>
              <div className="prose prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: policy.guncelleme }} />
            </section>
          )}

          {policy.yururluk && (
            <section id="yururluk">
              <h2 className="text-3xl font-semibold mb-4 text-gray-800">{policy.yururlukTitle}</h2>
              <div className="prose prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: policy.yururluk }} />
            </section>
          )}
        </div>

        {(policy.email || policy.telefon || policy.adres) && (
          <div className="mt-12 bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">İletişim Bilgileri</h3>
            <div className="space-y-2">
              {policy.email && <p><strong>E-posta:</strong> {policy.email}</p>}
              {policy.telefon && <p><strong>Telefon:</strong> {policy.telefon}</p>}
              {policy.adres && <p><strong>Adres:</strong> {policy.adres}</p>}
            </div>
          </div>
        )}
      </div>
    </MaxWidthWrapper>
  )
}
