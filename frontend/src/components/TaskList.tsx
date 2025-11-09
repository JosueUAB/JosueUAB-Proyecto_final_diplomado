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
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import EditTaskDialog from './EditTaskDialog';

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

export default function TaskList({ themeMode }: { themeMode?: 'light' | 'dark' }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<Task | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

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

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    // If dropped in same place, do nothing
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const movedTask = tasks.find(t => t._id === draggableId);
    if (!movedTask) return;

    const newStatus = destination.droppableId;
    const newPosition = destination.index;

    try {
      await axios.put(`/tasks/${movedTask._id}`, { status: newStatus, position: newPosition });
      // naive: refetch tasks to refresh order
      fetchTasks();
      Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Tarea movida', timer: 1000, showConfirmButton: false });
    } catch (err: any) {
      Swal.fire({ icon: 'error', title: 'Error', text: err?.response?.data?.message || 'No se pudo mover' });
    }
  };

  const openEdit = (task: Task) => {
    setEditing(task);
    setDialogOpen(true);
  };

  const onSaved = (updated: any) => {
    // refresh list
    fetchTasks();
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

  const [createOpen, setCreateOpen] = useState(false);

  // Colores de fondo por estado
  const cardColors: Record<string, string> = {
    'Pendiente': themeMode === 'dark' ? '#263238' : '#fffde7',
    'En progreso': themeMode === 'dark' ? '#1e88e5' : '#e3f2fd',
    'Completada': themeMode === 'dark' ? '#388e3c' : '#e8f5e9',
  };
  const cardText: Record<string, string> = {
    'Pendiente': themeMode === 'dark' ? '#fffde7' : '#263238',
    'En progreso': themeMode === 'dark' ? '#fff' : '#1565c0',
    'Completada': themeMode === 'dark' ? '#fff' : '#2e7d32',
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        sx={{ mb: 3, borderRadius: 8, fontWeight: 700, boxShadow: 3 }}
        onClick={() => setCreateOpen(true)}
        startIcon={<span style={{ fontSize: 24, fontWeight: 900 }}>+</span>}
      >
        Nueva tarea
      </Button>
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container spacing={2}>
          {columnOrder.map((col) => {
            const columnTasks = tasks.filter(t => t.status === col.key).sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
            return (
              <Grid item xs={12} md={4} key={col.key}>
                <Paper sx={{ p: 2, minHeight: 220, bgcolor: themeMode === 'dark' ? '#232a36' : '#fff', transition: 'background 0.3s' }} elevation={4}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>{col.title} <Chip label={columnTasks.length} size="small" sx={{ ml: 1 }} /></Typography>

                  <Droppable droppableId={col.key}>
                    {(provided) => (
                      <Box ref={provided.innerRef} {...provided.droppableProps}>
                        <Stack spacing={1}>
                          {columnTasks.length === 0 && (
                            <Typography variant="body2" color="text.secondary">No hay tareas</Typography>
                          )}

                          {columnTasks.map((t, i) => (
                            <Draggable draggableId={t._id} index={i} key={t._id}>
                              {(dragProvided) => (
                                <div ref={dragProvided.innerRef} {...dragProvided.draggableProps} {...dragProvided.dragHandleProps}>
                                  <Grow in={true} timeout={300 + i * 80}>
                                    <Paper
                                      sx={{
                                        p: 1.5,
                                        borderRadius: 2,
                                        boxShadow: 6,
                                        bgcolor: cardColors[t.status] || (themeMode === 'dark' ? '#232a36' : '#fff'),
                                        color: cardText[t.status] || 'inherit',
                                        borderLeft: `6px solid ${t.status === 'Pendiente' ? '#ffa726' : t.status === 'En progreso' ? '#1976d2' : '#43a047'}`,
                                        transition: 'background 0.3s, color 0.3s',
                                        position: 'relative',
                                        overflow: 'visible',
                                      }}
                                    >
                                      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                                        <Box sx={{ width: '100%' }}>
                                          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>{t.title}</Typography>
                                          <Typography variant="body2" color="text.secondary">{t.description}</Typography>
                                          <Typography variant="caption" display="block" sx={{ mt: 1 }}>{new Date(t.createdAt).toLocaleString()}</Typography>
                                          <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap' }}>
                                            {(t.labels || []).map((l, idx) => (
                                              <Chip key={idx} label={l.name} size="small" sx={{ backgroundColor: l.color || (themeMode === 'dark' ? '#37474f' : '#e0e0e0'), color: l.color ? '#fff' : undefined }} />
                                            ))}
                                            <Chip label={t.status} size="small" sx={{ backgroundColor: t.status === 'Pendiente' ? '#ffa726' : t.status === 'En progreso' ? '#1976d2' : '#43a047', color: '#fff', fontWeight: 600 }} />
                                          </Stack>
                                        </Box>
                                        <Box sx={{ ml: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                          <IconButton size="small" aria-label="more" onClick={() => openEdit(t)}><MoreHorizIcon fontSize="small" /></IconButton>
                                          <Box sx={{ display: 'flex', gap: 0.5 }}>
                                            {col.key !== 'Pendiente' && (
                                              <IconButton size="small" color="primary" onClick={() => moveTask(t._id, col.key === 'En progreso' ? 'Pendiente' : 'En progreso')}>
                                                <ArrowBackIcon fontSize="small" />
                                              </IconButton>
                                            )}
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
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </Stack>
                      </Box>
                    )}
                  </Droppable>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </DragDropContext>

      <EditTaskDialog open={dialogOpen} onClose={() => setDialogOpen(false)} task={editing} onSaved={onSaved} />
      <CreateTaskDialog open={createOpen} onClose={() => setCreateOpen(false)} onCreated={fetchTasks} />
    </Box>
  );
}
