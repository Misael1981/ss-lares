import Search from "../Search"
import TagsQuickSearch from "../TagsQuickSearch"

const SearchProducts = ({ products }) => {
  const productTypes = [...new Set(products.map((product) => product.type))]
  const productNames = [...new Set(products.map((product) => product.name))]
  console.log("productNames: ", productNames)
  return (
    <>
      <TagsQuickSearch productsType={productTypes} />
      <Search />
    </>
  )
}

export default SearchProducts
