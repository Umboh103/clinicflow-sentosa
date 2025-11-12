import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings as SettingsIcon, Bell, Shield, Database, Palette, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Settings = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-card-foreground">Pengaturan Sistem</h1>
          <p className="text-muted-foreground mt-1">Konfigurasi dan preferensi aplikasi</p>
        </div>

        <Tabs defaultValue="general" className="space-y-4">
          <TabsList>
            <TabsTrigger value="general">Umum</TabsTrigger>
            <TabsTrigger value="notifications">Notifikasi</TabsTrigger>
            <TabsTrigger value="security">Keamanan</TabsTrigger>
            <TabsTrigger value="backup">Backup</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SettingsIcon className="h-5 w-5" />
                  Pengaturan Umum
                </CardTitle>
                <CardDescription>Konfigurasi dasar sistem klinik</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Nama Klinik</Label>
                  <Input defaultValue="Klinik Sentosa" />
                </div>
                <div className="space-y-2">
                  <Label>Alamat</Label>
                  <Input defaultValue="Jl. Kesehatan No. 123, Jakarta Selatan" />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Nomor Telepon</Label>
                    <Input defaultValue="+62 21 1234 5678" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input defaultValue="info@kliniksentosa.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Jam Operasional</Label>
                  <div className="grid gap-2 md:grid-cols-2">
                    <Input defaultValue="08:00" type="time" />
                    <Input defaultValue="20:00" type="time" />
                  </div>
                </div>
                <Button>Simpan Perubahan</Button>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Tampilan
                </CardTitle>
                <CardDescription>Kustomisasi tampilan aplikasi</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Mode Gelap</div>
                    <div className="text-sm text-muted-foreground">Aktifkan tema gelap</div>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Animasi</div>
                    <div className="text-sm text-muted-foreground">Tampilkan animasi transisi</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Pengaturan Notifikasi
                </CardTitle>
                <CardDescription>Atur preferensi notifikasi sistem</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Notifikasi Email</div>
                    <div className="text-sm text-muted-foreground">
                      Terima notifikasi melalui email
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Notifikasi WhatsApp</div>
                    <div className="text-sm text-muted-foreground">
                      Kirim pengingat appointment via WhatsApp
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Notifikasi Stok Rendah</div>
                    <div className="text-sm text-muted-foreground">
                      Peringatan saat stok obat menipis
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Notifikasi Pembayaran</div>
                    <div className="text-sm text-muted-foreground">
                      Alert untuk pembayaran tertunda
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Keamanan
                </CardTitle>
                <CardDescription>Pengaturan keamanan dan akses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Password Lama</Label>
                  <Input type="password" />
                </div>
                <div className="space-y-2">
                  <Label>Password Baru</Label>
                  <Input type="password" />
                </div>
                <div className="space-y-2">
                  <Label>Konfirmasi Password Baru</Label>
                  <Input type="password" />
                </div>
                <Button>Update Password</Button>
                
                <div className="pt-4 border-t space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Two-Factor Authentication</div>
                      <div className="text-sm text-muted-foreground">
                        Tambahan keamanan login
                      </div>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Session Timeout</div>
                      <div className="text-sm text-muted-foreground">
                        Auto logout setelah 30 menit tidak aktif
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="backup" className="space-y-4">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Backup & Restore
                </CardTitle>
                <CardDescription>Kelola backup data klinik</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-muted">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">Backup Terakhir</div>
                    <div className="text-sm text-muted-foreground">20 Feb 2025, 03:00 WIB</div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Ukuran: 2.5 GB • Status: Berhasil
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Backup Otomatis</div>
                      <div className="text-sm text-muted-foreground">
                        Backup harian pada pukul 03:00 WIB
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Retensi Backup</Label>
                    <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2">
                      <option>7 hari</option>
                      <option>14 hari</option>
                      <option selected>30 hari</option>
                      <option>90 hari</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex gap-2 pt-4 border-t">
                  <Button className="flex-1">Backup Sekarang</Button>
                  <Button variant="outline" className="flex-1">Restore dari Backup</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
