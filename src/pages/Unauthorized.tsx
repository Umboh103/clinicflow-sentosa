import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShieldAlert } from 'lucide-react';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <ShieldAlert className="h-24 w-24 text-destructive mx-auto" />
        <h1 className="text-4xl font-bold text-foreground">Akses Ditolak</h1>
        <p className="text-xl text-muted-foreground max-w-md">
          Anda tidak memiliki izin untuk mengakses halaman ini
        </p>
        <Button onClick={() => navigate('/dashboard')} size="lg">
          Kembali ke Dashboard
        </Button>
      </div>
    </div>
  );
};

export default Unauthorized;
