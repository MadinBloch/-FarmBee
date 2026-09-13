import { NavLink } from 'react-router-dom';

interface NavItem {
  to: string;
  label: string;
  icon: string;
}

interface BottomNavigationProps {
  items: NavItem[];
}

export function BottomNavigation({ items }: BottomNavigationProps) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
      <div className="flex justify-around">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center py-2 px-3 text-xs font-medium transition-colors min-w-0 flex-1 ${
                isActive ? 'text-green-600' : 'text-gray-500'
              }`
            }
          >
            <span className="text-xl mb-0.5">{item.icon}</span>
            <span className="truncate">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
