import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Link from 'next/link'
import { headers } from 'next/headers'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getPolicy() {
  const hdrs = headers()
  const host = hdrs.get('x-forwarded-host') || hdrs.get('host') || 'localhost:3000'
  const protocol = hdrs.get('x-forwarded-proto') || 'http'
  const baseUrl = `${protocol}://${host}`

  const res = await fetch(`${baseUrl}/api/human-resources-policy`, { cache: 'no-store' })
  if (!res.ok) return null
  return res.json()
}

export default async function InsanKaynaklariPolitikamiz() {
  const policy = await getPolicy()

  return (
    <div className='min-h-screen bg-white'>
      <div className='bg-gray-900 py-16'>
        <MaxWidthWrapper>
          <div className='text-center text-white'>
            <nav className='text-sm text-gray-300 mb-6'>
              <Link href='/' className='hover:text-white'>Ana Sayfa</Link>
              <span className='mx-2'>/</span>
              <span>İnsan Kaynakları Politikamız</span>
            </nav>
            <h1 className='font-neuropol text-4xl lg:text-5xl font-bold mb-4'>
              {policy?.heroTitle || 'İnsan Kaynakları Politikamız'}
            </h1>
            {policy?.heroSubtitle && (
              <p className='text-lg text-gray-300 max-w-2xl mx-auto'>
                {policy.heroSubtitle}
              </p>
            )}
          </div>
        </MaxWidthWrapper>
      </div>

      <MaxWidthWrapper>
        <div className='py-16'>
          <div className='mb-12'>
            <h2 className='text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-2'>
              {policy?.section1Title || 'İnsan Kaynağı Geliştirme ve Kariyer Planlaması'}
            </h2>
            
            <div className='grid lg:grid-cols-2 gap-8 items-center mb-8'>
              <div>
                <p className='text-gray-700 text-base leading-relaxed mb-6'>
                  {policy?.section1Paragraph}
                </p>

                {Array.isArray(policy?.section1Bullets) && (
                  <ul className='space-y-3'>
                    {policy.section1Bullets.map((b: string, i: number) => (
                      <li key={i} className='flex items-start gap-3'>
                        <span className='w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0'></span>
                        <span className='text-gray-700'>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              
              {policy?.section1ImageUrl && (
                <div className='relative'>
                  <img 
                    src={policy.section1ImageUrl}
                    alt='İK görseli'
                    className='w-full h-80 object-cover border border-gray-200'
                  />
                  <div className='absolute inset-0 bg-blue-900/10'></div>
                </div>
              )}
            </div>
          </div>

          <div className='mb-12'>
            <h2 className='text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-2'>
              {policy?.section2Title || 'Kurumsal Kültür ve İnsan Kaynakları Felsefesi'}
            </h2>

            <div className='grid lg:grid-cols-2 gap-8 items-center mb-8'>
              {policy?.section2ImageUrl && (
                <div className='relative order-2 lg:order-1'>
                  <img 
                    src={policy.section2ImageUrl}
                    alt='Kurumsal değerler ve işbirliği'
                    className='w-full h-80 object-cover border border-gray-200'
                  />
                  <div className='absolute inset-0 bg-blue-900/10'></div>
                </div>
              )}
              
              <div className='order-1 lg:order-2'>
                <p className='text-gray-700 text-base leading-relaxed mb-6'>
                  {policy?.section2Paragraph}
                </p>

                {Array.isArray(policy?.section2Bullets) && (
                  <div className='bg-gray-50 p-6 border-l-4 border-blue-600'>
                    <h3 className='font-semibold text-gray-900 mb-4'>Öne çıkan ilkeler</h3>
                    <ul className='space-y-2'>
                      {policy.section2Bullets.map((b: string, i: number) => (
                        <li key={i} className='flex items-start gap-2'>
                          <span className='text-blue-600 font-bold'>•</span>
                          <span className='text-gray-700'>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className='mb-12'>
            <h2 className='text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-2'>
              {policy?.section3Title || 'Performans Odaklı Eğitim ve Gelişim Stratejisi'}
            </h2>

            <div className='grid lg:grid-cols-2 gap-8 items-center mb-8'>
              <div>
                <p className='text-gray-700 text-base leading-relaxed mb-6'>
                  {policy?.section3Paragraph}
                </p>
                {policy?.section3Highlight && (
                  <div className='bg-blue-50 p-6 border border-blue-200'>
                    <p className='text-gray-700 text-base leading-relaxed font-medium'>
                      {policy.section3Highlight}
                    </p>
                  </div>
                )}
              </div>
              
              {policy?.section3ImageUrl && (
                <div className='relative'>
                  <img 
                    src={policy.section3ImageUrl}
                    alt='Eğitim ve gelişim programları'
                    className='w-full h-80 object-cover border border-gray-200'
                  />
                  <div className='absolute inset-0 bg-blue-900/10'></div>
                </div>
              )}
            </div>
          </div>

          <div className='mb-12'>
            <h2 className='text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-2'>
              {policy?.valuesTitle || 'Temel Değerlerimiz'}
            </h2>
            
            {policy?.valuesParagraph && (
              <p className='text-gray-700 text-base leading-relaxed mb-8'>
                {policy.valuesParagraph}
              </p>
            )}

            {Array.isArray(policy?.values) && policy.values.length > 0 && (
              <div className='grid md:grid-cols-3 gap-8 mb-8'>
                {policy.values.map((v: any, i: number) => (
                  <div key={i} className='text-center p-6 border border-gray-200'>
                    <h3 className='text-lg font-bold text-gray-900 mb-3'>{v.title}</h3>
                    <p className='text-gray-600 text-sm'>{v.description}</p>
                  </div>
                ))}
              </div>
            )}

            {policy?.closingParagraph && (
              <div className='bg-gray-50 p-6 border border-gray-200'>
                <p className='text-gray-700 text-base leading-relaxed'>
                  {policy.closingParagraph}
                </p>
              </div>
            )}
          </div>

        </div>

      </MaxWidthWrapper>
    </div>
  )
}
