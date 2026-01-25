interface StatCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
  };
  icon?: React.ReactNode;
  description?: string;
  className?: string;
}

export function StatCard({
  title,
  value,
  change,
  icon,
  description,
  className = '',
}: StatCardProps) {
  return (
    <div className={`bg-white rounded-xl shadow-sm p-6 ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        {icon && (
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
            {icon}
          </div>
        )}
      </div>
      {(change || description) && (
        <div className="mt-2 flex items-center gap-2">
          {change && (
            <span
              className={`text-sm font-medium ${
                change.type === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {change.type === 'increase' ? '↑' : '↓'} {Math.abs(change.value)}%
            </span>
          )}
          {description && <span className="text-sm text-gray-500">{description}</span>}
        </div>
      )}
    </div>
  );
}

