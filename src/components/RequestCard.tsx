import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { formatDateRange } from '@/utils/format';
import type { Request, User, Farm } from '@/types';

interface RequestCardProps {
  request: Request;
  beekeeper?: User;
  farmer?: User;
  farm?: Farm;
  showActions?: boolean;
  onAccept?: () => void;
  onReject?: () => void;
}

export function RequestCard({
  request,
  beekeeper,
  farmer,
  farm,
  showActions = false,
  onAccept,
  onReject,
}: RequestCardProps) {
  const statusVariant = {
    pending: 'warning' as const,
    accepted: 'success' as const,
    rejected: 'danger' as const,
    completed: 'info' as const,
  };

  return (
    <Card className="space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-gray-900">
            {farm?.name || beekeeper?.name || farmer?.name || 'Unknown'}
          </h3>
          {beekeeper && farm && (
            <p className="text-sm text-gray-500">{beekeeper.name}</p>
          )}
        </div>
        <Badge variant={statusVariant[request.status]}>
          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
        </Badge>
      </div>

      <div className="text-sm text-gray-600 space-y-1">
        <p>{request.beeBoxes} Bee Boxes</p>
        <p>{formatDateRange(request.startDate, request.endDate)}</p>
        {request.message && (
          <p className="text-gray-500 italic mt-2">"{request.message}"</p>
        )}
      </div>

      {request.status === 'accepted' && farmer && (
        <div className="text-sm bg-green-50 rounded-lg p-3 space-y-1">
          <p><span className="font-medium">Farmer:</span> {farmer.name}</p>
          <p><span className="font-medium">Contact:</span> {farmer.mobile}</p>
        </div>
      )}

      {showActions && request.status === 'pending' && (
        <div className="flex gap-2">
          <Button size="sm" className="flex-1" onClick={onAccept}>
            Accept
          </Button>
          <Button size="sm" variant="outline" className="flex-1" onClick={onReject}>
            Reject
          </Button>
        </div>
      )}
    </Card>
  );
}
