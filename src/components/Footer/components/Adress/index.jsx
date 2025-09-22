import { Card, CardContent } from "@/components/ui/card"
import MapsCard from "../MapsCard"

const Address = ({ companyData }) => {
  return (
    <div className="w-[400px] space-y-4 rounded-lg border">
      <h2 className="mb-3 mt-2 text-lg font-semibold">Onde estamos</h2>
      <div>
        <p className="text-sm text-muted-foreground">
          {companyData?.address?.street}, {companyData?.address?.number}
        </p>
        <p className="text-sm text-muted-foreground">
          {companyData?.address?.city} - {companyData?.address?.state}
        </p>
      </div>
      <div className="h-auto w-full rounded-lg border p-2">
        <MapsCard companyData={companyData} />
      </div>
    </div>
  )
}

export default Address
