import { useState, useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getFarms, getBeekeeperProfile } from '@/utils/storage';
import { calculateMatchScore, calculateDistance } from '@/utils/matching';
import { FarmCard } from '@/components/FarmCard';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { EmptyState } from '@/components/ui/EmptyState';

const CROPS = ['All', 'Mustard', 'Sunflower', 'Guava', 'Apple', 'Almond', 'Cotton'];
const FLOWERING_FILTERS = [
  { value: 'all', label: 'All' },
  { value: '7', label: 'Next 7 days' },
  { value: '30', label: 'Next 30 days' },
  { value: '60', label: 'Next 60 days' },
];
const STATUS_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'available', label: 'Available' },
  { value: 'requested', label: 'Requested' },
  { value: 'booked', label: 'Booked' },
];

export function FindFarmsPage() {
  const { user } = useAuth();
  const profile = user ? getBeekeeperProfile(user.id) : undefined;

  const [crop, setCrop] = useState('All');
  const [location, setLocation] = useState('');
  const [maxDistance, setMaxDistance] = useState('100');
  const [flowering, setFlowering] = useState('all');
  const [minArea, setMinArea] = useState('');
  const [status, setStatus] = useState('all');

  const bkLat = profile?.latitude ?? 22.3039;
  const bkLon = profile?.longitude ?? 70.8022;

  const filteredFarms = useMemo(() => {
    let farms = getFarms();

    if (crop !== 'All') {
      farms = farms.filter((f) => f.crop === crop);
    }

    if (location.trim()) {
      const q = location.toLowerCase();
      farms = farms.filter(
        (f) =>
          f.village.toLowerCase().includes(q) ||
          f.district.toLowerCase().includes(q)
      );
    }

    if (maxDistance) {
      const max = Number(maxDistance);
      farms = farms.filter(
        (f) => calculateDistance(bkLat, bkLon, f.latitude, f.longitude) <= max
      );
    }

    if (flowering !== 'all') {
      const days = Number(flowering);
      const now = new Date();
      const limit = new Date();
      limit.setDate(limit.getDate() + days);
      farms = farms.filter((f) => {
        const start = new Date(f.floweringStart);
        return start >= now && start <= limit;
      });
    }

    if (minArea) {
      farms = farms.filter((f) => f.area >= Number(minArea));
    }

    if (status !== 'all') {
      farms = farms.filter((f) => f.status === status);
    }

    return farms
      .map((farm) => ({
        farm,
        match: profile
          ? calculateMatchScore(farm, profile)
          : { score: 0, breakdown: { crop: false, flowering: false, distance: false, area: false, availability: false } },
        distance: calculateDistance(bkLat, bkLon, farm.latitude, farm.longitude),
      }))
      .sort((a, b) => b.match.score - a.match.score);
  }, [crop, location, maxDistance, flowering, minArea, status, profile, bkLat, bkLon]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Find Farms</h2>

      <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Select
            label="Crop"
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
            options={CROPS.map((c) => ({ value: c, label: c }))}
          />
          <Input
            label="City/Village"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Search location..."
          />
          <Input
            label="Maximum Distance (km)"
            type="number"
            value={maxDistance}
            onChange={(e) => setMaxDistance(e.target.value)}
          />
          <Select
            label="Flowering"
            value={flowering}
            onChange={(e) => setFlowering(e.target.value)}
            options={FLOWERING_FILTERS}
          />
          <Input
            label="Minimum Acres"
            type="number"
            value={minArea}
            onChange={(e) => setMinArea(e.target.value)}
            placeholder="Any"
          />
          <Select
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            options={STATUS_OPTIONS}
          />
        </div>
      </div>

      <p className="text-sm text-gray-500">{filteredFarms.length} farms found</p>

      {filteredFarms.length === 0 ? (
        <EmptyState
          icon="🔍"
          title="No farms match your filters."
          description="Try adjusting your search criteria."
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredFarms.map(({ farm, match, distance }) => (
            <FarmCard
              key={farm.id}
              farm={farm}
              match={match}
              distance={distance}
              linkPrefix="/beekeeper"
              showStatus
            />
          ))}
        </div>
      )}
    </div>
  );
}
