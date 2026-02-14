import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import PuzzlePage from "@/pages/PuzzlePage";
import ProposalPage from "@/pages/ProposalPage";
import SuccessPage from "@/pages/SuccessPage";
import { AppProvider } from "@/contexts/AppContext";

function Router() {
  return (
    <Switch>
      <Route path="/" component={PuzzlePage} />
      <Route path="/proposal" component={ProposalPage} />
      <Route path="/success" component={SuccessPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <Toaster />
        <Router />
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;
