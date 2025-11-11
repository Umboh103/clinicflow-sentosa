import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, DollarSign, Activity, BarChart3, PieChart } from 'lucide-react';
import { mockReport } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';

const OwnerDashboard = () => {
  const stats = [
    {
      title: 'Total Pasien Bulan Ini',
      value: mockReport.monthlyPatients,
      change: '+12.5%',
      icon: Users,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Pendapatan Bulan Ini',
      value: `Rp ${(mockReport.monthlyRevenue / 1000000).toFixed(1)}M`,
      change: '+18.2%',
      icon: DollarSign,
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      title: 'Rata-rata per Hari',
      value: `Rp ${(mockReport.dailyRevenue / 1000).toFixed(0)}K`,
      change: '+5.3%',
      icon: TrendingUp,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      title: 'Tingkat Kunjungan',
      value: '94%',
      change: '+2.1%',
      icon: Activity,
      color: 'text-info',
      bgColor: 'bg-info/10',
    },
  ];

  const monthlyData = [
    { month: 'Jan', patients: 280, revenue: 42000000 },
    { month: 'Feb', patients: 320, revenue: 48000000 },
    { month: 'Mar', patients: 350, revenue: 52500000 },
    { month: 'Apr', patients: 310, revenue: 46500000 },
    { month: 'May', patients: 380, revenue: 57000000 },
    { month: 'Jun', patients: 420, revenue: 63000000 },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Welcome Banner */}
        <Card className="shadow-card bg-gradient-to-r from-primary to-accent text-white border-0">
          <CardHeader>
            <CardTitle className="text-2xl">Dashboard Pemilik</CardTitle>
            <CardDescription className="text-white/90">
              Ringkasan performa dan analitik Klinik Sentosa
            </CardDescription>
          </CardHeader>
        </Card>

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
                <p className="text-xs text-success mt-1">{stat.change} dari bulan lalu</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Revenue Chart */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Tren Pendapatan
              </CardTitle>
              <CardDescription>6 bulan terakhir</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyData.map((data) => (
                  <div key={data.month} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{data.month}</span>
                      <span className="text-muted-foreground">
                        Rp {(data.revenue / 1000000).toFixed(1)}M
                      </span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-accent transition-all"
                        style={{ width: `${(data.revenue / 63000000) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Patient Growth */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-accent" />
                Pertumbuhan Pasien
              </CardTitle>
              <CardDescription>Distribusi per periode</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Harian</p>
                      <p className="text-2xl font-bold text-card-foreground">
                        {mockReport.dailyPatients}
                      </p>
                    </div>
                    <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary font-bold">+12%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Mingguan</p>
                      <p className="text-2xl font-bold text-card-foreground">
                        {mockReport.weeklyPatients}
                      </p>
                    </div>
                    <div className="h-16 w-16 rounded-full bg-accent/20 flex items-center justify-center">
                      <span className="text-accent font-bold">+8%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Bulanan</p>
                      <p className="text-2xl font-bold text-card-foreground">
                        {mockReport.monthlyPatients}
                      </p>
                    </div>
                    <div className="h-16 w-16 rounded-full bg-success/20 flex items-center justify-center">
                      <span className="text-success font-bold">+15%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Summary */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-info" />
              Ringkasan Performa
            </CardTitle>
            <CardDescription>Metrik kinerja klinik</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <p className="text-sm text-muted-foreground mb-1">Pendapatan Tahunan</p>
                <p className="text-2xl font-bold text-card-foreground">
                  Rp {(mockReport.yearlyRevenue / 1000000).toFixed(0)}M
                </p>
                <p className="text-xs text-success mt-1">Target: 600M (96%)</p>
              </div>
              
              <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
                <p className="text-sm text-muted-foreground mb-1">Total Pasien Tahun Ini</p>
                <p className="text-2xl font-bold text-card-foreground">
                  {mockReport.yearlyPatients.toLocaleString()}
                </p>
                <p className="text-xs text-success mt-1">+25% dari tahun lalu</p>
              </div>
              
              <div className="p-4 rounded-lg bg-success/5 border border-success/20">
                <p className="text-sm text-muted-foreground mb-1">Rata-rata Pendapatan/Pasien</p>
                <p className="text-2xl font-bold text-card-foreground">
                  Rp {(mockReport.yearlyRevenue / mockReport.yearlyPatients / 1000).toFixed(0)}K
                </p>
                <p className="text-xs text-success mt-1">+8% dari rata-rata</p>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <Button className="flex-1">Export Laporan</Button>
              <Button variant="outline" className="flex-1">Lihat Detail</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default OwnerDashboard;
