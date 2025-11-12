import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Pill } from 'lucide-react';

const Prescriptions = () => {
  return (
    <Layout>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Pill className="h-5 w-5" />
            Resep
          </CardTitle>
          <CardDescription>Kelola resep dan pengambilan obat</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Halaman resep dalam pengembangan...</p>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Prescriptions;
