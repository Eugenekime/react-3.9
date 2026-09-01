import { useEffect, useState } from 'react';

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
          createdAt: new Date().toISOString(),
        }));
        setTasks(tasksWithTime);
      } catch (err) {
        setError(err.message);
      }
    };

    handleFetchData();
  }, []);

  //////////// The code to delete a task by id
  const handleDeleteData = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  //////////// The code to create a new task
  const addNewTask = (title) => {
    const newTask = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTasks((tasks) => [...tasks, newTask]);
  };
  ///////// the code to edit a task
  const editTask = (id, title) => {
    setTasks((tasks) =>
      tasks.map((task) => (task.id === id ? { ...task, title } : task))
    );
  };

  ////////// the code to delete all completed task

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
    editTask,
    deleteAllCompleted,
  };
}

export default useFetchData;
