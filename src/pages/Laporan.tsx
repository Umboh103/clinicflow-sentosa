import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Download, Printer } from "lucide-react";

const Laporan = () => {
  // ...existing code...
  
  // Hapus import recharts jika error, gunakan tabel biasa
  return (
    <div className="space-y-6">
      {/* ...existing code... */}
      
      {/* Ganti BarChart dengan tabel sederhana jika belum install recharts */}
      <Card>
        <CardHeader>
          <CardTitle>Tren Bulanan</CardTitle>
          <CardDescription>
            Statistik pasien, pendapatan, dan konsultasi
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b">
                <tr>
                  <th className="text-left py-2">Bulan</th>
                  <th className="text-right py-2">Pasien</th>
                  <th className="text-right py-2">Konsultasi</th>
                  <th className="text-right py-2">Pendapatan</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { bulan: "Jan", pasien: 45, konsultasi: 52, pendapatan: "Rp 6.750.000" },
                  { bulan: "Feb", pasien: 52, konsultasi: 61, pendapatan: "Rp 7.800.000" },
                  { bulan: "Mar", pasien: 48, konsultasi: 56, pendapatan: "Rp 7.200.000" },
                  { bulan: "Apr", pasien: 61, konsultasi: 71, pendapatan: "Rp 9.150.000" },
                  { bulan: "May", pasien: 55, konsultasi: 64, pendapatan: "Rp 8.250.000" },
                  { bulan: "Jun", pasien: 67, konsultasi: 78, pendapatan: "Rp 10.050.000" },
                ].map((item, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="py-2">{item.bulan}</td>
                    <td className="text-right">{item.pasien}</td>
                    <td className="text-right">{item.konsultasi}</td>
                    <td className="text-right font-medium">{item.pendapatan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Laporan;