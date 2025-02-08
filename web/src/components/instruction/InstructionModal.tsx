import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button as MuiButton,
  Box,
} from '@mui/material';
import apiClient from '../../logic/apiClient';

interface InstructionModalProps {
  open: boolean;
  onClose: () => void;
  instructionId?: string;
}

interface InstructionFormInputs {
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
    reset,
    formState: { errors },
  } = useForm<InstructionFormInputs>({
    defaultValues: {
      title: '',
      description: '',
      body: '',
    },
  });

  // Fetch existing instruction data if in edit mode
  useEffect(() => {
    if (instructionId) {
      apiClient
        .get(`/instructions/${instructionId}`)
        .then((response) => {
          reset({
            title: response.data.title || '',
            description: response.data.description || '',
            body: response.data.body || '',
          });
        })
        .catch(() => {
          // handle error if needed
        });
    } else {
      // reset form if it's add mode
      reset({ title: '', description: '', body: '' });
    }
  }, [instructionId, reset]);

  const onSubmit: SubmitHandler<InstructionFormInputs> = async (data) => {
    try {
      if (instructionId) {
        // Edit mode
        await apiClient.put(`/instructions/${instructionId}`, {
          title: data.title,
          description: data.description,
          body: data.body,
        });
      } else {
        // Add mode
        await apiClient.post('/instructions', {
          title: data.title,
          description: data.description,
          body: data.body,
          group_id: 'default',
        });
      }
      onClose();
    } catch (error) {
      // handle error if needed
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {instructionId ? 'Edit Instruction' : 'Add Instruction'}
      </DialogTitle>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            error={!!errors.title}
            helperText={errors.title ? 'Title is required' : ''}
            {...register('title', { required: true })}
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            error={!!errors.description}
            helperText={errors.description ? 'Description is required' : ''}
            {...register('description', { required: true })}
          />
          <TextField
            label="Body"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            error={!!errors.body}
            helperText={errors.body ? 'Body is required' : ''}
            {...register('body', { required: true })}
          />
        </DialogContent>
        <DialogActions>
          <MuiButton onClick={onClose}>Cancel</MuiButton>
          <MuiButton type="submit" variant="contained">
            Save
          </MuiButton>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
