import './assets/styles/global.css';
import NewTaskForm from './components/NewTaskForm';
import TaskList from './components/TaskList';
import Footer from './components/Footer';

import Modal from './components/Modal';
import { useEffect, useState } from 'react';
import { useTodoStore } from './store/todoStore';
import Pagination from './components/Pagination';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const loadTodos = useTodoStore((state) => state.loadTodos);
  const filter = useTodoStore((state) => state.filter);
  const page = useTodoStore((state) => state.page);
  const limit = useTodoStore((state) => state.limit);

  useEffect(() => {
    loadTodos();
  }, [loadTodos, filter, page, limit]);

  return isOpen ? (
    <Modal handleOpen={setIsOpen} />
  ) : (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
      </header>
      <NewTaskForm setIsOpen={setIsOpen} />
      <TaskList />
      <Pagination />
      <Footer />
    </section>
  );
}

export default App;
