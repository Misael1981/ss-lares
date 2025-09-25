"use client"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "../ui/button"

const TagsQuickSearch = ({ productsType = [] }) => {
  const searchParams = useSearchParams()
  const activeType = searchParams.get('type')

  const availableTypes = productsType.map((type, index) => ({
    id: index + 1,
    name: type.charAt(0).toUpperCase() + type.slice(1),
    value: type,
  }))

  // ✅ Adicionar botão "Todos" para limpar filtro
  const allTypes = [
    { id: 0, name: "Todos", value: null },
    ...availableTypes
  ]

  return (
    <div className="my-4 flex items-center gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
      {allTypes.map((tag) => (
        <Button
          key={tag.id}
          variant={activeType === tag.value ? "default" : "secondary"}
          className="rounded-s-lg px-3 py-1"
          asChild
        >
          <Link href={tag.value ? `/produtos?type=${tag.value}` : '/produtos'}>
            {tag.name}
          </Link>
        </Button>
      ))}
    </div>
  )
}

export default TagsQuickSearch
