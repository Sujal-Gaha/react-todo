import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TodoContainer } from "./components/TodoContainer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TodoContainer />,
  },
  {
    path: "/about",
    element: <p>i am about page</p>,
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;