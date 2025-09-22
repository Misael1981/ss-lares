import MapsCard from "../MapsCard"

const Address = ({ companyData }) => {
  // 🔥 MONTAR ENDEREÇO COMPLETO PARA O GOOGLE MAPS
  const fullAddress = companyData?.address
    ? `${companyData.address.street}, ${companyData.address.number}, ${companyData.address.neighborhood || ""}, ${companyData.address.city}, ${companyData.address.state}, Brasil`
    : "Rua José Ribeiro Coutinho, 499, Bairro Primavera, Congonhal, MG, Brasil"

  console.log("Endereço completo: ", fullAddress)

  return (
    <div className="w-[400px] max-w-[100%] space-y-4">
      <h2 className="mb-3 text-lg font-semibold">Onde estamos</h2>
      <div>
        <p className="text-sm text-muted-foreground">
          {companyData?.address?.street}, {companyData?.address?.number}
        </p>
        <p className="text-sm text-muted-foreground">
          {companyData?.address?.neighborhood || "Bairro Primavera"}
        </p>
        <p className="text-sm text-muted-foreground">
          {companyData?.address?.city} - {companyData?.address?.state}
        </p>
      </div>
      <div className="h-auto w-full rounded-lg border p-2">
        {/* 🔥 PASSAR APENAS O ENDEREÇO COMPLETO */}
        <MapsCard address={fullAddress} />
      </div>
    </div>
  )
}

export default Address
