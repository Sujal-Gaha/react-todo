import { useQuery } from "@tanstack/react-query";
import { TGetAllTodosOutput } from "../type";
import styles from "./TodoCard.module.css";

export function TodoCard() {
  const { data, isLoading, isError, error } = useQuery<
    TGetAllTodosOutput,
    Error
  >({
    queryKey: ["/api/v1/todos"],
    queryFn: async () => {
      const resp = await fetch("http://localhost:8080/api/v1/todos", {
        method: "GET",
        headers: {
          "content-Type": "application/json",
        },
      });
      const data = await resp.json();
      return data;
    },
  });

  if (isLoading) return <p>Loading todos...</p>;
  if (isError) return <p>Loading todos errors: {error.message || ""}</p>;

  return (
    <div className={styles.cardContainer}>
      {data?.data.map((todo) => {
        return (
          <div key={todo._id} className={styles.card}>
            <h2>Tittle: {todo.title}</h2>
            <p>Description: {todo.description}</p>
          </div>
        );
      })}
    </div>
  );
}
