import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import {
  createInstruction,
  updateInstruction,
} from '../../services/instructionService';
import { useEffect, useState } from 'react';

interface InstructionModalProps {
  open: boolean;
  onClose: () => void;
  instructionId?: string;
}

interface FormValues {
  title: string;
  description: string;
  body: string;
}

export default function InstructionModal({
  open,
  onClose,
  instructionId,
}: InstructionModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();
  const [loading, setLoading] = useState(false);

  const isEditMode = !!instructionId;

  useEffect(() => {
    if (isEditMode) {
      // Fetch existing instruction data if needed
      // Example: we could fetch the instruction details here, then reset the form with the data
      // For now, let's assume the parent has the logic or we do not need initial data.
      // reset({ title: ..., description: ... });
    } else {
      reset({ title: '', description: '' });
    }
  }, [isEditMode, instructionId, reset]);

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);
      if (!isEditMode) {
        await createInstruction(
          data.title,
          data.description,
          data.body,
          'default',
        );
      } else {
        if (instructionId) {
          await updateInstruction(
            instructionId,
            data.title,
            data.description,
            data.body,
          );
        }
      }
      onClose();
    } catch (error) {
      // Handle error if needed
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {isEditMode ? 'Edit Instruction' : 'Add Instruction'}
      </DialogTitle>
      <DialogContent>
        <form id="instruction-form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
            error={!!errors.title}
            helperText={errors.title ? 'Title is required' : ''}
            {...register('title', { required: true })}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            error={!!errors.description}
            helperText={errors.description ? 'Description is required' : ''}
            {...register('description', { required: false })}
          />
          <TextField
            margin="dense"
            label="Body"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            error={!!errors.body}
            helperText={errors.body ? 'Description is required' : ''}
            {...register('body', { required: true })}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          form="instruction-form"
          type="submit"
          variant="contained"
          disabled={loading}
        >
          {isEditMode ? 'Save' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
