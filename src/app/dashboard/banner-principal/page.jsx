import { Suspense } from "react"
import { getBanners } from "@/lib/banners"
import BannerManager from "./components/BannerManager"
import BannerSkeleton from "./components/BannerSkeleton"

// 🔥 SERVER COMPONENT - BUSCA DADOS INICIAIS
export default async function BannerPrincipalPage() {
  const initialBanners = await getBanners()

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Banner Principal</h1>
          <p className="text-muted-foreground">
            Gerencie os banners do carousel da página inicial
          </p>
        </div>
      </div>

      <Suspense fallback={<BannerSkeleton />}>
        <BannerManager initialBanners={initialBanners} />
      </Suspense>
    </div>
  )
}
