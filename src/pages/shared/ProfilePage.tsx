import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import {
  getFarmsByFarmer,
  getBeekeeperProfile,
  updateUser,
  resetDemoData,
} from '@/utils/storage';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';

export function ProfilePage() {
  const { user, refreshUser, logout } = useAuth();
  const { showToast } = useToast();
  const [showReset, setShowReset] = useState(false);

  const [name, setName] = useState(user?.name ?? '');
  const [village, setVillage] = useState(user?.village ?? '');
  const [district, setDistrict] = useState(user?.district ?? '');
  const [state, setState] = useState(user?.state ?? '');

  if (!user) return null;

  const isFarmer = user.role === 'farmer';
  const farms = isFarmer ? getFarmsByFarmer(user.id) : [];
  const activeFarms = farms.filter((f) => f.status !== 'booked');
  const profile = !isFarmer ? getBeekeeperProfile(user.id) : undefined;

  const handleSave = () => {
    updateUser({ ...user, name, village, district, state });
    refreshUser();
    showToast('Profile updated.');
  };

  const handleReset = () => {
    resetDemoData();
    logout();
    showToast('Demo data has been reset.');
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-2xl font-bold text-gray-900">Profile</h2>

      <Card className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-2xl">
            {isFarmer ? '🌾' : '🍯'}
          </div>
          <div>
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <p className="text-sm text-gray-500">
              {user.village}, {user.state}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              {isFarmer ? 'Farmer' : 'Beekeeper'} · {user.mobile}
            </p>
          </div>
        </div>

        {isFarmer ? (
          <div className="grid grid-cols-2 gap-4 text-center pt-2 border-t">
            <div>
              <p className="text-2xl font-bold text-green-600">{farms.length}</p>
              <p className="text-xs text-gray-500">Farms</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">{activeFarms.length}</p>
              <p className="text-xs text-gray-500">Active Farms</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 text-center pt-2 border-t">
            <div>
              <p className="text-2xl font-bold text-yellow-600">{profile?.totalBoxes ?? 0}</p>
              <p className="text-xs text-gray-500">Bee Boxes</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-600">{profile?.availableBoxes ?? 0}</p>
              <p className="text-xs text-gray-500">Available</p>
            </div>
          </div>
        )}
      </Card>

      <Card className="space-y-4">
        <h3 className="font-semibold">Edit Profile</h3>
        <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input label="Village/City" value={village} onChange={(e) => setVillage(e.target.value)} />
        <Input label="District" value={district} onChange={(e) => setDistrict(e.target.value)} />
        <Input label="State" value={state} onChange={(e) => setState(e.target.value)} />
        <Button onClick={handleSave}>Save Profile</Button>
      </Card>

      <Card className="space-y-3">
        <h3 className="font-semibold text-gray-800">Demo Settings</h3>
        <p className="text-sm text-gray-500">
          Reset all data to the original demo state. This will log you out.
        </p>
        <Button variant="danger" onClick={() => setShowReset(true)}>
          Reset Demo Data
        </Button>
      </Card>

      <ConfirmDialog
        isOpen={showReset}
        onClose={() => setShowReset(false)}
        onConfirm={handleReset}
        title="Reset Demo Data"
        message="This will restore all farms, requests, and users to the original demo data. You will be logged out. Continue?"
        confirmLabel="Reset"
        variant="danger"
      />
    </div>
  );
}
