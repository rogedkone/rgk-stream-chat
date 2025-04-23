import { createRoot } from "react-dom/client";
import { StoreProvider } from "./store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./app/index.css";
import { App } from "./app";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StoreProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StoreProvider>
);
