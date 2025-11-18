import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Search, Plus, Download, Filter, Eye, Edit, Trash2, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { usePatients, useDeletePatient } from '@/hooks/usePatients';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { PatientFormDialog } from '@/components/forms/PatientFormDialog';
import { DeleteConfirmDialog } from '@/components/forms/DeleteConfirmDialog';

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const { data: patients, isLoading, error } = usePatients();
  const deletePatient = useDeletePatient();

  const filteredPatients = patients?.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const activePatients = patients?.filter(p => p.status === 'active').length || 0;
  const thisMonth = patients?.filter(p => {
    const regDate = new Date(p.registration_date);
    const now = new Date();
    return regDate.getMonth() === now.getMonth() && regDate.getFullYear() === now.getFullYear();
  }).length || 0;

  const stats = [
    { label: 'Total Pasien', value: patients?.length || 0, color: 'text-primary' },
    { label: 'Pasien Aktif', value: activePatients, color: 'text-success' },
    { label: 'Pasien Baru Bulan Ini', value: thisMonth, color: 'text-accent' },
    { label: 'Kunjungan Hari Ini', value: 0, color: 'text-warning' },
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
            <h1 className="text-3xl font-bold text-card-foreground">Data Pasien</h1>
            <p className="text-muted-foreground mt-1">Kelola data dan informasi pasien klinik</p>
          </div>
          <Button className="gap-2" onClick={() => { setSelectedPatient(null); setFormOpen(true); }}>
            <Plus className="h-4 w-4" />
            Tambah Pasien Baru
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-card">
              <CardContent className="pt-6">
                <div className="text-sm text-muted-foreground">{stat.label}</div>
                <div className={`text-3xl font-bold ${stat.color} mt-2`}>
                  {isLoading ? <Skeleton className="h-8 w-16" /> : stat.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Daftar Pasien
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari pasien berdasarkan nama, ID, atau nomor telepon..."
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
                    <TableHead className="w-[80px]">ID</TableHead>
                    <TableHead>Pasien</TableHead>
                    <TableHead>Kontak</TableHead>
                    <TableHead>Umur</TableHead>
                    <TableHead>Keluhan Terakhir</TableHead>
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
                  ) : filteredPatients.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                        Tidak ada data pasien
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPatients.map((patient) => (
                      <TableRow key={patient.id}>
                        <TableCell className="font-medium">{patient.id.slice(0, 8)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{patient.name}</div>
                              {patient.ktp && <div className="text-xs text-muted-foreground">KTP: {patient.ktp}</div>}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-sm">
                              <Phone className="h-3 w-3 text-muted-foreground" />
                              {patient.phone}
                            </div>
                            {patient.email && (
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Mail className="h-3 w-3" />
                                {patient.email}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{patient.age} tahun</TableCell>
                        <TableCell className="max-w-[200px] truncate">{patient.complaint}</TableCell>
                        <TableCell>
                          <Badge variant={patient.status === 'active' ? 'default' : 'secondary'}>
                            {patient.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-2 justify-end">
                            <Button size="sm" variant="outline" onClick={() => { setSelectedPatient(patient); setFormOpen(true); }}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => { setSelectedPatient(patient); setDeleteOpen(true); }}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      <PatientFormDialog 
        open={formOpen} 
        onOpenChange={setFormOpen} 
        patient={selectedPatient} 
      />
      
      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={() => {
          if (selectedPatient) {
            deletePatient.mutate(selectedPatient.id);
            setDeleteOpen(false);
          }
        }}
        title="Hapus Pasien"
        description={`Apakah Anda yakin ingin menghapus data pasien ${selectedPatient?.name}? Tindakan ini tidak dapat dibatalkan.`}
        isLoading={deletePatient.isPending}
      />
    </Layout>
  );
};

export default Patients;
