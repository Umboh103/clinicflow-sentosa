import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Search, Plus, Eye, Edit, Calendar, Activity, Users, Stethoscope } from 'lucide-react';
import { mockPatients } from '@/lib/mock-data';

interface MedicalRecord {
  id: string;
  patientId: string;
  patientName: string;
  doctorName: string;
  date: string;
  complaint: string;
  diagnosis: string;
  prescriptionCount: number;
}

const mockRecords: MedicalRecord[] = [
  {
    id: 'REC001',
    patientId: 'P001',
    patientName: 'Budi Santoso',
    doctorName: 'Dr. Sarah Johnson',
    date: '2025-01-15',
    complaint: 'Demam dan batuk',
    diagnosis: 'ISPA (Infeksi Saluran Pernapasan Atas)',
    prescriptionCount: 3,
  },
  {
    id: 'REC002',
    patientId: 'P002',
    patientName: 'Siti Rahma',
    doctorName: 'Dr. Michael Wong',
    date: '2025-02-10',
    complaint: 'Sakit kepala',
    diagnosis: 'Migrain',
    prescriptionCount: 2,
  },
  {
    id: 'REC003',
    patientId: 'P003',
    patientName: 'Ahmad Wijaya',
    doctorName: 'Dr. Sarah Johnson',
    date: '2025-01-20',
    complaint: 'Kontrol tekanan darah',
    diagnosis: 'Hipertensi terkontrol',
    prescriptionCount: 2,
  },
  {
    id: 'REC004',
    patientId: 'P005',
    patientName: 'David Kalangi',
    doctorName: 'Dr. Sarah Johnson',
    date: '2024-12-10',
    complaint: 'Nyeri sendi',
    diagnosis: 'Arthritis',
    prescriptionCount: 4,
  },
];

const Records = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<string>('all');

  const filteredRecords = mockRecords.filter(record => {
    const matchesSearch = record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.complaint.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPatient = selectedPatient === 'all' || record.patientId === selectedPatient;
    return matchesSearch && matchesPatient;
  });

  const totalRecords = mockRecords.length;
  const uniquePatients = new Set(mockRecords.map(r => r.patientId)).size;
  const thisMonth = mockRecords.filter(r => r.date.startsWith('2025-02')).length;

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <FileText className="h-8 w-8 text-primary" />
              Rekam Medis
            </h1>
            <p className="text-muted-foreground mt-1">
              Kelola dan akses rekam medis pasien
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Tambah Rekam Medis
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Rekam Medis</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRecords}</div>
              <p className="text-xs text-muted-foreground">Seluruh catatan medis</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pasien Tercatat</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{uniquePatients}</div>
              <p className="text-xs text-muted-foreground">Pasien dengan rekam medis</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bulan Ini</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{thisMonth}</div>
              <p className="text-xs text-muted-foreground">Rekam medis baru</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rata-rata Resep</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(mockRecords.reduce((acc, r) => acc + r.prescriptionCount, 0) / mockRecords.length).toFixed(1)}
              </div>
              <p className="text-xs text-muted-foreground">Per kunjungan</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <CardTitle>Daftar Rekam Medis</CardTitle>
            <CardDescription>Semua catatan rekam medis pasien klinik</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Search and Filter */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari nama pasien, diagnosa, atau keluhan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={selectedPatient}
                onChange={(e) => setSelectedPatient(e.target.value)}
                className="border rounded-md px-4 py-2 bg-background"
              >
                <option value="all">Semua Pasien</option>
                {mockPatients.map(patient => (
                  <option key={patient.id} value={patient.id}>{patient.name}</option>
                ))}
              </select>
            </div>

            {/* Records Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID Rekam</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Pasien</TableHead>
                    <TableHead>Dokter</TableHead>
                    <TableHead>Keluhan</TableHead>
                    <TableHead>Diagnosa</TableHead>
                    <TableHead>Resep</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                        Tidak ada rekam medis ditemukan
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredRecords.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">{record.id}</TableCell>
                        <TableCell>{new Date(record.date).toLocaleDateString('id-ID')}</TableCell>
                        <TableCell>
                          <div className="font-medium">{record.patientName}</div>
                          <div className="text-xs text-muted-foreground">{record.patientId}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Stethoscope className="h-4 w-4 text-primary" />
                            {record.doctorName}
                          </div>
                        </TableCell>
                        <TableCell>{record.complaint}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{record.diagnosis}</Badge>
                        </TableCell>
                        <TableCell>{record.prescriptionCount} obat</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
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
    </Layout>
  );
};

export default Records;
