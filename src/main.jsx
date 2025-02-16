import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.jsx";

import { ChakraProvider } from '@chakra-ui/react'
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(

    <QueryClientProvider client={queryClient}>
       <ChakraProvider>
      <App />
      </ChakraProvider>
    </QueryClientProvider>

);
