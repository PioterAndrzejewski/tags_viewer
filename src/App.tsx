import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <h1 className='text-3xl'>this is app componen with working tailwind</h1>
      </div>
    </QueryClientProvider>
  );
}

export default App;
