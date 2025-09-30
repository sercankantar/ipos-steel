'use client'

import { ArrowRight, Building2, Image, Package } from 'lucide-react'

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Hero / Welcome */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-8 shadow">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">Yönetim Paneline Hoş Geldiniz</h1>
        <p className="text-blue-50/90 max-w-2xl">
          Bu panel üzerinden kurumsal, medya ve ürün içeriklerinizi kolayca yönetebilirsiniz. Sol
          menüden ilgili bölüme giderek içerik ekleyin, düzenleyin veya silin.
        </p>
      </div>

      {/* Quick actions / Info cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <a href="/admin/kurumsal" className="group bg-white border rounded-lg p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-2">
            <Building2 className="w-5 h-5 text-blue-600" />
            <div className="font-medium text-gray-900">Kurumsal İçerikler</div>
          </div>
          <p className="text-sm text-gray-600">Hakkımızda, misyon-vizyon, sertifikalar ve referansları yönetin.</p>
          <div className="mt-3 inline-flex items-center text-sm text-blue-700 group-hover:underline">
            İşlemlere git <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </a>

        <a href="/admin/medya" className="group bg-white border rounded-lg p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-2">
            <Image className="w-5 h-5 text-blue-600" />
            <div className="font-medium text-gray-900">Medya</div>
          </div>
          <p className="text-sm text-gray-600">Haberler, basın açıklamaları ve galeri yönetimi için buraya.</p>
          <div className="mt-3 inline-flex items-center text-sm text-blue-700 group-hover:underline">
            İşlemlere git <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </a>

        <a href="/admin/urunler" className="group bg-white border rounded-lg p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-2">
            <Package className="w-5 h-5 text-blue-600" />
            <div className="font-medium text-gray-900">Ürünler</div>
          </div>
          <p className="text-sm text-gray-600">Ürün kategorileri oluşturun, ürün ekleyin ve düzenleyin.</p>
          <div className="mt-3 inline-flex items-center text-sm text-blue-700 group-hover:underline">
            İşlemlere git <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </a>
      </div>

      {/* Info block */}
      <div className="bg-white border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Bilgi</h2>
        <p className="text-gray-700 leading-relaxed">
          Değişiklikleriniz otomatik olarak kaydedildikten sonra canlı siteye yansır. Medya yüklemeleri
          Cloudinary üzerinden yapılır; dosyalarınız için lütfen uygun format ve boyutları kullanın.
        </p>
      </div>
    </div>
  )
}
