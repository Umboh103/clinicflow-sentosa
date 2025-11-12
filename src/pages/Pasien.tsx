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
import { Plus, Trash2, Edit2 } from "lucide-react";

const Pasien = () => {
  const [pasienList, setPasienList] = useState([
    {
      id: 1,
      nama: "Budi Santoso",
      noIdentitas: "1234567890123456",
      noTelepon: "081234567890",
      alamat: "Jl. Merdeka No. 1",
    },
    {
      id: 2,
      nama: "Siti Nurhaliza",
      noIdentitas: "9876543210987654",
      noTelepon: "082345678901",
      alamat: "Jl. Ahmad Yani No. 5",
    },
  ]);

  const [formData, setFormData] = useState({
    nama: "",
    noIdentitas: "",
    noTelepon: "",
    alamat: "",
  });

  const handleAddPasien = () => {
    if (
      formData.nama &&
      formData.noIdentitas &&
      formData.noTelepon &&
      formData.alamat
    ) {
      setPasienList([
        ...pasienList,
        {
          id: Date.now(),
          ...formData,
        },
      ]);
      setFormData({ nama: "", noIdentitas: "", noTelepon: "", alamat: "" });
    }
  };

  const handleDeletePasien = (id: number) => {
    setPasienList(pasienList.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Data Pasien</h1>
          <p className="text-gray-500 mt-2">
            Kelola informasi pasien klinik dengan mudah
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Tambah Pasien
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Pasien Baru</DialogTitle>
              <DialogDescription>
                Masukkan data pasien dengan lengkap
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Nama Pasien"
                value={formData.nama}
                onChange={(e) =>
                  setFormData({ ...formData, nama: e.target.value })
                }
              />
              <Input
                placeholder="No. Identitas"
                value={formData.noIdentitas}
                onChange={(e) =>
                  setFormData({ ...formData, noIdentitas: e.target.value })
                }
              />
              <Input
                placeholder="No. Telepon"
                value={formData.noTelepon}
                onChange={(e) =>
                  setFormData({ ...formData, noTelepon: e.target.value })
                }
              />
              <Input
                placeholder="Alamat"
                value={formData.alamat}
                onChange={(e) =>
                  setFormData({ ...formData, alamat: e.target.value })
                }
              />
              <Button onClick={handleAddPasien} className="w-full">
                Simpan
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>No. Identitas</TableHead>
              <TableHead>No. Telepon</TableHead>
              <TableHead>Alamat</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pasienList.map((pasien) => (
              <TableRow key={pasien.id}>
                <TableCell>{pasien.nama}</TableCell>
                <TableCell>{pasien.noIdentitas}</TableCell>
                <TableCell>{pasien.noTelepon}</TableCell>
                <TableCell>{pasien.alamat}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeletePasien(pasien.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Pasien;