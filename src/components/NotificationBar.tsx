import { useState } from "react";
import { IoIosClose } from "react-icons/io";

export function NotificationBar() {
  const [isNotificationTabOpen, setIsNotificationTabOpen] =
    useState<boolean>(true);
  return (
    <>
      {isNotificationTabOpen ? (
        <div
          style={{
            position: "fixed",
            right: "506px",
            top: "32px",
            borderRadius: "4px",
            backgroundColor: "#1f2937",
            boxShadow: "0px -4px #57b8ec",
            padding: "2px 20px",
          }}
        >
          <IoIosClose
            style={{
              position: "fixed",
              marginBottom: "0",
              right: "27%",
              fontSize: "25px",
              color: "white",
              cursor: "pointer",
            }}
            onClick={() => setIsNotificationTabOpen(false)}
          />
          <h3
            style={{
              color: "white",
            }}
          >
            Todo Added
          </h3>
          <p
            style={{
              color: "white",
            }}
          >
            A new Todo has been added succesfully!
          </p>
        </div>
      ) : null}
    </>
  );
}
