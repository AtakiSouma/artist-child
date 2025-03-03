import app from './app'
import dotenv from 'dotenv'
dotenv.config()
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY
})
const port = process.env.PORT || 8000
const server = app.listen(port, () => {
  console.log(`Server listening on port :  ${port}`)
})
process.on('SIGINT', () => {
  server.close(() => console.log(`Server Express on  port ${port} closed`))
})
