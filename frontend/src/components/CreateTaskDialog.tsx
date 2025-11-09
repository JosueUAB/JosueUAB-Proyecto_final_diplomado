import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import Swal from 'sweetalert2';
import axios from 'axios';

type Label = { name: string; color?: string };

export default function CreateTaskDialog({ open, onClose, onCreated }: { open: boolean; onClose: () => void; onCreated?: () => void }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [labels, setLabels] = useState<Label[]>([]);
  const [loading, setLoading] = useState(false);

  const addTag = () => {
    const name = tagInput.trim();
    if (!name) return;
    setLabels(prev => [...prev, { name }]);
    setTagInput('');
  };

  const removeTag = (idx: number) => {
    setLabels(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!title.trim()) {
      Swal.fire({ icon: 'warning', title: 'El título es obligatorio' });
      return;
    }
    setLoading(true);
    try {
      await axios.post('/tasks', { title, description, labels });
      setTitle('');
      setDescription('');
      setLabels([]);
      onCreated && onCreated();
      onClose();
      window.dispatchEvent(new Event('tasks:updated'));
      Swal.fire({ icon: 'success', title: 'Tarea creada', toast: true, position: 'top-end', timer: 1500, showConfirmButton: false });
    } catch (err: any) {
      const details = err?.response?.data?.details || err?.response?.data?.message || 'Error';
      Swal.fire({ icon: 'error', title: 'Error', html: Array.isArray(details) ? details.map((d: any) => `${d.field}: ${d.message}`).join('<br/>') : String(details) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <DialogTitle>Nueva tarea</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField label="Título" value={title} onChange={e => setTitle(e.target.value)} fullWidth required autoFocus />
            <TextField label="Descripción" value={description} onChange={e => setDescription(e.target.value)} fullWidth multiline rows={3} />
            <Box>
              <Stack direction="row" spacing={1} alignItems="center">
                <TextField label="Agregar etiqueta" value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }} size="small" />
                <Button onClick={addTag} variant="outlined" startIcon={<AddIcon />}>Agregar</Button>
              </Stack>
              <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap' }}>
                {labels.map((l, i) => (
                  <Chip key={i} label={l.name} onDelete={() => removeTag(i)} sx={{ mr: 1, mb: 1 }} />
                ))}
              </Stack>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained" disabled={loading}>Crear</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
