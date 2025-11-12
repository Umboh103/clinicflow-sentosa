import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from 'lucide-react';

const Profile = () => {
  return (
    <Layout>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profil Saya
          </CardTitle>
          <CardDescription>Kelola informasi profil Anda</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Halaman profil dalam pengembangan...</p>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Profile;
