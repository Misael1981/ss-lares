"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import FreteCorreios from "../FreteCorreios"
import FreteBaspress from "../FreteBaspress"
import FretePaulineris from "../FretePaulineris"

const FreteCard = ({ produto }) => {
  const [activeTransporter, setActiveTransporter] = useState("correios")

  const renderFreteComponent = () => {
    switch (activeTransporter) {
      case "correios":
        return <FreteCorreios produto={produto} />
      case "baspress":
        return <FreteBaspress produto={produto} />
      case "paulineris":
        return <FretePaulineris produto={produto} />
      default:
        return <FreteCorreios produto={produto} />
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-6 flex items-center justify-center gap-2">
          <Button 
            variant={activeTransporter === "correios" ? "default" : "outline"}
            onClick={() => setActiveTransporter("correios")}
            className={activeTransporter === "correios" ? "bg-blue-600 hover:bg-blue-700" : ""}
          >
            Correios
          </Button>
          <Button 
            variant={activeTransporter === "paulineris" ? "default" : "outline"}
            onClick={() => setActiveTransporter("paulineris")}
            className={activeTransporter === "paulineris" ? "bg-orange-600 hover:bg-orange-700" : ""}
          >
            Paulineris
          </Button>
          <Button 
            variant={activeTransporter === "baspress" ? "default" : "outline"}
            onClick={() => setActiveTransporter("baspress")}
            className={activeTransporter === "baspress" ? "bg-green-600 hover:bg-green-700" : ""}
          >
            Baspress
          </Button>
        </div>
        {renderFreteComponent()}
      </CardContent>
    </Card>
  )
}

export default FreteCard
