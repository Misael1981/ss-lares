import { SearchIcon } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

const Search = () => {
  return (
    <form action="" className="my-4 flex max-w-md items-center gap-2">
      <Input placeholder="Buscar" />
      <Button>
        <SearchIcon size={32} />
      </Button>
    </form>
  )
}

export default Search
