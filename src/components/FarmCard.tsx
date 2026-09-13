import { useNavigate } from 'react-router-dom';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { formatDateRange } from '@/utils/format';
import type { Farm, MatchResult } from '@/types';

interface FarmCardProps {
  farm: Farm;
  distance?: number;
  match?: MatchResult;
  linkPrefix?: string;
  showStatus?: boolean;
}

export function FarmCard({
  farm,
  distance,
  match,
  linkPrefix = '',
  showStatus = false,
}: FarmCardProps) {
  const navigate = useNavigate();
  const path = `${linkPrefix}/farms/${farm.id}`;

  const statusVariant = {
    available: 'success' as const,
    requested: 'warning' as const,
    booked: 'info' as const,
  };

  return (
    <Card className="space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-gray-900">🌻 {farm.name}</h3>
          <p className="text-sm text-gray-600 mt-0.5">
            {farm.crop} · {farm.area} Acres
          </p>
        </div>
        {match && (
          <Badge variant={match.score >= 70 ? 'success' : 'warning'}>
            {match.score}% Match
          </Badge>
        )}
      </div>

      <div className="text-sm text-gray-600 space-y-1">
        <p>Flowering: {formatDateRange(farm.floweringStart, farm.floweringEnd)}</p>
        <p>📍 {farm.village}, {farm.district}</p>
        {distance !== undefined && <p>{distance} km away</p>}
      </div>

      {match && (
        <div className="flex flex-wrap gap-1.5 text-xs">
          {match.breakdown.crop && <Badge variant="success">Crop ✓</Badge>}
          {match.breakdown.flowering && <Badge variant="success">Flowering ✓</Badge>}
          {match.breakdown.distance && <Badge variant="success">Distance ✓</Badge>}
          {match.breakdown.area && <Badge variant="success">Area ✓</Badge>}
          {match.breakdown.availability && <Badge variant="success">Availability ✓</Badge>}
        </div>
      )}

      {showStatus && (
        <Badge variant={statusVariant[farm.status]}>
          {farm.status.charAt(0).toUpperCase() + farm.status.slice(1)}
        </Badge>
      )}

      <Button size="sm" className="w-full" onClick={() => navigate(path)}>
        View Farm
      </Button>
    </Card>
  );
}
