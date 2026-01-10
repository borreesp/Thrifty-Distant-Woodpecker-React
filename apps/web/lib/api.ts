import {
  CapacityProfileItem,
  LookupTables,
  Movement,
  TrainingLoad,
  Workout,
  WorkoutBlock,
  WorkoutStats,
  AuthResponse,
  RefreshResponse,
  AthleteProfileResponse,
  CareerSnapshot,
  Achievement,
  Mission,
  Benchmark,
  WorkoutAnalysis,
  Equipment,
  WorkoutResult,
  WorkoutResultWithXp,
  WorkoutCreatePayload,
  ApplyWorkoutImpactResponse
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

  async createWorkout(payload: WorkoutCreatePayload): Promise<Workout> {
    return fetchJson<Workout>("/workouts", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  },

  async getWorkoutStructure(id: string | number): Promise<Workout> {
    return fetchJson<Workout>(`/workouts/${id}/structure`);
  },

  async getWorkoutBlocks(id: string | number): Promise<WorkoutBlock[]> {
    return fetchJson<WorkoutBlock[]>(`/workouts/${id}/blocks`);
  },

  async getWorkoutSimilar(id: string | number): Promise<Workout[]> {
    return fetchJson<Workout[]>(`/workouts/${id}/similar`);
  },

  async getWorkoutResults(id: string | number): Promise<WorkoutResult[]> {
    return fetchJson<WorkoutResult[]>(`/workout-results/workout/${id}`);
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
    return fetchJson<Equipment[]>("/equipment");
  },

  async getAthleteProfile(): Promise<AthleteProfileResponse> {
    return fetchJson<AthleteProfileResponse>("/athlete/profile");
  },

  async getAthleteCareer(): Promise<CareerSnapshot> {
    return fetchJson<CareerSnapshot>("/athlete/career");
  },

  async getAthleteAchievements(): Promise<Achievement[]> {
    return fetchJson<Achievement[]>("/athlete/achievements");
  },

  async getAthleteMissions(): Promise<Mission[]> {
    return fetchJson<Mission[]>("/athlete/missions");
  },

  async getAthleteBenchmarks(): Promise<Benchmark[]> {
    return fetchJson<Benchmark[]>("/athlete/benchmarks");
  },

  async getWorkoutAnalysis(id: string | number): Promise<WorkoutAnalysis> {
    return fetchJson<WorkoutAnalysis>(`/workouts/${id}/analysis`);
  },

  async analyzeWorkoutPayload(payload: WorkoutCreatePayload): Promise<WorkoutAnalysis> {
    return fetchJson<WorkoutAnalysis>("/workout-analysis", {
      method: "POST",
      body: JSON.stringify(payload)
    });
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
  },

  async submitWorkoutResult(
    workoutId: string | number,
    payload: { time_seconds: number; difficulty?: number; rating?: number; comment?: string }
  ): Promise<WorkoutResultWithXp> {
    return fetchJson<WorkoutResultWithXp>(`/athlete/workouts/${workoutId}/result`, {
      method: "POST",
      body: JSON.stringify(payload)
    });
  },

  async applyWorkoutImpact(
    workoutId: string | number,
    payload: { analysis_id?: number | string } = {}
  ): Promise<ApplyWorkoutImpactResponse> {
    return fetchJson<ApplyWorkoutImpactResponse>(`/athlete/workouts/${workoutId}/apply-impact`, {
      method: "POST",
      body: JSON.stringify(payload)
    });
  }
};
