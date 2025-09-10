"use client"

import { Switch } from "@/components/ui/switch"
import { useTheme } from "@/lib/theme-context"
import { MoonIcon, SunIcon } from "lucide-react"

const ThemeButton = () => {
  const { theme, setTheme } = useTheme()
  const isDark = theme === "dark"

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <div className="flex items-center gap-3">
      <SunIcon
        className={`h-4 w-4 transition-colors ${
          !isDark ? "text-amber-500" : "text-slate-400"
        }`}
        style={{ width: "24px", height: "24px" }}
      />
      <Switch
        checked={isDark}
        onCheckedChange={toggleTheme}
        className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-slate-300"
      />
      <MoonIcon
        className={`h-4 w-4 transition-colors ${
          isDark ? "text-blue-400" : "text-slate-400"
        }`}
        style={{ width: "24px", height: "24px" }}
      />
    </div>
  )
}

export default ThemeButton
