import schema from "../ui/movement_ui_schema.json";
import type { Movement } from "./types";

type FieldKey = "reps" | "load" | "unit" | "distance_meters" | "calories" | "duration_seconds" | "target_time_seconds";

export type MovementUIConfig = {
  showReps: boolean;
  showLoad: boolean;
  showUnit: boolean;
  showDistance: boolean;
  showCalories: boolean;
  showDuration: boolean;
  showTargetTime: boolean;
};

const defaultConfig = (overrides: Partial<MovementUIConfig> = {}): MovementUIConfig => ({
  showReps: true,
  showLoad: true,
  showUnit: true,
  showDistance: true,
  showCalories: true,
  showDuration: true,
  showTargetTime: false,
  ...overrides
});

const normalizeCategory = (category?: string) => (category ?? "").toLowerCase();

const hasField = (list: FieldKey[], key: FieldKey) => list.includes(key);

export const getUIConfigForMovement = (movement: Movement): MovementUIConfig => {
  const fields = (schema as Record<string, FieldKey[]>)[movement.name ?? ""] as FieldKey[] | undefined;

  const category = normalizeCategory(movement.category);
  const supportsLoad = Boolean(movement.default_load_unit);

  if (fields) {
    return defaultConfig({
      showReps: hasField(fields, "reps"),
      showLoad: hasField(fields, "load") && supportsLoad,
      showUnit: hasField(fields, "unit") && supportsLoad,
      showDistance: hasField(fields, "distance_meters"),
      showCalories: hasField(fields, "calories"),
      showDuration: hasField(fields, "duration_seconds"),
      showTargetTime: hasField(fields, "target_time_seconds")
    });
  }

  if (category.includes("cardio")) {
    return defaultConfig({
      showReps: false,
      showLoad: false,
      showUnit: false,
      showDistance: true,
      showCalories: true,
      showDuration: true,
      showTargetTime: true
    });
  }

  if (category.includes("strength") || category.includes("fuerza")) {
    return defaultConfig({
      showReps: true,
      showLoad: supportsLoad,
      showUnit: supportsLoad,
      showDistance: false,
      showCalories: false,
      showDuration: false,
      showTargetTime: false
    });
  }

  if (category.includes("gimn")) {
    return defaultConfig({
      showReps: true,
      showLoad: false,
      showUnit: false,
      showDistance: false,
      showCalories: false,
      showDuration: false,
      showTargetTime: false
    });
  }

  if (category.includes("metcon")) {
    return defaultConfig({
      showReps: true,
      showLoad: supportsLoad,
      showUnit: supportsLoad,
      showDistance: !supportsLoad,
      showCalories: !supportsLoad,
      showDuration: true,
      showTargetTime: supportsLoad ? false : true
    });
  }

  return defaultConfig({
    showLoad: supportsLoad,
    showUnit: supportsLoad,
    showTargetTime: false
  });
};
