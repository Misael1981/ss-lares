import { Button } from "../ui/button"

const tags = [
  {
    id: 1,
    name: "Espaçadores",
  },
  {
    id: 2,
    name: "Desempenadeiras",
  },
  {
    id: 3,
    name: "Ralos",
  },
  {
    id: 4,
    name: "Outros",
  },
]

const TagsQuickSearch = () => {
  return (
    <div className="my-4 flex items-center gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
      {tags.map((tag) => (
        <Button
          key={tag.id}
          variant="secondary"
          className="rounded-s-lg px-3 py-1"
        >
          {tag.name}
        </Button>
      ))}
    </div>
  )
}

export default TagsQuickSearch
