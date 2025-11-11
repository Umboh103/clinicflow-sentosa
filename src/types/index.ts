export type UserRole = 'admin' | 'doctor' | 'pharmacist' | 'owner' | 'patient';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  address: string;
  phone: string;
  email?: string;
  complaint: string;
  ktp?: string;
  bpjs?: string;
  registrationDate: string;
  status: 'active' | 'inactive';
  history: MedicalRecord[];
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  phone: string;
  email: string;
  schedule: DoctorSchedule[];
}

export interface DoctorSchedule {
  day: string;
  startTime: string;
  endTime: string;
  available: boolean;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  complaint?: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  doctorId: string;
  doctorName: string;
  date: string;
  complaint: string;
  diagnosis: string;
  notes: string;
  prescriptions: Prescription[];
}

export interface Prescription {
  id: string;
  recordId: string;
  patientId: string;
  doctorId: string;
  medicines: Medicine[];
  date: string;
  status: 'pending' | 'completed';
}

export interface Medicine {
  id: string;
  name: string;
  dosage: string;
  quantity: number;
  stock: number;
  price: number;
}

export interface Payment {
  id: string;
  patientId: string;
  patientName: string;
  amount: number;
  paid: number;
  remaining: number;
  date: string;
  status: 'paid' | 'partial' | 'pending';
  items: PaymentItem[];
}

export interface PaymentItem {
  description: string;
  amount: number;
}

export interface Report {
  dailyPatients: number;
  weeklyPatients: number;
  monthlyPatients: number;
  yearlyPatients: number;
  dailyRevenue: number;
  weeklyRevenue: number;
  monthlyRevenue: number;
  yearlyRevenue: number;
  pendingPayments: number;
  lowStockMedicines: number;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'appointment' | 'payment' | 'stock' | 'system';
  read: boolean;
  date: string;
}
