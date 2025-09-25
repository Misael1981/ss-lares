"use client"
import { SearchIcon } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

const Search = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')

  const handleSearch = (e) => {
    e.preventDefault()
    
    // ✅ Construir nova URL mantendo filtros existentes
    const params = new URLSearchParams(searchParams)
    
    if (searchTerm.trim()) {
      params.set('search', searchTerm.trim())
    } else {
      params.delete('search')
    }
    
    // ✅ Navegar para /produtos com os parâmetros
    router.push(`/produtos?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className="my-4 flex max-w-md items-center gap-2">
      <Input 
        placeholder="Buscar produtos..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button type="submit">
        <SearchIcon size={20} />
      </Button>
    </form>
  )
}

export default Search
