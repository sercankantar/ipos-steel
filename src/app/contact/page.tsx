import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Send,
  Building2,
  Users,
  MessageSquare
} from 'lucide-react'

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-blue to-blue-700 text-white py-20">
        <MaxWidthWrapper>
          <div className="text-center">
            <h1 className="font-neuropol text-fluid-3xl font-bold mb-6">
              İletişim
            </h1>
            <p className="text-xl max-w-2xl mx-auto opacity-90">
              IPOS Steel ile iletişime geçin. Uzman ekibimiz size yardımcı olmak için burada.
            </p>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <MaxWidthWrapper>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <div className="card-modern p-8">
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="h-6 w-6 text-primary-blue" />
                <h2 className="font-neuropol text-2xl font-bold">
                  Bize Ulaşın
                </h2>
              </div>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Ad Soyad *</Label>
                    <Input 
                      id="name" 
                      placeholder="Adınızı ve soyadınızı girin"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Şirket</Label>
                    <Input 
                      id="company" 
                      placeholder="Şirket adınız"
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">E-posta *</Label>
                    <Input 
                      id="email" 
                      type="email"
                      placeholder="ornek@email.com"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Telefon</Label>
                    <Input 
                      id="phone" 
                      placeholder="(5xx) xxx xx xx"
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="subject">Konu *</Label>
                  <Input 
                    id="subject" 
                    placeholder="Mesajınızın konusu"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="message">Mesaj *</Label>
                  <textarea 
                    id="message"
                    rows={6}
                    placeholder="Mesajınızı buraya yazın..."
                    className="mt-1 flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                
                <Button className="btn-primary w-full group">
                  <Send className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  Mesaj Gönder
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              
              {/* Main Contact Info */}
              <div className="card-modern p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Building2 className="h-6 w-6 text-primary-blue" />
                  <h2 className="font-neuropol text-2xl font-bold">
                    İletişim Bilgileri
                  </h2>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-5 w-5 text-primary-blue mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Adres</h3>
                      <p className="text-muted-foreground">
                        Atatürk Organize Sanayi Bölgesi<br />
                        10003 Sokak No: 5<br />
                        35620 Çiğli / İzmir
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Phone className="h-5 w-5 text-primary-blue mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Telefon</h3>
                      <p className="text-muted-foreground">
                        +90 (232) 328 15 00
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Mail className="h-5 w-5 text-primary-blue mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">E-posta</h3>
                      <p className="text-muted-foreground">
                        info@ipossteel.com
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Clock className="h-5 w-5 text-primary-blue mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Çalışma Saatleri</h3>
                      <p className="text-muted-foreground">
                        Pazartesi - Cuma: 08:00 - 17:30<br />
                        Cumartesi: 09:00 - 13:00
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="card-modern p-6 text-center">
                  <Users className="h-8 w-8 text-primary-blue mx-auto mb-3" />
                  <h3 className="font-neuropol text-xl font-bold mb-1">500+</h3>
                  <p className="text-sm text-muted-foreground">Mutlu Müşteri</p>
                </div>
                <div className="card-modern p-6 text-center">
                  <Building2 className="h-8 w-8 text-primary-blue mx-auto mb-3" />
                  <h3 className="font-neuropol text-xl font-bold mb-1">25+</h3>
                  <p className="text-sm text-muted-foreground">Yıllık Deneyim</p>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <MaxWidthWrapper>
          <div className="text-center mb-8">
            <h2 className="font-neuropol text-3xl font-bold mb-4">
              Lokasyonumuz
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              İzmir Atatürk Organize Sanayi Bölgesi'nde konumlanan fabrikamızı ziyaret edebilirsiniz.
            </p>
          </div>
          
          <div className="card-modern overflow-hidden">
            <div className="aspect-[21/9] bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-primary-blue mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Harita Yükleniyor</h3>
                <p className="text-muted-foreground">
                  Google Maps entegrasyonu için geliştirme aşamasında
                </p>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  )
}
