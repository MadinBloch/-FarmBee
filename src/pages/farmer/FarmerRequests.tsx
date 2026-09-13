import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import {
  getRequestsByFarmer,
  getUserById,
  getFarmById,
  updateRequest,
} from '@/utils/storage';
import { RequestCard } from '@/components/RequestCard';
import { EmptyState } from '@/components/ui/EmptyState';

export function FarmerRequests() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [, setRefresh] = useState(0);

  if (!user) return null;

  const requests = getRequestsByFarmer(user.id).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const handleAccept = (requestId: string) => {
    const req = requests.find((r) => r.id === requestId);
    if (!req) return;
    updateRequest({ ...req, status: 'accepted' });
    showToast('Request accepted.');
    setRefresh((n) => n + 1);
  };

  const handleReject = (requestId: string) => {
    const req = requests.find((r) => r.id === requestId);
    if (!req) return;
    updateRequest({ ...req, status: 'rejected' });
    showToast('Request rejected.');
    setRefresh((n) => n + 1);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Requests</h2>

      {requests.length === 0 ? (
        <EmptyState
          icon="📩"
          title="No requests yet."
          description="Beekeeper requests for your farms will appear here."
        />
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <RequestCard
              key={req.id}
              request={req}
              beekeeper={getUserById(req.beekeeperId)}
              farm={getFarmById(req.farmId)}
              showActions={req.status === 'pending'}
              onAccept={() => handleAccept(req.id)}
              onReject={() => handleReject(req.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
