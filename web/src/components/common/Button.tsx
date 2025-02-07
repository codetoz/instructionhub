import { ReactNode } from 'react';
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from '@mui/material';

type ButtonProps = MuiButtonProps & {
  label: ReactNode;
};

function Button({ label, ...props }: ButtonProps) {
  return (
    <MuiButton
      {...props}
      sx={{
        '&:disabled': {
          color: 'text.secondary',
        },
        ...props.sx,
      }}
    >
      {label}
    </MuiButton>
  );
}

export default Button;
