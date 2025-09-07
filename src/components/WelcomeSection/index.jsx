import { db } from "@/lib/prisma"
import CardWelcome from "./components/CardWelcome"

const WelcomeSection = async () => {
  const banners = await db.carouselBanner.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      order: "asc",
    },
  })

  return (
    <section>
      <CardWelcome banners={banners} />
    </section>
  )
}

export default WelcomeSection
