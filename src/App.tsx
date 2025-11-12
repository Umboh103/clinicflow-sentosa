import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";
import Pasien from "./pages/Pasien";
import Jadwal from "./pages/Jadwal";
import Pembayaran from "./pages/Pembayaran";
import Laporan from "./pages/Laporan";
import Pengaturan from "./pages/Pengaturan";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/pasien" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/pasien" element={<Pasien />} />
            <Route path="/jadwal" element={<Jadwal />} />
            <Route path="/pembayaran" element={<Pembayaran />} />
            <Route path="/laporan" element={<Laporan />} />
            <Route path="/pengaturan" element={<Pengaturan />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HashRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;