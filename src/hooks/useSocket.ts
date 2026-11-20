import { useEffect } from 'react';
import { socket } from '../socket/socket';
import { useTodoStore } from '../store/todoStore';

export const useSocket = () => {
  useEffect(() => {
    socket.connect();
    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
    });

    socket.on('todo:created', () => {
      useTodoStore.getState().loadTodos();
    });

    socket.on('todo:updated', () => {
      useTodoStore.getState().loadTodos();
    });

    socket.on('todo:deleted', () => {
      useTodoStore.getState().loadTodos();
    });

    return () => {
      socket.off('connect');

      socket.off('todo:created');
      socket.off('todo:updated');
      socket.off('todo:deleted');

      socket.disconnect();
    };
  }, []);
};
