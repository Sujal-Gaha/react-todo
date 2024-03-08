import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TGetAllTodosOutput } from "../type";
import styles from "./TodoCard.module.css";
import { MdDelete, MdEdit } from "react-icons/md";

export function TodoCard() {
  const qc = useQueryClient();

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

  const deleteTodoMutation = useMutation({
    mutationFn: async (todoId: string) => {
      const res = await fetch(`http://localhost:8080/api/v1/todos/${todoId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      qc.invalidateQueries({
        queryKey: ["/api/v1/todos"],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleDeleteTodoBtnClick = async (todoId: string) => {
    console.log("handleDeleteTodoBtnClick function called", todoId);
    await deleteTodoMutation.mutateAsync(todoId);
  };

  if (isLoading) return <p>Loading todos...</p>;
  if (isError) return <p>Loading todos errors: {error.message || ""}</p>;

  return (
    <div className={styles.cardContainer}>
      {data?.data.map((todo) => {
        return (
          <div key={todo._id} className={styles.card}>
            <div className={styles.buttons}>
              <MdEdit className={styles.button} />
              <MdDelete
                className={styles.button}
                onClick={() => {
                  console.log("Delete button clicked");
                  handleDeleteTodoBtnClick(todo._id);
                }}
              />
            </div>
            <div className={styles.content}>
              <h2>Title: {todo.title}</h2>
              <p>Description: {todo.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
