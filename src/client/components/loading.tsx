export function Loading() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background px-4">
      {/* Decorative background blobs */}
      <div className="absolute top-1/4 left-1/4 -z-10 h-72 w-72 rounded-full bg-primary/10 blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 -z-10 h-80 w-80 rounded-full bg-ring/15 blur-[140px] animate-pulse" />
      
      {/* Grid overlay for techy developer theme */}
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />

      <div className="flex flex-col items-center gap-4 text-center">
        {/* Techy pulse loader */}
        <div className="relative flex h-16 w-16 items-center justify-center">
          {/* Outermost ring */}
          <div className="absolute inset-0 rounded-full border border-primary/20 animate-ping opacity-75" />
          {/* Middle spinning ring */}
          <div className="absolute h-10 w-10 rounded-full border border-t-ring border-r-transparent border-b-transparent border-l-transparent animate-spin" />
          {/* Core square */}
          <div className="h-4 w-4 border border-foreground bg-foreground/10" />
        </div>

        {/* Loading text with terminal-like subheader */}
        <div className="mt-2 flex flex-col items-center gap-1 font-mono">
          <span className="text-sm font-bold tracking-wider text-foreground uppercase animate-pulse">
            Loading
          </span>
          <span className="text-[10px] text-muted-foreground tracking-widest uppercase">
            Initializing session...
          </span>
        </div>
      </div>
    </div>
  );
}
