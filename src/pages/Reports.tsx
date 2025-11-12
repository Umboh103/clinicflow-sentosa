import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Download, Calendar, TrendingUp, Users, Pill, DollarSign, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockReport } from '@/lib/mock-data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Reports = () => {
  const monthlyData = [
    { month: 'Jan', patients: 280, revenue: 42000000, medicines: 450 },
    { month: 'Feb', patients: 320, revenue: 48000000, medicines: 520 },
    { month: 'Mar', patients: 350, revenue: 52500000, medicines: 580 },
    { month: 'Apr', patients: 310, revenue: 46500000, medicines: 490 },
    { month: 'May', patients: 380, revenue: 57000000, medicines: 620 },
    { month: 'Jun', patients: 420, revenue: 63000000, medicines: 680 },
  ];

  const reportTypes = [
    {
      title: 'Laporan Harian',
      description: 'Ringkasan aktivitas dan transaksi hari ini',
      icon: Calendar,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Laporan Bulanan',
      description: 'Analisis performa dan keuangan bulan ini',
      icon: TrendingUp,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      title: 'Laporan Pasien',
      description: 'Data dan statistik pasien klinik',
      icon: Users,
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      title: 'Laporan Obat',
      description: 'Penggunaan dan stok obat',
      icon: Pill,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-card-foreground">Laporan & Analitik</h1>
            <p className="text-muted-foreground mt-1">Generate dan export berbagai laporan klinik</p>
          </div>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Export Semua
          </Button>
        </div>

        {/* Quick Report Types */}
        <div className="grid gap-4 md:grid-cols-4">
          {reportTypes.map((type, index) => (
            <Card key={index} className="shadow-card hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <div className={`p-3 rounded-lg ${type.bgColor} w-fit mb-3`}>
                  <type.icon className={`h-6 w-6 ${type.color}`} />
                </div>
                <h3 className="font-semibold text-card-foreground mb-1">{type.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{type.description}</p>
                <Button size="sm" variant="outline" className="w-full">
                  Generate
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="financial">Keuangan</TabsTrigger>
            <TabsTrigger value="patients">Pasien</TabsTrigger>
            <TabsTrigger value="custom">Custom Report</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Summary Stats */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card className="shadow-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Pasien Tahun Ini
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-card-foreground">
                    {mockReport.yearlyPatients.toLocaleString()}
                  </div>
                  <p className="text-xs text-success mt-1">+25% dari tahun lalu</p>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Pendapatan Tahun Ini
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-card-foreground">
                    Rp {(mockReport.yearlyRevenue / 1000000).toFixed(0)}M
                  </div>
                  <p className="text-xs text-success mt-1">+18% dari tahun lalu</p>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Pasien Bulan Ini
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-card-foreground">
                    {mockReport.monthlyPatients}
                  </div>
                  <p className="text-xs text-success mt-1">+12% dari bulan lalu</p>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Pasien Hari Ini
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-card-foreground">
                    {mockReport.dailyPatients}
                  </div>
                  <p className="text-xs text-success mt-1">+8% dari kemarin</p>
                </CardContent>
              </Card>
            </div>

            {/* Trend Chart */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Tren 6 Bulan Terakhir
                </CardTitle>
                <CardDescription>Perbandingan pasien, pendapatan, dan penggunaan obat</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyData.map((data) => (
                    <div key={data.month} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{data.month}</span>
                        <div className="flex gap-4 text-xs">
                          <span className="text-primary">{data.patients} pasien</span>
                          <span className="text-success">Rp {(data.revenue / 1000000).toFixed(1)}M</span>
                          <span className="text-warning">{data.medicines} obat</span>
                        </div>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary via-success to-warning transition-all"
                          style={{ width: `${(data.revenue / 63000000) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financial" className="space-y-4">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Laporan Keuangan
                </CardTitle>
                <CardDescription>Analisis pendapatan dan pengeluaran klinik</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3 mb-6">
                  <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                    <div className="text-sm text-muted-foreground mb-1">Total Pendapatan</div>
                    <div className="text-2xl font-bold text-success">
                      Rp {(mockReport.yearlyRevenue / 1000000).toFixed(0)}M
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                    <div className="text-sm text-muted-foreground mb-1">Biaya Operasional</div>
                    <div className="text-2xl font-bold text-warning">
                      Rp {((mockReport.yearlyRevenue * 0.6) / 1000000).toFixed(0)}M
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                    <div className="text-sm text-muted-foreground mb-1">Laba Bersih</div>
                    <div className="text-2xl font-bold text-primary">
                      Rp {((mockReport.yearlyRevenue * 0.4) / 1000000).toFixed(0)}M
                    </div>
                  </div>
                </div>
                <Button className="w-full gap-2">
                  <Download className="h-4 w-4" />
                  Download Laporan Keuangan (PDF)
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patients" className="space-y-4">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Laporan Pasien
                </CardTitle>
                <CardDescription>Statistik dan demografi pasien</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 rounded-lg border">
                      <div className="text-sm text-muted-foreground mb-3">Berdasarkan Usia</div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>0-17 tahun</span>
                          <span className="font-medium">15%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>18-35 tahun</span>
                          <span className="font-medium">35%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>36-50 tahun</span>
                          <span className="font-medium">30%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>51+ tahun</span>
                          <span className="font-medium">20%</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg border">
                      <div className="text-sm text-muted-foreground mb-3">Status Pasien</div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Pasien Aktif</span>
                          <span className="font-medium text-success">850</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Pasien Baru (Bulan Ini)</span>
                          <span className="font-medium text-primary">125</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Pasien Tidak Aktif</span>
                          <span className="font-medium text-muted-foreground">45</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full gap-2">
                    <Download className="h-4 w-4" />
                    Download Laporan Pasien (Excel)
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="custom" className="space-y-4">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Custom Report Generator
                </CardTitle>
                <CardDescription>Buat laporan sesuai kebutuhan Anda</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Tanggal Mulai</Label>
                      <Input type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label>Tanggal Akhir</Label>
                      <Input type="date" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Jenis Laporan</Label>
                    <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2">
                      <option>Laporan Pasien</option>
                      <option>Laporan Keuangan</option>
                      <option>Laporan Obat</option>
                      <option>Laporan Dokter</option>
                      <option>Laporan Lengkap</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Format Export</Label>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">PDF</Button>
                      <Button variant="outline" className="flex-1">Excel</Button>
                      <Button variant="outline" className="flex-1">CSV</Button>
                    </div>
                  </div>
                  <Button className="w-full gap-2">
                    <FileText className="h-4 w-4" />
                    Generate Custom Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Reports;
