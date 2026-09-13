import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="sticky top-0 z-30 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🐝</span>
            <h1 className="font-bold text-lg text-green-700">FarmBee</h1>
          </div>
          <nav className="hidden md:flex items-center gap-4">
            <button className="text-sm text-gray-600 hover:text-gray-800" onClick={() => document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' })}>How It Works</button>
            <button className="text-sm text-gray-600 hover:text-gray-800" onClick={() => document.getElementById('farmers')?.scrollIntoView({ behavior: 'smooth' })}>For Farmers</button>
            <button className="text-sm text-gray-600 hover:text-gray-800" onClick={() => document.getElementById('beekeepers')?.scrollIntoView({ behavior: 'smooth' })}>For Beekeepers</button>
            <button className="text-sm text-gray-600 hover:text-gray-800" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>About</button>
            <div className="ml-4 flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>Login</Button>
              <Button size="sm" onClick={() => navigate('/login')}>Get Started</Button>
            </div>
          </nav>
          <button className="md:hidden text-gray-700" onClick={() => document.getElementById('mobile-menu')?.classList.toggle('hidden')}>☰</button>
        </div>
        <div id="mobile-menu" className="md:hidden hidden border-t border-gray-100">
          <div className="px-4 py-3 flex flex-col gap-2">
            <button onClick={() => navigate('/')} className="text-left">Home</button>
            <button onClick={() => document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' })} className="text-left">How It Works</button>
            <button onClick={() => document.getElementById('farmers')?.scrollIntoView({ behavior: 'smooth' })} className="text-left">For Farmers</button>
            <button onClick={() => document.getElementById('beekeepers')?.scrollIntoView({ behavior: 'smooth' })} className="text-left">For Beekeepers</button>
            <button onClick={() => navigate('/login')} className="text-left">Login</button>
            <button onClick={() => navigate('/login')} className="text-left">Get Started</button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-green-800">Connecting Farmers with Beekeepers
for Better Pollination</h2>
            <p className="mt-4 text-gray-600">FarmBee helps farmers find beekeepers when their crops are flowering, and helps beekeepers find suitable farms for their bee colonies.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button onClick={() => navigate('/login?role=beekeeper&demo=1')}>Find a Farm</Button>
              <Button variant="secondary" onClick={() => navigate('/login?role=farmer&demo=1')}>I'm a Farmer</Button>
              <Button variant="ghost" onClick={() => navigate('/login')}>Login</Button>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-64 h-64 rounded-lg bg-green-50 border border-green-100 flex flex-col items-center justify-center text-4xl">
              <div className="text-3xl">🌾</div>
              <div className="mt-2 text-2xl">🐝</div>
              <p className="text-sm mt-2 text-gray-600">Farm → Flowers → Bees → Beekeeper</p>
            </div>
          </div>
        </section>

        <section id="how" className="mt-16">
          <h3 className="text-2xl font-bold text-green-800">How FarmBee Works</h3>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <h4 className="font-semibold">1. Farmers Add Farms</h4>
              <p className="text-sm text-gray-600 mt-2">Add your crop, farm area, location, and expected flowering period.</p>
            </Card>
            <Card>
              <h4 className="font-semibold">2. Beekeepers Find Farms</h4>
              <p className="text-sm text-gray-600 mt-2">Search farms by crop, location, flowering period and availability.</p>
            </Card>
            <Card>
              <h4 className="font-semibold">3. Send a Request</h4>
              <p className="text-sm text-gray-600 mt-2">Discuss bee box placement, dates and other arrangements.</p>
            </Card>
            <Card>
              <h4 className="font-semibold">4. Connect</h4>
              <p className="text-sm text-gray-600 mt-2">Farmer and beekeeper finalize the arrangement.</p>
            </Card>
          </div>
        </section>

        <section id="farmers" className="mt-16">
          <h3 className="text-2xl font-bold text-green-800">For Farmers</h3>
          <p className="mt-2 text-gray-600">Find beekeepers when crops are flowering, manage farms, and receive requests.</p>
          <div className="mt-4">
            <Button onClick={() => navigate('/login?role=farmer')}>Join as Farmer</Button>
          </div>
        </section>

        <section id="beekeepers" className="mt-16">
          <h3 className="text-2xl font-bold text-green-800">For Beekeepers</h3>
          <p className="mt-2 text-gray-600">Find flowering farms, filter by crop, and send farm requests.</p>
          <div className="mt-4">
            <Button variant="secondary" onClick={() => navigate('/login?role=beekeeper')}>Join as Beekeeper</Button>
          </div>
        </section>

        <section id="demo" className="mt-16">
          <h3 className="text-2xl font-bold text-green-800">Try the FarmBee Demo</h3>
          <p className="mt-2 text-gray-600">Explore FarmBee as a Farmer or Beekeeper using our demo accounts.</p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <h4 className="font-semibold">Ramesh Patel — Farmer</h4>
              <p className="text-sm text-gray-600 mt-1">9000000001 / 123456</p>
              <div className="mt-3">
                <Button onClick={() => navigate('/login?role=farmer&demo=1')}>Login as Farmer</Button>
              </div>
            </Card>
            <Card>
              <h4 className="font-semibold">Amit Beekeeper</h4>
              <p className="text-sm text-gray-600 mt-1">9000000002 / 123456</p>
              <div className="mt-3">
                <Button variant="secondary" onClick={() => navigate('/login?role=beekeeper&demo=1')}>Login as Beekeeper</Button>
              </div>
            </Card>
          </div>
        </section>

        <footer className="mt-20 border-t border-gray-100 pt-8 text-sm text-gray-600">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span>🐝</span>
                <span className="font-semibold text-green-700">FarmBee</span>
              </div>
              <p className="mt-2">Connecting farmers and beekeepers for better pollination.</p>
            </div>
            <div className="text-right">© 2026 FarmBee — Prototype</div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default LandingPage;
