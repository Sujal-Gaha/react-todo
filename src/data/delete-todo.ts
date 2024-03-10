import { useMutation, useQueryClient } from "@tanstack/react-query";

const qc = useQueryClient();

export const deleteTodoMutation = useMutation({
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