"use client"
import React, { useState, useEffect } from "react"
import styled, { keyframes } from "styled-components"
import { FaWhatsapp, FaTimes } from "react-icons/fa"

// Animação de pulso para chamar atenção
const pulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7);
  }
  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(37, 211, 102, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
  }
`

// Animação de entrada do chat
const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`

const FloatingContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;

  @media (max-width: 768px) {
    bottom: 15px;
    right: 15px;
  }
`

const ChatBubble = styled.div`
  background: white;
  border-radius: 20px;
  padding: 15px 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  max-width: 280px;
  position: relative;
  animation: ${slideUp} 0.3s ease-out;
  border: 1px solid #e0e0e0;

  &::after {
    content: "";
    position: absolute;
    bottom: -8px;
    right: 20px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid white;
  }

  @media (max-width: 768px) {
    max-width: 250px;
    padding: 12px 16px;
  }
`

const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
`

const AgentAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 18px;
`

const AgentInfo = styled.div`
  flex: 1;

  h4 {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    color: #333;
  }

  p {
    margin: 0;
    font-size: 12px;
    color: #666;
  }
`

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #999;
  font-size: 16px;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #333;
  }
`

const ChatMessage = styled.p`
  margin: 0 0 12px 0;
  font-size: 14px;
  line-height: 1.4;
  color: #333;
`

const ChatButton = styled.button`
  background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
  color: white;
  border: none;
  border-radius: 25px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #128c7e 0%, #0d6b5c 100%);
    transform: translateY(-1px);
  }
`

const WhatsAppButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(37, 211, 102, 0.3);
  transition: all 0.3s ease;
  animation: ${pulse} 2s infinite;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 25px rgba(37, 211, 102, 0.4);
    animation: none;
  }

  svg {
    font-size: 28px;
    color: white;
  }

  @media (max-width: 768px) {
    width: 55px;
    height: 55px;

    svg {
      font-size: 24px;
    }
  }
`

const LoadingButton = styled(WhatsAppButton)`
  background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
  animation: ${pulse} 1.5s infinite;
  
  &:hover {
    transform: none;
    box-shadow: 0 4px 20px rgba(107, 114, 128, 0.3);
  }
`

const FloatingWhatsApp = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [companyData, setCompanyData] = useState(null)
  const [loading, setLoading] = useState(true)

  // 🔥 Buscar dados da empresa
  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await fetch('/api/company')
        if (response.ok) {
          const data = await response.json()
          setCompanyData(data)
        }
      } catch (error) {
        console.error('Erro ao buscar dados da empresa:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCompanyData()
  }, [])

  // 📱 Usar dados dinâmicos ou fallback
  const adminPhone = companyData?.phones?.find(p => p.label === "Admin")
  const phoneNumber = adminPhone?.number?.replace('+', '') || "553591972424"
  const agentName = adminPhone?.contactName || "Tayliner"
  const companyName = companyData?.name || "SSL Ares"

  const handleWhatsAppClick = () => {
    const message = `Olá! Gostaria de mais informações sobre produtos e soluções da ${companyName}. Poderia me ajudar?`
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
    setIsOpen(false)
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  // 🔄 Mostrar loading enquanto carrega
  if (loading) {
    return (
      <FloatingContainer>
        <LoadingButton>
          <FaWhatsapp />
        </LoadingButton>
      </FloatingContainer>
    )
  }

  return (
    <FloatingContainer>
      {isOpen && (
        <ChatBubble>
          <ChatHeader>
            <AgentAvatar>{agentName.charAt(0).toUpperCase()}</AgentAvatar>
            <AgentInfo>
              <h4>{agentName}</h4>
              <p>{companyName}</p>
            </AgentInfo>
            <CloseButton onClick={() => setIsOpen(false)}>
              <FaTimes />
            </CloseButton>
          </ChatHeader>
          <ChatMessage>
            Olá! 👋 Sou {agentName}, especialista em produtos e soluções da {companyName}. Como posso te ajudar hoje?
          </ChatMessage>
          <ChatButton onClick={handleWhatsAppClick}>
            <FaWhatsapp />
            Iniciar Conversa
          </ChatButton>
        </ChatBubble>
      )}

      <WhatsAppButton onClick={toggleChat}>
        <FaWhatsapp />
      </WhatsAppButton>
    </FloatingContainer>
  )
}

export default FloatingWhatsApp
