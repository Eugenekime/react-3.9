import { create } from 'zustand';
import { getAllTodos, createTodo, deleteTodo, updateTodo } from '../api/todos';

export const useTodoStore = create((set, get) => ({
  page: 1,
  limit: 5,
  total: 0,
  todos: [],
  loading: false,
  error: null,
  filter: 'all',
  setPage: (page) => {
    set({ page });
  },

  setLimit: (limit) => set({ limit, page: 1 }),

  setFilter: (filter) => set({ filter, page: 1 }),

  loadTodos: async () => {
    set({ loading: true, error: null });

    try {
      const { page, limit, filter } = get();
      const params = new URLSearchParams();
      params.set('limit', String(limit));
      params.set('offset', String((page - 1) * limit));

      if (filter === 'completed') {
        params.set('completed', 'true');
      } else if (filter === 'active') {
        params.set('completed', 'false');
      }

      let response = await getAllTodos(params);
      const total = response.filtered ?? response.total ?? 0;
      const lastPage = Math.max(1, Math.ceil(total / limit));

      if (page > lastPage) {
        set({ page: lastPage });

        params.set('offset', String((lastPage - 1) * limit));
        response = await getAllTodos(params);
      }

      set({
        todos: response.todos,
        total: response.filtered ?? response.total ?? 0,
      });
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  createTodo: async (body) => {
    try {
      const response = await createTodo(body);
      set({ page: 1 });
      await get().loadTodos();
      return response;
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  deleteTodo: async (id) => {
    try {
      const isDeleted = await deleteTodo(id);
      if (isDeleted) {
        await get().loadTodos();
      } else {
        console.log('could not delete');
      }
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },
  updateTodo: async (id, body) => {
    try {
      const response = await updateTodo(id, body);
      await get().loadTodos();
      return response;
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },
}));
