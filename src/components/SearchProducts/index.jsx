import { Suspense } from "react"
import Search from "../Search"
import TagsQuickSearch from "../TagsQuickSearch"

const SearchProducts = ({ products }) => {
  const productTypes = [...new Set(products.map((product) => product.type))]
  const productNames = [...new Set(products.map((product) => product.name))]
  console.log("productNames: ", productNames)
  return (
    <>
      <Suspense fallback={<div>Carregando busca...</div>}>
        <TagsQuickSearch productsType={productTypes} />
        <Search />
      </Suspense>
    </>
  )
}

export default SearchProducts
