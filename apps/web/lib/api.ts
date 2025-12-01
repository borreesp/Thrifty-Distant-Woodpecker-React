import {
  CapacityProfileItem,
  LookupTables,
  Movement,
  TrainingLoad,
  Workout,
  WorkoutBlock,
  WorkoutStats,
  AuthResponse,
  RefreshResponse
} from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

async function fetchJson<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  if (!res.ok) {
    throw new Error(`Request failed (${res.status}): ${path}`);
  }

  return res.json() as Promise<T>;
}

export const api = {
  async getWorkouts(): Promise<Workout[]> {
    return fetchJson<Workout[]>("/workouts");
  },

  async getWorkout(id: string | number): Promise<Workout> {
    return fetchJson<Workout>(`/workouts/${id}`);
  },

  async getWorkoutStructure(id: string | number): Promise<Workout> {
    return fetchJson<Workout>(`/workouts/${id}/structure`);
  },

  async getWorkoutBlocks(id: string | number): Promise<WorkoutBlock[]> {
    return fetchJson<WorkoutBlock[]>(`/workouts/${id}/blocks`);
  },

  async getWorkoutVersions(id: string | number): Promise<Workout[]> {
    return fetchJson<Workout[]>(`/workouts/${id}/versions`);
  },

  async getWorkoutStats(): Promise<WorkoutStats[]> {
    return fetchJson<WorkoutStats[]>("/workouts/stats");
  },

  async getMovements(): Promise<Movement[]> {
    return fetchJson<Movement[]>("/movements");
  },

  async getTrainingLoad(userId: string | number): Promise<TrainingLoad[]> {
    return fetchJson<TrainingLoad[]>(`/users/${userId}/training-load`);
  },

  async getCapacityProfile(userId: string | number): Promise<{
    user_id: number;
    capacities: CapacityProfileItem[];
  }> {
    return fetchJson(`/users/${userId}/capacity-profile`);
  },

  async getLookupTables(): Promise<LookupTables> {
    return fetchJson<LookupTables>("/lookups");
  },

  async getEquipment() {
    return fetchJson("/equipment");
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    return fetchJson<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    });
  },

  async register(name: string, email: string, password: string): Promise<AuthResponse> {
    return fetchJson<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password })
    });
  },

  async refresh(): Promise<RefreshResponse> {
    return fetchJson<RefreshResponse>("/auth/refresh", { method: "POST" });
  },

  async logout(): Promise<void> {
    await fetchJson("/auth/logout", { method: "POST" });
  },

  async me(): Promise<AuthResponse> {
    return fetchJson<AuthResponse>("/auth/me");
  }
};
