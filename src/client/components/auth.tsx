import { useState } from "react";
import { auth } from "../lib/auth";
import { Button } from "./ui/button";

export function Auth() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    setIsPending(true);
    setError(null);
    try {
      await auth.signIn.social({
        provider: "google",
        callbackURL: window.location.origin,
      });
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.");
      setIsPending(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background px-4">
      {/* Decorative background blobs */}
      <div className="absolute top-1/4 left-1/4 -z-10 h-72 w-72 rounded-full bg-primary/10 blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 -z-10 h-80 w-80 rounded-full bg-ring/15 blur-[140px] animate-pulse" />
      
      {/* Grid overlay for a techy developer feel */}
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />

      {/* Main card */}
      <div className="w-full max-w-[400px] border border-border bg-card/50 p-8 backdrop-blur-md shadow-2xl relative transition-all duration-300 hover:border-ring/30">
        
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-ring to-primary" />

        {/* Brand header */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center border border-border bg-background font-mono text-xl font-bold tracking-tight shadow-md hover:border-ring transition-colors">
            C
          </div>
          <h1 className="font-mono text-2xl font-bold tracking-wider text-foreground">
            COMENT
          </h1>
          <p className="mt-2 text-xs text-muted-foreground max-w-[280px]">
            A developer-first comment & task collaboration tool.
          </p>
        </div>

        {/* Action area */}
        <div className="flex flex-col gap-4">
          <Button
            onClick={handleSignIn}
            disabled={isPending}
            variant="outline"
            className="h-11 w-full rounded-none border-border font-mono hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-200 flex items-center justify-center gap-3 active:scale-[0.98]"
          >
            {isPending ? (
              <svg
                className="animate-spin h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : (
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
            )}
            <span className="font-semibold">Continue with Google</span>
          </Button>

          {error && (
            <div className="border border-destructive/20 bg-destructive/10 px-3 py-2 text-[11px] text-destructive font-mono mt-2">
              {error}
            </div>
          )}
        </div>

        {/* Footer/Terms */}
        <div className="mt-8 text-center text-[10px] text-muted-foreground font-mono">
          By signing in, you agree to our Terms and Privacy Policy.
        </div>
      </div>
    </div>
  );
}
