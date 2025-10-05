import { Suspense } from "react"
import { getCompanyInfo, getCatalogs } from "@/lib/company"
import CompanyManager from "./components/CompanyManager"
import CompanySkeleton from "./components/CompanySkeleton"

export const metadata = {
  title: "Dados da Empresa | Dashboard",
  description: "Gerenciar informações da empresa e catálogos",
}

export default async function DadosEmpresaPage() {
  // ✅ Buscar dados iniciais
  const [companyInfo, catalogs] = await Promise.all([
    getCompanyInfo(),
    getCatalogs(),
  ])

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dados da Empresa
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Gerencie as informações da empresa e catálogos disponíveis
        </p>
      </div>

      <Suspense fallback={<CompanySkeleton />}>
        <CompanyManager
          initialCompanyInfo={companyInfo}
          initialCatalogs={catalogs}
        />
      </Suspense>
    </div>
  )
}
