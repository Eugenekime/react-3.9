import { useEffect, useState } from "react";

function useFetchData() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  ///////// The code to get a data from server
  useEffect(() => {
    const handleFetchData = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/todos?_limit=10`
        );
        if (!response.ok) {
          throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        const tasksWithTime = data.map((task) => ({
          ...task,
          createdAt: new Date(),
        }));
        setTasks(tasksWithTime);
      } catch (err) {
        setError(err.message);
      }
    };

    handleFetchData();
  }, [setTasks]);

  //////////// The code to delete a task by id
  const handleDeleteData = async (id) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Ошибка при удалении задачи");
      }

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (err) {
      console.error("Ошибка:", err.message);
    }
  };

  //////////// The code to create a new task

  const addNewTask = async (title) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            completed: false,
            createdAt: new Date().toISOString(),
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Ошибка при добавлении задачи");
      }

      const newTask = await response.json();
      setTasks((tasks) => [...tasks, newTask]);
    } catch (error) {
      console.error("Ошибка:", error.message);
    }
  };

  ////////// the code to delete all completed task
  // ! Фейковый jsonplaceholder API не поддерживает удаление ресурсов через фильтрацию с помощью параметров запроса !
  const deleteAllCompleted = () => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.completed === false)
    );
  };

  return {
    tasks,
    setTasks,
    error,
    handleDeleteData,
    addNewTask,
    deleteAllCompleted,
  };
}

export default useFetchData;
