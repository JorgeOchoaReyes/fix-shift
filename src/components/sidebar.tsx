"use client"

import { useState } from "react"
import { Button } from "~/components/ui/button"
import { cn } from "~/lib/utils"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import { BarChart3, Home, Users, Settings, TrendingUp, FileText, Menu, X, ChevronRight } from "lucide-react"

interface SidebarProps {
  className?: string
}


export function DashboardSidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname();
    const router = useRouter();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home, current: pathname === "/dashboard" },
    { name: "Schedules", href: "/dashboard/schedules", icon: Users, current: pathname === "/dashboard/schedules" },
    { name: "Employees", href: "/dashboard/employees", icon: BarChart3, current: pathname === "/dashboard/employees" },
    { name: "Settings", href: "/dashboard/settings", icon: Settings, current: pathname === "/dashboard/settings" },
  ]

  return (
    <div
      className={cn(
        "flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!isCollapsed && <h1 className="text-xl font-bold text-sidebar-foreground">Dashboard</h1>}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon
          return (
            <Button
              key={item.name}
              variant={item.current ? "default" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 text-left",
                item.current
                  ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                isCollapsed && "justify-center px-2",
              )}
              onClick={() => {
                router.push(item.href)
              }}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && (
                <>
                  <span className="flex-1">{item.name}</span>
                  {item.current && <ChevronRight className="h-4 w-4" />}
                </>
              )}
            </Button>
          )
        })}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-primary-foreground">JD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">John Doe</p>
              <p className="text-xs text-muted-foreground truncate">john@example.com</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
