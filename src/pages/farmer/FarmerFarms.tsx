import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { getFarmsByFarmer } from '@/utils/storage';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { EmptyState } from '@/components/ui/EmptyState';
import { formatDateRange } from '@/utils/format';

export function FarmerFarms() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const farms = getFarmsByFarmer(user.id);

  const statusVariant = {
    available: 'success' as const,
    requested: 'warning' as const,
    booked: 'info' as const,
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">My Farms</h2>
        <Button onClick={() => navigate('/farmer/farms/new')}>+ Add Farm</Button>
      </div>

      {farms.length === 0 ? (
        <EmptyState
          icon="🌾"
          title="Your farms will appear here."
          description="Add your first farm to start receiving beekeeper requests."
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {farms.map((farm) => (
            <Card
              key={farm.id}
              className="space-y-2 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate(`/farmer/farms/${farm.id}`)}
            >
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-gray-900">{farm.name}</h3>
                <Badge variant={statusVariant[farm.status]}>
                  {farm.status.charAt(0).toUpperCase() + farm.status.slice(1)}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">{farm.crop} · {farm.area} Acres</p>
              <p className="text-sm text-gray-500">
                📍 {farm.village}, {farm.district}
              </p>
              <p className="text-sm text-gray-500">
                Flowering: {formatDateRange(farm.floweringStart, farm.floweringEnd)}
              </p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
