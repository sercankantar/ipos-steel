import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    
    // Arama parametreleri
    const query = searchParams.get('q')?.toLowerCase().trim() || ''
    const coatingType = searchParams.get('coatingType')?.toLowerCase().trim()
    const height = searchParams.get('height')?.trim()
    const width = searchParams.get('width')?.trim()
    const category = searchParams.get('category')?.toLowerCase().trim()
    const subProductId = searchParams.get('subProductId')?.trim() // SubProduct'a özel arama
    const type = searchParams.get('type')?.toLowerCase().trim() // channel, module, accessory, cover

    if (!query && !coatingType && !height && !width && !subProductId) {
      return NextResponse.json({
        success: false,
        message: 'En az bir arama kriteri gerekli',
        results: []
      }, { status: 400 })
    }

    const searchResults: any[] = []

    // Eğer subProductId ve type belirtilmişse, sadece o SubProduct'ın o tipini getir
    if (subProductId && type) {
      if (type === 'accessory') {
        const accessories = await prisma.accessory.findMany({
          where: {
            isActive: true,
            subProductId: subProductId
          },
          include: {
            subProduct: {
              include: {
                product: {
                  include: {
                    category: true
                  }
                }
              }
            }
          }
        })

        searchResults.push(...accessories.map(acc => ({
          id: acc.id,
          type: 'accessory',
          typeName: 'Aksesuar',
          name: acc.name,
          code: acc.code,
          height: acc.height,
          width: acc.width,
          coatingType: acc.coatingType,
          sheetThickness: acc.sheetThickness,
          imageUrl: acc.imageUrl,
          productName: acc.subProduct.product.name,
          categoryName: acc.subProduct.product.category.name,
          categorySlug: acc.subProduct.product.category.slug,
          subProductName: acc.subProduct.name,
          subProductId: acc.subProduct.id,
          productId: acc.subProduct.product.id,
          path: `/products/${acc.subProduct.product.id}`,
          fullDescription: `${acc.name} ${acc.code ? `(${acc.code})` : ''} - ${acc.coatingType || ''} ${acc.height && acc.width ? `${acc.height}x${acc.width}` : ''} - ${acc.subProduct.product.category.name}`.trim()
        })))
      }
      // Diğer tipler için de eklenebilir (channel, module, cover)
      
      return NextResponse.json({
        success: true,
        query: `SubProduct: ${subProductId}, Type: ${type}`,
        totalResults: searchResults.length,
        results: searchResults
      })
    }

    // 1. CHANNELS ARAMA
    const channelWhere: any = {
      isActive: true,
      AND: []
    }

    if (coatingType) {
      channelWhere.AND.push({
        coatingType: {
          contains: coatingType,
          mode: 'insensitive'
        }
      })
    }

    if (height) {
      channelWhere.AND.push({
        height: { contains: height }
      })
    }

    if (width) {
      channelWhere.AND.push({
        width: { contains: width }
      })
    }

    if (query) {
      // Query'yi kelimelere böl ve her kelime için arama yap
      const keywords = query.toLowerCase().split(/\s+/).filter(k => k.length > 0)
      
      if (keywords.length > 0) {
        channelWhere.AND.push({
          OR: keywords.flatMap(keyword => [
            { name: { contains: keyword, mode: 'insensitive' } },
            { code: { contains: keyword, mode: 'insensitive' } },
            { coatingType: { contains: keyword, mode: 'insensitive' } },
            { height: { contains: keyword, mode: 'insensitive' } },
            { width: { contains: keyword, mode: 'insensitive' } }
          ])
        })
      }
    }

    // AND array boşsa kaldır
    if (channelWhere.AND.length === 0) {
      delete channelWhere.AND
    }

    const channels = await prisma.channel.findMany({
      where: channelWhere,
      include: {
        subProduct: {
          include: {
            product: {
              include: {
                category: true
              }
            }
          }
        }
      },
      take: 50
    })

    searchResults.push(...channels.map(ch => ({
      id: ch.id,
      type: 'channel',
      typeName: 'Kanal',
      name: ch.name,
      code: ch.code,
      height: ch.height,
      width: ch.width,
      coatingType: ch.coatingType,
      sheetThickness: ch.sheetThickness,
      imageUrl: ch.imageUrl,
      productName: ch.subProduct.product.name,
      categoryName: ch.subProduct.product.category.name,
      categorySlug: ch.subProduct.product.category.slug,
      subProductName: ch.subProduct.name,
      subProductId: ch.subProduct.id,
      productId: ch.subProduct.product.id,
      path: `/products/${ch.subProduct.product.id}`,
      fullDescription: `${ch.name} ${ch.code ? `(${ch.code})` : ''} - ${ch.coatingType || ''} ${ch.height && ch.width ? `${ch.height}x${ch.width}` : ''} - ${ch.subProduct.product.category.name}`.trim()
    })))

    // 2. MODULES ARAMA
    const moduleWhere: any = {
      isActive: true,
      AND: []
    }

    if (coatingType) {
      moduleWhere.AND.push({
        coatingType: {
          contains: coatingType,
          mode: 'insensitive'
        }
      })
    }

    if (height) {
      moduleWhere.AND.push({
        height: { contains: height }
      })
    }

    if (width) {
      moduleWhere.AND.push({
        width: { contains: width }
      })
    }

    if (query) {
      const keywords = query.toLowerCase().split(/\s+/).filter(k => k.length > 0)
      
      if (keywords.length > 0) {
        moduleWhere.AND.push({
          OR: keywords.flatMap(keyword => [
            { name: { contains: keyword, mode: 'insensitive' } },
            { code: { contains: keyword, mode: 'insensitive' } },
            { coatingType: { contains: keyword, mode: 'insensitive' } },
            { height: { contains: keyword, mode: 'insensitive' } },
            { width: { contains: keyword, mode: 'insensitive' } }
          ])
        })
      }
    }

    if (moduleWhere.AND.length === 0) {
      delete moduleWhere.AND
    }

    const modules = await prisma.module.findMany({
      where: moduleWhere,
      include: {
        subProduct: {
          include: {
            product: {
              include: {
                category: true
              }
            }
          }
        }
      },
      take: 50
    })

    searchResults.push(...modules.map(mod => ({
      id: mod.id,
      type: 'module',
      typeName: 'Modül',
      name: mod.name,
      code: mod.code,
      height: mod.height,
      width: mod.width,
      coatingType: mod.coatingType,
      sheetThickness: mod.sheetThickness,
      imageUrl: mod.imageUrl,
      productName: mod.subProduct.product.name,
      categoryName: mod.subProduct.product.category.name,
      categorySlug: mod.subProduct.product.category.slug,
      subProductName: mod.subProduct.name,
      subProductId: mod.subProduct.id,
      productId: mod.subProduct.product.id,
      path: `/products/${mod.subProduct.product.id}`,
      fullDescription: `${mod.name} ${mod.code ? `(${mod.code})` : ''} - ${mod.coatingType || ''} ${mod.height && mod.width ? `${mod.height}x${mod.width}` : ''} - ${mod.subProduct.product.category.name}`.trim()
    })))

    // 3. ACCESSORIES ARAMA
    const accessoryWhere: any = {
      isActive: true,
      AND: []
    }

    if (coatingType) {
      accessoryWhere.AND.push({
        coatingType: {
          contains: coatingType,
          mode: 'insensitive'
        }
      })
    }

    if (height) {
      accessoryWhere.AND.push({
        height: { contains: height }
      })
    }

    if (width) {
      accessoryWhere.AND.push({
        width: { contains: width }
      })
    }

    if (query) {
      const keywords = query.toLowerCase().split(/\s+/).filter(k => k.length > 0)
      
      if (keywords.length > 0) {
        accessoryWhere.AND.push({
          OR: keywords.flatMap(keyword => [
            { name: { contains: keyword, mode: 'insensitive' } },
            { code: { contains: keyword, mode: 'insensitive' } },
            { coatingType: { contains: keyword, mode: 'insensitive' } },
            { height: { contains: keyword, mode: 'insensitive' } },
            { width: { contains: keyword, mode: 'insensitive' } }
          ])
        })
      }
    }

    if (accessoryWhere.AND.length === 0) {
      delete accessoryWhere.AND
    }

    const accessories = await prisma.accessory.findMany({
      where: accessoryWhere,
      include: {
        subProduct: {
          include: {
            product: {
              include: {
                category: true
              }
            }
          }
        }
      },
      take: 50
    })

    searchResults.push(...accessories.map(acc => ({
      id: acc.id,
      type: 'accessory',
      typeName: 'Aksesuar',
      name: acc.name,
      code: acc.code,
      height: acc.height,
      width: acc.width,
      coatingType: acc.coatingType,
      sheetThickness: acc.sheetThickness,
      imageUrl: acc.imageUrl,
      productName: acc.subProduct.product.name,
      categoryName: acc.subProduct.product.category.name,
      categorySlug: acc.subProduct.product.category.slug,
      subProductName: acc.subProduct.name,
      subProductId: acc.subProduct.id,
      productId: acc.subProduct.product.id,
      path: `/products/${acc.subProduct.product.id}`,
      fullDescription: `${acc.name} ${acc.code ? `(${acc.code})` : ''} - ${acc.coatingType || ''} ${acc.height && acc.width ? `${acc.height}x${acc.width}` : ''} - ${acc.subProduct.product.category.name}`.trim()
    })))

    // 4. COVERS ARAMA
    const coverWhere: any = {
      isActive: true,
      AND: []
    }

    if (coatingType) {
      coverWhere.AND.push({
        coatingType: {
          contains: coatingType,
          mode: 'insensitive'
        }
      })
    }

    if (height) {
      coverWhere.AND.push({
        height: { contains: height }
      })
    }

    if (width) {
      coverWhere.AND.push({
        width: { contains: width }
      })
    }

    if (query) {
      const keywords = query.toLowerCase().split(/\s+/).filter(k => k.length > 0)
      
      if (keywords.length > 0) {
        coverWhere.AND.push({
          OR: keywords.flatMap(keyword => [
            { name: { contains: keyword, mode: 'insensitive' } },
            { code: { contains: keyword, mode: 'insensitive' } },
            { coatingType: { contains: keyword, mode: 'insensitive' } },
            { height: { contains: keyword, mode: 'insensitive' } },
            { width: { contains: keyword, mode: 'insensitive' } }
          ])
        })
      }
    }

    if (coverWhere.AND.length === 0) {
      delete coverWhere.AND
    }

    const covers = await prisma.cover.findMany({
      where: coverWhere,
      include: {
        subProduct: {
          include: {
            product: {
              include: {
                category: true
              }
            }
          }
        }
      },
      take: 50
    })

    searchResults.push(...covers.map(cov => ({
      id: cov.id,
      type: 'cover',
      typeName: 'Kapak',
      name: cov.name,
      code: cov.code,
      height: cov.height,
      width: cov.width,
      coatingType: cov.coatingType,
      sheetThickness: cov.sheetThickness,
      imageUrl: cov.imageUrl,
      productName: cov.subProduct.product.name,
      categoryName: cov.subProduct.product.category.name,
      categorySlug: cov.subProduct.product.category.slug,
      subProductName: cov.subProduct.name,
      subProductId: cov.subProduct.id,
      productId: cov.subProduct.product.id,
      path: `/products/${cov.subProduct.product.id}`,
      fullDescription: `${cov.name} ${cov.code ? `(${cov.code})` : ''} - ${cov.coatingType || ''} ${cov.height && cov.width ? `${cov.height}x${cov.width}` : ''} - ${cov.subProduct.product.category.name}`.trim()
    })))

    // Skorlama ve sıralama
    const scoredResults = searchResults.map(item => {
      let score = 0
      const searchLower = query.toLowerCase()
      
      // Tam eşleşmeler en yüksek puan
      if (item.name.toLowerCase() === searchLower) score += 100
      if (item.code?.toLowerCase() === searchLower) score += 90
      
      // İçeren eşleşmeler
      if (item.name.toLowerCase().includes(searchLower)) score += 50
      if (item.code?.toLowerCase().includes(searchLower)) score += 40
      if (item.coatingType?.toLowerCase().includes(searchLower)) score += 30
      if (item.categoryName.toLowerCase().includes(searchLower)) score += 20
      if (item.productName.toLowerCase().includes(searchLower)) score += 15
      
      // Kaplama tipi tam eşleşmesi
      if (coatingType && item.coatingType?.toLowerCase() === coatingType) score += 80
      if (coatingType && item.coatingType?.toLowerCase().includes(coatingType)) score += 40
      
      // Boyut tam eşleşmesi
      if (height && item.height === height) score += 70
      if (width && item.width === width) score += 70
      
      // Kategori eşleşmesi
      if (category && item.categorySlug === category) score += 60
      
      return { ...item, score }
    })

    // Skoruna göre sırala
    scoredResults.sort((a, b) => b.score - a.score)

    // Skorları kaldır (client'a gönderme)
    const finalResults = scoredResults.map(({ score, ...item }) => item)

    return NextResponse.json({
      success: true,
      query: query || 'Filtrelenmiş arama',
      filters: {
        coatingType,
        height,
        width,
        category
      },
      totalResults: finalResults.length,
      results: finalResults.slice(0, 20) // İlk 20 sonuç
    }, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    })

  } catch (error) {
    console.error('Ürün arama hatası:', error)
    return NextResponse.json({
      success: false,
      error: 'Arama sırasında bir hata oluştu',
      message: error instanceof Error ? error.message : 'Bilinmeyen hata'
    }, { status: 500 })
  }
}

