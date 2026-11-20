import '../assets/styles/footer.css';
import TaskFilter from './TasksFilter';
import PropTypes from 'prop-types';
import { useTodoStore } from '../store/todoStore';

function Footer() {
  const todos = useTodoStore((state) => state.todos);
  const count = todos.filter((task) => task.completed === false).length;
  const presence = useTodoStore((state) => state.presence);
  return (
    <footer className="footer">
      <span className="todo-count">{count} items left</span>
      <TaskFilter />
      <span className="online-count">🟢 {presence.online} online</span>
    </footer>
  );
}

Footer.defaultProps = {
  clearCompleted: () => {},
};

Footer.propTypes = {
  clearCompleted: PropTypes.func.isRequired,
};

export default Footer;
