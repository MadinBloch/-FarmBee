import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { ToastProvider } from '@/context/ToastContext';
import { AppLayout } from '@/components/layout/AppLayout';
import { LoginPage } from '@/pages/LoginPage';
import { LandingPage } from '@/pages/LandingPage';
import { FarmerDashboard } from '@/pages/farmer/FarmerDashboard';
import { FarmerFarms } from '@/pages/farmer/FarmerFarms';
import { AddFarmPage } from '@/pages/farmer/AddFarmPage';
import { FarmerRequests } from '@/pages/farmer/FarmerRequests';
import { BeekeeperDashboard } from '@/pages/beekeeper/BeekeeperDashboard';
import { FindFarmsPage } from '@/pages/beekeeper/FindFarmsPage';
import { BeekeeperRequests } from '@/pages/beekeeper/BeekeeperRequests';
import { BeeBoxManagement } from '@/pages/beekeeper/BeeBoxManagement';
import { FarmDetailsPage } from '@/pages/shared/FarmDetailsPage';
import { ProfilePage } from '@/pages/shared/ProfilePage';
import type { ReactNode } from 'react';

const farmerNav = [
  { to: '/farmer', label: 'Dashboard', icon: '📊' },
  { to: '/farmer/farms', label: 'My Farms', icon: '🌾' },
  { to: '/farmer/requests', label: 'Requests', icon: '📩' },
  { to: '/farmer/profile', label: 'Profile', icon: '👤' },
];

const beekeeperNav = [
  { to: '/beekeeper', label: 'Dashboard', icon: '📊' },
  { to: '/beekeeper/farms', label: 'Find Farms', icon: '🔍' },
  { to: '/beekeeper/requests', label: 'My Requests', icon: '📩' },
  { to: '/beekeeper/bee-boxes', label: 'Bee Boxes', icon: '📦' },
  { to: '/beekeeper/profile', label: 'Profile', icon: '👤' },
];

function ProtectedRoute({ role, children }: { role: 'farmer' | 'beekeeper'; children: ReactNode }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== role) return <Navigate to={user.role === 'farmer' ? '/farmer' : '/beekeeper'} replace />;
  return <>{children}</>;
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={user ? <Navigate to={user.role === 'farmer' ? '/farmer' : '/beekeeper'} replace /> : <LoginPage />} />

      <Route
        path="/farmer"
        element={
          <ProtectedRoute role="farmer">
            <AppLayout navItems={farmerNav} />
          </ProtectedRoute>
        }
      >
        <Route index element={<FarmerDashboard />} />
        <Route path="farms" element={<FarmerFarms />} />
        <Route path="farms/new" element={<AddFarmPage />} />
        <Route path="farms/:id" element={<FarmDetailsPage />} />
        <Route path="requests" element={<FarmerRequests />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      <Route
        path="/beekeeper"
        element={
          <ProtectedRoute role="beekeeper">
            <AppLayout navItems={beekeeperNav} />
          </ProtectedRoute>
        }
      >
        <Route index element={<BeekeeperDashboard />} />
        <Route path="farms" element={<FindFarmsPage />} />
        <Route path="farms/:id" element={<FarmDetailsPage />} />
        <Route path="requests" element={<BeekeeperRequests />} />
        <Route path="bee-boxes" element={<BeeBoxManagement />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      <Route path="*" element={<Navigate to={user ? (user.role === 'farmer' ? '/farmer' : '/beekeeper') : '/'} replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <AppRoutes />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
