import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';

const History = () => {
  return (
    <Layout>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Riwayat
          </CardTitle>
          <CardDescription>Riwayat kunjungan dan pengobatan</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Halaman riwayat dalam pengembangan...</p>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default History;
