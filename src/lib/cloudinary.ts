import { v2 as cloudinary } from 'cloudinary'

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
const cloudinaryUrl = process.env.CLOUDINARY_URL

if (!cloudName) {
  throw new Error('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME tanımlı değil')
}

if (!cloudinaryUrl) {
  throw new Error('CLOUDINARY_URL tanımlı değil')
}

cloudinary.config({
  cloud_name: cloudName,
  secure: true,
})

export { cloudinary }


