import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Users,
  Calendar,
  CreditCard,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: BarChart3 },
    { path: "/pasien", label: "Data Pasien", icon: Users },
    { path: "/jadwal", label: "Jadwal Praktik", icon: Calendar },
    { path: "/pembayaran", label: "Pembayaran", icon: CreditCard },
    { path: "/laporan", label: "Laporan", icon: FileText },
    { path: "/pengaturan", label: "Pengaturan", icon: Settings },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="h-16 border-b border-gray-200 flex items-center justify-between px-4">
          {sidebarOpen && (
            <h1 className="text-xl font-bold text-blue-600">ClinicFlow</h1>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-2 py-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive(item.path) ? "default" : "ghost"}
                  className={`w-full justify-start ${
                    isActive(item.path)
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {sidebarOpen && <span className="ml-3">{item.label}</span>}
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <Button
            variant="outline"
            className="w-full justify-start text-red-600 hover:text-red-700"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {sidebarOpen && <span className="ml-3">Logout</span>}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="h-16 border-b border-gray-200 bg-white flex items-center px-8">
          <h2 className="text-lg font-semibold text-gray-800">
            {menuItems.find((item) => isActive(item.path))?.label ||
              "Dashboard"}
          </h2>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;