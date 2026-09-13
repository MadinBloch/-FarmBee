import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { getBeekeeperProfile, updateBeekeeperProfile } from '@/utils/storage';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { DashboardCard } from '@/components/ui/DashboardCard';

const CROPS = ['Mustard', 'Sunflower', 'Guava', 'Apple', 'Almond', 'Cotton'];

export function BeeBoxManagement() {
  const { user } = useAuth();
  const { showToast } = useToast();

  const profile = user ? getBeekeeperProfile(user.id) : undefined;

  const [totalBoxes, setTotalBoxes] = useState(profile?.totalBoxes ?? 0);
  const [availableBoxes, setAvailableBoxes] = useState(profile?.availableBoxes ?? 0);
  const [deployedBoxes, setDeployedBoxes] = useState(profile?.deployedBoxes ?? 0);
  const [availableFrom, setAvailableFrom] = useState(profile?.availableFrom ?? '');
  const [availableUntil, setAvailableUntil] = useState(profile?.availableUntil ?? '');
  const [preferredCrops, setPreferredCrops] = useState<string[]>(
    profile?.preferredCrops ?? []
  );

  if (!user || !profile) return null;

  const toggleCrop = (crop: string) => {
    setPreferredCrops((prev) =>
      prev.includes(crop) ? prev.filter((c) => c !== crop) : [...prev, crop]
    );
  };

  const handleSave = () => {
    updateBeekeeperProfile({
      ...profile,
      totalBoxes,
      availableBoxes,
      deployedBoxes,
      availableFrom,
      availableUntil,
      preferredCrops,
    });
    showToast('Bee box settings updated.');
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-2xl font-bold text-gray-900">Bee Boxes</h2>

      <div className="grid grid-cols-3 gap-3">
        <DashboardCard label="Total Boxes" value={totalBoxes} icon="📦" />
        <DashboardCard label="Available" value={availableBoxes} icon="✅" color="green" />
        <DashboardCard label="Deployed" value={deployedBoxes} icon="🚚" color="yellow" />
      </div>

      <Card className="space-y-4">
        <h3 className="font-semibold">Edit Availability</h3>
        <Input
          label="Total Bee Boxes"
          type="number"
          min="0"
          value={totalBoxes}
          onChange={(e) => setTotalBoxes(Number(e.target.value))}
        />
        <Input
          label="Available Bee Boxes"
          type="number"
          min="0"
          value={availableBoxes}
          onChange={(e) => setAvailableBoxes(Number(e.target.value))}
        />
        <Input
          label="Currently Deployed"
          type="number"
          min="0"
          value={deployedBoxes}
          onChange={(e) => setDeployedBoxes(Number(e.target.value))}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Available From"
            type="date"
            value={availableFrom}
            onChange={(e) => setAvailableFrom(e.target.value)}
          />
          <Input
            label="Available Until"
            type="date"
            value={availableUntil}
            onChange={(e) => setAvailableUntil(e.target.value)}
          />
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Preferred Crops</p>
          <div className="flex flex-wrap gap-2">
            {CROPS.map((crop) => (
              <button
                key={crop}
                type="button"
                onClick={() => toggleCrop(crop)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  preferredCrops.includes(crop)
                    ? 'bg-green-100 text-green-700 border border-green-300'
                    : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
                }`}
              >
                {crop}
              </button>
            ))}
          </div>
        </div>

        <Button onClick={handleSave} className="w-full">
          Save Changes
        </Button>
      </Card>
    </div>
  );
}
