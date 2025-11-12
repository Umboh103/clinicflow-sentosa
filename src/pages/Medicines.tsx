import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package } from 'lucide-react';

const Medicines = () => {
  return (
    <Layout>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Stok Obat
          </CardTitle>
          <CardDescription>Kelola inventaris obat dan stok</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Halaman stok obat dalam pengembangan...</p>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Medicines;
