import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, TrendingUp, DollarSign, AlertCircle, Download, Printer, Eye, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockPayments } from '@/lib/mock-data';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Payments = () => {
  const totalRevenue = mockPayments.reduce((sum, p) => sum + p.paid, 0);
  const totalOutstanding = mockPayments.reduce((sum, p) => sum + p.remaining, 0);
  const completedPayments = mockPayments.filter(p => p.status === 'paid').length;

  const stats = [
    {
      title: 'Total Pendapatan',
      value: `Rp ${totalRevenue.toLocaleString('id-ID')}`,
      icon: TrendingUp,
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      title: 'Pembayaran Tertunda',
      value: `Rp ${totalOutstanding.toLocaleString('id-ID')}`,
      icon: AlertCircle,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
    {
      title: 'Transaksi Selesai',
      value: completedPayments,
      icon: CheckCircle,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Rata-rata Transaksi',
      value: `Rp ${Math.floor(totalRevenue / mockPayments.length).toLocaleString('id-ID')}`,
      icon: DollarSign,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-card-foreground">Pembayaran & Transaksi</h1>
            <p className="text-muted-foreground mt-1">Kelola pembayaran pasien dan laporan keuangan</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button className="gap-2">
              <CreditCard className="h-4 w-4" />
              Proses Pembayaran Baru
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
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

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">Semua Transaksi</TabsTrigger>
            <TabsTrigger value="pending">Tertunda</TabsTrigger>
            <TabsTrigger value="completed">Selesai</TabsTrigger>
            <TabsTrigger value="partial">Cicilan</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Daftar Transaksi</CardTitle>
                <CardDescription>Riwayat pembayaran pasien</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Invoice</TableHead>
                        <TableHead>Pasien</TableHead>
                        <TableHead>Tanggal</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Terbayar</TableHead>
                        <TableHead>Sisa</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockPayments.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-mono text-xs">{payment.id}</TableCell>
                          <TableCell className="font-medium">{payment.patientName}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{payment.date}</TableCell>
                          <TableCell className="font-semibold">
                            Rp {payment.amount.toLocaleString('id-ID')}
                          </TableCell>
                          <TableCell className="text-success">
                            Rp {payment.paid.toLocaleString('id-ID')}
                          </TableCell>
                          <TableCell className="text-destructive">
                            Rp {payment.remaining.toLocaleString('id-ID')}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                payment.status === 'paid'
                                  ? 'default'
                                  : payment.status === 'partial'
                                  ? 'outline'
                                  : 'destructive'
                              }
                            >
                              {payment.status === 'paid'
                                ? 'Lunas'
                                : payment.status === 'partial'
                                ? 'Cicilan'
                                : 'Belum Bayar'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex gap-1 justify-end">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Printer className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-warning" />
                  Pembayaran Tertunda
                </CardTitle>
                <CardDescription>Pasien dengan pembayaran yang belum diselesaikan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockPayments
                    .filter(p => p.status !== 'paid')
                    .map((payment) => (
                      <div key={payment.id} className="p-4 rounded-lg border">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <div className="font-semibold text-card-foreground">{payment.patientName}</div>
                            <div className="text-sm text-muted-foreground">{payment.date}</div>
                          </div>
                          <Badge variant={payment.status === 'partial' ? 'outline' : 'destructive'}>
                            {payment.status === 'partial' ? 'Cicilan' : 'Belum Bayar'}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Total Tagihan</span>
                            <span className="font-medium">Rp {payment.amount.toLocaleString('id-ID')}</span>
                          </div>
                          <Progress value={(payment.paid / payment.amount) * 100} className="h-2" />
                          <div className="flex justify-between text-sm">
                            <span className="text-success">
                              Terbayar: Rp {payment.paid.toLocaleString('id-ID')}
                            </span>
                            <span className="text-destructive font-medium">
                              Sisa: Rp {payment.remaining.toLocaleString('id-ID')}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4 pt-3 border-t">
                          <Button size="sm" className="flex-1">Proses Pembayaran</Button>
                          <Button size="sm" variant="outline">Detail</Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  Pembayaran Selesai
                </CardTitle>
                <CardDescription>Transaksi yang sudah lunas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockPayments
                    .filter(p => p.status === 'paid')
                    .map((payment) => (
                      <div
                        key={payment.id}
                        className="flex items-center justify-between p-4 rounded-lg bg-success/5 border border-success/20"
                      >
                        <div>
                          <div className="font-semibold text-card-foreground">{payment.patientName}</div>
                          <div className="text-sm text-muted-foreground">{payment.date}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-success text-lg">
                            Rp {payment.amount.toLocaleString('id-ID')}
                          </div>
                          <Badge className="bg-success mt-1">Lunas</Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="partial" className="space-y-4">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Pembayaran Cicilan</CardTitle>
                <CardDescription>Pasien dengan sistem pembayaran bertahap</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockPayments
                    .filter(p => p.status === 'partial')
                    .map((payment) => (
                      <div key={payment.id} className="p-4 rounded-lg border">
                        <div className="flex items-center justify-between mb-3">
                          <div className="font-semibold text-card-foreground">{payment.patientName}</div>
                          <Badge variant="outline">Cicilan Aktif</Badge>
                        </div>
                        <Progress value={(payment.paid / payment.amount) * 100} className="h-2 mb-2" />
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <div className="text-muted-foreground">Total</div>
                            <div className="font-medium">Rp {payment.amount.toLocaleString('id-ID')}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Terbayar</div>
                            <div className="font-medium text-success">
                              Rp {payment.paid.toLocaleString('id-ID')}
                            </div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Sisa</div>
                            <div className="font-medium text-destructive">
                              Rp {payment.remaining.toLocaleString('id-ID')}
                            </div>
                          </div>
                        </div>
                        <Button size="sm" className="w-full mt-3">Bayar Cicilan</Button>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Payments;
