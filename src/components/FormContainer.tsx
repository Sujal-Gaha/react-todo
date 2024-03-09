import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { TCreateTodoInput, TTodoCreateOutput } from "../type";
import { NotificationBar } from "./NotificationBar";
import styles from "./FormContainer.module.css";

export function FormContainer() {
  const qc = useQueryClient();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [isAddingModalOpen, setIsAddingModalOpen] = useState<boolean>(false);

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
      qc.invalidateQueries({
        queryKey: ["/api/v1/todos"],
      });

      setTitle("");
      setDescription("");
    },
    onError: (error) => {
      console.log("error", error);
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
  return (
    <>
      {showNotification ? <NotificationBar /> : null}
      <h1 className={styles.header}>My Todos</h1>
      <form
        className={styles.formElement}
        onSubmit={(event) => {
          if (title && description) {
            event.preventDefault();
            setIsAddingModalOpen(true);
            setTimeout(() => {
              handleAddTodo();
              setIsAddingModalOpen(false);
              setShowNotification(true);
            }, 2500);
            setTimeout(() => {
              setShowNotification(false);
            }, 6500);
          }
        }}
      >
        <input
          name="title"
          value={title}
          placeholder="Enter Title"
          required
          className={styles.input}
          onChange={(event) => {
            const value = event.target.value;
            setTitle(value);
          }}
        />{" "}
        <br />
        <input
          value={description}
          name="description"
          placeholder="Enter Description"
          required
          className={styles.input}
          onChange={(event) => {
            const value = event.target.value;
            setDescription(value);
          }}
        />
        <br />
        <button type="submit" className={styles.addBtn}>
          Add
        </button>
      </form>
      {isAddingModalOpen ? (
        <div className={styles.addModal}>
          <h1>Adding your todo...</h1>
        </div>
      ) : null}
    </>
  );
}
