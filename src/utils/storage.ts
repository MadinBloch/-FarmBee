import {
  SEED_USERS,
  SEED_FARMS,
  SEED_REQUESTS,
  SEED_BEEKEEPERS,
} from '@/data/seedData';
import type {
  User,
  Farm,
  Request,
  BeekeeperProfile,
  Session,
} from '@/types';

const KEYS = {
  users: 'farmbee_users',
  farms: 'farmbee_farms',
  requests: 'farmbee_requests',
  beekeepers: 'farmbee_beekeepers',
  session: 'farmbee_session',
  initialized: 'farmbee_initialized',
} as const;

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function initializeStorage(): void {
  const initialized = localStorage.getItem(KEYS.initialized);
  if (!initialized) {
    resetDemoData();
  }
}

export function resetDemoData(): void {
  write(KEYS.users, SEED_USERS);
  write(KEYS.farms, SEED_FARMS);
  write(KEYS.requests, SEED_REQUESTS);
  write(KEYS.beekeepers, SEED_BEEKEEPERS);
  localStorage.setItem(KEYS.initialized, 'true');
}

export function getUsers(): User[] {
  return read<User[]>(KEYS.users, []);
}

export function getUserById(id: string): User | undefined {
  return getUsers().find((u) => u.id === id);
}

export function updateUser(user: User): void {
  const users = getUsers().map((u) => (u.id === user.id ? user : u));
  write(KEYS.users, users);
}

export function getFarms(): Farm[] {
  return read<Farm[]>(KEYS.farms, []);
}

export function getFarmById(id: string): Farm | undefined {
  return getFarms().find((f) => f.id === id);
}

export function getFarmsByFarmer(farmerId: string): Farm[] {
  return getFarms().filter((f) => f.farmerId === farmerId);
}

export function saveFarm(farm: Farm): void {
  const farms = getFarms();
  farms.push(farm);
  write(KEYS.farms, farms);
}

export function updateFarm(farm: Farm): void {
  const farms = getFarms().map((f) => (f.id === farm.id ? farm : f));
  write(KEYS.farms, farms);
}

export function getRequests(): Request[] {
  return read<Request[]>(KEYS.requests, []);
}

export function getRequestById(id: string): Request | undefined {
  return getRequests().find((r) => r.id === id);
}

export function getRequestsByFarmer(farmerId: string): Request[] {
  return getRequests().filter((r) => r.farmerId === farmerId);
}

export function getRequestsByBeekeeper(beekeeperId: string): Request[] {
  return getRequests().filter((r) => r.beekeeperId === beekeeperId);
}

export function createRequest(request: Request): void {
  const requests = getRequests();
  requests.push(request);
  write(KEYS.requests, requests);

  const farm = getFarmById(request.farmId);
  if (farm && farm.status === 'available') {
    updateFarm({ ...farm, status: 'requested' });
  }
}

export function updateRequest(request: Request): void {
  const requests = getRequests().map((r) => (r.id === request.id ? request : r));
  write(KEYS.requests, requests);

  if (request.status === 'accepted') {
    const farm = getFarmById(request.farmId);
    if (farm) {
      updateFarm({ ...farm, status: 'booked' });
    }
  }
}

export function getBeekeeperProfile(userId: string): BeekeeperProfile | undefined {
  return getBeekeepers().find((b) => b.userId === userId);
}

export function getBeekeepers(): BeekeeperProfile[] {
  return read<BeekeeperProfile[]>(KEYS.beekeepers, []);
}

export function updateBeekeeperProfile(profile: BeekeeperProfile): void {
  const profiles = getBeekeepers().map((b) =>
    b.userId === profile.userId ? profile : b
  );
  write(KEYS.beekeepers, profiles);
}

export function getCurrentUser(): User | null {
  const session = read<Session | null>(KEYS.session, null);
  if (!session) return null;
  return getUserById(session.userId) ?? null;
}

export function setCurrentUser(user: User): void {
  write<Session>(KEYS.session, { userId: user.id, role: user.role });
}

export function logout(): void {
  localStorage.removeItem(KEYS.session);
}

export function login(mobile: string, password: string): User | null {
  const user = getUsers().find(
    (u) => u.mobile === mobile && u.password === password
  );
  if (user) {
    setCurrentUser(user);
    return user;
  }
  return null;
}

export function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}
