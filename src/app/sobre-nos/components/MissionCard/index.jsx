import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

const MissionCard = ({ title, description, imageUrl }) => {
  return (
    <Card className="flex items-center justify-center lg:flex-1">
      <CardContent className="flex max-w-[270px] flex-col items-center justify-center gap-4 p-6 lg:max-w-[240px]">
        <Image src={imageUrl} width={150} height={150} alt={title} />
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-center text-sm text-gray-500">{description}</p>
      </CardContent>
    </Card>
  )
}

export default MissionCard
