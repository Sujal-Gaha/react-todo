import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import styles from "./NotificationBar.module.css";

export function NotificationBar() {
  const [isNotificationTabOpen, setIsNotificationTabOpen] =
    useState<boolean>(true);
  return (
    <>
      {isNotificationTabOpen ? (
        <div className={styles.notificationBar}>
          <IoIosClose
            className={styles.closeBtn}
            onClick={() => setIsNotificationTabOpen(false)}
          />
          <h3>Todo Added</h3>
          <p>A new Todo has been added succesfully!</p>
        </div>
      ) : null}
    </>
  );
}
