import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Pill, Package, AlertTriangle, CheckCircle } from 'lucide-react';
import { mockMedicines } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const PharmacistDashboard = () => {
  const lowStockMedicines = mockMedicines.filter(m => m.stock < 50);
  const totalMedicines = mockMedicines.length;
  
  const stats = [
    {
      title: 'Total Obat',
      value: totalMedicines,
      icon: Package,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Stok Menipis',
      value: lowStockMedicines.length,
      icon: AlertTriangle,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
    {
      title: 'Resep Hari Ini',
      value: 12,
      icon: Pill,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      title: 'Selesai Diproses',
      value: 8,
      icon: CheckCircle,
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
  ];

  const pendingPrescriptions = [
    { id: 'R001', patientName: 'Budi Santoso', doctor: 'Dr. Sarah Johnson', medicines: 3, time: '09:30' },
    { id: 'R002', patientName: 'Siti Rahma', doctor: 'Dr. Sarah Johnson', medicines: 2, time: '10:15' },
    { id: 'R003', patientName: 'Ahmad Wijaya', doctor: 'Dr. Michael Wong', medicines: 4, time: '11:00' },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-card-foreground">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Pending Prescriptions */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Pill className="h-5 w-5 text-primary" />
                Resep Menunggu
              </CardTitle>
              <CardDescription>Resep yang perlu diproses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingPrescriptions.map((prescription) => (
                  <div key={prescription.id} className="p-4 rounded-lg border bg-gradient-to-r from-primary/5 to-accent/5">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium text-card-foreground">{prescription.patientName}</p>
                        <p className="text-sm text-muted-foreground">{prescription.doctor}</p>
                      </div>
                      <Badge variant="outline">{prescription.time}</Badge>
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t">
                      <span className="text-sm text-muted-foreground">
                        {prescription.medicines} item obat
                      </span>
                      <Button size="sm">Proses</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Low Stock Alert */}
          <Card className="shadow-card border-warning/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                Stok Menipis
              </CardTitle>
              <CardDescription>Obat yang perlu di-restock</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lowStockMedicines.map((medicine) => (
                  <div key={medicine.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-card-foreground">{medicine.name}</span>
                      <Badge variant="destructive">{medicine.stock} unit</Badge>
                    </div>
                    <Progress value={(medicine.stock / 100) * 100} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Stok tersisa</span>
                      <span>{medicine.stock} dari 500 unit</span>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                Order Restock
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Medicine Inventory */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-accent" />
              Inventaris Obat
            </CardTitle>
            <CardDescription>Daftar obat dan stok tersedia</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockMedicines.map((medicine) => (
                <div key={medicine.id} className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="space-y-1">
                    <p className="font-medium text-card-foreground">{medicine.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Rp {medicine.price.toLocaleString('id-ID')} per unit
                    </p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-lg font-bold text-card-foreground">{medicine.stock} unit</p>
                    <Badge variant={medicine.stock < 50 ? 'destructive' : 'default'}>
                      {medicine.stock < 50 ? 'Stok Rendah' : 'Tersedia'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default PharmacistDashboard;
