import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Users, Clock, FileText, Stethoscope } from 'lucide-react';
import { mockAppointments, mockPatients } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const DoctorDashboard = () => {
  const todayAppointments = mockAppointments.filter(apt => apt.status === 'scheduled');
  
  const stats = [
    {
      title: 'Pasien Hari Ini',
      value: todayAppointments.length,
      icon: Users,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Antrian Saat Ini',
      value: 3,
      icon: Clock,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
    {
      title: 'Selesai Diperiksa',
      value: 8,
      icon: Stethoscope,
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      title: 'Total Pasien Bulan Ini',
      value: 124,
      icon: FileText,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
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
          {/* Patient Queue */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Antrian Pasien
              </CardTitle>
              <CardDescription>Pasien menunggu pemeriksaan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {todayAppointments.map((apt, index) => (
                  <div key={apt.id} className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-primary/5 to-accent/5 border border-border/50">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-primary-foreground font-bold">
                        {index + 1}
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium text-card-foreground">{apt.patientName}</p>
                        <p className="text-sm text-muted-foreground">{apt.complaint}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-primary">{apt.time}</p>
                      <Badge variant="outline" className="mt-1">Menunggu</Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4">
                Panggil Pasien Berikutnya
              </Button>
            </CardContent>
          </Card>

          {/* Today's Schedule */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-accent" />
                Jadwal Hari Ini
              </CardTitle>
              <CardDescription>Senin, 20 Februari 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-card-foreground">Shift Pagi</p>
                      <p className="text-sm text-muted-foreground">08:00 - 16:00</p>
                    </div>
                    <Badge className="bg-accent text-accent-foreground">Aktif</Badge>
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t">
                  <h4 className="font-medium text-sm text-card-foreground">Statistik Hari Ini</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Pasien Terjadwal</span>
                      <span className="font-medium">{todayAppointments.length} pasien</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Sudah Diperiksa</span>
                      <span className="font-medium text-success">8 pasien</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Rata-rata Waktu</span>
                      <span className="font-medium">15 menit</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Medical Records */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-info" />
              Rekam Medis Terbaru
            </CardTitle>
            <CardDescription>Pasien yang baru selesai diperiksa</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockPatients.slice(0, 3).map((patient) => (
                <div key={patient.id} className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="space-y-1">
                    <p className="font-medium text-card-foreground">{patient.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {patient.age} tahun • {patient.complaint}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Lihat Detail
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default DoctorDashboard;
