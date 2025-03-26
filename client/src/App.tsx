import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import { useState } from "react";
import { AppIdea } from "@shared/schema";

function Router() {
  const [savedIdeas, setSavedIdeas] = useState<AppIdea[]>([]);
  
  return (
    <Switch>
      <Route path="/">
        <Home savedIdeas={savedIdeas} setSavedIdeas={setSavedIdeas} />
      </Route>
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
