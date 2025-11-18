import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, User, Plus, ChevronLeft, ChevronRight, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useDoctors } from '@/hooks/useDoctors';
import { useAppointments } from '@/hooks/useAppointments';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { AppointmentFormDialog } from '@/components/forms/AppointmentFormDialog';

const Schedule = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const { data: doctors, isLoading: doctorsLoading } = useDoctors();
  const { data: appointments, isLoading: appointmentsLoading } = useAppointments();
  
  const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
  const today = new Date().toISOString().split('T')[0];
  const todayAppointments = appointments?.filter(apt => apt.appointment_date === today) || [];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-card-foreground">Jadwal & Janji Temu</h1>
            <p className="text-muted-foreground mt-1">Kelola jadwal dokter dan appointment pasien</p>
          </div>
          <Button className="gap-2" onClick={() => { setSelectedAppointment(null); setFormOpen(true); }}>
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
            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    {new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
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
                <CardDescription>{new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {appointmentsLoading ? (
                    Array(3).fill(0).map((_, i) => (
                      <Skeleton key={i} className="h-24 w-full" />
                    ))
                  ) : todayAppointments.length === 0 ? (
                    <div className="text-center text-muted-foreground py-8">
                      Tidak ada janji temu hari ini
                    </div>
                  ) : (
                    todayAppointments.map((apt) => (
                      <div key={apt.id} className="p-4 rounded-lg border bg-gradient-to-r from-primary/5 to-accent/5">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">{apt.patients?.name}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              <span>{apt.appointment_time}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{apt.complaint}</p>
                          </div>
                          <div className="text-right space-y-2">
                            <p className="text-sm font-medium">{apt.doctors?.name}</p>
                            <Badge variant={apt.status === 'scheduled' ? 'default' : apt.status === 'completed' ? 'secondary' : 'destructive'}>
                              {apt.status}
                            </Badge>
                            <Button size="sm" variant="outline" className="w-full mt-2" onClick={() => { setSelectedAppointment(apt); setFormOpen(true); }}>
                              <Edit className="h-3 w-3 mr-1" />
                              Edit
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="doctors" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {doctorsLoading ? (
                Array(2).fill(0).map((_, i) => (
                  <Skeleton key={i} className="h-64 w-full" />
                ))
              ) : doctors?.length === 0 ? (
                <div className="col-span-2 text-center text-muted-foreground py-8">
                  Tidak ada data dokter
                </div>
              ) : (
                doctors?.map((doctor) => (
                  <Card key={doctor.id} className="shadow-card">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle>{doctor.name}</CardTitle>
                          <CardDescription>{doctor.specialization}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="text-sm font-medium">Jadwal Praktek:</div>
                        {doctor.doctor_schedules?.length === 0 ? (
                          <p className="text-sm text-muted-foreground">Tidak ada jadwal</p>
                        ) : (
                          doctor.doctor_schedules?.map((schedule: any) => (
                            <div key={schedule.id} className="flex items-center justify-between p-2 rounded bg-muted/50">
                              <span className="text-sm font-medium">{schedule.day}</span>
                              <span className="text-sm text-muted-foreground">
                                {schedule.start_time} - {schedule.end_time}
                              </span>
                              <Badge variant={schedule.available ? 'default' : 'secondary'}>
                                {schedule.available ? 'Tersedia' : 'Tidak Tersedia'}
                              </Badge>
                            </div>
                          ))
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <AppointmentFormDialog 
        open={formOpen} 
        onOpenChange={setFormOpen} 
        appointment={selectedAppointment} 
      />
    </Layout>
  );
};

export default Schedule;
