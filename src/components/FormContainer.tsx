import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TCreateTodoInput, TTodoCreateOutput } from "../type";
// import { NotificationBar } from "./NotificationBar";
import styles from "./FormContainer.module.css";
import { useTodoListCtx } from "../store/todo-list";

import { Bounce, ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export function FormContainer() {
  const qc = useQueryClient();

  const {
    title,
    setTitle,
    description,
    setDescription,
    isAddingModalOpen,
    setIsAddingModalOpen,
  } = useTodoListCtx();

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

  const addNotification = () =>
    toast.info("A new todo added successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  return (
    <>
      <ToastContainer />
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
              addNotification();
            }, 1500);
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
