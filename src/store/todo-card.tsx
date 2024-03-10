import { createContext, useContext, useState } from "react";

type TTodoCard = {
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
};

const TodoCardCtx = createContext<TTodoCard>({
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
});

export function TodoCardProvider({ children }: { children: React.ReactNode }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedDescription, setSelectedDescription] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [isUpdatingModalOpen, setIsUpdatingModalOpen] =
    useState<boolean>(false);
  return (
    <TodoCardCtx.Provider
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
      }}
    >
      {children}
    </TodoCardCtx.Provider>
  );
}

export function useTodoCardCtx() {
  const todoCardResult = useContext(TodoCardCtx);
  return todoCardResult;
}
