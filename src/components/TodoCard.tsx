import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TGetAllTodosOutput } from "../type";
import styles from "./TodoCard.module.css";
import { MdDelete, MdEdit } from "react-icons/md";
import { useState } from "react";
import { IoIosClose } from "react-icons/io";

export function TodoCard() {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedDescription, setSelectedDescription] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [isUpdatingModalOpen, setIsUpdatingModalOpen] =
    useState<boolean>(false);
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

  const editTodoMutation = useMutation({
    mutationFn: async (todoId: string) => {
      const response = await fetch(
        `http://localhost:8080/api/v1/todos/${todoId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            description: selectedDescription,
            title: selectedTitle,
          }),
        }
      );
      const data = response.json();
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

  const handleFormSubmission = () => {
    editTodoMutation.mutateAsync(selectedId);
    setIsEditModalOpen(false);
  };

  const updateStatus = useMutation({
    mutationFn: async (todoId: string) => {
      const response = await fetch(
        `http://localhost:8080/api/v1/todos/toggle/status/${todoId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.json();
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

  const handleChangeCompleted = (id: string) => {
    updateStatus.mutateAsync(id);
  };

  if (isLoading) return <p>Loading todos...</p>;
  if (isError) return <p>Loading todos errors: {error.message || ""}</p>;

  return (
    <div className={styles.cardContainer}>
      {data?.data.map((todo) => {
        console.log("todo isComplete", todo.isComplete);
        return (
          <div key={todo._id} className={styles.card}>
            <div className={styles.buttons}>
              <MdEdit
                className={styles.button}
                onClick={() => {
                  setIsEditModalOpen(true);
                  setSelectedTitle(todo.title);
                  setSelectedDescription(todo.description);
                  setSelectedId(todo._id);
                }}
              />
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
              <label htmlFor="status">Completed</label>
              <input
                type="checkbox"
                name="status"
                id="status"
                checked={todo.isComplete}
                onChange={() => {
                  handleChangeCompleted(todo._id);
                }}
              />
            </div>
          </div>
        );
      })}
      {isEditModalOpen ? (
        <div className={styles.modalContainer}>
          <IoIosClose
            className={styles.editCloseBtn}
            onClick={() => {
              setIsEditModalOpen(false);
            }}
          />
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setIsUpdatingModalOpen(true);
              setTimeout(() => {
                handleFormSubmission();
                setIsUpdatingModalOpen(false);
              }, 2500);
            }}
          >
            <br />
            <br />
            <h1>Edit Your Todo</h1>
            <br />
            <label htmlFor="new-title">Enter Title:</label>
            <br />
            <input
              type="text"
              id="new-title"
              value={selectedTitle}
              onChange={(event) => {
                const editedTitle = event.target.value;
                setSelectedTitle(editedTitle);
              }}
            />
            <br />
            <label htmlFor="new-description">Enter Description:</label>
            <br />
            <input
              type="text"
              id="new-description"
              value={selectedDescription}
              onChange={(event) => {
                const editedDescription = event.target.value;
                setSelectedDescription(editedDescription);
              }}
            />
            <br />
            <br />
            <button>Update</button>
          </form>
        </div>
      ) : null}
      {isUpdatingModalOpen ? (
        <div className={styles.updateModal}>
          <h1>Updating your todo...</h1>
        </div>
      ) : null}
    </div>
  );
}
