// import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import styles from "./NotificationBar.module.css";
import { useTodoListCtx } from "../store/todo-list";

export function NotificationBar() {
  const { showNotification, setShowNotification } = useTodoListCtx();
  return (
    <>
      {showNotification ? (
        <div className={styles.notificationBar}>
          <IoIosClose
            className={styles.closeBtn}
            onClick={() => setShowNotification(false)}
          />
          <div className={styles.text}>
            <h3>Todo Added</h3>
            <p>A new Todo has been added succesfully!</p>
          </div>
        </div>
      ) : null}
    </>
  );
}
