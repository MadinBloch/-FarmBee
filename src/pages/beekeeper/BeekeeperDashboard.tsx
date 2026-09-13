import { useAuth } from '@/context/AuthContext';
import {
  getFarms,
  getRequestsByBeekeeper,
  getBeekeeperProfile,
} from '@/utils/storage';
import { calculateMatchScore, calculateDistance } from '@/utils/matching';
import { DashboardCard } from '@/components/ui/DashboardCard';
import { FarmCard } from '@/components/FarmCard';

export function BeekeeperDashboard() {
  const { user } = useAuth();

  if (!user) return null;

  const profile = getBeekeeperProfile(user.id);
  const requests = getRequestsByBeekeeper(user.id);
  const allFarms = getFarms().filter((f) => f.status === 'available');

  const activeRequests = requests.filter(
    (r) => r.status === 'pending' || r.status === 'accepted'
  );
  const acceptedRequests = requests.filter((r) => r.status === 'accepted');

  const bkLat = profile?.latitude ?? 22.3039;
  const bkLon = profile?.longitude ?? 70.8022;

  const nearbyFarms = allFarms.filter(
    (f) => calculateDistance(bkLat, bkLon, f.latitude, f.longitude) <= 50
  );

  const recommended = allFarms
    .map((farm) => ({
      farm,
      match: profile ? calculateMatchScore(farm, profile) : { score: 0, breakdown: { crop: false, flowering: false, distance: false, area: false, availability: false } },
      distance: calculateDistance(bkLat, bkLon, farm.latitude, farm.longitude),
    }))
    .sort((a, b) => b.match.score - a.match.score)
    .slice(0, 4);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-500 text-sm">Welcome back, {user.name}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <DashboardCard
          label="Available Bee Boxes"
          value={profile?.availableBoxes ?? 0}
          icon="📦"
          color="yellow"
        />
        <DashboardCard label="Active Requests" value={activeRequests.length} icon="📩" color="blue" />
        <DashboardCard label="Accepted Farms" value={acceptedRequests.length} icon="✅" />
        <DashboardCard label="Nearby Farms" value={nearbyFarms.length} icon="📍" color="gray" />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Recommended Farms</h3>
        {recommended.length === 0 ? (
          <p className="text-gray-500 text-sm">No farms available at the moment.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {recommended.map(({ farm, match, distance }) => (
              <FarmCard
                key={farm.id}
                farm={farm}
                match={match}
                distance={distance}
                linkPrefix="/beekeeper"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
