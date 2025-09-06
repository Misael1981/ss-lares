import { NextResponse } from "next/server"
import cloudinary from "@/lib/cloudinary"

export async function POST(request) {
  const data = await request.formData()
  const file = data.get("file") // input type="file"

  if (!file) {
    return NextResponse.json(
      { error: "Nenhum arquivo enviado" },
      { status: 400 },
    )
  }

  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  try {
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "pizzaria" }, (error, result) => {
          if (error) reject(error)
          else resolve(result)
        })
        .end(buffer)
    })

    return NextResponse.json({ url: result.secure_url })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
