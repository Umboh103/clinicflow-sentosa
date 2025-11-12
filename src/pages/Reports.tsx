import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

const Reports = () => {
  return (
    <Layout>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Laporan
          </CardTitle>
          <CardDescription>Generate dan lihat laporan klinik</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Halaman laporan dalam pengembangan...</p>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Reports;
