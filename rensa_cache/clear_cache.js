import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minut = data anses färsk
      cacheTime: 1000 * 60 * 5, // 5 minuter = tas bort från cache om ingen komponent använder den
    },
  },
});

export default queryClient;
