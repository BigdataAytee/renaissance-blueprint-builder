import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/site/Layout";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { adminExists } from "@/lib/cms/auth.functions";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
  head: () => ({
    meta: [
      { title: "Admin Sign In — Dynamic Renaissance" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
});

function AuthPage() {
  const navigate = useNavigate();
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  // Once an administrator exists, public sign-up closes and this is a sign-in
  // page only. Assume it is closed until proven otherwise.
  const { data: hasAdmin = true } = useQuery({
    queryKey: ["admin-exists"],
    queryFn: () => adminExists(),
    staleTime: 5 * 60 * 1000,
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/admin" });
    });
  }, [navigate]);

  useEffect(() => {
    if (hasAdmin) setMode("signin");
  }, [hasAdmin]);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        if (hasAdmin) throw new Error("Sign-up is closed. Ask an administrator for an invite.");
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + "/admin" },
        });
        if (error) throw error;
        toast.success("Account created. You can now sign in.");
        setMode("signin");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        await router.invalidate();
        navigate({ to: "/admin" });
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-[70vh] grid place-items-center py-24">
        <form onSubmit={handle} className="w-full max-w-md p-8 rounded-lg border border-border bg-background shadow-sm space-y-5">
          <div>
            <div className="eyebrow">Admin</div>
            <h1 className="mt-2 text-2xl font-extrabold">
              {mode === "signin" ? "Sign in to the dashboard" : "Create the first admin account"}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {mode === "signup" ? "The first account created becomes the site administrator." : "Only authorised administrators can access the CMS."}
            </p>
          </div>

          <label className="block">
            <span className="text-sm font-medium">Email</span>
            <input
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              autoComplete="email"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium">Password</span>
            <input
              type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
            />
          </label>

          <button disabled={loading} className="btn-green w-full justify-center">
            {loading ? "Please wait..." : mode === "signin" ? "Sign in" : "Create account"}
          </button>

          {!hasAdmin && (
            <div className="text-center text-sm text-muted-foreground">
              {mode === "signin" ? (
                <button type="button" onClick={() => setMode("signup")} className="underline">
                  Set up the first admin account
                </button>
              ) : (
                <button type="button" onClick={() => setMode("signin")} className="underline">
                  Already have an account? Sign in
                </button>
              )}
            </div>
          )}
        </form>
      </div>
    </Layout>
  );
}
