import { Input } from "@/components/ui/input"

const CalculatorCard = ({ title, value, onChange }) => {
  return (
    <div className="mb-2 rounded-md border border-solid p-2">
      <h4 className="mb-2 text-lg font-bold">{title}</h4>
      <Input type="number" value={value} onChange={onChange} />
    </div>
  )
}

export default CalculatorCard
