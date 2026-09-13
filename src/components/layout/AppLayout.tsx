import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { BottomNavigation } from './BottomNavigation';

interface AppLayoutProps {
  navItems: { to: string; label: string; icon: string }[];
}

export function AppLayout({ navItems }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar items={navItems} />
        <main className="flex-1 p-4 md:p-6 pb-24 md:pb-6 max-w-5xl">
          <Outlet />
        </main>
      </div>
      <BottomNavigation items={navItems} />
    </div>
  );
}
