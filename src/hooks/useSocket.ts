import { useEffect } from 'react';
import { socket } from '../socket/socket';
import { useTodoStore } from '../store/todoStore';

export const useSocket = () => {
  useEffect(() => {
    const username = 'Guest-1';
    const workspace = 'default';
    socket.connect();
    const handleConnect = () => {
      console.log('Socket connected:', socket.id);
      socket.emit('workspace:join', {
        workspace,
        username,
      });
    };

    const handlePresenceUpdate = (data: {
      workspace: string;
      online: number;
      users: string[];
    }) => {
      useTodoStore.getState().setPresence(data);
    };

    const handleTodoCreated = () => {
      useTodoStore.getState().loadTodos();
    };

    const handleTodoUpdated = () => {
      useTodoStore.getState().loadTodos();
    };

    const handleTodoDeleted = () => {
      useTodoStore.getState().loadTodos();
    };

    socket.on('connect', handleConnect);
    socket.on('presence:update', handlePresenceUpdate);

    socket.on('todo:created', handleTodoCreated);
    socket.on('todo:updated', handleTodoUpdated);
    socket.on('todo:deleted', handleTodoDeleted);

    return () => {
      socket.emit('workspace:leave', { workspace });

      socket.off('connect', handleConnect);
      socket.off('presence:update', handlePresenceUpdate);

      socket.off('todo:created', handleTodoCreated);
      socket.off('todo:updated', handleTodoUpdated);
      socket.off('todo:deleted', handleTodoDeleted);

      socket.disconnect();
    };
  }, []);
};
