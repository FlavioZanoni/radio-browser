import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { RadioBrowser } from "./RadioBrowser"

function App() {
  const queryClient = new QueryClient()

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RadioBrowser />
      </QueryClientProvider>
    </>
  )
}

export default App
