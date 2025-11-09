import React, { useState } from 'react';
import axios from 'axios';

export default function CreateTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/tasks', { title, description });
      setTitle('');
      setDescription('');
      // dispatch event para actualizar lista (simple)
      window.dispatchEvent(new Event('tasks:updated'));
    } catch (err: any) {
      const details = err?.response?.data?.details || err?.response?.data?.message || 'Error';
      alert(JSON.stringify(details));
    }
  };

  return (
    <form onSubmit={submit} className="create-form">
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Título" />
      <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Descripción" />
      <button type="submit">Crear</button>
    </form>
  );
}
