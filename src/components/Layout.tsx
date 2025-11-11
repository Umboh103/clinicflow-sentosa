import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
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

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getNavItems = () => {
    const baseItems = [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    ];

    switch (user?.role) {
      case 'admin':
        return [
          ...baseItems,
          { icon: Users, label: 'Pasien', path: '/patients' },
          { icon: Calendar, label: 'Jadwal', path: '/schedule' },
          { icon: CreditCard, label: 'Pembayaran', path: '/payments' },
          { icon: FileText, label: 'Laporan', path: '/reports' },
          { icon: Settings, label: 'Pengaturan', path: '/settings' },
        ];
      case 'doctor':
        return [
          ...baseItems,
          { icon: Calendar, label: 'Jadwal Saya', path: '/schedule' },
          { icon: Users, label: 'Pasien', path: '/patients' },
          { icon: FileText, label: 'Rekam Medis', path: '/records' },
        ];
      case 'pharmacist':
        return [
          ...baseItems,
          { icon: Pill, label: 'Resep', path: '/prescriptions' },
          { icon: Pill, label: 'Stok Obat', path: '/medicines' },
        ];
      case 'owner':
        return [
          ...baseItems,
          { icon: FileText, label: 'Laporan', path: '/reports' },
          { icon: Users, label: 'Manajemen User', path: '/users' },
          { icon: Settings, label: 'Pengaturan', path: '/settings' },
        ];
      case 'patient':
        return [
          ...baseItems,
          { icon: Calendar, label: 'Jadwal Dokter', path: '/schedule' },
          { icon: FileText, label: 'Riwayat', path: '/history' },
        ];
      default:
        return baseItems;
    }
  };

  const navItems = getNavItems();

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar border-r border-sidebar-border">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
            <div className="p-2 bg-sidebar-primary rounded-lg">
              <Activity className="h-6 w-6 text-sidebar-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sidebar-foreground">Klinik Sentosa</span>
              <span className="text-xs text-sidebar-foreground/70">Sistem Informasi</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                onClick={() => navigate(item.path)}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </Button>
            ))}
          </nav>

          {/* User Section */}
          <div className="border-t border-sidebar-border p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
                >
                  <Avatar className="mr-3 h-8 w-8">
                    <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground">
                      {user?.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start text-sm">
                    <span className="font-medium">{user?.name}</span>
                    <span className="text-xs text-sidebar-foreground/70 capitalize">
                      {user?.role}
                    </span>
                  </div>
                </Button>
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
