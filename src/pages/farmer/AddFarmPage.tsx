import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { saveFarm, generateId } from '@/utils/storage';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Card } from '@/components/ui/Card';
import type { Farm } from '@/types';

const CROPS = ['Mustard', 'Sunflower', 'Guava', 'Apple', 'Almond', 'Cotton'];
const FARMING_METHODS = ['Organic', 'Conventional', 'Mixed'];
const PESTICIDE_OPTIONS = ['None', 'Minimal', 'Moderate', 'Heavy'];

export function AddFarmPage() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    village: '',
    district: '',
    state: 'Gujarat',
    area: '',
    latitude: '',
    longitude: '',
    crop: 'Mustard',
    cropVariety: '',
    sowingDate: '',
    floweringStart: '',
    floweringEnd: '',
    harvestDate: '',
    irrigationAvailable: true,
    farmingMethod: 'Organic',
    pesticideUsage: 'Minimal',
    notes: '',
  });

  const update = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const farm: Farm = {
      id: generateId('farm'),
      farmerId: user.id,
      name: form.name,
      village: form.village,
      district: form.district,
      state: form.state,
      area: Number(form.area),
      latitude: Number(form.latitude) || 22.3039,
      longitude: Number(form.longitude) || 70.8022,
      crop: form.crop,
      cropVariety: form.cropVariety,
      sowingDate: form.sowingDate,
      floweringStart: form.floweringStart,
      floweringEnd: form.floweringEnd,
      harvestDate: form.harvestDate,
      irrigationAvailable: form.irrigationAvailable,
      farmingMethod: form.farmingMethod,
      pesticideUsage: form.pesticideUsage,
      notes: form.notes,
      status: 'available',
    };

    saveFarm(farm);
    showToast('Farm added successfully.');
    navigate('/farmer/farms');
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-2xl font-bold text-gray-900">Add Farm</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="space-y-4">
          <h3 className="font-semibold text-gray-800">Basic Information</h3>
          <Input label="Farm Name" value={form.name} onChange={(e) => update('name', e.target.value)} required />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Village/City" value={form.village} onChange={(e) => update('village', e.target.value)} required />
            <Input label="District" value={form.district} onChange={(e) => update('district', e.target.value)} required />
          </div>
          <Input label="State" value={form.state} onChange={(e) => update('state', e.target.value)} required />
          <Input label="Farm Area (Acres)" type="number" min="1" value={form.area} onChange={(e) => update('area', e.target.value)} required />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Latitude" type="number" step="any" value={form.latitude} onChange={(e) => update('latitude', e.target.value)} placeholder="22.3039" />
            <Input label="Longitude" type="number" step="any" value={form.longitude} onChange={(e) => update('longitude', e.target.value)} placeholder="70.8022" />
          </div>
          <div className="bg-gray-100 rounded-lg h-32 flex items-center justify-center text-gray-400 text-sm">
            📍 Map placeholder — enter coordinates above
          </div>
        </Card>

        <Card className="space-y-4">
          <h3 className="font-semibold text-gray-800">Crop Information</h3>
          <Select
            label="Crop"
            value={form.crop}
            onChange={(e) => update('crop', e.target.value)}
            options={CROPS.map((c) => ({ value: c, label: c }))}
          />
          <Input label="Crop Variety" value={form.cropVariety} onChange={(e) => update('cropVariety', e.target.value)} />
          <Input label="Sowing Date" type="date" value={form.sowingDate} onChange={(e) => update('sowingDate', e.target.value)} required />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Expected Flowering Start" type="date" value={form.floweringStart} onChange={(e) => update('floweringStart', e.target.value)} required />
            <Input label="Expected Flowering End" type="date" value={form.floweringEnd} onChange={(e) => update('floweringEnd', e.target.value)} required />
          </div>
          <Input label="Expected Harvest Date" type="date" value={form.harvestDate} onChange={(e) => update('harvestDate', e.target.value)} required />
        </Card>

        <Card className="space-y-4">
          <h3 className="font-semibold text-gray-800">Additional Information</h3>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.irrigationAvailable}
              onChange={(e) => update('irrigationAvailable', e.target.checked)}
              className="rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            Irrigation Available
          </label>
          <Select
            label="Farming Method"
            value={form.farmingMethod}
            onChange={(e) => update('farmingMethod', e.target.value)}
            options={FARMING_METHODS.map((m) => ({ value: m, label: m }))}
          />
          <Select
            label="Pesticide Usage"
            value={form.pesticideUsage}
            onChange={(e) => update('pesticideUsage', e.target.value)}
            options={PESTICIDE_OPTIONS.map((p) => ({ value: p, label: p }))}
          />
          <Textarea label="Notes" value={form.notes} onChange={(e) => update('notes', e.target.value)} />
        </Card>

        <div className="flex gap-3">
          <Button type="submit" className="flex-1">Save Farm</Button>
          <Button type="button" variant="outline" onClick={() => navigate('/farmer/farms')}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
