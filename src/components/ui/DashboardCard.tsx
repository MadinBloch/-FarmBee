interface DashboardCardProps {
  label: string;
  value: number | string;
  icon?: string;
  color?: 'green' | 'yellow' | 'blue' | 'gray';
}

const colors = {
  green: 'bg-green-50 text-green-700 border-green-200',
  yellow: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  blue: 'bg-blue-50 text-blue-700 border-blue-200',
  gray: 'bg-gray-50 text-gray-700 border-gray-200',
};

export function DashboardCard({ label, value, icon, color = 'green' }: DashboardCardProps) {
  return (
    <div className={`rounded-xl border p-4 ${colors[color]}`}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium opacity-80">{label}</p>
        {icon && <span className="text-xl">{icon}</span>}
      </div>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}
