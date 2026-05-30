import { getInitials } from "@/lib/utils";
import { SignOut, UserIcon } from "@phosphor-icons/react";
import { auth } from "../lib/auth";
import { TodoContainer } from "./todo/todo-container";
import { Button } from "./ui/button";

export function Protected() {
  const session = auth.useSession();
  const user = session.data?.user;

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (err) {
      console.error("Failed to sign out:", err);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background">
      {/* Decorative background blobs */}
      <div className="absolute top-[-10%] left-[-10%] -z-10 h-96 w-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] -z-10 h-[500px] w-[500px] rounded-full bg-ring/10 blur-[150px] pointer-events-none" />

      {/* Grid overlay */}
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_80%,transparent_100%)] opacity-20" />

      {/* Header bar */}
      <header className="border-b border-border bg-card/25 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto flex max-w-5xl h-14 items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center border border-border bg-background font-mono text-sm font-bold tracking-tight shadow-sm">
              C
            </div>
            <span className="font-mono text-sm font-bold tracking-wider text-foreground">
              COMENT
            </span>
          </div>

          {/* User profile & logout */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              {/* Avatar */}
              {user?.image ? (
                <img
                  src={user.image}
                  alt={user.name || "User profile"}
                  className="h-7 w-7 rounded-none border border-border object-cover shadow-sm"
                />
              ) : (
                <div className="flex h-7 w-7 items-center justify-center border border-border bg-muted/30 font-mono text-[10px] font-bold text-muted-foreground shadow-sm">
                  {getInitials(user?.name) || (
                    <UserIcon className="h-3.5 w-3.5" />
                  )}
                </div>
              )}

              {/* User details (hidden on small devices) */}
              <div className="hidden sm:flex flex-col text-left font-mono">
                <span className="text-[10px] font-bold text-foreground leading-tight">
                  {user?.name || "Developer"}
                </span>
                <span className="text-[9px] text-muted-foreground leading-none">
                  {user?.email || ""}
                </span>
              </div>
            </div>

            {/* Logout button */}
            <Button
              onClick={handleLogout}
              variant="outline"
              size="xs"
              className="h-7 gap-1.5 rounded-none border-border font-mono text-[10px] hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 transition-all duration-150"
            >
              <SignOut className="h-3 w-3" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main dashboard content */}
      <main className="mx-auto flex-1 w-full max-w-xl py-12 px-4 sm:px-6 relative z-10">
        <div className="flex flex-col gap-8">
          {/* Section header */}
          <div className="flex flex-col gap-2 border-l-2 border-primary pl-4 py-1">
            <h2 className="font-mono text-lg font-bold tracking-tight text-foreground uppercase">
              Task Workspace
            </h2>
            <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
              Manage developer tasks & comment streams
            </p>
          </div>

          {/* Todo card wrapper */}
          <div className="border border-border bg-card/30 p-6 backdrop-blur-md shadow-xl relative">
            {/* Top decorative gradient line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-primary via-ring to-primary" />

            {/* Todo application controller */}
            <TodoContainer />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-4 mt-auto">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest">
            COMENT &copy; {new Date().getFullYear()} &middot; Dev Workspace
          </span>
        </div>
      </footer>
    </div>
  );
}
