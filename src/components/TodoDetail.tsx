import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { TGetTodoById } from "../type";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import styles from "./TodoDetail.module.css";

export function TodoDetail() {
  const { id } = useParams();

  const { data, error, isLoading } = useQuery<TGetTodoById>({
    queryKey: ["/api/v1/todos/", id],
    queryFn: async () => {
      const response = await fetch(`http://localhost:8080/api/v1/todos/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = response.json();
      return data;
    },
  });

  if (error) console.log(error);
  if (isLoading) return <p>Loading...</p>;

  return (
    <div className={styles.todoDetail}>
      <Link to="/todos">
        <IoIosArrowDropleftCircle className={styles.leftArrow} />
      </Link>
      <div className={styles.header}>
        <h1>Title: {data?.data.title}</h1>
        <h5>Created At:{data?.data.createdAt}</h5>
        <hr />
      </div>
      <div className={styles.body}>
        <h2>Description: </h2>
        <h4>{data?.data.description}</h4>
        <h3>Completed: {data?.data.isComplete ? " Yes" : " No"}</h3>
        <h3>Todo's id: {data?.data._id}</h3>
        <h3>Last Updated At: {data?.data.updatedAt}</h3>
      </div>
    </div>
  );
}
