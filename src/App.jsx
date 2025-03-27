import "./assets/styles/global.css";
import NewTaskForm from "./components/NewTaskForm";
import TaskList from "./components/TaskList";
import Footer from "./components/Footer";
import useFetchData from "./hooks/useFetchData";
import { useState } from "react";

function App() {
  const [filter, setFilter] = useState("all");
  const {
    tasks,
    setTasks,
    error,
    handleDeleteData,
    addNewTask,
    editTask,
    deleteAllCompleted,
  } = useFetchData();

  const filteredTask = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
    return true;
  });

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
      </header>
      <NewTaskForm addNewTask={addNewTask} />
      <TaskList
        filteredTasks={filteredTask}
        tasks={tasks}
        error={error}
        setTasks={setTasks}
        deleteTask={handleDeleteData}
        editTask={editTask}
      />
      <Footer
        countTasks={tasks}
        clearCompleted={deleteAllCompleted}
        setFilter={setFilter}
      />
    </section>
  );
}

export default App;
