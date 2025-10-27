import { GlobalWorkerOptions } from 'pdfjs-dist'

// PDF.js worker'ı yapılandır
if (typeof window !== 'undefined') {
  // Browser ortamında
  GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${process.env.NEXT_PUBLIC_PDFJS_VERSION || '3.11.174'}/pdf.worker.min.js`
}

