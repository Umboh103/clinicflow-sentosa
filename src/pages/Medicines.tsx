import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Plus, Search, AlertTriangle, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useMedicines } from '@/hooks/useMedicines';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MedicineFormDialog } from '@/components/forms/MedicineFormDialog';

const Medicines = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState<any>(null);
  const { data: medicines, isLoading, error } = useMedicines();

  const filteredMedicines = medicines?.filter(med =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.category?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const lowStockCount = medicines?.filter(m => m.stock < 50).length || 0;
  const totalStock = medicines?.reduce((sum, m) => sum + m.stock, 0) || 0;
  const totalValue = medicines?.reduce((sum, m) => sum + (m.stock * Number(m.price)), 0) || 0;

  const stats = [
    { label: 'Total Jenis Obat', value: medicines?.length || 0, color: 'text-primary' },
    { label: 'Total Stok', value: totalStock.toLocaleString(), color: 'text-success' },
    { label: 'Nilai Inventori', value: `Rp ${(totalValue / 1000000).toFixed(1)}M`, color: 'text-accent' },
    { label: 'Stok Menipis', value: lowStockCount, color: 'text-warning' },
  ];

  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <p className="text-destructive">Error memuat data: {error.message}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-card-foreground">Stok Obat & Inventori</h1>
            <p className="text-muted-foreground mt-1">Kelola inventaris obat dan stok apotek</p>
          </div>
          <Button className="gap-2" onClick={() => { setSelectedMedicine(null); setFormOpen(true); }}>
            <Plus className="h-4 w-4" />
            Tambah Obat Baru
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-card">
              <CardContent className="pt-6">
                <div className="text-sm text-muted-foreground">{stat.label}</div>
                <div className={`text-3xl font-bold ${stat.color} mt-2`}>
                  {isLoading ? <Skeleton className="h-8 w-24" /> : stat.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {lowStockCount > 0 && !isLoading && (
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
                {medicines?.filter(m => m.stock < 50).map((medicine) => (
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
                placeholder="Cari obat berdasarkan nama atau kategori..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama Obat</TableHead>
                    <TableHead>Dosis</TableHead>
                    <TableHead className="text-center">Stok</TableHead>
                    <TableHead className="text-right">Harga</TableHead>
                    <TableHead className="text-right">Total Nilai</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    Array(5).fill(0).map((_, i) => (
                      <TableRow key={i}>
                        {Array(7).fill(0).map((_, j) => (
                          <TableCell key={j}>
                            <Skeleton className="h-4 w-full" />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : filteredMedicines.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                        Tidak ada data obat
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredMedicines.map((medicine) => {
                      const totalValue = medicine.stock * Number(medicine.price);
                      return (
                        <TableRow key={medicine.id}>
                          <TableCell>
                            <div className="font-medium">{medicine.name}</div>
                            {medicine.category && (
                              <div className="text-xs text-muted-foreground">{medicine.category}</div>
                            )}
                          </TableCell>
                          <TableCell>{medicine.dosage}</TableCell>
                          <TableCell className="text-center">
                            <Badge variant={medicine.stock < 50 ? 'destructive' : 'outline'}>
                              {medicine.stock}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">Rp {Number(medicine.price).toLocaleString('id-ID')}</TableCell>
                          <TableCell className="text-right font-medium">Rp {totalValue.toLocaleString('id-ID')}</TableCell>
                          <TableCell>
                            <Badge variant={medicine.stock < 50 ? 'destructive' : medicine.stock < 100 ? 'secondary' : 'default'}>
                              {medicine.stock < 50 ? 'Stok Rendah' : medicine.stock < 100 ? 'Perlu Restock' : 'Tersedia'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button size="sm" variant="outline" onClick={() => { setSelectedMedicine(medicine); setFormOpen(true); }}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      <MedicineFormDialog 
        open={formOpen} 
        onOpenChange={setFormOpen} 
        medicine={selectedMedicine} 
      />
    </Layout>
  );
};

export default Medicines;
