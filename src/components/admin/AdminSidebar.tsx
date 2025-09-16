import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  MapPin,
  FileText,
  Users,
  BarChart3,
  Settings,
  Bell,
  Menu,
  X,
  ChevronDown,
  Building2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export const AdminSidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const location = useLocation();
  const [reportsExpanded, setReportsExpanded] = useState(true);

  const navigation = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      active: location.pathname === "/admin"
    },
    {
      name: "Reports",
      icon: FileText,
      children: [
        { name: "All Reports", href: "/admin/reports", badge: "89" },
        { name: "Pending", href: "/admin/reports/pending", badge: "45" },
        { name: "In Progress", href: "/admin/reports/in-progress", badge: "28" },
        { name: "Resolved", href: "/admin/reports/resolved" }
      ]
    },
    {
      name: "Map View",
      href: "/admin/map",
      icon: MapPin,
      active: location.pathname === "/admin/map"
    },
    {
      name: "Departments",
      href: "/admin/departments",
      icon: Building2,
      active: location.pathname === "/admin/departments"
    },
    {
      name: "Users",
      href: "/admin/users",
      icon: Users,
      active: location.pathname === "/admin/users"
    },
    {
      name: "Analytics",
      href: "/admin/analytics",
      icon: BarChart3,
      active: location.pathname === "/admin/analytics"
    },
    {
      name: "Notifications",
      href: "/admin/notifications",
      icon: Bell,
      active: location.pathname === "/admin/notifications",
      badge: "3"
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: Settings,
      active: location.pathname === "/admin/settings"
    }
  ];

  return (
    <div className={cn(
      "bg-card border-r border-border h-screen flex flex-col transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div>
              <h2 className="text-lg font-semibold text-foreground">CivicTracker</h2>
              <p className="text-xs text-muted-foreground">Admin Portal</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="h-8 w-8 p-0"
          >
            {collapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          if (item.children) {
            return (
              <Collapsible
                key={item.name}
                open={reportsExpanded}
                onOpenChange={setReportsExpanded}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-left font-normal h-10",
                      collapsed ? "px-2" : "px-3"
                    )}
                  >
                    <item.icon className={cn("h-4 w-4", !collapsed && "mr-3")} />
                    {!collapsed && (
                      <>
                        <span className="flex-1">{item.name}</span>
                        <ChevronDown className={cn(
                          "h-4 w-4 transition-transform duration-200",
                          reportsExpanded ? "rotate-180" : ""
                        )} />
                      </>
                    )}
                  </Button>
                </CollapsibleTrigger>
                {!collapsed && (
                  <CollapsibleContent className="space-y-1">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.name}
                        to={child.href}
                        className={({ isActive }) => cn(
                          "flex items-center justify-between py-2 px-3 ml-6 text-sm rounded-md transition-colors",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        )}
                      >
                        <span>{child.name}</span>
                        {child.badge && (
                          <Badge variant="secondary" className="ml-2 h-5 text-xs">
                            {child.badge}
                          </Badge>
                        )}
                      </NavLink>
                    ))}
                  </CollapsibleContent>
                )}
              </Collapsible>
            );
          }

          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) => cn(
                "flex items-center justify-between py-2.5 rounded-md transition-colors font-medium",
                collapsed ? "px-2" : "px-3",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <div className="flex items-center">
                <item.icon className={cn("h-4 w-4", !collapsed && "mr-3")} />
                {!collapsed && <span>{item.name}</span>}
              </div>
              {!collapsed && item.badge && (
                <Badge variant="destructive" className="ml-2 h-5 text-xs">
                  {item.badge}
                </Badge>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-border">
          <div className="text-xs text-muted-foreground">
            <p>Municipal Admin Portal</p>
            <p>v1.0.0</p>
          </div>
        </div>
      )}
    </div>
  );
};