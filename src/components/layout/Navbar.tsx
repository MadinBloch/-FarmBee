import { useAuth } from '@/context/AuthContext';
import { Button } from '../ui/Button';

export function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 h-16">
      <div className="flex items-center justify-between h-full px-4 md:px-6">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🐝</span>
          <h1 className="text-xl font-bold text-green-700">FarmBee</h1>
        </div>
        <div className="flex items-center gap-3">
          {user && (
            <>
              <span className="text-sm text-gray-600 hidden sm:inline">
                {user.name}
              </span>
              <Button variant="ghost" size="sm" onClick={logout}>
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
