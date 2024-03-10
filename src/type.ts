export type TTodo = {
  __v: string;
  _id: string;
  createdAt: string;
  description: string;
  isComplete: boolean;
  title: string;
  updatedAt: string;
};

export type TTodoCreateOutput = {
  data: TTodo;
  message: string;
  statusCode: 201;
  success: boolean;
};

export type TCreateTodoInput = { title: string; description: string };

export type TGetAllTodosOutput = {
  data: TTodo[];
  message: string;
  statusCode: 200;
  success: boolean;
};
