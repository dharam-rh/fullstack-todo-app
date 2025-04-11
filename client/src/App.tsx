import "./App.css";
import ToDoList from "@/components/ToDoList";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Toaster />
      <ToDoList />
    </>
  );
}

export default App;
