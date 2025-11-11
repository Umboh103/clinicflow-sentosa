import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Calendar, CreditCard, TrendingUp, Clock, AlertCircle } from 'lucide-react';
import { mockReport, mockPatients, mockAppointments, mockPayments } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const AdminDashboard = () => {
  const todayAppointments = mockAppointments.filter(apt => apt.status === 'scheduled').length;
  const pendingPayments = mockPayments.filter(p => p.status !== 'paid').length;

  const stats = [
    {
      title: 'Pasien Hari Ini',
      value: mockReport.dailyPatients,
      icon: Users,
      trend: '+12%',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Janji Temu',
      value: todayAppointments,
      icon: Calendar,
      trend: '+5%',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      title: 'Pendapatan Hari Ini',
      value: `Rp ${(mockReport.dailyRevenue / 1000).toFixed(0)}K`,
      icon: TrendingUp,
      trend: '+18%',
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      title: 'Pembayaran Tertunda',
      value: pendingPayments,
      icon: AlertCircle,
      trend: '-3%',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
  ];

  const recentPatients = mockPatients.slice(0, 5);

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
                <p className={`text-xs ${stat.color} mt-1`}>{stat.trend} dari minggu lalu</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Today's Appointments */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Jadwal Hari Ini
              </CardTitle>
              <CardDescription>Janji temu pasien hari ini</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAppointments.slice(0, 4).map((apt) => (
                  <div key={apt.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="space-y-1">
                      <p className="font-medium text-card-foreground">{apt.patientName}</p>
                      <p className="text-sm text-muted-foreground">{apt.doctorName}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-sm font-medium">{apt.time}</p>
                        <Badge variant="outline" className="text-xs">
                          {apt.status}
                        </Badge>
                      </div>
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                Lihat Semua Jadwal
              </Button>
            </CardContent>
          </Card>

          {/* Recent Patients */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-accent" />
                Pasien Terbaru
              </CardTitle>
              <CardDescription>Pendaftaran pasien baru</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPatients.map((patient) => (
                  <div key={patient.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="space-y-1">
                      <p className="font-medium text-card-foreground">{patient.name}</p>
                      <p className="text-sm text-muted-foreground">{patient.complaint}</p>
                    </div>
                    <Badge variant={patient.status === 'active' ? 'default' : 'secondary'}>
                      {patient.status}
                    </Badge>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                Daftar Pasien Baru
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Pending Payments */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-warning" />
              Pembayaran Tertunda
            </CardTitle>
            <CardDescription>Daftar pembayaran yang belum lunas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockPayments
                .filter(p => p.status !== 'paid')
                .map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="space-y-1">
                      <p className="font-medium text-card-foreground">{payment.patientName}</p>
                      <p className="text-sm text-muted-foreground">
                        Terbayar: Rp {payment.paid.toLocaleString('id-ID')} dari Rp {payment.amount.toLocaleString('id-ID')}
                      </p>
                    </div>
                    <div className="text-right space-y-2">
                      <p className="text-lg font-bold text-destructive">
                        Rp {payment.remaining.toLocaleString('id-ID')}
                      </p>
                      <Badge variant={payment.status === 'partial' ? 'default' : 'destructive'}>
                        {payment.status === 'partial' ? 'Cicilan' : 'Belum Bayar'}
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

export default AdminDashboard;
