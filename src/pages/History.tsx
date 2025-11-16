import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Clock, Search, Calendar, Activity, TrendingUp, Users, FileText } from 'lucide-react';
import { mockPatients } from '@/lib/mock-data';

interface HistoryItem {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  type: 'consultation' | 'checkup' | 'vaccination' | 'follow-up';
  doctorName: string;
  complaint: string;
  diagnosis?: string;
  treatment?: string;
}

const mockHistory: HistoryItem[] = [
  {
    id: 'H001',
    patientId: 'P001',
    patientName: 'Budi Santoso',
    date: '2025-01-15',
    type: 'consultation',
    doctorName: 'Dr. Sarah Johnson',
    complaint: 'Demam dan batuk',
    diagnosis: 'ISPA',
    treatment: 'Paracetamol, Amoxicillin, Obat batuk',
  },
  {
    id: 'H002',
    patientId: 'P002',
    patientName: 'Siti Rahma',
    date: '2025-02-10',
    type: 'consultation',
    doctorName: 'Dr. Michael Wong',
    complaint: 'Sakit kepala',
    diagnosis: 'Migrain',
    treatment: 'Ibuprofen, Vitamin B Complex',
  },
  {
    id: 'H003',
    patientId: 'P003',
    patientName: 'Ahmad Wijaya',
    date: '2025-01-20',
    type: 'follow-up',
    doctorName: 'Dr. Sarah Johnson',
    complaint: 'Kontrol tekanan darah',
    diagnosis: 'Hipertensi terkontrol',
    treatment: 'Amlodipine, Aspirin',
  },
  {
    id: 'H004',
    patientId: 'P004',
    patientName: 'Maria Lumowa',
    date: '2025-02-15',
    type: 'vaccination',
    doctorName: 'Dr. Sarah Johnson',
    complaint: 'Vaksinasi',
    treatment: 'Vaksin Influenza',
  },
  {
    id: 'H005',
    patientId: 'P005',
    patientName: 'David Kalangi',
    date: '2024-12-10',
    type: 'consultation',
    doctorName: 'Dr. Sarah Johnson',
    complaint: 'Nyeri sendi',
    diagnosis: 'Arthritis',
    treatment: 'Diclofenac, Glucosamine',
  },
  {
    id: 'H006',
    patientId: 'P001',
    patientName: 'Budi Santoso',
    date: '2025-02-01',
    type: 'follow-up',
    doctorName: 'Dr. Sarah Johnson',
    complaint: 'Kontrol pasca ISPA',
    diagnosis: 'Kondisi membaik',
    treatment: 'Cetirizine',
  },
];

const History = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedPatient, setSelectedPatient] = useState<string>('all');

  const filteredHistory = mockHistory.filter(item => {
    const matchesSearch = item.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.complaint.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item.diagnosis && item.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesPatient = selectedPatient === 'all' || item.patientId === selectedPatient;
    return matchesSearch && matchesType && matchesPatient;
  });

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      consultation: 'Konsultasi',
      checkup: 'Pemeriksaan',
      vaccination: 'Vaksinasi',
      'follow-up': 'Kontrol',
    };
    return labels[type] || type;
  };

  const getTypeBadgeVariant = (type: string): "default" | "secondary" | "outline" => {
    switch (type) {
      case 'consultation': return 'default';
      case 'checkup': return 'secondary';
      case 'vaccination': return 'outline';
      case 'follow-up': return 'secondary';
      default: return 'outline';
    }
  };

  const totalVisits = mockHistory.length;
  const uniquePatients = new Set(mockHistory.map(h => h.patientId)).size;
  const thisMonth = mockHistory.filter(h => h.date.startsWith('2025-02')).length;

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <Clock className="h-8 w-8 text-primary" />
              Riwayat Kunjungan
            </h1>
            <p className="text-muted-foreground mt-1">
              Lihat riwayat kunjungan dan pengobatan pasien
            </p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Kunjungan</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalVisits}</div>
              <p className="text-xs text-muted-foreground">Seluruh kunjungan</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pasien Aktif</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{uniquePatients}</div>
              <p className="text-xs text-muted-foreground">Pasien dengan riwayat</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bulan Ini</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{thisMonth}</div>
              <p className="text-xs text-muted-foreground">Kunjungan februari</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rata-rata/Hari</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(totalVisits / 30).toFixed(1)}
              </div>
              <p className="text-xs text-muted-foreground">Kunjungan per hari</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <CardTitle>Riwayat Lengkap</CardTitle>
            <CardDescription>Semua catatan kunjungan dan pengobatan pasien</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Search and Filters */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari nama pasien, keluhan, atau diagnosa..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="border rounded-md px-4 py-2 bg-background"
              >
                <option value="all">Semua Jenis</option>
                <option value="consultation">Konsultasi</option>
                <option value="checkup">Pemeriksaan</option>
                <option value="vaccination">Vaksinasi</option>
                <option value="follow-up">Kontrol</option>
              </select>
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

            {/* History Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Pasien</TableHead>
                    <TableHead>Jenis</TableHead>
                    <TableHead>Keluhan</TableHead>
                    <TableHead>Diagnosa</TableHead>
                    <TableHead>Dokter</TableHead>
                    <TableHead>Tindakan</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredHistory.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                        Tidak ada riwayat ditemukan
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredHistory.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          {new Date(item.date).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{item.patientName}</div>
                          <div className="text-xs text-muted-foreground">{item.patientId}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getTypeBadgeVariant(item.type)}>
                            {getTypeLabel(item.type)}
                          </Badge>
                        </TableCell>
                        <TableCell>{item.complaint}</TableCell>
                        <TableCell>
                          {item.diagnosis ? (
                            <span className="font-medium">{item.diagnosis}</span>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>{item.doctorName}</TableCell>
                        <TableCell>
                          <div className="text-sm">{item.treatment}</div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Visit Type Statistics */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Konsultasi</CardTitle>
              <FileText className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockHistory.filter(h => h.type === 'consultation').length}
              </div>
              <p className="text-xs text-muted-foreground">Kunjungan konsultasi</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pemeriksaan</CardTitle>
              <Activity className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockHistory.filter(h => h.type === 'checkup').length}
              </div>
              <p className="text-xs text-muted-foreground">Medical checkup</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vaksinasi</CardTitle>
              <Badge className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockHistory.filter(h => h.type === 'vaccination').length}
              </div>
              <p className="text-xs text-muted-foreground">Pemberian vaksin</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Kontrol</CardTitle>
              <Clock className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockHistory.filter(h => h.type === 'follow-up').length}
              </div>
              <p className="text-xs text-muted-foreground">Follow-up pasien</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default History;
