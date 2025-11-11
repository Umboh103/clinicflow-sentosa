import { useAuth } from '@/contexts/AuthContext';
import AdminDashboard from '@/components/dashboards/AdminDashboard';
import DoctorDashboard from '@/components/dashboards/DoctorDashboard';
import PharmacistDashboard from '@/components/dashboards/PharmacistDashboard';
import OwnerDashboard from '@/components/dashboards/OwnerDashboard';
import PatientDashboard from '@/components/dashboards/PatientDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return null;

  const dashboards = {
    admin: <AdminDashboard />,
    doctor: <DoctorDashboard />,
    pharmacist: <PharmacistDashboard />,
    owner: <OwnerDashboard />,
    patient: <PatientDashboard />,
  };

  return dashboards[user.role] || null;
};

export default Dashboard;
