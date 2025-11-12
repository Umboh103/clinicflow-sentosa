import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Trash2, Check } from "lucide-react";

const Pembayaran = () => {
  const [pembayaranList, setPembayaranList] = useState([
    {
      id: 1,
      pasien: "Budi Santoso",
      jumlah: 150000,
      tanggal: "2025-11-12",
      metode: "Tunai",
      status: "Lunas",
    },
    {
      id: 2,
      pasien: "Siti Nurhaliza",
      jumlah: 200000,
      tanggal: "2025-11-12",
      metode: "Transfer",
      status: "Belum Lunas",
    },
  ]);

  const [formData, setFormData] = useState({
    pasien: "",
    jumlah: "",
    metode: "",
  });

  const handleAddPembayaran = () => {
    if (formData.pasien && formData.jumlah && formData.metode) {
      setPembayaranList([
        ...pembayaranList,
        {
          id: Date.now(),
          pasien: formData.pasien,
          jumlah: parseInt(formData.jumlah),
          tanggal: new Date().toISOString().split("T")[0],
          metode: formData.metode,
          status: "Lunas",
        },
      ]);
      setFormData({ pasien: "", jumlah: "", metode: "" });
    }
  };

  const handleDeletePembayaran = (id: number) => {
    setPembayaranList(pembayaranList.filter((p) => p.id !== id));
  };

  const totalPendapatan = pembayaranList
    .filter((p) => p.status === "Lunas")
    .reduce((sum, p) => sum + p.jumlah, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pembayaran</h1>
          <p className="text-gray-500 mt-2">
            Kelola pembayaran dan pendapatan klinik
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Catat Pembayaran
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Catat Pembayaran Baru</DialogTitle>
              <DialogDescription>
                Masukkan detail pembayaran pasien
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Nama Pasien"
                value={formData.pasien}
                onChange={(e) =>
                  setFormData({ ...formData, pasien: e.target.value })
                }
              />
              <Input
                type="number"
                placeholder="Jumlah Pembayaran"
                value={formData.jumlah}
                onChange={(e) =>
                  setFormData({ ...formData, jumlah: e.target.value })
                }
              />
              <Input
                placeholder="Metode Pembayaran"
                value={formData.metode}
                onChange={(e) =>
                  setFormData({ ...formData, metode: e.target.value })
                }
              />
              <Button onClick={handleAddPembayaran} className="w-full">
                Simpan
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 p-6 rounded-lg border">
          <p className="text-gray-600 text-sm">Total Pendapatan</p>
          <p className="text-2xl font-bold mt-2">
            Rp {totalPendapatan.toLocaleString("id-ID")}
          </p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg border">
          <p className="text-gray-600 text-sm">Total Transaksi</p>
          <p className="text-2xl font-bold mt-2">{pembayaranList.length}</p>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pasien</TableHead>
              <TableHead>Jumlah</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Metode</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pembayaranList.map((pembayaran) => (
              <TableRow key={pembayaran.id}>
                <TableCell>{pembayaran.pasien}</TableCell>
                <TableCell>
                  Rp {pembayaran.jumlah.toLocaleString("id-ID")}
                </TableCell>
                <TableCell>{pembayaran.tanggal}</TableCell>
                <TableCell>{pembayaran.metode}</TableCell>
                <TableCell className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  {pembayaran.status}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeletePembayaran(pembayaran.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Pembayaran;