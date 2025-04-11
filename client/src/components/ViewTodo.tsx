import { useQuery } from "@apollo/client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/Spinner";
import { Badge } from "@/components/ui/badge";
import { ErrorState } from "@/components/ErrorState";

import { GET_TODO_BY_ID } from "@/graphql/queries";
import { Query } from "@/graphql-client/types";

import { ViewTodoProps } from "@/types/todo";

export const ViewTodo = ({ setViewTodoId, viewTodoId }: ViewTodoProps) => {
  const { data, loading, error } = useQuery<Query>(GET_TODO_BY_ID, {
    variables: { id: viewTodoId },
  });

  if (loading) return <Spinner size={32} className="text-blue-500" />;
  if (error || !data?.getTodoById) return <ErrorState />;

  const todo = data.getTodoById;

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
          Todo Details
        </h2>
        {todo ? (
          <div className="space-y-4">
            <div>
              <span className="font-semibold text-gray-700 dark:text-gray-300">
                ID:
              </span>{" "}
              <span className="text-gray-900 dark:text-gray-100">
                {todo.id}
              </span>
            </div>
            <div>
              <span className="font-semibold text-gray-700 dark:text-gray-300">
                Title:
              </span>{" "}
              <span className="text-gray-900 dark:text-gray-100">
                {todo.title}
              </span>
            </div>
            <div>
              <span className="font-semibold text-gray-700 dark:text-gray-300">
                Completed:
              </span>{" "}
              <span className="text-gray-900 dark:text-gray-100">
                <Badge variant={todo.isCompleted ? "success" : "outline"}>
                  {todo.isCompleted ? "Completed" : "Pending"}
                </Badge>
              </span>
            </div>
            <Button
              onClick={() => setViewTodoId(null)}
              className="mt-4 bg-black hover:bg-slate-800 text-white px-4 py-2 rounded-md"
            >
              Back to List
            </Button>
          </div>
        ) : (
          <p className="text-gray-700 dark:text-gray-300">
            <ErrorState />
          </p>
        )}
      </div>
    </div>
  );
};
