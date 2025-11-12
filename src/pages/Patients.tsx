import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

const Patients = () => {
  return (
    <Layout>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Daftar Pasien
          </CardTitle>
          <CardDescription>Kelola data pasien klinik</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Halaman daftar pasien dalam pengembangan...</p>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Patients;
