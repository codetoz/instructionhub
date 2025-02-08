import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import slugify from 'slugify';
import {
  createInstruction,
  updateInstruction,
} from '../../logic/instruction/service';

interface InstructionModalProps {
  open: boolean;
  onClose: () => void;
  instructionId?: string;
}

interface FormValues {
  title: string;
  description: string;
  content: string;
  slug: string;
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
    watch,
    setValue,
    clearErrors,
  } = useForm<FormValues>();
  const [loading, setLoading] = useState(false);

  const title = watch('title');
  const slug = watch('slug') || '';

  const isEditMode = !!instructionId;

  useEffect(() => {
    if (title) {
      setValue('slug', slugify(title, '-'));
      clearErrors('slug');
    }
  }, [title]);

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
        await createInstruction({
          title: data.title,
          description: data.description,
          content: data.content,
          slug: data.slug,
        });
      } else {
        if (instructionId) {
          await updateInstruction(instructionId, {
            title: data.title,
            description: data.description,
            content: data.content,
          });
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
        <form
          id="instruction-form"
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
        >
          <TextField
            autoFocus
            margin="dense"
            label="Title*"
            type="text"
            fullWidth
            variant="outlined"
            error={!!errors.title}
            helperText={errors.title ? 'Title is required' : ''}
            {...register('title', { required: true })}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Slug*"
            type="text"
            fullWidth
            // '' is added to make textField controlled
            value={slug || ''}
            variant="outlined"
            error={!!errors.slug}
            helperText={errors.slug ? 'Slug is required' : ''}
            {...register('slug', { required: true })}
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
            {...register('description', { required: false })}
          />
          <TextField
            margin="dense"
            label="Content*"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            error={!!errors.content}
            helperText={errors.content ? 'Content is required' : ''}
            {...register('content', { required: true })}
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
