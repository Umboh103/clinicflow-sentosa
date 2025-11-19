import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Activity, UserPlus, CheckCircle, XCircle, Loader2 } from 'lucide-react';

interface DemoResult {
  email: string;
  status: string;
  message: string;
  role?: string;
}

const SetupDemo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<DemoResult[]>([]);
  const navigate = useNavigate();

  const createDemoAccounts = async () => {
    setIsLoading(true);
    setResults([]);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-demo-accounts`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`
          }
        }
      );

      const data = await response.json();

      if (data.success) {
        setResults(data.results);
        const successCount = data.results.filter((r: DemoResult) => r.status === 'success').length;
        
        if (successCount > 0) {
          toast.success(`${successCount} akun demo berhasil dibuat!`);
        } else {
          toast.info('Semua akun demo sudah ada');
        }
      } else {
        toast.error('Gagal membuat akun demo: ' + data.error);
      }
    } catch (error) {
      toast.error('Terjadi kesalahan saat membuat akun demo');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'already_exists':
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      case 'error':
      case 'partial_success':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const demoAccounts = [
    { role: 'Admin', email: 'admin@sentosa.com', description: 'Akses penuh ke semua fitur sistem' },
    { role: 'Dokter', email: 'dokter@sentosa.com', description: 'Manajemen pasien dan rekam medis' },
    { role: 'Apoteker', email: 'apoteker@sentosa.com', description: 'Manajemen obat dan resep' },
    { role: 'Pemilik', email: 'pemilik@sentosa.com', description: 'Laporan dan overview klinik' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4">
      <div className="w-full max-w-4xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="p-3 bg-primary rounded-2xl">
              <Activity className="h-10 w-10 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Klinik Sentosa</h1>
          <p className="text-muted-foreground">Setup Akun Demo</p>
        </div>

        {/* Main Card */}
        <Card className="shadow-2xl border-0">
          <CardHeader>
            <CardTitle className="text-2xl">Buat Akun Demo</CardTitle>
            <CardDescription>
              Buat akun demo untuk testing dengan berbagai role akses
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Demo Accounts List */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm text-muted-foreground">Akun yang akan dibuat:</h3>
              <div className="grid gap-3">
                {demoAccounts.map((account) => (
                  <div
                    key={account.email}
                    className="flex items-start gap-3 p-3 rounded-lg border bg-card"
                  >
                    <UserPlus className="h-5 w-5 text-primary mt-0.5" />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{account.role}</span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{account.email}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{account.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Password untuk semua akun: <code className="bg-muted px-2 py-1 rounded">password123</code>
              </p>
            </div>

            {/* Create Button */}
            <Button
              onClick={createDemoAccounts}
              disabled={isLoading}
              className="w-full"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Membuat Akun...
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Buat Akun Demo
                </>
              )}
            </Button>

            {/* Results */}
            {results.length > 0 && (
              <div className="space-y-3 pt-4 border-t">
                <h3 className="font-semibold text-sm">Hasil:</h3>
                <div className="space-y-2">
                  {results.map((result, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg border bg-card"
                    >
                      {getStatusIcon(result.status)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{result.email}</span>
                          {result.role && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                              {result.role}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{result.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => navigate('/login')}
                className="flex-1"
              >
                Ke Halaman Login
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/signup')}
                className="flex-1"
              >
                Daftar Akun Baru
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SetupDemo;
