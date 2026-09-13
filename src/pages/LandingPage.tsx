import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useAuth } from '@/context/AuthContext';

export function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="sticky top-0 z-30 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🐝</span>
            <div className="flex flex-col leading-none">
              <span className="font-bold text-lg text-green-700">FarmBee</span>
              <span className="text-xs text-gray-500">Connecting farms with pollination</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <button className="text-sm text-gray-600 hover:text-gray-800" onClick={() => document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' })}>How It Works</button>
            <button className="text-sm text-gray-600 hover:text-gray-800" onClick={() => document.getElementById('farmers')?.scrollIntoView({ behavior: 'smooth' })}>For Farmers</button>
            <button className="text-sm text-gray-600 hover:text-gray-800" onClick={() => document.getElementById('beekeepers')?.scrollIntoView({ behavior: 'smooth' })}>For Beekeepers</button>
            <button className="text-sm text-gray-600 hover:text-gray-800" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>About</button>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Button variant="ghost" size="sm" onClick={() => navigate(user.role === 'farmer' ? '/farmer' : '/beekeeper')}>Dashboard</Button>
                <Button variant="ghost" size="sm" onClick={() => navigate('/farmer/profile')}>Profile</Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>Login</Button>
                <Button size="sm" onClick={() => navigate('/login')}>Get Started</Button>
              </>
            )}
          </div>

          <button className="md:hidden text-gray-700" onClick={() => document.getElementById('mobile-menu')?.classList.toggle('hidden')}>☰</button>
        </div>
        <div id="mobile-menu" className="md:hidden hidden border-t border-gray-100">
          <div className="px-4 py-3 flex flex-col gap-2">
            <button onClick={() => document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' })} className="text-left">How It Works</button>
            <button onClick={() => document.getElementById('farmers')?.scrollIntoView({ behavior: 'smooth' })} className="text-left">For Farmers</button>
            <button onClick={() => document.getElementById('beekeepers')?.scrollIntoView({ behavior: 'smooth' })} className="text-left">For Beekeepers</button>
            <button onClick={() => navigate('/login')} className="text-left">Login</button>
            <button onClick={() => navigate('/login')} className="text-left">Get Started</button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-sm text-green-700 font-medium">🌱 Connecting farms with pollination</span>

            <h1 className="mt-6 text-3xl md:text-5xl font-extrabold leading-tight text-gray-900">
              Where <span className="text-green-700">flowering farms</span>
              <br /> meet <span className="text-yellow-500">beekeepers</span>.
            </h1>

            <p className="mt-4 text-gray-600 max-w-xl">FarmBee helps farmers find beekeepers when their crops are flowering, and helps beekeepers discover suitable farms for their bee colonies.</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button onClick={() => navigate('/login?role=beekeeper&demo=1')}>Find a Farm →</Button>
              <Button variant="secondary" onClick={() => navigate('/login?role=farmer&demo=1')}>Join as Farmer</Button>
            </div>

            <div className="mt-4 text-sm text-gray-500">
              <button className="underline" onClick={() => navigate('/login')}>Already have an account? Login</button>
            </div>

            <div className="mt-6 flex gap-6 text-sm text-gray-600">
              <div>
                <div className="text-xs text-gray-500">Demo platform</div>
                <div className="font-medium mt-1">Crop Matching · Flowering Tracking · Farm Discovery</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="w-full h-80 md:h-96 rounded-xl overflow-hidden shadow-lg border border-gray-100">
              <img src="/images/hero-farm.svg" alt="Flowering field with farmer" className="w-full h-full object-cover" loading="eager" />
            </div>

            <div className="absolute right-6 top-6 bg-white rounded-xl shadow-md border p-3 w-40">
              <div className="text-sm text-gray-500">🐝 Farms</div>
              <div className="font-semibold text-lg text-green-700">24</div>
              <div className="text-xs text-gray-500">Flowering Soon</div>
            </div>

            <div className="absolute right-6 bottom-6 bg-white rounded-xl shadow-md border p-3 w-48">
              <div className="text-xs text-gray-500">🌻 Mustard</div>
              <div className="font-semibold">12 Acres</div>
              <div className="text-xs text-gray-500">10 Dec – 25 Dec</div>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section id="problem" className="mt-20 bg-green-50 rounded-2xl p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <img src="/images/farmer-field.svg" alt="Farmer standing in a flowering crop field" className="rounded-lg shadow-sm w-full h-64 object-cover" loading="lazy" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-green-800">Finding the right connection shouldn't depend on phone calls.</h3>
              <p className="mt-4 text-gray-700">Farmers need pollination support during the flowering stage. Beekeepers need suitable flowering locations for their colonies. Today this often relies on personal networks, manual searching and timing.</p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card>
                  <div className="text-lg font-semibold">📅 Timing</div>
                  <div className="text-sm text-gray-600 mt-2">Flowering periods are limited.</div>
                </Card>
                <Card>
                  <div className="text-lg font-semibold">📍 Location</div>
                  <div className="text-sm text-gray-600 mt-2">Suitable farms can be hard to discover.</div>
                </Card>
                <Card>
                  <div className="text-lg font-semibold">🤝 Connections</div>
                  <div className="text-sm text-gray-600 mt-2">Many arrangements still depend on local contacts.</div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="mt-20">
          <h3 className="text-2xl font-bold text-gray-900">From flowering crop to bee boxes.</h3>
          <div className="mt-8 flex flex-col md:flex-row md:items-center gap-8">
            <div className="relative md:flex-1">
              <div className="hidden md:block absolute left-8 top-6 bottom-6 w-0.5 bg-gray-200" />
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-700 text-white">01</div>
                  <div>
                    <div className="font-semibold">Farmer adds farm</div>
                    <div className="text-sm text-gray-600">Add crop, location and flowering period.</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-700 text-white">02</div>
                  <div>
                    <div className="font-semibold">Flowering period is listed</div>
                    <div className="text-sm text-gray-600">Track when fields need pollination.</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-700 text-white">03</div>
                  <div>
                    <div className="font-semibold">Beekeeper discovers suitable farm</div>
                    <div className="text-sm text-gray-600">Search by crop, location and dates.</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-700 text-white">04</div>
                  <div>
                    <div className="font-semibold">Connect and finalize</div>
                    <div className="text-sm text-gray-600">Discuss logistics and confirm arrangements.</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/3">
              <img src="/images/bee-flower.svg" alt="Honey bee on a flower" className="w-full rounded-lg shadow-md" loading="lazy" />
            </div>
          </div>
        </section>

        {/* For Farmers */}
        <section id="farmers" className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <img src="/images/farmer-field.svg" alt="Farmer in field" className="w-full rounded-lg shadow-md" loading="lazy" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-green-800">For Farmers</h3>
            <p className="mt-4 text-gray-700">Get pollination support when your crop needs it. Add farm details, flowering periods and location, then receive requests from suitable beekeepers.</p>
            <ul className="mt-4 list-disc list-inside text-gray-700">
              <li>Add multiple farms</li>
              <li>Share flowering periods</li>
              <li>Receive beekeeper requests</li>
              <li>Accept or reject requests</li>
              <li>Manage farm information</li>
            </ul>
            <div className="mt-6">
              <Button onClick={() => navigate('/login?role=farmer')}>Join as Farmer →</Button>
            </div>
          </div>
        </section>

        {/* For Beekeepers */}
        <section id="beekeepers" className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold text-green-800">For Beekeepers</h3>
            <p className="mt-4 text-gray-700">Find flowering farms for your bee colonies. Search farms by crop, location, flowering period and other requirements.</p>
            <ul className="mt-4 list-disc list-inside text-gray-700">
              <li>Find suitable farms</li>
              <li>Filter by crop</li>
              <li>Check flowering periods</li>
              <li>Manage bee-box availability</li>
              <li>Send farm requests</li>
            </ul>
            <div className="mt-6">
              <Button variant="secondary" onClick={() => navigate('/login?role=beekeeper')}>Find a Farm →</Button>
            </div>
          </div>
          <div>
            <img src="/images/beekeeper.svg" alt="Beekeeper inspecting bee boxes" className="w-full rounded-lg shadow-md" loading="lazy" />
          </div>
        </section>

        {/* Matching */}
        <section id="matching" className="mt-20">
          <h3 className="text-2xl font-bold">Find a better match.</h3>
          <p className="mt-2 text-gray-700">FarmBee compares farm and beekeeper requirements to help identify suitable connections.</p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <Card>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-semibold">Patel Mustard Farm</div>
                  <div className="text-sm text-gray-600">🌻 Mustard · 12 Acres</div>
                  <div className="text-sm text-gray-600">📍 Rajkot</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Flowering</div>
                  <div className="font-semibold">10 Dec – 25 Dec</div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-600">95% Match</div>
                <Button onClick={() => navigate('/farmer/farms/1')}>View Farm</Button>
              </div>

              <div className="mt-4 text-sm text-gray-600">
                <ul className="list-disc list-inside">
                  <li>Crop ✓</li>
                  <li>Flowering Period ✓</li>
                  <li>Area ✓</li>
                  <li>Distance ✓</li>
                </ul>
              </div>
            </Card>

            <Card>
              <h4 className="font-semibold">Why this match?</h4>
              <div className="mt-3 text-sm text-gray-700">
                <div className="flex justify-between"><span>Crop</span><span>Mustard ✓</span></div>
                <div className="flex justify-between mt-2"><span>Flowering</span><span>Matches availability ✓</span></div>
                <div className="flex justify-between mt-2"><span>Area</span><span>Suitable ✓</span></div>
                <div className="flex justify-between mt-2"><span>Distance</span><span>18 km ✓</span></div>
              </div>
            </Card>
          </div>
        </section>

        {/* Demo */}
        <section id="demo" className="mt-20">
          <h3 className="text-2xl font-bold">See FarmBee in action.</h3>
          <p className="mt-2 text-gray-700">Try the platform as a farmer or beekeeper using our demo accounts.</p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card>
              <div className="flex items-center gap-4">
                <div className="text-4xl">👨‍🌾</div>
                <div>
                  <div className="font-semibold">Ramesh Patel</div>
                  <div className="text-sm text-gray-600">Farmer — Manage farms and flowering periods</div>
                </div>
              </div>
              <div className="mt-4">
                <Button onClick={() => navigate('/login?role=farmer&demo=1')}>Try Farmer Demo</Button>
              </div>
            </Card>

            <Card>
              <div className="flex items-center gap-4">
                <div className="text-4xl">🐝</div>
                <div>
                  <div className="font-semibold">Amit Beekeeper</div>
                  <div className="text-sm text-gray-600">Beekeeper — Find farms and send requests</div>
                </div>
              </div>
              <div className="mt-4">
                <Button variant="secondary" onClick={() => navigate('/login?role=beekeeper&demo=1')}>Try Beekeeper Demo</Button>
              </div>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section id="cta" className="mt-20 rounded-lg overflow-hidden relative">
          <div className="absolute inset-0 opacity-30">
            <img src="/images/hero-farm.svg" alt="flowering field background" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="relative bg-white/80 p-8 md:p-12">
            <h3 className="text-2xl font-bold">Better connections start with the right timing.</h3>
            <p className="mt-2 text-gray-700">Bring farmers and beekeepers together around the flowering season.</p>
            <div className="mt-6 flex gap-3">
              <Button onClick={() => navigate('/login')}>Get Started</Button>
              <Button variant="ghost" onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}>Explore Demo</Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 border-t border-gray-100 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center gap-2">
                <span>🐝</span>
                <span className="font-semibold text-green-700">FarmBee</span>
              </div>
              <p className="mt-2 text-gray-600">Connecting farmers and beekeepers for better pollination.</p>
            </div>
            <div>
              <div className="font-semibold">Product</div>
              <ul className="mt-2 text-gray-600">
                <li className="mt-1"><button onClick={() => document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' })}>How It Works</button></li>
                <li className="mt-1"><button onClick={() => document.getElementById('farmers')?.scrollIntoView({ behavior: 'smooth' })}>For Farmers</button></li>
                <li className="mt-1"><button onClick={() => document.getElementById('beekeepers')?.scrollIntoView({ behavior: 'smooth' })}>For Beekeepers</button></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold">Account</div>
              <ul className="mt-2 text-gray-600">
                <li className="mt-1"><button onClick={() => navigate('/login')}>Login</button></li>
                <li className="mt-1"><button onClick={() => navigate('/login')}>Get Started</button></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-sm text-gray-500">© 2026 FarmBee · Prototype</div>
        </footer>
      </main>
    </div>
  );
}

export default LandingPage;
