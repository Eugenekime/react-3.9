import { useTodoStore } from '../store/todoStore';
import '../assets/styles/pagination.css';

export default function Pagination() {
  const page = useTodoStore((state) => state.page);
  const limit = useTodoStore((state) => state.limit);
  const total = useTodoStore((state) => state.total);
  const setPage = useTodoStore((state) => state.setPage);

  const totalPages = Math.ceil(total / limit);

  if (totalPages <= 1) return null;

  return (
    <nav
      className="pagination"
      aria-label="Todo pagination"
    >
      <button
        type="button"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        Previous
      </button>

      <span>
        Page {page} of {totalPages}
      </span>

      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </nav>
  );
}
