import { createContext, useContext, useState } from "react";

type TTodoList = {
  isEditModalOpen: boolean;
  setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTitle: string;
  setSelectedTitle: React.Dispatch<React.SetStateAction<string>>;
  selectedDescription: string;
  setSelectedDescription: React.Dispatch<React.SetStateAction<string>>;
  selectedId: string;
  setSelectedId: React.Dispatch<React.SetStateAction<string>>;
  isUpdatingModalOpen: boolean;
  setIsUpdatingModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  //for FormContainer and NotificationBar
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  isAddingModalOpen: boolean;
  setIsAddingModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const TodoListCtx = createContext<TTodoList>({
  isEditModalOpen: false,
  setIsEditModalOpen: () => {},
  selectedTitle: "",
  setSelectedTitle: () => {},
  selectedDescription: "",
  setSelectedDescription: () => {},
  selectedId: "",
  setSelectedId: () => {},
  isUpdatingModalOpen: false,
  setIsUpdatingModalOpen: () => {},
  //for FormContainer and NotificationBar
  title: "",
  setTitle: () => {},
  description: "",
  setDescription: () => {},
  isAddingModalOpen: false,
  setIsAddingModalOpen: () => {},
});

export function TodoListProvider({ children }: { children: React.ReactNode }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedDescription, setSelectedDescription] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [isUpdatingModalOpen, setIsUpdatingModalOpen] =
    useState<boolean>(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isAddingModalOpen, setIsAddingModalOpen] = useState<boolean>(false);
  return (
    <TodoListCtx.Provider
      value={{
        isEditModalOpen,
        setIsEditModalOpen,
        selectedTitle,
        setSelectedTitle,
        selectedDescription,
        setSelectedDescription,
        selectedId,
        setSelectedId,
        isUpdatingModalOpen,
        setIsUpdatingModalOpen,
        title,
        setTitle,
        description,
        setDescription,
        isAddingModalOpen,
        setIsAddingModalOpen,
      }}
    >
      {children}
    </TodoListCtx.Provider>
  );
}

export function useTodoListCtx() {
  const todoListResult = useContext(TodoListCtx);
  return todoListResult;
}
