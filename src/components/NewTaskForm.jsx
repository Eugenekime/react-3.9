import '../assets/styles/newTaskForm.css';

function NewTaskForm({ setIsOpen }) {
  return (
    <button
      onClick={() => setIsOpen(true)}
      className="new-todo"
    >
      Create new todo
    </button>
  );
}

export default NewTaskForm;
