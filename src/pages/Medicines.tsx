import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Pill, Package, Plus, Search, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockMedicines } from '@/lib/mock-data';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const Medicines = () => {
  const lowStockCount = mockMedicines.filter(m => m.stock < 50).length;
  const totalStock = mockMedicines.reduce((sum, m) => sum + m.stock, 0);
  const totalValue = mockMedicines.reduce((sum, m) => sum + (m.stock * m.price), 0);

  const stats = [
    { label: 'Total Jenis Obat', value: mockMedicines.length, color: 'text-primary' },
    { label: 'Total Stok', value: totalStock.toLocaleString(), color: 'text-success' },
    { label: 'Nilai Inventori', value: `Rp ${(totalValue / 1000000).toFixed(1)}M`, color: 'text-accent' },
    { label: 'Stok Menipis', value: lowStockCount, color: 'text-warning' },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-card-foreground">Stok Obat & Inventori</h1>
            <p className="text-muted-foreground mt-1">Kelola inventaris obat dan stok apotek</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Tambah Obat Baru
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-card">
              <CardContent className="pt-6">
                <div className="text-sm text-muted-foreground">{stat.label}</div>
                <div className={`text-3xl font-bold ${stat.color} mt-2`}>{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Low Stock Alert */}
        {lowStockCount > 0 && (
          <Card className="shadow-card border-warning bg-warning/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-warning">
                <AlertTriangle className="h-5 w-5" />
                Peringatan Stok Menipis
              </CardTitle>
              <CardDescription>
                {lowStockCount} jenis obat memerlukan restocking segera
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2">
                {mockMedicines
                  .filter(m => m.stock < 50)
                  .map((medicine) => (
                    <div key={medicine.id} className="p-3 rounded-lg border bg-background">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{medicine.name}</span>
                        <Badge variant="destructive">{medicine.stock} unit</Badge>
                      </div>
                      <Progress value={(medicine.stock / 500) * 100} className="h-2" />
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Medicine List */}
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Daftar Obat
              </CardTitle>
              <Button variant="outline" size="sm">Order Restock</Button>
            </div>
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari obat berdasarkan nama..."
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nama Obat</TableHead>
                    <TableHead>Dosis</TableHead>
                    <TableHead>Stok</TableHead>
                    <TableHead>Harga</TableHead>
                    <TableHead>Total Nilai</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockMedicines.map((medicine) => (
                    <TableRow key={medicine.id}>
                      <TableCell className="font-mono text-xs">{medicine.id}</TableCell>
                      <TableCell className="font-medium">{medicine.name}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{medicine.dosage}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={`font-bold ${medicine.stock < 50 ? 'text-destructive' : 'text-card-foreground'}`}>
                            {medicine.stock}
                          </span>
                          <span className="text-sm text-muted-foreground">unit</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        Rp {medicine.price.toLocaleString('id-ID')}
                      </TableCell>
                      <TableCell className="font-semibold text-success">
                        Rp {(medicine.stock * medicine.price).toLocaleString('id-ID')}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={medicine.stock >= 100 ? 'default' : medicine.stock >= 50 ? 'outline' : 'destructive'}
                        >
                          {medicine.stock >= 100 ? 'Tersedia' : medicine.stock >= 50 ? 'Terbatas' : 'Rendah'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">Update Stok</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Medicines;
