import { createFileRoute, Outlet } from "@tanstack/react-router";

// Pass-through layout so /projects and /projects/$slug are separate pages.
// Without it the list route is the parent of the detail route and, having no
// <Outlet />, renders the list on every detail URL.
export const Route = createFileRoute("/projects")({
  component: () => <Outlet />,
});
