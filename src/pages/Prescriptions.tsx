import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Pill, Search, CheckCircle, Clock, AlertCircle, User, Package } from 'lucide-react';

interface PrescriptionItem {
  id: string;
  recordId: string;
  patientId: string;
  patientName: string;
  doctorName: string;
  date: string;
  status: 'pending' | 'completed';
  medicines: Array<{
    name: string;
    dosage: string;
    quantity: number;
  }>;
}

const mockPrescriptions: PrescriptionItem[] = [
  {
    id: 'RX001',
    recordId: 'REC001',
    patientId: 'P001',
    patientName: 'Budi Santoso',
    doctorName: 'Dr. Sarah Johnson',
    date: '2025-01-15',
    status: 'completed',
    medicines: [
      { name: 'Paracetamol', dosage: '500mg', quantity: 10 },
      { name: 'Amoxicillin', dosage: '500mg', quantity: 15 },
      { name: 'Obat Batuk', dosage: '15ml', quantity: 1 },
    ],
  },
  {
    id: 'RX002',
    recordId: 'REC002',
    patientId: 'P002',
    patientName: 'Siti Rahma',
    doctorName: 'Dr. Michael Wong',
    date: '2025-02-10',
    status: 'pending',
    medicines: [
      { name: 'Ibuprofen', dosage: '400mg', quantity: 10 },
      { name: 'Vitamin B Complex', dosage: '1 tablet', quantity: 30 },
    ],
  },
  {
    id: 'RX003',
    recordId: 'REC003',
    patientId: 'P003',
    patientName: 'Ahmad Wijaya',
    doctorName: 'Dr. Sarah Johnson',
    date: '2025-01-20',
    status: 'completed',
    medicines: [
      { name: 'Amlodipine', dosage: '5mg', quantity: 30 },
      { name: 'Aspirin', dosage: '80mg', quantity: 30 },
    ],
  },
  {
    id: 'RX004',
    recordId: 'REC004',
    patientId: 'P005',
    patientName: 'David Kalangi',
    doctorName: 'Dr. Sarah Johnson',
    date: '2024-12-10',
    status: 'pending',
    medicines: [
      { name: 'Diclofenac', dosage: '50mg', quantity: 20 },
      { name: 'Glucosamine', dosage: '500mg', quantity: 60 },
      { name: 'Vitamin D', dosage: '1000IU', quantity: 30 },
    ],
  },
  {
    id: 'RX005',
    recordId: 'REC001',
    patientId: 'P001',
    patientName: 'Budi Santoso',
    doctorName: 'Dr. Sarah Johnson',
    date: '2025-02-01',
    status: 'completed',
    medicines: [
      { name: 'Cetirizine', dosage: '10mg', quantity: 10 },
    ],
  },
];

const Prescriptions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'completed'>('all');

  const filteredPrescriptions = mockPrescriptions.filter(prescription => {
    const matchesSearch = prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prescription.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prescription.medicines.some(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTab = activeTab === 'all' || prescription.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const totalPrescriptions = mockPrescriptions.length;
  const pendingCount = mockPrescriptions.filter(p => p.status === 'pending').length;
  const completedCount = mockPrescriptions.filter(p => p.status === 'completed').length;
  const totalMedicines = mockPrescriptions.reduce((acc, p) => acc + p.medicines.length, 0);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <Pill className="h-8 w-8 text-primary" />
              Resep
            </h1>
            <p className="text-muted-foreground mt-1">
              Kelola resep dan pengambilan obat pasien
            </p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Resep</CardTitle>
              <Pill className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPrescriptions}</div>
              <p className="text-xs text-muted-foreground">Seluruh resep</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Menunggu</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingCount}</div>
              <p className="text-xs text-muted-foreground">Belum diambil</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Selesai</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedCount}</div>
              <p className="text-xs text-muted-foreground">Sudah diambil</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Obat</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalMedicines}</div>
              <p className="text-xs text-muted-foreground">Item dalam resep</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <CardTitle>Daftar Resep</CardTitle>
            <CardDescription>Kelola dan proses resep obat untuk pasien</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Search */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari nomor resep, nama pasien, atau obat..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="all">
                  Semua ({totalPrescriptions})
                </TabsTrigger>
                <TabsTrigger value="pending">
                  <Clock className="h-4 w-4 mr-2" />
                  Menunggu ({pendingCount})
                </TabsTrigger>
                <TabsTrigger value="completed">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Selesai ({completedCount})
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab}>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>No. Resep</TableHead>
                        <TableHead>Tanggal</TableHead>
                        <TableHead>Pasien</TableHead>
                        <TableHead>Dokter</TableHead>
                        <TableHead>Obat</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPrescriptions.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                            Tidak ada resep ditemukan
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredPrescriptions.map((prescription) => (
                          <TableRow key={prescription.id}>
                            <TableCell className="font-medium">{prescription.id}</TableCell>
                            <TableCell>{new Date(prescription.date).toLocaleDateString('id-ID')}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <div>
                                  <div className="font-medium">{prescription.patientName}</div>
                                  <div className="text-xs text-muted-foreground">{prescription.patientId}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{prescription.doctorName}</TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                {prescription.medicines.map((med, idx) => (
                                  <div key={idx} className="text-sm">
                                    {med.name} {med.dosage} x{med.quantity}
                                  </div>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell>
                              {prescription.status === 'completed' ? (
                                <Badge variant="default" className="gap-1">
                                  <CheckCircle className="h-3 w-3" />
                                  Selesai
                                </Badge>
                              ) : (
                                <Badge variant="secondary" className="gap-1">
                                  <Clock className="h-3 w-3" />
                                  Menunggu
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              {prescription.status === 'pending' && (
                                <Button size="sm" className="gap-1">
                                  <CheckCircle className="h-4 w-4" />
                                  Serahkan Obat
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Prescriptions;
