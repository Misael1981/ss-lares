import Search from "../Search"
import TagsQuickSearch from "../TagsQuickSearch"

const SearchProducts = ({ products }) => {
  const productTypes = [...new Set(products.map((product) => product.type))]
  console.log("tipos de products na página SearchProducts: ", productTypes)
  return (
    <>
      <TagsQuickSearch productsType={productTypes} />
      <Search />
    </>
  )
}

export default SearchProducts
