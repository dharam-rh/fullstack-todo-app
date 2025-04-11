import { useState, ChangeEvent, KeyboardEvent } from "react";
import { useMutation } from "@apollo/client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { CREATE_TODO } from "@/graphql/mutations";
import { GET_ALL_TODOS } from "@/graphql/queries";

import { toast } from "sonner";

export const AddToDo = () => {
  const [title, setTitle] = useState("");

  const [createTodo] = useMutation(CREATE_TODO, {
    refetchQueries: [{ query: GET_ALL_TODOS }],
  });

  const handleAdd = async () => {
    if (!title.trim()) {
      toast.warning("Please enter a title");
      return;
    }

    try {
      await createTodo({
        variables: { createTodoInput: { title } },
      });

      toast.success("Todo added successfully");
      setTitle("");
    } catch (error) {
      console.log("ERROR!", error);
      toast.error("Failed to add todo");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <div className="flex items-center mb-4">
      <Input
        type="text"
        placeholder="Add a new todo"
        value={title}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
        onKeyDown={handleKeyDown}
        className="flex-1 mr-2 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
      />
      <Button
        onClick={handleAdd}
        className="bg-black hover:bg-slate-800 text-white font-medium py-2 px-4 rounded-md"
      >
        Add
      </Button>
    </div>
  );
};
