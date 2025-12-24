// IPOS Steel Ürün Kataloğu - Gerçek Hiyerarşi ile
// Dijital satış danışmanı için DETAYLI ürün bilgileri

export const PRODUCT_CATALOG = {
  products: [
    {
      code: 'SCT',
      name: 'Standart Tip Kablo Kanalı',
      fullName: 'SCT - Standart Tip Kablo Kanalı',
      coatings: ['Pregalvaniz', 'Sıcak Daldırma', 'Boyalı'],
      dimensions: {
        heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
        widths: ['50mm', '100mm', '150mm', '200mm', '250mm', '300mm', '400mm', '500mm', '600mm'],
        thicknesses: ['0.8mm', '1.0mm', '1.2mm', '1.5mm', '2.0mm']
      },
      modules: {
        name: 'Ek Eleman',
        heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
        widths: ['23mm'],
        thicknesses: ['1.5mm', '2.0mm'],
        rule: 'Kanalın yüksekliğine göre eşleşir'
      },
      accessories: [
        {
          type: 'T Dönüş',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['54mm', '104mm', '154mm', '205mm', '255mm', '305mm', '405mm', '506mm', '606mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: '90° Dönüş',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['54mm', '104mm', '154mm', '205mm', '255mm', '305mm', '405mm', '506mm', '606mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'Dış Bükey Dönüş',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['54mm', '104mm', '154mm', '205mm', '255mm', '305mm', '405mm', '506mm', '606mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'Dörtlü Dönüş',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['54mm', '104mm', '154mm', '205mm', '255mm', '305mm', '405mm', '506mm', '606mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'İç Bükey Dönüş',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['54mm', '104mm', '154mm', '205mm', '255mm', '305mm', '405mm', '506mm', '606mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'Orta Redüksiyon',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['105mm', '205mm', '305mm', '405mm', '505mm', '605mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'Sağ Redüksiyon',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['105mm', '205mm', '305mm', '405mm', '505mm', '605mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'Sol Redüksiyon',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['105mm', '205mm', '305mm', '405mm', '505mm', '605mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'Z Orta Redüksiyon',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['25mm', '50mm', '75mm', '100mm', '125mm', '150mm', '175mm', '200mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'Z Sağ-Sol Redüksiyon',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['25mm', '50mm', '75mm', '100mm', '125mm', '150mm', '175mm', '200mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'Seperatör',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['30mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        }
      ],
      covers: {
        name: 'Kapak',
        heights: ['11mm'],
        widths: ['50mm', '100mm', '150mm', '200mm', '250mm', '300mm', '400mm', '500mm', '600mm'],
        thicknesses: ['0.8mm'],
        rule: 'Kanalın genişliğine göre eşleşir'
      },
      description: 'Elektrik tesisatlarında düzenli ve güvenli hat yönetimi sağlayan standart tip kablo kanalları, dayanıklı yapısı ve kolay montaj özellikleriyle yaygın kullanım sunar. Farklı boyut ve kalınlık seçenekleri sayesinde hem endüstriyel hem de ticari uygulamalarda ideal çözüm oluşturur.',
      useCases: ['İç mekan uygulamaları', 'Ofis binaları', 'Ticari alanlar', 'Konut projeleri'],
      recommendation: 'Ekonomik ve kolay montajlı çözüm arayan ofis ve ticari projeler için ideal'
    },
    {
      code: 'CT',
      name: 'Ağır Hizmet Tipi Kablo Kanalı',
      fullName: 'CT - Ağır Hizmet Tipi Kablo Kanalı',
      coatings: ['Pregalvaniz', 'Sıcak Daldırma', 'Boyalı', 'Elektro'],
      dimensions: {
        heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
        widths: ['50mm', '100mm', '150mm', '200mm', '250mm', '300mm', '400mm', '500mm', '600mm'],
        thicknesses: ['0.8mm', '1.0mm', '1.2mm', '1.5mm', '2.0mm']
      },
      modules: {
        name: 'Ek Eleman',
        heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
        widths: ['23mm'],
        thicknesses: ['1.5mm', '2.0mm'],
        rule: 'Kanalın yüksekliğine göre eşleşir'
      },
      accessories: [
        {
          type: 'T Dönüş',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['54mm', '104mm', '154mm', '205mm', '255mm', '305mm', '405mm', '506mm', '606mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: '90° Dönüş',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['54mm', '104mm', '154mm', '205mm', '255mm', '305mm', '405mm', '506mm', '606mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'Dış Bükey Dönüş',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['54mm', '104mm', '154mm', '205mm', '255mm', '305mm', '405mm', '506mm', '606mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'Dörtlü Dönüş',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['54mm', '104mm', '154mm', '205mm', '255mm', '305mm', '405mm', '506mm', '606mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'İç Bükey Dönüş',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['54mm', '104mm', '154mm', '205mm', '255mm', '305mm', '405mm', '506mm', '606mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'Orta Redüksiyon',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['105mm', '205mm', '305mm', '405mm', '505mm', '605mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'Sağ Redüksiyon',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['105mm', '205mm', '305mm', '405mm', '505mm', '605mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'Sol Redüksiyon',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['105mm', '205mm', '305mm', '405mm', '505mm', '605mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'Z Orta Redüksiyon',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['25mm', '50mm', '75mm', '100mm', '125mm', '150mm', '175mm', '200mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'Z Sağ-Sol Redüksiyon',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['25mm', '50mm', '75mm', '100mm', '125mm', '150mm', '175mm', '200mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'Seperatör',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['30mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        }
      ],
      covers: {
        name: 'Kapak',
        heights: ['11mm'],
        widths: ['50mm', '100mm', '150mm', '200mm', '250mm', '300mm', '400mm', '500mm', '600mm'],
        thicknesses: ['0.8mm'],
        rule: 'Kanalın genişliğine göre eşleşir'
      },
      description: 'Yüksek mekanik dayanım gerektiren ortamlarda kullanılmak üzere tasarlanan ağır hizmet kablo kanalları, kalın sac yapılarıyla uzun ömürlü ve güvenli bir kablo taşıma sistemi sunar. Fabrika, enerji santrali ve zorlu saha koşullarında maksimum stabilite sağlar.',
      useCases: ['Endüstriyel tesisler', 'Fabrikalar', 'Enerji santralleri', 'Ağır sanayi'],
      recommendation: 'Fabrika ve endüstriyel tesislerde yüksek mekanik dayanım gereken projeler için'
    },
    {
      code: 'SUCT',
      name: 'Deliksiz Standart Tip Kablo Kanalı',
      fullName: 'SUCT - Deliksiz Standart Tip Kablo Kanalı',
      coatings: ['Pregalvaniz', 'Sıcak Daldırma', 'Boyalı'],
      dimensions: {
        heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
        widths: ['50mm', '100mm', '150mm', '200mm', '250mm', '300mm', '400mm', '500mm', '600mm'],
        thicknesses: ['0.8mm', '1.0mm', '1.2mm', '1.5mm', '2.0mm']
      },
      modules: {
        name: 'Ek Eleman',
        heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
        widths: ['23mm'],
        thicknesses: ['1.5mm', '2.0mm'],
        rule: 'Kanalın yüksekliğine göre eşleşir'
      },
      accessories: [
        {
          type: 'T Dönüş',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['54mm', '104mm', '154mm', '205mm', '255mm', '305mm', '405mm', '506mm', '606mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: '90° Dönüş',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['54mm', '104mm', '154mm', '205mm', '255mm', '305mm', '405mm', '506mm', '606mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'Dış Bükey Dönüş',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['54mm', '104mm', '154mm', '205mm', '255mm', '305mm', '405mm', '506mm', '606mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'Dörtlü Dönüş',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['54mm', '104mm', '154mm', '205mm', '255mm', '305mm', '405mm', '506mm', '606mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'İç Bükey Dönüş',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['54mm', '104mm', '154mm', '205mm', '255mm', '305mm', '405mm', '506mm', '606mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'Orta Redüksiyon',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['105mm', '205mm', '305mm', '405mm', '505mm', '605mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'Sağ Redüksiyon',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['105mm', '205mm', '305mm', '405mm', '505mm', '605mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'Sol Redüksiyon',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['105mm', '205mm', '305mm', '405mm', '505mm', '605mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'Z Orta Redüksiyon',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['25mm', '50mm', '75mm', '100mm', '125mm', '150mm', '175mm', '200mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'Z Sağ-Sol Redüksiyon',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['25mm', '50mm', '75mm', '100mm', '125mm', '150mm', '175mm', '200mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'Seperatör',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['30mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        }
      ],
      covers: {
        name: 'Kapak',
        heights: ['11mm'],
        widths: ['50mm', '100mm', '150mm', '200mm', '250mm', '300mm', '400mm', '500mm', '600mm'],
        thicknesses: ['0.8mm'],
        rule: 'Kanalın genişliğine göre eşleşir'
      },
      description: 'Toz, nem ve dış etkenlere karşı ek koruma sağlamak amacıyla deliksiz üretilen bu kanallar; hassas kablolama uygulamalarında tertip ve güvenilirlik sağlar. İç yüzey yapısı sayesinde kabloların zarar görmeden yönlendirilmesine olanak tanır.',
      useCases: ['Hassas kablolama', 'Görünür montajlar', 'Estetik projeler', 'Toz/nem koruması gereken alanlar'],
      recommendation: 'Deliksiz yüzey ile toz ve nem koruması gereken estetik projelerde'
    },
    {
      code: 'HUCT',
      name: 'Deliksiz Ağır Hizmet Tipi Kablo Kanalı',
      fullName: 'HUCT - Deliksiz Ağır Hizmet Tipi Kablo Kanalı',
      coatings: ['Pregalvaniz', 'Sıcak Daldırma', 'Boyalı'],
      dimensions: {
        heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
        widths: ['50mm', '100mm', '150mm', '200mm', '250mm', '300mm', '400mm', '500mm', '600mm'],
        thicknesses: ['0.8mm', '1.0mm', '1.2mm', '1.5mm', '2.0mm']
      },
      modules: {
        name: 'Ek Eleman',
        heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
        widths: ['23mm'],
        thicknesses: ['1.5mm', '2.0mm'],
        rule: 'Kanalın yüksekliğine göre eşleşir'
      },
      accessories: [
        {
          type: 'T Dönüş',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['54mm', '104mm', '154mm', '205mm', '255mm', '305mm', '405mm', '506mm', '606mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: '90° Dönüş',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['54mm', '104mm', '154mm', '205mm', '255mm', '305mm', '405mm', '506mm', '606mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'Dış Bükey Dönüş',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['54mm', '104mm', '154mm', '205mm', '255mm', '305mm', '405mm', '506mm', '606mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'Dörtlü Dönüş',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['54mm', '104mm', '154mm', '205mm', '255mm', '305mm', '405mm', '506mm', '606mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'İç Bükey Dönüş',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['54mm', '104mm', '154mm', '205mm', '255mm', '305mm', '405mm', '506mm', '606mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'Orta Redüksiyon',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['105mm', '205mm', '305mm', '405mm', '505mm', '605mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'Sağ Redüksiyon',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['105mm', '205mm', '305mm', '405mm', '505mm', '605mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'Sol Redüksiyon',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['105mm', '205mm', '305mm', '405mm', '505mm', '605mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'Z Orta Redüksiyon',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['25mm', '50mm', '75mm', '100mm', '125mm', '150mm', '175mm', '200mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'Z Sağ-Sol Redüksiyon',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['25mm', '50mm', '75mm', '100mm', '125mm', '150mm', '175mm', '200mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'Seperatör',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['30mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        }
      ],
      covers: {
        name: 'Kapak',
        heights: ['11mm'],
        widths: ['50mm', '100mm', '150mm', '200mm', '250mm', '300mm', '400mm', '500mm', '600mm'],
        thicknesses: ['0.8mm'],
        rule: 'Kanalın genişliğine göre eşleşir'
      },
      description: 'Endüstriyel tesislerde yoğun yük altında çalışan kablolama sistemleri için geliştirilen deliksiz ağır hizmet kanalları, dış ortam etkilerine karşı ekstra koruma sağlar. Güçlü konstrüksiyonu sayesinde titreşimli ve ağır koşullarda güvenilir performans sunar.',
      useCases: ['Endüstriyel tesisler', 'Premium projeler', 'Ağır yük + estetik', 'Titreşimli ortamlar'],
      recommendation: 'Hem yüksek dayanıklılık hem de estetik görünüm gereken endüstriyel projelerde'
    },
    {
      code: 'ICT',
      name: 'Formlu/Geçmeli Tip Kablo Kanalları',
      fullName: 'ICT - Formlu/Geçmeli Tip Kablo Kanalları',
      coatings: ['Pregalvaniz', 'Sıcak Daldırma', 'Boyalı'],
      dimensions: {
        heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
        widths: ['50mm', '100mm', '150mm', '200mm', '250mm', '300mm', '400mm', '500mm', '600mm'],
        thicknesses: ['0.8mm', '1.0mm', '1.2mm', '1.5mm', '2.0mm']
      },
      modules: {
        name: 'Ek Eleman',
        heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
        widths: ['23mm'],
        thicknesses: ['1.5mm', '2.0mm'],
        rule: 'Kanalın yüksekliğine göre eşleşir'
      },
      accessories: [
        {
          type: 'T Dönüş',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['54mm', '104mm', '154mm', '205mm', '255mm', '305mm', '405mm', '506mm', '606mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: '90° Dönüş',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['54mm', '104mm', '154mm', '205mm', '255mm', '305mm', '405mm', '506mm', '606mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'Dış Bükey Dönüş',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['54mm', '104mm', '154mm', '205mm', '255mm', '305mm', '405mm', '506mm', '606mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'Dörtlü Dönüş',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['54mm', '104mm', '154mm', '205mm', '255mm', '305mm', '405mm', '506mm', '606mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'İç Bükey Dönüş',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['54mm', '104mm', '154mm', '205mm', '255mm', '305mm', '405mm', '506mm', '606mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'Orta Redüksiyon',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['105mm', '205mm', '305mm', '405mm', '505mm', '605mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'Sağ Redüksiyon',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['105mm', '205mm', '305mm', '405mm', '505mm', '605mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'Sol Redüksiyon',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['105mm', '205mm', '305mm', '405mm', '505mm', '605mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'Z Orta Redüksiyon',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['25mm', '50mm', '75mm', '100mm', '125mm', '150mm', '175mm', '200mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'Z Sağ-Sol Redüksiyon',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['25mm', '50mm', '75mm', '100mm', '125mm', '150mm', '175mm', '200mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'Seperatör',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['30mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        }
      ],
      covers: {
        name: 'Kapak',
        heights: ['11mm'],
        widths: ['50mm', '100mm', '150mm', '200mm', '250mm', '300mm', '400mm', '500mm', '600mm'],
        thicknesses: ['0.8mm'],
        rule: 'Kanalın genişliğine göre eşleşir'
      },
      description: 'Modüler yapısı ve geçmeli tasarımı sayesinde hızlı montaj imkânı sunan formlu kablo kanalları, estetik ve düzenli bir kablo yönetimi sağlar. Bağlantı noktalarında kullanılan geçmeli mekanizma, sistemin sağlam ve sürekli bir bütün olarak çalışmasına olanak tanır.',
      useCases: ['Hızlı montaj projeleri', 'Modüler sistemler', 'Retrofit uygulamaları', 'Esnek konfigürasyonlar'],
      recommendation: 'Hızlı kurulum ve modüler yapı gereken projelerde tercih edilir'
    },
    {
      code: 'CL',
      name: 'Kablo Merdivenleri',
      fullName: 'CL - Kablo Merdivenleri',
      coatings: ['Pregalvaniz', 'Sıcak Daldırma', 'Boyalı'],
      dimensions: {
        heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
        widths: ['50mm', '100mm', '150mm', '200mm', '250mm', '300mm', '400mm', '500mm', '600mm'],
        thicknesses: ['0.8mm', '1.0mm', '1.2mm', '1.5mm', '2.0mm']
      },
      modules: {
        name: 'Ek Eleman',
        heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
        widths: ['23mm'],
        thicknesses: ['1.5mm', '2.0mm'],
        rule: 'Kanalın yüksekliğine göre eşleşir'
      },
      accessories: [
        {
          type: 'T Dönüş',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['54mm', '104mm', '154mm', '205mm', '255mm', '305mm', '405mm', '506mm', '606mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: '90° Dönüş',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['54mm', '104mm', '154mm', '205mm', '255mm', '305mm', '405mm', '506mm', '606mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'Dış Bükey Dönüş',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['54mm', '104mm', '154mm', '205mm', '255mm', '305mm', '405mm', '506mm', '606mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'Dörtlü Dönüş',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['54mm', '104mm', '154mm', '205mm', '255mm', '305mm', '405mm', '506mm', '606mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'İç Bükey Dönüş',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['54mm', '104mm', '154mm', '205mm', '255mm', '305mm', '405mm', '506mm', '606mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'Orta Redüksiyon',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['105mm', '205mm', '305mm', '405mm', '505mm', '605mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'Sağ Redüksiyon',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['105mm', '205mm', '305mm', '405mm', '505mm', '605mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'Sol Redüksiyon',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['105mm', '205mm', '305mm', '405mm', '505mm', '605mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'Z Orta Redüksiyon',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['25mm', '50mm', '75mm', '100mm', '125mm', '150mm', '175mm', '200mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'Z Sağ-Sol Redüksiyon',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['25mm', '50mm', '75mm', '100mm', '125mm', '150mm', '175mm', '200mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'Seperatör',
          heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
          widths: ['30mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        }
      ],
      covers: {
        name: 'Kapak (Opsiyonel)',
        heights: ['11mm'],
        widths: ['50mm', '100mm', '150mm', '200mm', '250mm', '300mm', '400mm', '500mm', '600mm'],
        thicknesses: ['0.8mm'],
        rule: 'Kanalın genişliğine göre eşleşir'
      },
      description: 'Uzun mesafeli kablo taşımalarında yüksek taşıma kapasitesi sunan kablo merdivenleri, açık yapısı sayesinde kablo havalandırmasını ve hızlı müdahaleyi kolaylaştırır. Endüstriyel tesislerde ağır kablo grupları için tercih edilen bir çözümdür.',
      useCases: ['Endüstriyel tesisler', 'Veri merkezleri', 'Ağır kablo grupları', 'Uzun mesafe taşıma'],
      recommendation: 'Açık sistem, yüksek havalandırma ve kolay erişim gereken büyük projelerde'
    },
    {
      code: 'TRU',
      name: 'Trunking Kablo Kanalları',
      fullName: 'TRU - Trunking Kablo Kanalları',
      coatings: ['Pregalvaniz', 'Sıcak Daldırma', 'Boyalı'],
      dimensions: {
        heights: ['50mm', '60mm', '80mm', '100mm', '150mm'],
        widths: ['50mm', '100mm', '150mm', '200mm', '250mm', '300mm', '400mm', '500mm', '600mm'],
        thicknesses: ['0.8mm', '1.0mm', '1.2mm', '1.5mm', '2.0mm']
      },
      modules: {
        name: 'Ek Eleman',
        heights: ['40mm', '50mm', '60mm', '80mm', '100mm'],
        widths: ['23mm'],
        thicknesses: ['1.5mm', '2.0mm'],
        rule: 'Kanalın yüksekliğine göre eşleşir'
      },
      accessories: [
        {
          type: 'T Dönüş',
          heights: ['50mm', '60mm', '80mm', '100mm', '150mm'],
          widths: ['54mm', '104mm', '154mm', '205mm', '255mm', '305mm', '405mm', '506mm', '606mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: '90° Dönüş',
          heights: ['50mm', '60mm', '80mm', '100mm', '150mm'],
          widths: ['54mm', '104mm', '154mm', '205mm', '255mm', '305mm', '405mm', '506mm', '606mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'Dış Bükey Dönüş',
          heights: ['50mm', '60mm', '80mm', '100mm', '150mm'],
          widths: ['54mm', '104mm', '154mm', '205mm', '255mm', '305mm', '405mm', '506mm', '606mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'Dörtlü Dönüş',
          heights: ['50mm', '60mm', '80mm', '100mm', '150mm'],
          widths: ['54mm', '104mm', '154mm', '205mm', '255mm', '305mm', '405mm', '506mm', '606mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'İç Bükey Dönüş',
          heights: ['50mm', '60mm', '80mm', '100mm', '150mm'],
          widths: ['54mm', '104mm', '154mm', '205mm', '255mm', '305mm', '405mm', '506mm', '606mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'Orta Redüksiyon',
          heights: ['50mm', '60mm', '80mm', '100mm', '150mm'],
          widths: ['105mm', '205mm', '305mm', '405mm', '505mm', '605mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'Sağ Redüksiyon',
          heights: ['50mm', '60mm', '80mm', '100mm', '150mm'],
          widths: ['105mm', '205mm', '305mm', '405mm', '505mm', '605mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'Sol Redüksiyon',
          heights: ['50mm', '60mm', '80mm', '100mm', '150mm'],
          widths: ['105mm', '205mm', '305mm', '405mm', '505mm', '605mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'Z Orta Redüksiyon',
          heights: ['50mm', '60mm', '80mm', '100mm', '150mm'],
          widths: ['25mm', '50mm', '75mm', '100mm', '125mm', '150mm', '175mm', '200mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'Z Sağ-Sol Redüksiyon',
          heights: ['50mm', '60mm', '80mm', '100mm', '150mm'],
          widths: ['25mm', '50mm', '75mm', '100mm', '125mm', '150mm', '175mm', '200mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        },
        {
          type: 'Seperatör',
          heights: ['50mm', '60mm', '80mm', '100mm', '150mm'],
          widths: ['30mm'],
          thicknesses: ['1.0mm', '1.2mm', '1.5mm', '2.0mm']
        }
      ],
      covers: {
        name: 'Set halinde satılır (kapak dahil)',
        heights: ['Kanal ile birlikte'],
        widths: ['Kanal ile birlikte'],
        thicknesses: ['Kanal ile birlikte'],
        rule: 'Set halinde gelir'
      },
      description: 'Geniş kablo gruplarını tek hat üzerinde güvenli şekilde taşımak için tasarlanan trunking kanallar, yüksek hacimli kablolama uygulamalarında düzen, güvenlik ve profesyonel görünüm sağlar. Kolay erişim özelliği sayesinde bakım süreçleri hızlanır.',
      useCases: ['Ana kablo hatları', 'Büyük tesisler', 'Yüksek kablo yoğunluğu', 'Omurga sistemleri'],
      recommendation: 'Büyük tesislerde ana kablo dağıtım hatları için ideal, set halinde gelir'
    },
    {
      code: 'WCT',
      name: 'Tel Örgü Kablo Kanalları',
      fullName: 'WCT - Tel Örgü Kablo Kanalları',
      coatings: ['Elektro', 'Sıcak Daldırma', 'Boyalı'],
      dimensions: {
        heights: ['35mm', '55mm', '85mm', '105mm'],
        widths: ['50mm', '100mm', '150mm', '200mm', '250mm', '300mm', '400mm', '500mm', '600mm'],
        thicknesses: ['3.8mm', '4.0mm', '4.5mm', '5.0mm']
      },
      modules: {
        name: 'Ek Eleman',
        heights: ['35mm', '55mm', '85mm', '105mm'],
        widths: ['-'],
        thicknesses: ['2mm', '3mm'],
        rule: 'Kanalın yüksekliğine göre eşleşir'
      },
      accessories: [
        {
          type: 'T Dönüş',
          heights: ['35mm', '55mm', '85mm', '105mm'],
          widths: ['54mm', '104mm', '154mm', '205mm', '255mm', '305mm', '405mm', '506mm', '606mm'],
          thicknesses: ['3.8mm', '4.0mm', '4.5mm', '5.0mm']
        },
        {
          type: '90° Dönüş',
          heights: ['35mm', '55mm', '85mm', '105mm'],
          widths: ['54mm', '104mm', '154mm', '205mm', '255mm', '305mm', '405mm', '506mm', '606mm'],
          thicknesses: ['3.8mm', '4.0mm', '4.5mm', '5.0mm']
        },
        {
          type: 'Dörtlü Dönüş',
          heights: ['35mm', '55mm', '85mm', '105mm'],
          widths: ['54mm', '104mm', '154mm', '205mm', '255mm', '305mm', '405mm', '506mm', '606mm'],
          thicknesses: ['3.8mm', '4.0mm', '4.5mm', '5.0mm']
        }
      ],
      covers: {
        name: 'Kapak Yok',
        heights: [],
        widths: [],
        thicknesses: [],
        rule: 'Tel örgü sistemlerde kapak kullanılmaz'
      },
      description: 'Havalandırma gerektiren kablolama çözümleri için ideal olan tel örgü kanallar, hafif yapısı ve geniş açıklıkları sayesinde kablo ısınmasını önler. Veri merkezleri, IT altyapıları ve düşük gerilim hatlarında esnek ve modern bir çözüm oluşturur.',
      useCases: ['Veri merkezleri', 'IT altyapıları', 'Havalandırma gereken alanlar', 'Düşük gerilim hatları'],
      recommendation: 'Kablo havalandırması kritik olan veri merkezi ve IT projelerinde'
    }
  ],

  coatingInfo: {
    'Pregalvaniz': {
      description: 'Ekonomik ve dayanıklı çinko kaplama',
      bestFor: ['İç mekan uygulamaları', 'Normal nem koşulları', 'Bütçe dostu projeler'],
      features: ['Ekonomik', 'İç mekan için yeterli koruma', 'Hızlı teslimat'],
      technicalNote: 'Seçilen tipte kanalın aynı tipte modülü, aksesuarı ve kapağı olur'
    },
    'Sıcak Daldırma': {
      description: 'Yüksek korozyon direnci, dış mekan uyumlu',
      bestFor: ['Dış mekan uygulamaları', 'Yüksek nem ortamları', 'Uzun ömür beklentisi', 'Sahil bölgeleri'],
      features: ['20+ yıl dayanım', 'Maksimum korozyon koruması', 'Dış mekan standartı'],
      technicalNote: 'Seçilen tipte kanalın aynı tipte modülü, aksesuarı ve kapağı olur'
    },
    'Boyalı': {
      description: 'Estetik görünüm, özel renk seçenekleri',
      bestFor: ['Görünür montajlar', 'Estetik öncelikli projeler', 'Özel renk talebi', 'Modern binalar'],
      features: ['RAL renk seçenekleri', 'Estetik görünüm', 'Dekoratif uygulamalar'],
      technicalNote: 'Seçilen tipte kanalın aynı tipte modülü, aksesuarı ve kapağı olur'
    },
    'Elektro': {
      description: 'Elektro galvaniz, hafif koruma',
      bestFor: ['Kontrollü iç ortamlar', 'Düşük bütçeli projeler', 'Kısa vadeli kullanım'],
      features: ['En ekonomik seçenek', 'Hafif koruma', 'İç mekan'],
      technicalNote: 'Sadece CT ve WCT ürünlerinde mevcut'
    }
  },

  matchingRules: {
    coating: 'Seçilen tipte kanalın aynı tipte modülü, aksesuarı ve kapağı olur (Pregalvaniz kanal → Pregalvaniz aksesuar)',
    modules: 'Modüller ve aksesuarlar seçilen kanalın YÜKSEKLİĞİNE göre eşleşir',
    covers: 'Kapaklar seçilen kanalın GENİŞLİĞİNE göre eşleşir',
    length: 'Ürün boyları standart olarak 3 metre üretilir',
    customization: 'İsteğe bağlı farklı ölçü ve malzemede üretim yapılabilir',
    tolerance: 'Malzeme ağırlıkları ±%10 tolerans gösterebilir'
  },

  contactInfo: {
    phone: '0262 674 47 67',
    email: 'info@ipos-steel.com',
    website: 'https://ipossteel.com',
    address: 'Köseler, Kocaeli Kafe OSB, 1. Cd. No:22, 41420 Dilovası/Kocaeli',
    workingHours: 'Pazartesi - Cuma: 08:30 - 17:30'
  }
}

// Helper: Format product catalog for GPT (özet versiyon)
export function formatProductCatalogForGPT(): string {
  let text = '📦 IPOS STEEL ÜRÜN KATALOĞU (DETAYLI HİYERARŞİ)\n\n'
  
  PRODUCT_CATALOG.products.forEach((product, index) => {
    text += `${index + 1}. ${product.fullName}\n`
    text += `   Kaplamaları: ${product.coatings.join(', ')}\n`
    text += `   Yükseklikler: ${product.dimensions.heights.join(', ')}\n`
    text += `   Genişlikler: ${product.dimensions.widths.join(', ')}\n`
    text += `   Kalınlıklar: ${product.dimensions.thicknesses.join(', ')}\n`
    text += `   \n`
    text += `   📦 MODÜLLER (${product.modules.name}):\n`
    text += `      - Yükseklikler: ${product.modules.heights.join(', ')}\n`
    text += `      - Genişlikler: ${product.modules.widths.join(', ')}\n`
    text += `      - Kalınlıklar: ${product.modules.thicknesses.join(', ')}\n`
    text += `      - Kural: ${product.modules.rule}\n`
    text += `   \n`
    text += `   🔧 AKSESUARLAR (${product.accessories.length} tip):\n`
    product.accessories.slice(0, 5).forEach(acc => {
      text += `      • ${acc.type}\n`
    })
    if (product.accessories.length > 5) {
      text += `      ... ve ${product.accessories.length - 5} tip daha\n`
    }
    text += `   \n`
    text += `   📌 KAPAK: ${product.covers.name}\n`
    text += `      - Kural: ${product.covers.rule}\n`
    text += `   \n`
    text += `   ℹ️  ${product.description}\n`
    text += `   💡 Öneri: ${product.recommendation}\n\n`
  })

  text += '\n🎨 KAPLAMA KURALLARI:\n'
  text += `• ${PRODUCT_CATALOG.matchingRules.coating}\n`
  text += `• ${PRODUCT_CATALOG.matchingRules.modules}\n`
  text += `• ${PRODUCT_CATALOG.matchingRules.covers}\n`
  text += `• ${PRODUCT_CATALOG.matchingRules.length}\n`
  text += `• ${PRODUCT_CATALOG.matchingRules.customization}\n`
  text += `• ${PRODUCT_CATALOG.matchingRules.tolerance}\n`
  
  return text
}

// Helper: Get accessories for specific product and dimensions
export function getAccessoriesForProduct(
  productCode: string, 
  height: string, 
  coating: string
): any[] {
  const product = PRODUCT_CATALOG.products.find(p => p.code === productCode)
  if (!product) return []
  
  // Filter accessories by height
  return product.accessories.filter(acc => 
    acc.heights.includes(height)
  )
}

// Helper: Get cover for specific width
export function getCoverForWidth(productCode: string, width: string): any | null {
  const product = PRODUCT_CATALOG.products.find(p => p.code === productCode)
  if (!product || !product.covers.widths.includes(width)) return null
  
  return product.covers
}
