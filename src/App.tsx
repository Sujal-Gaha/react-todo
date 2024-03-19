import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TodoContainer } from "./components/TodoContainer";
import { TodoListProvider } from "./store/todo-list";
import { TodoDetail } from "./components/TodoDetail";
import { HomePage } from "./components/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/todos",
    element: (
      <TodoListProvider>
        <TodoContainer />
      </TodoListProvider>
    ),
  },
  {
    path: "/todos/:id",
    element: (
      <TodoListProvider>
        <TodoDetail />
      </TodoListProvider>
    ),
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
