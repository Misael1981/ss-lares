import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    cloudName: process.env.CLOUDINARY_CLOUD_NAME ? "✅ OK" : "❌ MISSING",
    apiKey: process.env.CLOUDINARY_API_KEY ? "✅ OK" : "❌ MISSING", 
    apiSecret: process.env.CLOUDINARY_API_SECRET ? "✅ OK" : "❌ MISSING"
  })
}