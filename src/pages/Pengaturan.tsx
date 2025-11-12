import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Save, Lock, Bell, Users } from "lucide-react";

const Pengaturan = () => {
  const [settingsData, setSettingsData] = useState({
    namaKlinik: "Klinik Sentosa",
    alamat: "Jl. Merdeka No. 1",
    noTelepon: "021-1234567",
    email: "info@kliniksentosa.com",
    jamBuka: "08:00",
    jamTutup: "17:00",
  });

  const [passwordData, setPasswordData] = useState({
    passwordLama: "",
    passwordBaru: "",
    konfirmasiPassword: "",
  });

  const [notifData, setNotifData] = useState({
    notifEmail: true,
    notifSMS: true,
    notifJadwal: true,
    notifPembayaran: true,
  });

  const handleSaveSettings = () => {
    // Handle save logic
    alert("Pengaturan berhasil disimpan!");
  };

  const handleChangePassword = () => {
    if (
      passwordData.passwordBaru === passwordData.konfirmasiPassword &&
      passwordData.passwordBaru.length > 0
    ) {
      alert("Password berhasil diubah!");
      setPasswordData({
        passwordLama: "",
        passwordBaru: "",
        konfirmasiPassword: "",
      });
    } else {
      alert("Password tidak sesuai!");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Pengaturan</h1>
        <p className="text-gray-500 mt-2">
          Kelola informasi klinik dan preferensi sistem
        </p>
      </div>

      {/* Pengaturan Klinik */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Informasi Klinik
          </CardTitle>
          <CardDescription>
            Kelola data dasar klinik Anda
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Nama Klinik</label>
              <Input
                value={settingsData.namaKlinik}
                onChange={(e) =>
                  setSettingsData({
                    ...settingsData,
                    namaKlinik: e.target.value,
                  })
                }
                className="mt-2"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                value={settingsData.email}
                onChange={(e) =>
                  setSettingsData({ ...settingsData, email: e.target.value })
                }
                className="mt-2"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Alamat</label>
              <Input
                value={settingsData.alamat}
                onChange={(e) =>
                  setSettingsData({ ...settingsData, alamat: e.target.value })
                }
                className="mt-2"
              />
            </div>
            <div>
              <label className="text-sm font-medium">No. Telepon</label>
              <Input
                value={settingsData.noTelepon}
                onChange={(e) =>
                  setSettingsData({
                    ...settingsData,
                    noTelepon: e.target.value,
                  })
                }
                className="mt-2"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Jam Buka</label>
              <Input
                type="time"
                value={settingsData.jamBuka}
                onChange={(e) =>
                  setSettingsData({
                    ...settingsData,
                    jamBuka: e.target.value,
                  })
                }
                className="mt-2"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Jam Tutup</label>
              <Input
                type="time"
                value={settingsData.jamTutup}
                onChange={(e) =>
                  setSettingsData({
                    ...settingsData,
                    jamTutup: e.target.value,
                  })
                }
                className="mt-2"
              />
            </div>
          </div>
          <Button onClick={handleSaveSettings}>
            <Save className="mr-2 h-4 w-4" />
            Simpan Pengaturan
          </Button>
        </CardContent>
      </Card>

      {/* Keamanan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Keamanan
          </CardTitle>
          <CardDescription>
            Kelola password dan keamanan akun
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Password Lama</label>
            <Input
              type="password"
              placeholder="Masukkan password lama"
              value={passwordData.passwordLama}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  passwordLama: e.target.value,
                })
              }
              className="mt-2"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Password Baru</label>
              <Input
                type="password"
                placeholder="Masukkan password baru"
                value={passwordData.passwordBaru}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    passwordBaru: e.target.value,
                  })
                }
                className="mt-2"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Konfirmasi Password</label>
              <Input
                type="password"
                placeholder="Konfirmasi password baru"
                value={passwordData.konfirmasiPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    konfirmasiPassword: e.target.value,
                  })
                }
                className="mt-2"
              />
            </div>
          </div>
          <Button onClick={handleChangePassword}>Ubah Password</Button>
        </CardContent>
      </Card>

      {/* Notifikasi */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifikasi
          </CardTitle>
          <CardDescription>
            Atur preferensi notifikasi sistem
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { key: "notifEmail", label: "Notifikasi Email" },
            { key: "notifSMS", label: "Notifikasi SMS" },
            { key: "notifJadwal", label: "Pemberitahuan Jadwal" },
            { key: "notifPembayaran", label: "Pemberitahuan Pembayaran" },
          ].map((item) => (
            <div key={item.key} className="flex items-center">
              <input
                type="checkbox"
                checked={
                  notifData[item.key as keyof typeof notifData]
                }
                onChange={(e) =>
                  setNotifData({
                    ...notifData,
                    [item.key]: e.target.checked,
                  })
                }
                className="h-4 w-4 rounded border-gray-300 cursor-pointer"
              />
              <label className="ml-3 text-sm font-medium cursor-pointer">
                {item.label}
              </label>
            </div>
          ))}
          <Button>Simpan Preferensi Notifikasi</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Pengaturan;