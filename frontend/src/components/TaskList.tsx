import { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Grow from '@mui/material/Grow';
import Skeleton from '@mui/material/Skeleton';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Swal from 'sweetalert2';

type Task = {
  _id: string;
  title: string;
  description?: string;
  status: 'Pendiente' | 'En progreso' | 'Completada' | string;
  createdAt: string;
};

const columnOrder: { key: string; title: string; }[] = [
  { key: 'Pendiente', title: 'Por hacer' },
  { key: 'En progreso', title: 'En progreso' },
  { key: 'Completada', title: 'Completadas' },
];

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
      Swal.fire({ icon: 'error', title: 'Error', text: 'Error al obtener tareas' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    const handler = () => fetchTasks();
    window.addEventListener('tasks:updated', handler);
    return () => window.removeEventListener('tasks:updated', handler);
  }, []);

  const moveTask = async (id: string, to: string) => {
    try {
      await axios.put(`/tasks/${id}`, { status: to });
      fetchTasks();
      Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Estado actualizado', timer: 1200, showConfirmButton: false });
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Error al actualizar';
      Swal.fire({ icon: 'error', title: 'Error', text: msg });
    }
  };

  if (loading) {
    return (
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {columnOrder.map((col) => (
          <Grid item xs={12} md={4} key={col.key}>
            <Paper sx={{ p: 2, minHeight: 200 }}>
              <Typography variant="h6">{col.title}</Typography>
              <Skeleton variant="rectangular" height={140} sx={{ mt: 2 }} />
            </Paper>
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        {columnOrder.map((col) => {
          const columnTasks = tasks.filter(t => t.status === col.key);
          return (
            <Grid item xs={12} md={4} key={col.key}>
              <Paper sx={{ p: 2, minHeight: 200 }} elevation={3}>
                <Typography variant="h6" gutterBottom>{col.title} <Chip label={columnTasks.length} size="small" sx={{ ml: 1 }} /></Typography>
                <Stack spacing={1}>
                  {columnTasks.length === 0 && (
                    <Typography variant="body2" color="text.secondary">No hay tareas</Typography>
                  )}

                  {columnTasks.map((t, i) => (
                    <Grow in={true} key={t._id} timeout={300 + i * 80}>
                      <Paper sx={{ p: 1.5, borderRadius: 1, boxShadow: 2 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                          <Box sx={{ width: '100%' }}>
                            <Typography variant="subtitle1"><strong>{t.title}</strong></Typography>
                            <Typography variant="body2" color="text.secondary">{t.description}</Typography>
                            <Typography variant="caption" display="block" sx={{ mt: 1 }}>{new Date(t.createdAt).toLocaleString()}</Typography>
                          </Box>
                          <Box sx={{ ml: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                            <IconButton size="small" aria-label="more"><MoreHorizIcon fontSize="small" /></IconButton>
                            <Box sx={{ display: 'flex', gap: 0.5 }}>
                              {/* back button */}
                              {col.key !== 'Pendiente' && (
                                <IconButton size="small" color="primary" onClick={() => moveTask(t._id, col.key === 'En progreso' ? 'Pendiente' : 'En progreso')}>
                                  <ArrowBackIcon fontSize="small" />
                                </IconButton>
                              )}
                              {/* forward button */}
                              {col.key !== 'Completada' && (
                                <IconButton size="small" color="success" onClick={() => moveTask(t._id, col.key === 'Pendiente' ? 'En progreso' : 'Completada')}>
                                  <ArrowForwardIcon fontSize="small" />
                                </IconButton>
                              )}
                            </Box>
                          </Box>
                        </Stack>
                      </Paper>
                    </Grow>
                  ))}
                </Stack>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
