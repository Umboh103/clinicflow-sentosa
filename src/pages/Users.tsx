import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users as UsersIcon } from 'lucide-react';

const Users = () => {
  return (
    <Layout>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UsersIcon className="h-5 w-5" />
            Manajemen User
          </CardTitle>
          <CardDescription>Kelola pengguna sistem dan hak akses</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Halaman manajemen user dalam pengembangan...</p>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Users;
