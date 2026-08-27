import { createFileRoute, Outlet } from "@tanstack/react-router";

// Pass-through layout so /news and /news/$slug are separate pages — see the
// note in projects.tsx.
export const Route = createFileRoute("/news")({
  component: () => <Outlet />,
});
