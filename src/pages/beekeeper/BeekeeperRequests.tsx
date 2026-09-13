import { useAuth } from '@/context/AuthContext';
import {
  getRequestsByBeekeeper,
  getFarmById,
  getUserById,
} from '@/utils/storage';
import { RequestCard } from '@/components/RequestCard';
import { EmptyState } from '@/components/ui/EmptyState';

export function BeekeeperRequests() {
  const { user } = useAuth();

  if (!user) return null;

  const requests = getRequestsByBeekeeper(user.id).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">My Requests</h2>

      {requests.length === 0 ? (
        <EmptyState
          icon="📩"
          title="No requests yet."
          description="Find farms and send requests to get started."
        />
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <RequestCard
              key={req.id}
              request={req}
              farm={getFarmById(req.farmId)}
              farmer={req.status === 'accepted' ? getUserById(req.farmerId) : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}
