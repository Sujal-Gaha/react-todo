import { FormContainer } from "./FormContainer";
import { TodoCard } from "./TodoCard";
import styles from "./TodoContainer.module.css";

export function TodoContainer() {
  return (
    <div className={styles.todoContainer}>
      <FormContainer />
      {/* list of todos */}
        <TodoCard />
    </div>
  );
}
