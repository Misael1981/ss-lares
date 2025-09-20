import { NextResponse } from "next/server"
import twilio from "twilio"

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

// Armazenamento temporário dos códigos (use Redis em produção)
const verificationCodes = new Map()

export async function POST(request) {
  try {
    const { phone } = await request.json()
    
    // Validar formato do telefone
    if (!phone || !/^\+?[1-9]\d{10,14}$/.test(phone.replace(/\s/g, ''))) {
      return NextResponse.json(
        { error: "Número de telefone inválido" },
        { status: 400 }
      )
    }
    
    // Limpar formatação
    const cleanPhone = phone.replace(/\D/g, '')
    const formattedPhone = `+55${cleanPhone}`
    
    // Gerar código de 6 dígitos
    const code = Math.floor(100000 + Math.random() * 900000).toString()
    
    // Enviar SMS
    await client.messages.create({
      body: `🔐 SSL Ares - Seu código: ${code}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: formattedPhone
    })
    
    // Salvar código temporariamente (5 minutos)
    verificationCodes.set(formattedPhone, {
      code,
      expires: Date.now() + 5 * 60 * 1000
    })
    
    return NextResponse.json({ 
      success: true,
      message: "Código enviado com sucesso!" 
    })
    
  } catch (error) {
    console.error("Erro ao enviar SMS:", error)
    return NextResponse.json(
      { error: "Erro ao enviar SMS. Verifique o número." },
      { status: 500 }
    )
  }
}

// Função para verificar código (exportada para uso no NextAuth)
export function verifyCode(phone, code) {
  const stored = verificationCodes.get(phone)
  
  if (!stored || stored.expires < Date.now()) {
    return { valid: false, error: "Código expirado" }
  }
  
  if (stored.code !== code) {
    return { valid: false, error: "Código inválido" }
  }
  
  // Limpar código usado
  verificationCodes.delete(phone)
  
  return { valid: true }
}