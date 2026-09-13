import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import {
  getFarmById,
  getUserById,
  createRequest,
  generateId,
  getBeekeeperProfile,
} from '@/utils/storage';
import { calculateMatchScore, getRecommendedBeeBoxes } from '@/utils/matching';
import { formatDate, formatDateRange } from '@/utils/format';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

export function FarmDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [beeBoxes, setBeeBoxes] = useState('20');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [message, setMessage] = useState('');

  const farm = id ? getFarmById(id) : undefined;
  const farmer = farm ? getUserById(farm.farmerId) : undefined;
  const isBeekeeper = user?.role === 'beekeeper';
  const profile = user && isBeekeeper ? getBeekeeperProfile(user.id) : undefined;
  const match = farm && profile ? calculateMatchScore(farm, profile) : undefined;

  if (!farm) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Farm not found.</p>
        <Button className="mt-4" onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }

  const statusVariant = {
    available: 'success' as const,
    requested: 'warning' as const,
    booked: 'info' as const,
  };

  const handleRequest = () => {
    if (!user || !isBeekeeper) return;

    const request = {
      id: generateId('request'),
      farmId: farm.id,
      farmerId: farm.farmerId,
      beekeeperId: user.id,
      beeBoxes: Number(beeBoxes),
      startDate: startDate || farm.floweringStart,
      endDate: endDate || farm.floweringEnd,
      message: message || `I would like to place ${beeBoxes} bee boxes during the flowering period.`,
      status: 'pending' as const,
      createdAt: new Date().toISOString(),
    };

    createRequest(request);
    showToast(`Request sent to ${farmer?.name || 'farmer'}.`);
    setShowModal(false);
    navigate('/beekeeper/requests');
  };

  const openRequestModal = () => {
    setStartDate(farm.floweringStart);
    setEndDate(farm.floweringEnd);
    setMessage(`I would like to place ${beeBoxes} bee boxes during the flowering period.`);
    setShowModal(true);
  };

  const backPath = isBeekeeper ? '/beekeeper/farms' : '/farmer/farms';

  return (
    <div className="space-y-6 max-w-2xl">
      <Button variant="ghost" size="sm" onClick={() => navigate(backPath)}>
        ← Back
      </Button>

      <div>
        <div className="flex items-start justify-between">
          <h2 className="text-2xl font-bold text-gray-900">{farm.name}</h2>
          <Badge variant={statusVariant[farm.status]}>
            {farm.status.charAt(0).toUpperCase() + farm.status.slice(1)}
          </Badge>
        </div>
        <p className="text-gray-500 mt-1">
          📍 {farm.village}, {farm.district}, {farm.state}
        </p>
        <p className="text-lg font-medium mt-2">{farm.area} Acres</p>
      </div>

      {match && (
        <Card className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Match Score</span>
            <Badge variant={match.score >= 70 ? 'success' : 'warning'}>
              {match.score}%
            </Badge>
          </div>
          <div className="flex flex-wrap gap-1.5 text-xs">
            {match.breakdown.crop && <Badge variant="success">{farm.crop} ✓</Badge>}
            {match.breakdown.flowering && <Badge variant="success">Flowering Date ✓</Badge>}
            {match.breakdown.distance && <Badge variant="success">Distance ✓</Badge>}
            {match.breakdown.area && <Badge variant="success">Farm Area ✓</Badge>}
            {match.breakdown.availability && <Badge variant="success">Availability ✓</Badge>}
          </div>
        </Card>
      )}

      <Card className="space-y-4">
        <h3 className="font-semibold text-gray-800">Crop Details</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Crop</p>
            <p className="font-medium">{farm.crop}</p>
          </div>
          <div>
            <p className="text-gray-500">Variety</p>
            <p className="font-medium">{farm.cropVariety}</p>
          </div>
          <div>
            <p className="text-gray-500">Sowing Date</p>
            <p className="font-medium">{formatDate(farm.sowingDate)}</p>
          </div>
          <div>
            <p className="text-gray-500">Expected Flowering</p>
            <p className="font-medium">{formatDateRange(farm.floweringStart, farm.floweringEnd)}</p>
          </div>
          <div>
            <p className="text-gray-500">Expected Harvest</p>
            <p className="font-medium">{formatDate(farm.harvestDate)}</p>
          </div>
          <div>
            <p className="text-gray-500">Farming Method</p>
            <p className="font-medium">{farm.farmingMethod}</p>
          </div>
        </div>
      </Card>

      <Card className="space-y-3">
        <h3 className="font-semibold text-gray-800">Suitable For</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Honey bees</li>
          <li>• Pollination</li>
          <li>• {getRecommendedBeeBoxes(farm.area)}</li>
        </ul>
      </Card>

      {farm.notes && (
        <Card>
          <h3 className="font-semibold text-gray-800 mb-2">Notes</h3>
          <p className="text-sm text-gray-600">{farm.notes}</p>
        </Card>
      )}

      <Card>
        <h3 className="font-semibold text-gray-800 mb-2">Farm Owner</h3>
        <p className="text-sm">{farmer?.name || 'Unknown'}</p>
        <p className="text-xs text-gray-500 mt-1">Approximate location shown for privacy</p>
      </Card>

      {isBeekeeper && farm.status === 'available' && (
        <Button className="w-full" size="lg" onClick={openRequestModal}>
          Request This Farm
        </Button>
      )}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Send Request">
        <div className="space-y-4">
          <Input
            label="Number of Bee Boxes"
            type="number"
            min="1"
            value={beeBoxes}
            onChange={(e) => setBeeBoxes(e.target.value)}
          />
          <Input
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <Input
            label="End Date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <Textarea
            label="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button className="w-full" onClick={handleRequest}>
            Submit Request
          </Button>
        </div>
      </Modal>
    </div>
  );
}
