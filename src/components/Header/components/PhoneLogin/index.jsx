"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Smartphone, Send, Shield } from "lucide-react"
import { toast } from "sonner"

const PhoneLogin = () => {
  const [step, setStep] = useState(1)
  const [phone, setPhone] = useState("")
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
    }
    return value
  }

  const handleSendCode = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/auth/send-sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone })
      })
      
      const data = await response.json()
      
      if (data.success) {
        setStep(2)
        toast.success("📱 Código enviado! Verifique seu celular")
      } else {
        toast.error(data.error || "Erro ao enviar código")
      }
    } catch (error) {
      toast.error("Erro de conexão")
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyCode = async () => {
    setLoading(true)
    try {
      const result = await signIn("phone", {
        phone,
        code,
        redirect: false
      })
      
      if (result?.ok) {
        toast.success("🎉 Login realizado com sucesso!")
        window.location.reload()
      } else {
        toast.error("Código inválido ou expirado")
      }
    } catch (error) {
      toast.error("Erro no login")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {step === 1 ? (
        <>
          <div className="flex items-center gap-2 mb-4">
            <Smartphone className="h-5 w-5 text-blue-500" />
            <h3 className="font-medium">Login com Celular</h3>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Número do Celular</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(11) 99999-9999"
              value={formatPhone(phone)}
              onChange={(e) => setPhone(e.target.value)}
              maxLength={15}
            />
            <p className="text-xs text-muted-foreground">
              Digite apenas números (DDD + número)
            </p>
          </div>
          
          <Button 
            onClick={handleSendCode}
            disabled={phone.length < 10 || loading}
            className="w-full"
          >
            <Send className="mr-2 h-4 w-4" />
            {loading ? "Enviando..." : "Enviar Código"}
          </Button>
        </>
      ) : (
        <>
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-5 w-5 text-green-500" />
            <h3 className="font-medium">Digite o Código</h3>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4">
            📱 Enviamos um código para {formatPhone(phone)}
          </p>
          
          <div className="space-y-2">
            <Label htmlFor="code">Código de Verificação</Label>
            <Input
              id="code"
              type="text"
              placeholder="123456"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
              maxLength={6}
              className="text-center text-lg tracking-widest"
            />
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline"
              onClick={() => setStep(1)}
              className="flex-1"
            >
              Voltar
            </Button>
            <Button 
              onClick={handleVerifyCode}
              disabled={code.length !== 6 || loading}
              className="flex-1"
            >
              {loading ? "Verificando..." : "Entrar"}
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default PhoneLogin