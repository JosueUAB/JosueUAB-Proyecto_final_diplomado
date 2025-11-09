import { useEffect, useState } from 'react';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';
import Grow from '@mui/material/Grow';
import Stack from '@mui/material/Stack';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Swal from 'sweetalert2';

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

  const updateStatus = async (id: string, status: string) => {
    try {
      await axios.put(`/tasks/${id}`, { status });
      fetchTasks();
      Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Estado actualizado', timer: 1500, showConfirmButton: false });
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Error al actualizar';
      Swal.fire({ icon: 'error', title: 'Error', text: msg });
    }
  };

  if (loading) {
    return (
      <Stack spacing={1}>
        <Typography variant="h6" gutterBottom>Tareas</Typography>
        {[1, 2, 3].map(n => (
          <Skeleton key={n} variant="rectangular" height={72} />
        ))}
      </Stack>
    );
  }

  return (
    <div>
      <Typography variant="h6" gutterBottom>Tareas</Typography>
      <List>
        {tasks.map((t, i) => (
          <Grow in={true} style={{ transformOrigin: '0 0 0' }} timeout={300 + i * 100} key={t._id}>
            <ListItem divider>
              <ListItemText
                primary={<>
                  <strong>{t.title}</strong>
                  {' '}—{' '}
                  <em>{t.status}</em>
                </>}
                secondary={<>
                  <Typography component="span" variant="body2" color="text.primary">{t.description}</Typography>
                  <br />
                  <small>{new Date(t.createdAt).toLocaleString()}</small>
                </>}
              />
              <ListItemSecondaryAction>
                {/* Icon to indicate quick status visually */}
                {t.status === 'Completada' ? (
                  <CheckCircleOutlineIcon color="success" sx={{ mr: 1 }} />
                ) : (
                  <PlayArrowIcon color="action" sx={{ mr: 1 }} />
                )}
                {t.status !== 'Completada' && (
                  <Button variant="contained" color="success" size="small" onClick={() => updateStatus(t._id, 'Completada')}>Completada</Button>
                )}
                {t.status !== 'En progreso' && (
                  <Button variant="outlined" color="primary" size="small" onClick={() => updateStatus(t._id, 'En progreso')} sx={{ ml: 1 }}>En progreso</Button>
                )}
              </ListItemSecondaryAction>
            </ListItem>
          </Grow>
        ))}
      </List>
    </div>
  );
}
