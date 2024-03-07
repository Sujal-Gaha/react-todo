import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

type TTodo = {
  __v: string;
  _id: string;
  createdAt: string;
  description: string;
  isDone: string;
  title: string;
  updatedAt: string;
};

type TTodoCreateOutput = {
  data: TTodo;
  message: string;
  statusCode: 201;
  success: boolean;
};

type TCreateTodoInput = { title: string; description: string };

type TGetAllTodosOutput = {
  data: TTodo[];
  message: string;
  statusCode: 200;
  success: boolean;
};

export function TodoContainer() {
  const qc = useQueryClient();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [showNotification, setShowNotification] = useState<{
    type: "error" | "success" | "null";
    message: string;
  }>({
    type: "null",
    message: "",
  });

  const addTodoMutation = useMutation<
    TTodoCreateOutput,
    Error,
    TCreateTodoInput
  >({
    mutationFn: async (body) => {
      const resp = await fetch("http://localhost:8080/api/v1/todos/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: body.title,
          description: body.description,
        }),
      });
      const data = await resp.json();

      return data;
    },
    onSuccess: (data) => {
      console.log("sucess", data);
      setShowNotification({
        type: "success",
        message: data.message,
      });

      // we can invalidate the query that fetch the todos data
      qc.invalidateQueries({
        queryKey: ["/api/v1/todos"],
      });

      setTitle("");
      setDescription("");
    },
    onError: (error) => {
      console.log("error", error);
      setShowNotification({
        type: "error",
        message: error.message || "Failed to create todo",
      });
    },
  });

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

  const handleAddTodo = async () => {
    console.log("adding", title, description);
    /** backend api call */
    await addTodoMutation.mutateAsync({
      title: title,
      description: description,
    });
  };

  if (isLoading) {
    return <p>Loading todos...</p>;
  }

  if (isError) {
    return <p>Loading todos errors: {error.message || ""}</p>;
  }

  return (
    <div>
      <h1>My Todos</h1>

      {showNotification.type === "null" ? null : (
        <div
          id="notification"
          className={
            showNotification.type === "error" ? "text-red" : "text-green"
          }
        >
          {showNotification.message}
        </div>
      )}

      {/* form container */}
      <div id="form_container">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleAddTodo();
          }}
        >
          {/* title */}
          <label htmlFor="title">
            Title
            <input
              name="title"
              id="title"
              value={title}
              onChange={(event) => {
                const value = event.target.value;
                setTitle(value);
              }}
            />
          </label>
          {/* description */}
          <label htmlFor="description">
            Description
            <textarea
              value={description}
              name="description"
              id="description"
              onChange={(event) => {
                const value = event.target.value;
                setDescription(value);
              }}
            ></textarea>
          </label>

          <button type="submit">Add</button>
        </form>
      </div>

      {/* list of todos */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {data?.data.map((todo) => {
          return (
            <div
              key={todo._id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
              }}
            >
              <p>Tittle: {todo.title}</p>
              <p>Description: {todo.description}</p>
              <p>Is Completed: {todo.isDone}</p>
              <p>Created At: {todo.createdAt}</p>
              <p>Updated At: {todo.updatedAt}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}