const API_URL = 'http://localhost:3000/api/todos';

export async function getAllTodos(filter) {
  const response = await fetch(`${API_URL}?${filter}`);
  if (!response.ok) {
    throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
  }
  const data = await response.json();

  return data;
}

export async function createTodo(body) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function updateTodo(id, body) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

export async function deleteTodo(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
  }

  return true;
}
