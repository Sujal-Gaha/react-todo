import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  TTodoCreateOutput,
  TCreateTodoInput,
  TGetAllTodosOutput,
} from "../type";
import { NotificationBar } from "./NotificationBar";

export function TodoContainer() {
  const qc = useQueryClient();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // const [showNotification, setShowNotification] = useState<{
  //   type: "error" | "success" | "null";
  //   message: string;
  // }>({
  //   type: "null",
  //   message: "",
  // });

  const [showNotification, setShowNotification] = useState(false);

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
      // setShowNotification({
      //   type: "success",
      //   message: data.message,
      // });

      // we can invalidate the query that fetch the todos data
      qc.invalidateQueries({
        queryKey: ["/api/v1/todos"],
      });

      setTitle("");
      setDescription("");
    },
    onError: (error) => {
      console.log("error", error);
      // setShowNotification({
      //   type: "error",
      //   message: error.message || "Failed to create todo",
      // });
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
    <div
      style={{
        backgroundColor: "#111827",
        width: "100vh",
        margin: "0 auto",
        borderRadius: "18px",
      }}
    >
      {/* {showNotification.type === "null" ? null : <NotificationTab />} */}
      {showNotification ? <NotificationBar /> : null}
      <h1
        style={{
          textAlign: "center",
          paddingTop: "50px",
          color: "white",
        }}
      >
        My Todos
      </h1>

      {/* form container */}
      <div id="form_container">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleAddTodo();
          }}
          style={{
            margin: "40px 120px",
            textAlign: "center",
          }}
        >
          {/* title */}
          <input
            name="title"
            value={title}
            placeholder="Enter Title"
            required
            onChange={(event) => {
              const value = event.target.value;
              setTitle(value);
            }}
            style={{
              width: "99%",
              borderRadius: "20px",
              height: "40px",
              marginBottom: "10px",
            }}
          />{" "}
          <br />
          {/* description */}
          <input
            value={description}
            name="description"
            placeholder="Enter Description"
            required
            onChange={(event) => {
              const value = event.target.value;
              setDescription(value);
            }}
            style={{
              width: "99%",
              borderRadius: "20px",
              height: "40px",
              marginBottom: "10px",
            }}
          />
          <br />
          <button
            type="submit"
            style={{
              width: "100%",
              height: "35px",
              borderRadius: "20px",
              backgroundColor: "springgreen",
              cursor: "pointer",
            }}
            onClick={() => {
              if (title && description) {
                setShowNotification(true);
                setTimeout(() => {
                  setShowNotification(false);
                }, 4000);
              }
            }}
          >
            Add
          </button>
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
                width: "100vh",
                margin: "10px 120px",
                borderRadius: "18px",
                backgroundColor: "#1f2937",
              }}
            >
              <h2>Tittle: {todo.title}</h2>
              <p>Description: {todo.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
