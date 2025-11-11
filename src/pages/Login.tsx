import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Activity, Mail, Lock } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        toast.success('Login berhasil!');
        navigate('/dashboard');
      } else {
        toast.error('Email atau password salah');
      }
    } catch (error) {
      toast.error('Terjadi kesalahan saat login');
    } finally {
      setIsLoading(false);
    }
  };

  const demoAccounts = [
    { role: 'Admin', email: 'admin@sentosa.com' },
    { role: 'Dokter', email: 'sarah@sentosa.com' },
    { role: 'Apoteker', email: 'michael@sentosa.com' },
    { role: 'Pemilik', email: 'owner@sentosa.com' },
    { role: 'Pasien', email: 'john@example.com' },
  ];

  const handleDemoLogin = (email: string) => {
    setEmail(email);
    setPassword('password123');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8">
        {/* Left side - Branding */}
        <div className="flex flex-col justify-center space-y-6 p-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary rounded-2xl">
                <Activity className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Klinik Sentosa</h1>
                <p className="text-muted-foreground">Sistem Informasi Klinik</p>
              </div>
            </div>
            
            <div className="space-y-3 pt-4">
              <h2 className="text-xl font-semibold text-foreground">
                Sistem Manajemen Klinik Modern
              </h2>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                  Pendaftaran pasien digital
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                  Manajemen jadwal dokter
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                  Resep elektronik & apotek
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                  Pembayaran & pelaporan
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <Card className="shadow-2xl border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Masuk ke Sistem</CardTitle>
            <CardDescription>
              Masukkan kredensial Anda untuk mengakses dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="nama@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Memproses...' : 'Masuk'}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t">
              <p className="text-sm text-muted-foreground mb-3">Akun Demo (Password: password123)</p>
              <div className="grid grid-cols-2 gap-2">
                {demoAccounts.map((account) => (
                  <Button
                    key={account.email}
                    variant="outline"
                    size="sm"
                    onClick={() => handleDemoLogin(account.email)}
                    className="text-xs"
                  >
                    {account.role}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
