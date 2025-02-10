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
import { useInstruction } from '../../logic/instruction/react-hooks';
import { InstructionDetails } from '../../logic/instruction/types';

interface InstructionModalProps {
  open: boolean;
  onClose: () => void;
  instruction?: InstructionDetails;
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
  instruction,
}: InstructionModalProps) {
  const isEditMode = instruction;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    clearErrors,
  } = useForm<FormValues>({
    defaultValues: isEditMode ? instruction : undefined,
  });

  const [loading, setLoading] = useState(false);

  const title = watch('title');
  const slug = watch('slug') || '';

  useEffect(() => {
    if (title) {
      setValue(
        'slug',
        slugify(title, {
          replacement: '-',
          lower: true,
        }),
      );
      clearErrors('slug');
    }
  }, [title]);

  useEffect(() => {
    if (!isEditMode) {
      reset({ title: '', description: '' });
    }
  }, [isEditMode, instruction?.slug, reset]);

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
        if (instruction) {
          await updateInstruction(instruction.id, {
            title: data.title,
            description: data.description,
            content: data.content,
            slug: data.slug,
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
          color="secondary"
        >
          {isEditMode ? 'Save' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
