import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import type { UserRole } from '@/types';

export function LoginPage() {
  const [role, setRole] = useState<UserRole>('farmer');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const { login, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roleParam = params.get('role') as 'farmer' | 'beekeeper' | null;
    const demo = params.get('demo');
    if (roleParam) setRole(roleParam);
    if (demo === '1' && roleParam) {
      fillDemo(roleParam);
    }
  }, [location.search]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const loggedIn = login(mobile, password);
    if (!loggedIn) {
      showToast('Invalid mobile or password', 'error');
      return;
    }
    if (loggedIn.role !== role) {
      logout();
      showToast(`Please select "${loggedIn.role}" to login with this account`, 'error');
      return;
    }
    showToast('Logged in successfully');
    navigate(role === 'farmer' ? '/farmer' : '/beekeeper');
  };

  const fillDemo = (demoRole: UserRole) => {
    setRole(demoRole);
    if (demoRole === 'farmer') {
      setMobile('9000000001');
    } else {
      setMobile('9000000002');
    }
    setPassword('123456');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <span className="text-5xl">🐝</span>
        <h1 className="text-3xl font-bold text-green-700 mt-2">FarmBee</h1>
        <p className="text-gray-500 mt-1">Connect farmers and beekeepers</p>
      </div>

      <Card className="w-full max-w-md space-y-6">
        <div>
          <p className="text-sm font-medium text-gray-700 mb-3 text-center">Continue as</p>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setRole('farmer')}
              className={`p-4 rounded-xl border-2 text-center transition-colors ${
                role === 'farmer'
                  ? 'border-green-600 bg-green-50 text-green-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className="text-2xl block mb-1">🌾</span>
              <span className="font-medium">Farmer</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('beekeeper')}
              className={`p-4 rounded-xl border-2 text-center transition-colors ${
                role === 'beekeeper'
                  ? 'border-green-600 bg-green-50 text-green-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className="text-2xl block mb-1">🍯</span>
              <span className="font-medium">Beekeeper</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Mobile Number"
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter mobile number"
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
          <Button type="submit" className="w-full" size="lg">
            Login
          </Button>
        </form>

        <div className="border-t border-gray-100 pt-4">
          <p className="text-xs font-medium text-gray-500 mb-3 text-center">Demo Accounts</p>
          <div className="space-y-2 text-xs">
            <button
              type="button"
              onClick={() => fillDemo('farmer')}
              className="w-full p-3 bg-gray-50 rounded-lg text-left hover:bg-gray-100 transition-colors"
            >
              <p className="font-medium text-gray-800">🌾 Ramesh Patel (Farmer)</p>
              <p className="text-gray-500">9000000001 / 123456</p>
            </button>
            <button
              type="button"
              onClick={() => fillDemo('beekeeper')}
              className="w-full p-3 bg-gray-50 rounded-lg text-left hover:bg-gray-100 transition-colors"
            >
              <p className="font-medium text-gray-800">🍯 Amit Beekeeper</p>
              <p className="text-gray-500">9000000002 / 123456</p>
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
