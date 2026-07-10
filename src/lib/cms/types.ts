export type Vacancy = {
  id: string;
  title: string;
  location: string;
  employment_type: string;
  description: string;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type NewsPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body_md: string;
  cover_url: string | null;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type EventItem = {
  id: string;
  slug: string;
  title: string;
  starts_at: string;
  ends_at: string | null;
  location: string;
  description: string;
  cover_url: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type GalleryImage = {
  id: string;
  image_url: string;
  caption: string;
  sort_order: number;
  is_published: boolean;
  created_at: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo_url: string | null;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  category: string;
  location: string;
  timeline: string;
  client: string;
  value: string;
  summary: string;
  image_url: string | null;
  overview: string;
  scope: string[];
  outcomes: string[];
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

// Untyped table accessor — Database types are auto-generated later.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const tbl = (client: any, name: string) => client.from(name);
