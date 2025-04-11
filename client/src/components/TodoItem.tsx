import { useState, ChangeEvent, KeyboardEvent } from "react";
import { useMutation } from "@apollo/client";

import { UPDATE_TODO, DELETE_TODO } from "@/graphql/mutations";
import { GET_ALL_TODOS } from "@/graphql/queries";
import {
  MutationUpdateTodoArgs,
  MutationDeleteTodoArgs,
} from "@/graphql-client/types";

import { ToDoItemProps } from "@/types/todo";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import { toast } from "sonner";

export const ToDoItem = ({ todo, setViewTodoId }: ToDoItemProps) => {
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
  const [editedTodoText, setEditedTodoText] = useState<string>("");

  const [updateTodo] = useMutation<void, MutationUpdateTodoArgs>(UPDATE_TODO, {
    refetchQueries: [{ query: GET_ALL_TODOS }],
  });

  const [deleteTodo] = useMutation<void, MutationDeleteTodoArgs>(DELETE_TODO, {
    refetchQueries: [{ query: GET_ALL_TODOS }],
  });

  const startEditingTodo = (id: string, currentTitle: string): void => {
    setEditingTodoId(id);
    setEditedTodoText(currentTitle);
  };

  const handleDelete = async (): Promise<void> => {
    try {
      await deleteTodo({ variables: { id: todo.id } });
      toast.success("Todo deleted successfully");
    } catch (error) {
      console.error("ERROR!", error);
      toast.error("Failed to delete todo");
    }
  };

  const handleToggleComplete = async (): Promise<void> => {
    try {
      await updateTodo({
        variables: {
          id: todo.id,
          update: { isCompleted: !todo.isCompleted },
        },
      });
      toast.success(`Todo marked as ${!todo.isCompleted ? "completed" : "incomplete"}`);
    } catch (error) {
      console.error("ERROR!", error);
      toast.error("Failed to update status");
    }
  };

  const handleUpdate = async (): Promise<void> => {
    const trimmed = editedTodoText.trim();
    if (!trimmed) {
      toast.warning("Title cannot be empty");
      return;
    }

    if (editingTodoId !== null) {
      try {
        await updateTodo({
          variables: {
            id: editingTodoId,
            update: { title: trimmed },
          },
        });
        toast.success("Todo updated successfully");
        setEditingTodoId(null);
        setEditedTodoText("");
      } catch (error) {
        console.error("ERROR!", error);
        toast.error("Failed to update todo");
      }
    }
  };

  const isEditing = editingTodoId === todo.id;

  return (
    <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 rounded-md px-4 py-2">
      <div className="flex items-center w-full min-w-0 gap-2">
        <Checkbox
          checked={todo.isCompleted}
          className="shrink-0"
          onCheckedChange={handleToggleComplete}
        />

        {isEditing ? (
          <Input
            type="text"
            value={editedTodoText}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEditedTodoText(e.target.value)
            }
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") handleUpdate();
            }}
            className="w-full"
          />
        ) : (
          <span
            className={`truncate text-gray-800 dark:text-gray-200 ${
              todo.isCompleted
                ? "line-through text-gray-500 dark:text-gray-400"
                : ""
            }`}
            title={todo.title}
          >
            {todo.title}
          </span>
        )}
      </div>

      <div className="flex items-center ml-4 gap-2 shrink-0">
        <Button
          onClick={() => setViewTodoId(todo.id)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-2 rounded-md"
        >
          View
        </Button>

        {isEditing ? (
          <Button
            onClick={handleUpdate}
            className="bg-black hover:bg-slate-800 text-white font-medium py-1 px-2 rounded-md"
          >
            Save
          </Button>
        ) : (
          <Button
            onClick={() => startEditingTodo(todo.id, todo.title)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-gray-200 font-medium py-1 px-2 rounded-md"
          >
            Edit
          </Button>
        )}

        <Button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-2 rounded-md"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};
