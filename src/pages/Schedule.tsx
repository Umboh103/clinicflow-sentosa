import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

const Schedule = () => {
  return (
    <Layout>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Jadwal
          </CardTitle>
          <CardDescription>Kelola jadwal dokter dan janji temu</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Halaman jadwal dalam pengembangan...</p>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Schedule;
