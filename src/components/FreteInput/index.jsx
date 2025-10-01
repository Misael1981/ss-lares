import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { formatCepDisplay } from "@/utils/cepUtils"

export default function FreteInput({ cep, onCepChange, onCalcular, loading, error }) {
  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Digite seu CEP"
          value={formatCepDisplay(cep)}
          onChange={(e) => onCepChange(e.target.value)}
          maxLength={9}
          className="flex-1"
        />
        <Button 
          onClick={onCalcular} 
          disabled={loading || cep.length !== 8}
          className="px-6"
        >
          {loading ? "Calculando..." : "Calcular"}
        </Button>
      </div>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}