import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings as SettingsIcon } from 'lucide-react';

const Settings = () => {
  return (
    <Layout>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SettingsIcon className="h-5 w-5" />
            Pengaturan
          </CardTitle>
          <CardDescription>Konfigurasi sistem dan preferensi</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Halaman pengaturan dalam pengembangan...</p>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Settings;
