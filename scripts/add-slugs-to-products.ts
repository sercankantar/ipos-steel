import { PrismaClient } from '@prisma/client'
import { generateSlug, createUniqueSlug } from '../src/lib/slug'

const prisma = new PrismaClient()

async function main() {
  console.log('🔄 Ürünlere slug ekleniyor...')

  const products = await prisma.product.findMany({
    where: {
      OR: [
        { slug: null },
        { slug: '' }
      ]
    }
  })

  console.log(`📊 ${products.length} ürün bulundu`)

  const allSlugs: string[] = []

  for (const product of products) {
    const baseSlug = generateSlug(product.name)
    const uniqueSlug = createUniqueSlug(baseSlug, allSlugs)
    allSlugs.push(uniqueSlug)

    await prisma.product.update({
      where: { id: product.id },
      data: { slug: uniqueSlug }
    })

    console.log(`✅ ${product.name} -> ${uniqueSlug}`)
  }

  console.log('🎉 Tüm ürünlere slug eklendi!')
}

main()
  .catch((e) => {
    console.error('❌ Hata:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

