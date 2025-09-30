import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { headers } from 'next/headers'

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

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
  const category = parse(searchParams.category)
  const products = await getProducts(category)

  return (
    <MaxWidthWrapper>
      <div className="py-10">
        <h1 className="text-2xl font-semibold mb-6">Ürünler</h1>
        {products.length === 0 ? (
          <div className="text-gray-600">Bu kategoride ürün bulunamadı.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p: any) => (
              <a href={`/products/${p.id}`} key={p.id} className="bg-white border rounded-lg p-4 block hover:shadow-md transition-shadow">
                {p.imageUrl && (
                  <img src={p.imageUrl} alt={p.name} className="w-full h-40 object-cover rounded mb-3" />
                )}
                <div className="text-sm text-gray-500 mb-1">{p.category?.name}</div>
                <div className="font-medium text-gray-900">{p.name}</div>
                {p.series && <div className="text-xs text-gray-600">Seri: {p.series}</div>}
                {p.material && <div className="text-xs text-gray-600">Materyal: {p.material}</div>}
              </a>
            ))}
          </div>
        )}
      </div>
    </MaxWidthWrapper>
  )
}

export default ProductsPage
