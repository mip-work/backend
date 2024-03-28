import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClient, QueryClientProvider, useQueryClient } from "@tanstack/react-query";

const client = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

// export const useClearQueryClient = () => {
//   const queryClient = useQueryClient();
//   queryClient.clear()
//   DÉBITO TÉCNICO
// }

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
