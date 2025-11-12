import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard } from 'lucide-react';

const Payments = () => {
  return (
    <Layout>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Pembayaran
          </CardTitle>
          <CardDescription>Kelola transaksi dan pembayaran</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Halaman pembayaran dalam pengembangan...</p>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Payments;
