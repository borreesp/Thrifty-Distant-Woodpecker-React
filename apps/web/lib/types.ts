export type LookupItem = {
  id: number;
  code: string;
  name: string;
  description?: string | null;
  sort_order?: number | null;
};

export type MovementMuscle = {
  muscle_group: string;
  is_primary: boolean;
};

export type Movement = {
  id: number;
  name: string;
  category?: string | null;
  description?: string | null;
  default_load_unit?: string | null;
  video_url?: string | null;
  muscles: MovementMuscle[];
};

export type WorkoutBlockMovement = {
  id: number;
  movement_id: number;
  position: number;
  reps?: number | null;
  load?: number | null;
  load_unit?: string | null;
  distance_meters?: number | null;
  duration_seconds?: number | null;
  calories?: number | null;
  movement?: Movement | null;
};

export type WorkoutBlock = {
  id: number;
  workout_id: number;
  position: number;
  block_type?: string | null;
  title?: string | null;
  description?: string | null;
  duration_seconds?: number | null;
  rounds?: number | null;
  notes?: string | null;
  movements: WorkoutBlockMovement[];
};

export type Workout = {
  id: number;
  title: string;
  description: string;
  domain?: string | null;
  intensity?: string | null;
  hyrox_transfer?: string | null;
  wod_type: string;
  version?: number | null;
  is_active?: boolean | null;
  session_load?: string | null;
  session_feel?: string | null;
  estimated_difficulty?: number | null;
  main_muscle_chain?: string | null;
  avg_time_seconds?: number | null;
  avg_rating?: number | null;
  avg_difficulty?: number | null;
  rating_count?: number | null;
  official_tag?: string | null;
   capacities?: { capacity: string; value: number; note: string }[];
   level_times?: { athlete_level: string; time_minutes: number; time_range: string }[];
   hyrox_stations?: { station: string; transfer_pct: number }[];
   muscles?: string[];
   equipment_ids?: number[];
   similar_workout_ids?: number[];
  blocks?: WorkoutBlock[];
};

export type WorkoutStats = {
  workout_id: number;
  title?: string | null;
  estimated_difficulty?: number | null;
  avg_time_seconds?: number | null;
  avg_rating?: number | null;
  avg_difficulty?: number | null;
  rating_count?: number | null;
};

export type TrainingLoad = {
  id: number;
  user_id: number;
  load_date: string;
  acute_load?: number | null;
  chronic_load?: number | null;
  load_ratio?: number | null;
  notes?: string | null;
};

export type CapacityProfileItem = {
  id: number;
  user_id: number;
  capacity_code: string;
  capacity_name?: string | null;
  value: number;
  measured_at: string;
};

export type LookupTables = {
  athlete_levels: LookupItem[];
  intensity_levels: LookupItem[];
  energy_domains: LookupItem[];
  physical_capacities: LookupItem[];
  muscle_groups: LookupItem[];
  hyrox_stations: LookupItem[];
};

export type AuthUser = {
  id: number;
  name: string;
  email: string;
};

export type AuthResponse = {
  user: AuthUser;
  tokens?: {
    access_token: string;
    refresh_token: string;
  };
};

export type RefreshResponse = {
  access_token: string;
  refresh_token?: string | null;
};
