import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Task = {
  _id: string;
  title: string;
  description?: string;
  status: string;
  createdAt: string;
};

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      alert('Error al obtener tareas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await axios.put(`/tasks/${id}`, { status });
      fetchTasks();
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Error al actualizar';
      alert(msg);
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      <h2>Tareas</h2>
      <ul>
        {tasks.map(t => (
          <li key={t._id} className="task">
            <div>
              <strong>{t.title}</strong> — <em>{t.status}</em>
              <p>{t.description}</p>
              <small>{new Date(t.createdAt).toLocaleString()}</small>
            </div>
            <div className="actions">
              {t.status !== 'Completada' && (
                <button onClick={() => updateStatus(t._id, 'Completada')}>Marcar completada</button>
              )}
              {t.status !== 'En progreso' && (
                <button onClick={() => updateStatus(t._id, 'En progreso')}>Marcar en progreso</button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
