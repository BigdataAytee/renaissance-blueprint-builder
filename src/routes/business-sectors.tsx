import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/business-sectors")({
  component: () => <Outlet />,
});
