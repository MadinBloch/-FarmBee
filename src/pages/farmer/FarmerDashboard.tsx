import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import {
  getFarmsByFarmer,
  getRequestsByFarmer,
  getUserById,
} from '@/utils/storage';
import { DashboardCard } from '@/components/ui/DashboardCard';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { RequestCard } from '@/components/RequestCard';
import { formatDate, daysUntil } from '@/utils/format';

export function FarmerDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const farms = getFarmsByFarmer(user.id);
  const requests = getRequestsByFarmer(user.id);
  const activeFarms = farms.filter((f) => f.status === 'available' || f.status === 'requested');
  const pendingRequests = requests.filter((r) => r.status === 'pending');
  const acceptedRequests = requests.filter((r) => r.status === 'accepted');

  const upcomingFlowering = farms
    .filter((f) => daysUntil(f.floweringStart) >= 0)
    .sort((a, b) => daysUntil(a.floweringStart) - daysUntil(b.floweringStart))
    .slice(0, 3);

  const recentRequests = requests
    .filter((r) => r.status === 'pending')
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-500 text-sm">Welcome back, {user.name}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <DashboardCard label="My Farms" value={farms.length} icon="🌾" />
        <DashboardCard label="Active Farms" value={activeFarms.length} icon="✅" color="blue" />
        <DashboardCard label="Pending Requests" value={pendingRequests.length} icon="📩" color="yellow" />
        <DashboardCard label="Accepted" value={acceptedRequests.length} icon="🤝" color="green" />
      </div>

      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Upcoming Flowering</h3>
        <Button size="sm" onClick={() => navigate('/farmer/farms/new')}>
          + Add Farm
        </Button>
      </div>

      {upcomingFlowering.length === 0 ? (
        <Card>
          <p className="text-gray-500 text-sm text-center py-4">
            No upcoming flowering periods. Add a farm to get started.
          </p>
        </Card>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {upcomingFlowering.map((farm) => {
            const days = daysUntil(farm.floweringStart);
            return (
              <Card key={farm.id} className="space-y-2">
                <h4 className="font-semibold">{farm.name}</h4>
                <p className="text-sm text-gray-600">{farm.crop} · {farm.area} Acres</p>
                <p className="text-sm">Flowering: {formatDate(farm.floweringStart)}</p>
                <p className="text-sm font-medium text-green-600">
                  {days === 0 ? 'Flowering today!' : `${days} days remaining`}
                </p>
              </Card>
            );
          })}
        </div>
      )}

      <div>
        <h3 className="text-lg font-semibold mb-3">Recent Requests</h3>
        {recentRequests.length === 0 ? (
          <Card>
            <p className="text-gray-500 text-sm text-center py-4">No pending requests.</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {recentRequests.map((req) => (
              <RequestCard
                key={req.id}
                request={req}
                beekeeper={getUserById(req.beekeeperId)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
