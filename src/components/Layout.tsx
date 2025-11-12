import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Activity,
  LayoutDashboard,
  Users,
  Calendar,
  Pill,
  CreditCard,
  FileText,
  Settings,
  LogOut,
  Bell,
  Package,
  ChevronRight,
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getNavItems = () => {
    const baseItems = [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', section: 'main' },
    ];

    switch (user?.role) {
      case 'admin':
        return [
          ...baseItems,
          { icon: Users, label: 'Pasien', path: '/patients', section: 'main' },
          { icon: Calendar, label: 'Jadwal', path: '/schedule', section: 'main' },
          { icon: CreditCard, label: 'Pembayaran', path: '/payments', section: 'main' },
          { icon: FileText, label: 'Laporan', path: '/reports', section: 'other' },
          { icon: Settings, label: 'Pengaturan', path: '/settings', section: 'other' },
        ];
      case 'doctor':
        return [
          ...baseItems,
          { icon: Calendar, label: 'Jadwal Saya', path: '/schedule', section: 'main' },
          { icon: Users, label: 'Pasien', path: '/patients', section: 'main' },
          { icon: FileText, label: 'Rekam Medis', path: '/records', section: 'main' },
        ];
      case 'pharmacist':
        return [
          ...baseItems,
          { icon: Pill, label: 'Resep', path: '/prescriptions', section: 'main' },
          { icon: Package, label: 'Stok Obat', path: '/medicines', section: 'main' },
        ];
      case 'owner':
        return [
          ...baseItems,
          { icon: FileText, label: 'Laporan', path: '/reports', section: 'main' },
          { icon: Users, label: 'Manajemen User', path: '/users', section: 'main' },
          { icon: Settings, label: 'Pengaturan', path: '/settings', section: 'other' },
        ];
      case 'patient':
        return [
          ...baseItems,
          { icon: Calendar, label: 'Jadwal Dokter', path: '/schedule', section: 'main' },
          { icon: FileText, label: 'Riwayat', path: '/history', section: 'main' },
        ];
      default:
        return baseItems;
    }
  };

  const navItems = getNavItems();
  const mainItems = navItems.filter(item => item.section === 'main');
  const otherItems = navItems.filter(item => item.section === 'other');

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-gradient-to-b from-sidebar via-sidebar to-sidebar/95 border-r border-sidebar-border shadow-xl">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center gap-3 border-b border-sidebar-border/50 px-6 bg-sidebar-accent/30">
            <div className="p-2.5 bg-gradient-to-br from-primary to-accent rounded-xl shadow-lg">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sidebar-foreground text-base">Klinik Sentosa</span>
              <span className="text-xs text-sidebar-foreground/60 font-medium">Sistem Informasi</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            {/* Main Section */}
            <div className="space-y-1 mb-6">
              <p className="px-3 text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider mb-2">
                Menu Utama
              </p>
              {mainItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={cn(
                      "w-full group relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/30"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                    )}
                  >
                    <item.icon className={cn(
                      "h-5 w-5 transition-transform duration-200",
                      isActive ? "scale-110" : "group-hover:scale-110"
                    )} />
                    <span className="flex-1 text-left">{item.label}</span>
                    {isActive && (
                      <ChevronRight className="h-4 w-4 animate-fade-in" />
                    )}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full animate-fade-in" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Other Section */}
            {otherItems.length > 0 && (
              <div className="space-y-1 pt-4 border-t border-sidebar-border/50">
                <p className="px-3 text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider mb-2">
                  Lainnya
                </p>
                {otherItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <button
                      key={item.path}
                      onClick={() => navigate(item.path)}
                      className={cn(
                        "w-full group relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/30"
                          : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                      )}
                    >
                      <item.icon className={cn(
                        "h-5 w-5 transition-transform duration-200",
                        isActive ? "scale-110" : "group-hover:scale-110"
                      )} />
                      <span className="flex-1 text-left">{item.label}</span>
                      {isActive && (
                        <ChevronRight className="h-4 w-4 animate-fade-in" />
                      )}
                      {isActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full animate-fade-in" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </nav>

          {/* User Section */}
          <div className="border-t border-sidebar-border/50 p-3 bg-sidebar-accent/20">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-full group flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-sidebar-accent/50 transition-all duration-200">
                  <Avatar className="h-9 w-9 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white font-semibold">
                      {user?.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 flex flex-col items-start">
                    <span className="text-sm font-semibold text-sidebar-foreground">{user?.name}</span>
                    <span className="text-xs text-sidebar-foreground/60 capitalize font-medium">
                      {user?.role}
                    </span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-sidebar-foreground/50 group-hover:text-sidebar-foreground transition-colors" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <Settings className="mr-2 h-4 w-4" />
                  Pengaturan
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Keluar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="pl-64">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-card px-6">
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-card-foreground">
              Selamat Datang, {user?.name}
            </h2>
          </div>
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-destructive text-destructive-foreground text-xs">
              3
            </Badge>
          </Button>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};
