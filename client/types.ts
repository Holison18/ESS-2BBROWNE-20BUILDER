export type ProjectCategory = "Interior" | "Exterior";

export type ExteriorSubCategory =
  | "Residential"
  | "Commercial"
  | "Mixed Use"
  | "Hospitality"
  | "Educational"
  | "Health"
  | "Recreational"
  | "Industrial";

export type InteriorSubCategory = "Public" | "Private";

export type ProjectStatus = "completed" | "ongoing" | "not-started";

// Shared Project Interface matching Supabase DB
export interface Project {
  id: number;
  created_at?: string;
  title: string;
  tagline?: string; // New tagline field
  category: string; // This stores the SubCategory string (e.g. "Residential")
  // We infer Main Category from the specific Category string
  location?: string;
  year?: string;
  role?: string;
  approx_area?: string;
  status: ProjectStatus;
  description: string;
  image_url: string;
  gallery_urls?: string[];
  actual_gallery_urls?: string[];
  drawings?: { url: string; description: string }[];
}

export const CATEGORY_MAP: Record<ProjectCategory, string[]> = {
  Exterior: [
    "Residential",
    "Commercial",
    "Mixed Use",
    "Hospitality",
    "Educational",
    "Health",
    "Recreational",
    "Industrial",
  ],
  Interior: ["Public", "Private"],
};

// Helper to determine Main Category from a Sub Category
export function getMainCategory(
  subCategory: string,
): ProjectCategory | "Other" {
  if (CATEGORY_MAP.Exterior.includes(subCategory)) return "Exterior";
  if (CATEGORY_MAP.Interior.includes(subCategory)) return "Interior";
  return "Other";
}
