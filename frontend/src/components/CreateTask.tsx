import { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';

export default function CreateTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/tasks', { title, description });
      setTitle('');
      setDescription('');
      window.dispatchEvent(new Event('tasks:updated'));
      Swal.fire({
        icon: 'success',
        title: 'Tarea creada',
        toast: true,
        position: 'top-end',
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err: any) {
      const details = err?.response?.data?.details || err?.response?.data?.message || 'Error';
      Swal.fire({ icon: 'error', title: 'Error', html: Array.isArray(details) ? details.map((d: any) => `${d.field}: ${d.message}`).join('<br/>') : details });
    }
  };

  return (
    <Box component="form" onSubmit={submit} sx={{ display: 'flex', gap: 2, mb: 3 }}>
      <TextField label="Título" value={title} onChange={e => setTitle(e.target.value)} fullWidth />
      <TextField label="Descripción" value={description} onChange={e => setDescription(e.target.value)} fullWidth />
      <Button variant="contained" color="primary" type="submit">Crear</Button>
    </Box>
  );
}
