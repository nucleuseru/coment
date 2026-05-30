import { QueryClientProvider } from "@tanstack/react-query";
import { Auth } from "./components/auth";
import { Loading } from "./components/loading";
import { Protected } from "./components/protected";
import { auth } from "./lib/auth";
import { queryClient } from "./lib/query-client";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

function AppContent() {
  const session = auth.useSession();

  if (session.isPending) return <Loading />;
  if (!session.data) return <Auth />;
  return <Protected />;
}
