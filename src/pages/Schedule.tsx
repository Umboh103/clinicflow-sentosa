import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, User, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockDoctors, mockAppointments } from '@/lib/mock-data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Schedule = () => {
  const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
  const timeSlots = ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-card-foreground">Jadwal & Janji Temu</h1>
            <p className="text-muted-foreground mt-1">Kelola jadwal dokter dan appointment pasien</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Buat Janji Baru
          </Button>
        </div>

        <Tabs defaultValue="calendar" className="space-y-4">
          <TabsList>
            <TabsTrigger value="calendar">Kalender</TabsTrigger>
            <TabsTrigger value="appointments">Daftar Janji Temu</TabsTrigger>
            <TabsTrigger value="doctors">Jadwal Dokter</TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="space-y-4">
            {/* Calendar Header */}
            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Februari 2025
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">Hari Ini</Button>
                    <Button variant="outline" size="icon">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2">
                  {days.map((day, index) => (
                    <div key={index} className="text-center p-2 font-medium text-sm bg-muted rounded-lg">
                      {day}
                    </div>
                  ))}
                  {Array.from({ length: 28 }, (_, i) => (
                    <button
                      key={i}
                      className="aspect-square p-2 rounded-lg border hover:bg-accent transition-colors text-sm"
                    >
                      <div className="font-medium">{i + 1}</div>
                      {(i + 1) % 7 === 0 && (
                        <div className="text-xs text-primary mt-1">
                          {Math.floor(Math.random() * 5) + 1} janji
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-4">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Janji Temu Hari Ini</CardTitle>
                <CardDescription>Senin, 20 Februari 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockAppointments.map((apt) => (
                    <div key={apt.id} className="p-4 rounded-lg border bg-gradient-to-r from-primary/5 to-accent/5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground font-bold">
                            {apt.time.split(':')[0]}
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">{apt.patientName}</span>
                              <Badge variant="outline">{apt.time}</Badge>
                            </div>
                            <div className="text-sm text-muted-foreground flex items-center gap-2">
                              <User className="h-3 w-3" />
                              {apt.doctorName}
                            </div>
                            <div className="text-sm text-muted-foreground">{apt.complaint}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={apt.status === 'scheduled' ? 'default' : 'secondary'}>
                            {apt.status === 'scheduled' ? 'Terjadwal' : apt.status}
                          </Badge>
                          <Button variant="outline" size="sm">Detail</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="doctors" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {mockDoctors.map((doctor) => (
                <Card key={doctor.id} className="shadow-card">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {doctor.name.split(' ')[1]?.charAt(0) || 'D'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{doctor.name}</CardTitle>
                        <CardDescription>{doctor.specialization}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-sm font-medium">Jadwal Praktik:</div>
                      <div className="grid grid-cols-2 gap-2">
                        {doctor.schedule.map((schedule, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-muted">
                            <Clock className="h-4 w-4 text-primary" />
                            <div className="text-xs">
                              <div className="font-medium">{schedule.day}</div>
                              <div className="text-muted-foreground">
                                {schedule.startTime} - {schedule.endTime}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="pt-3 border-t">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Slot tersedia hari ini:</span>
                          <span className="font-medium text-primary">{timeSlots.length - 3} slot</span>
                        </div>
                      </div>
                      <Button className="w-full" variant="outline">Lihat Jadwal Detail</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Schedule;
