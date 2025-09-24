"use client"

import { Button } from "@/components/ui/button"
import { Mail, Phone } from "lucide-react"
import { FaInstagram } from "react-icons/fa"
import { toast } from "sonner"

const Contact = ({ companyData }) => {
  // Formata o número de telefone para o formato brasileiro
  function formatPhoneBR(e164) {
    // remove o "+" e mantém só números
    const digits = e164.replace(/\D/g, "")

    // DDI (55), DDD (2 dígitos) e o resto do número
    const ddi = digits.slice(0, 2) // 55
    const ddd = digits.slice(2, 4) // 35
    const number = digits.slice(4) // 991972424

    // junta no formato desejado
    return `(${ddd}) 9${number}`
  }

  const handleCopyPhoneClick = (value) => {
    navigator.clipboard.writeText(value)
    toast.success("Número copiado para a área de transferência")
  }
  return (
    <div className="w-full max-w-[400px]">
      <h2 className="mb-4 text-lg font-semibold">Contato</h2>

      {companyData?.phones?.length === 0 ? (
        <div className="space-y-3">
          <div className="h-4 animate-pulse rounded bg-gray-200"></div>
          <div className="h-4 animate-pulse rounded bg-gray-200"></div>
          <div className="h-4 animate-pulse rounded bg-gray-200"></div>
        </div>
      ) : (
        <div className="space-y-3">
          {/* 📱 Telefones */}
          {companyData?.phones?.map((phone, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-green-600" />
                <div className="text-sm">
                  <span className="font-medium text-green-600">
                    {phone.label}
                  </span>
                  {phone.contactName && (
                    <span className="text-muted-foreground">
                      {" - "}
                      {phone.contactName}
                    </span>
                  )}
                  <div className="text-muted-foreground">
                    {formatPhoneBR(phone.number)}
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  handleCopyPhoneClick(formatPhoneBR(phone.number))
                }
              >
                Copiar
              </Button>
            </div>
          ))}

          {/* 📧 Email */}
          {companyData?.email && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-muted-foreground">
                  {companyData.email}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCopyPhoneClick(companyData.email)}
              >
                Copiar
              </Button>
            </div>
          )}

          <div className="flex items-center justify-between">
            <a
              href="https://www.instagram.com/sslaresmg1/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-2 text-sm text-muted-foreground"
            >
              <FaInstagram className="h-4 w-4 text-pink-600" />
              Nos siga no Instagram
            </a>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCopyPhoneClick("@sslares")}
            >
              Copiar
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Contact
