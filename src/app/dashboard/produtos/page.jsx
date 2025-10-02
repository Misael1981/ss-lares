import { Suspense } from "react"
import { getProducts } from "@/lib/products"
import ProductManager from "./components/ProductManager"
import ProductSkeleton from "./components/ProductSkeleton"

export default async function ProdutosPage() {
  const products = await getProducts()

  return (
    <div className="container mx-auto">
      <Suspense fallback={<ProductSkeleton />}>
        <ProductManager initialProducts={products} />
      </Suspense>
    </div>
  )
}
