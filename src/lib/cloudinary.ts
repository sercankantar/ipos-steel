import { v2 as cloudinary } from 'cloudinary'

const cloudinaryUrl = process.env.CLOUDINARY_URL

if (!cloudinaryUrl) {
  throw new Error('CLOUDINARY_URL tanımlı değil')
}

// Parse Cloudinary URL: cloudinary://API_KEY:API_SECRET@CLOUD_NAME
const urlMatch = cloudinaryUrl.match(/cloudinary:\/\/(\d+):([^@]+)@(.+)/)

if (!urlMatch) {
  throw new Error('CLOUDINARY_URL formatı hatalı')
}

const [, apiKey, apiSecret, cloudName] = urlMatch

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
})

export { cloudinary }



