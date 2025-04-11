import { useState } from "react";
import { useQuery } from "@apollo/client";

import { ViewTodo } from "@/components/ViewTodo";
import { AddToDo } from "@/components/AddToDo";
import { ToDoItem } from "@/components/TodoItem";
import { Spinner } from "@/components/Spinner";
import { ErrorState } from "@/components/ErrorState";

import { GET_ALL_TODOS } from "@/graphql/queries";
import { Query, Todo } from "@/graphql-client/types";

const TodoList = () => {
  const { data, loading, error } = useQuery<Query>(GET_ALL_TODOS);
  const [viewTodoId, setViewTodoId] = useState<string | null>(null);
  if (viewTodoId !== null) {
    return <ViewTodo viewTodoId={viewTodoId} setViewTodoId={setViewTodoId} />;
  }

  if (loading) {
    return <Spinner size={100} className="text-blue-500" />;
  }

  if (error) {
    return <ErrorState />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-xl bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <div className="text-center mb-3">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Your Tasks
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Stay organized and productive
          </p>
        </div>
        <AddToDo />
        <div className="space-y-2">
          {data?.getAllTodos?.map((todo: Todo) => (
            <ToDoItem key={todo.id} todo={todo} setViewTodoId={setViewTodoId} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
