import Link from "next/link"
import { FileText, Users, Shield, Download } from "lucide-react"

const InstitutionalLinks = () => {
  const links = [
    {
      title: "Política de Privacidade",
      href: "/politica-privacidade",
      icon: Shield,
      description: "Saiba como protegemos seus dados",
    },
    {
      title: "Trabalhe Conosco",
      href: "/trabalhe-conosco",
      icon: Users,
      description: "Faça parte da nossa equipe",
    },
    {
      title: "Catálogo PDF",
      href: "/api/catalog",
      icon: Download,
      description: "Baixe nosso catálogo completo",
      isDownload: true,
    },
  ]

  return (
    <div className="w-full lg:w-[300px]">
      <h2 className="mb-4 text-lg font-semibold">Institucional</h2>
      <ul className="space-y-3">
        {links.map((link, index) => {
          const IconComponent = link.icon

          if (link.isDownload) {
            return (
              <li key={index}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-lg p-2 transition-all hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#cb0735] text-white group-hover:bg-[#a00529]">
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 group-hover:text-[#cb0735] dark:text-gray-100">
                      {link.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {link.description}
                    </p>
                  </div>
                </a>
              </li>
            )
          }

          return (
            <li key={index}>
              <Link
                href={link.href}
                className="group flex items-center gap-3 rounded-lg p-2 transition-all hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#cb0735] text-white group-hover:bg-[#a00529]">
                  <IconComponent className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 group-hover:text-[#cb0735] dark:text-gray-100">
                    {link.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {link.description}
                  </p>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default InstitutionalLinks
