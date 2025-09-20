import { NextResponse } from "next/server"

// Mesmo Map da API send-sms (em produção use Redis)
const verificationCodes = new Map()

export async function POST(request) {
  try {
    const { phone, code } = await request.json()

    const stored = verificationCodes.get(phone)

    if (!stored || stored.expires < Date.now()) {
      return NextResponse.json({
        valid: false,
        error: "Código expirado",
      })
    }

    if (stored.code !== code) {
      return NextResponse.json({
        valid: false,
        error: "Código inválido",
      })
    }

    // Limpar código usado
    verificationCodes.delete(phone)

    return NextResponse.json({ valid: true })
  } catch (error) {
    return NextResponse.json({
      valid: false,
      error: "Erro interno",
    })
  }
}
