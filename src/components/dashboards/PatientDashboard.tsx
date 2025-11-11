import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, FileText, Clock, Activity, User, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockDoctors, mockAppointments } from '@/lib/mock-data';

const PatientDashboard = () => {
  const upcomingAppointment = mockAppointments[0];
  
  const medicalHistory = [
    { date: '2025-02-10', doctor: 'Dr. Sarah Johnson', diagnosis: 'Flu Ringan', prescription: '3 items' },
    { date: '2025-01-15', doctor: 'Dr. Michael Wong', diagnosis: 'Pemeriksaan Rutin', prescription: '2 items' },
    { date: '2024-12-20', doctor: 'Dr. Sarah Johnson', diagnosis: 'Vaksinasi Influenza', prescription: '-' },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Profile Card */}
        <Card className="shadow-card bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-0">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                J
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-card-foreground">John Doe</h2>
                <p className="text-muted-foreground">ID Pasien: P005</p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4" />
                    <span>35 tahun</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4" />
                    <span>+62 816 7890 1234</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Upcoming Appointment */}
          <Card className="shadow-card border-primary/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Janji Temu Mendatang
              </CardTitle>
              <CardDescription>Jangan lupa untuk datang tepat waktu</CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingAppointment ? (
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <div className="flex items-center justify-between mb-3">
                      <Badge className="bg-primary">Terjadwal</Badge>
                      <span className="text-sm text-muted-foreground">
                        {upcomingAppointment.date}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{upcomingAppointment.time} WIT</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{upcomingAppointment.doctorName}</span>
                      </div>
                      <div className="pt-2 border-t">
                        <p className="text-sm text-muted-foreground">Keluhan:</p>
                        <p className="font-medium">{upcomingAppointment.complaint}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">Reschedule</Button>
                    <Button variant="destructive" className="flex-1">Cancel</Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground mb-4">Tidak ada janji temu mendatang</p>
                  <Button>Buat Janji Baru</Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Doctor Schedules */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-accent" />
                Jadwal Dokter
              </CardTitle>
              <CardDescription>Pilih dokter dan waktu yang tersedia</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockDoctors.map((doctor) => (
                  <div key={doctor.id} className="p-4 rounded-lg border bg-gradient-to-r from-accent/5 to-primary/5">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-card-foreground">{doctor.name}</p>
                          <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
                        </div>
                        <Badge variant="outline">Tersedia</Badge>
                      </div>
                      <div className="pt-2 border-t text-xs text-muted-foreground">
                        <p>Hari praktik: {doctor.schedule.length} hari/minggu</p>
                      </div>
                    </div>
                    <Button size="sm" className="w-full mt-3">
                      Lihat Jadwal & Booking
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Medical History */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-info" />
              Riwayat Medis
            </CardTitle>
            <CardDescription>Rekam jejak kunjungan dan pengobatan Anda</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {medicalHistory.map((record, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-card-foreground">{record.date}</span>
                      <Badge variant="outline">{record.doctor}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Diagnosis: <span className="font-medium text-card-foreground">{record.diagnosis}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Resep: {record.prescription}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Lihat Detail
                  </Button>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              Lihat Semua Riwayat
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default PatientDashboard;
