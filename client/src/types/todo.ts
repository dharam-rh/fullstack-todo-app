import { Todo, UpdateTodoInput } from "../graphql-client/types";

export interface GetAllTodosData {
  getAllTodos: Todo[];
}

export interface TodoQueryVariables {
  id: number;
}

export interface ToDoItemProps {
  todo: Todo;
  setViewTodoId: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface UpdateTodoVariables {
  id: number;
  update: UpdateTodoInput;
}

export interface DeleteTodoVariables {
  id: number;
}

export interface ViewTodoProps {
  setViewTodoId: (id: string | null) => void;
  viewTodoId: string | null;
}
