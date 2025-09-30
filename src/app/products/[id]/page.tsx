import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { headers } from 'next/headers'

function getBaseUrl() {
  const h = headers()
  const host = h.get('host') || 'localhost:3000'
  const proto = h.get('x-forwarded-proto') || (host.startsWith('localhost') ? 'http' : 'https')
  return `${proto}://${host}`
}

async function getProduct(id: string) {
  const base = process.env.NEXT_PUBLIC_SERVER_URL || getBaseUrl()
  const res = await fetch(`${base}/api/products/${id}`, { cache: 'no-store' })
  if (!res.ok) return null
  return res.json()
}

export default async function ProductDetail({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)
  if (!product) {
    return (
      <MaxWidthWrapper>
        <div className="py-12 text-gray-600">Ürün bulunamadı.</div>
      </MaxWidthWrapper>
    )
  }

  return (
    <MaxWidthWrapper>
      <div className="py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} className="w-full h-[420px] object-cover rounded-lg border" />
          ) : (
            <div className="w-full h-[420px] bg-gray-100 rounded-lg border flex items-center justify-center text-gray-400">Görsel Yok</div>
          )}
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">{product.category?.name}</div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-3">{product.name}</h1>
          {product.description && <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.series && (
              <div className="p-4 bg-white border rounded">
                <div className="text-xs text-gray-500">Seri</div>
                <div className="text-gray-900">{product.series}</div>
              </div>
            )}
            {product.material && (
              <div className="p-4 bg-white border rounded">
                <div className="text-xs text-gray-500">Materyal</div>
                <div className="text-gray-900">{product.material}</div>
              </div>
            )}
            {product.coatingType && (
              <div className="p-4 bg-white border rounded">
                <div className="text-xs text-gray-500">Kaplama Tipi</div>
                <div className="text-gray-900">{product.coatingType}</div>
              </div>
            )}
            {product.thickness && (
              <div className="p-4 bg-white border rounded">
                <div className="text-xs text-gray-500">Kalınlık</div>
                <div className="text-gray-900">{product.thickness}</div>
              </div>
            )}
            {product.width && (
              <div className="p-4 bg-white border rounded">
                <div className="text-xs text-gray-500">Genişlik</div>
                <div className="text-gray-900">{product.width}</div>
              </div>
            )}
            {product.height && (
              <div className="p-4 bg-white border rounded">
                <div className="text-xs text-gray-500">Yükseklik</div>
                <div className="text-gray-900">{product.height}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  )
}


