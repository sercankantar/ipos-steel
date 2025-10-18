import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { headers } from 'next/headers'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export const dynamic = 'force-dynamic'
export const revalidate = 0

type Param = string | string[] | undefined

interface ProductsPageProps {
  searchParams: { [key: string]: Param }
}

const parse = (param: Param) => (typeof param === 'string' ? param : undefined)

function getBaseUrl() {
  const h = headers()
  const host = h.get('host') || 'localhost:3000'
  const proto = h.get('x-forwarded-proto') || (host.startsWith('localhost') ? 'http' : 'https')
  return `${proto}://${host}`
}

async function getProducts(category?: string) {
  const base = process.env.NEXT_PUBLIC_SERVER_URL || getBaseUrl()
  const url = category ? `${base}/api/products?category=${encodeURIComponent(category)}` : `${base}/api/products`
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) return []
  return res.json()
}

async function getProductCategories() {
  const base = process.env.NEXT_PUBLIC_SERVER_URL || getBaseUrl()
  const res = await fetch(`${base}/api/product-categories`, { cache: 'no-store' })
  if (!res.ok) return []
  return res.json()
}

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
  const category = parse(searchParams.category)
  const products = await getProducts(category)
  const categories = await getProductCategories()
  
  // Seçili kategorinin bilgilerini bul
  const selectedCategory = categories.find((cat: any) => cat.slug === category)
  
  // İlk ürünü öne çıkar (eğer varsa)
  const featuredProduct = products.length > 0 ? products[0] : null

  return (
    <MaxWidthWrapper>
      <div className="py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sol taraf - Ürün Grupları Menüsü */}
          <div className="lg:w-1/4">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-bold font-neuropol text-gray-900 mb-4">
                Ürün Grupları
              </h2>
              <div className="space-y-2">
                {categories.map((cat: any) => (
                  <Link
                    key={cat.slug}
                    href={`/products?category=${cat.slug}`}
                    className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ${
                      cat.slug === category
                        ? 'border-[#1a3056] bg-[#1a3056]/10 text-[#1a3056]'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-medium text-sm">{cat.name}</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sağ taraf - Ana İçerik */}
          <div className="lg:w-3/4">
            {selectedCategory ? (
              <div className="space-y-6">
                {/* Ana Başlık */}
                <h1 className="text-3xl font-bold font-neuropol text-gray-900">
                  {selectedCategory.name}
                </h1>

                {/* Ürünler */}
                {products.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {products.map((product: any) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.id}`}
                        className="block p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all duration-200 text-center"
                      >
                        {product.imageUrl && (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-32 object-contain rounded mb-3"
                          />
                        )}
                        <h3 className="font-medium text-gray-900 text-sm">
                          {product.name}
                        </h3>
                      </Link>
                    ))}
                  </div>
                )}

                {/* Kategori Açıklaması */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h2 className="text-xl font-bold font-neuropol text-gray-900 mb-4">
                    {selectedCategory.name}
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedCategory.description || `${selectedCategory.name} hakkında detaylı bilgiler ve ürün çeşitlerimiz. Kaliteli ve güvenilir çözümlerimizi keşfedin.`}
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
                <h1 className="text-2xl font-bold font-neuropol text-gray-900 mb-4">
                  Ürünler
                </h1>
                <p className="text-gray-600 mb-6">
                  Ürün kategorilerimizi keşfetmek için sol menüden bir kategori seçin.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {categories.slice(0, 8).map((cat: any) => (
                    <Link
                      key={cat.slug}
                      href={`/products?category=${cat.slug}`}
                      className="block p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all duration-200 text-center"
                    >
                      {cat.imageUrl && (
                        <img
                          src={cat.imageUrl}
                          alt={cat.name}
                          className="w-full h-24 object-contain rounded mb-3"
                        />
                      )}
                      <h3 className="font-medium text-gray-900 text-sm">
                        {cat.name}
                      </h3>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  )
}

export default ProductsPage
