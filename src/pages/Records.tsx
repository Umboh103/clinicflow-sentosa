import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

const Records = () => {
  return (
    <Layout>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Rekam Medis
          </CardTitle>
          <CardDescription>Kelola rekam medis pasien</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Halaman rekam medis dalam pengembangan...</p>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Records;
