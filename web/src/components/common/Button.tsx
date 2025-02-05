import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';

type ButtonProps = MuiButtonProps & {
  label: string;
};

function Button({ label, ...props }: ButtonProps) {
  return <MuiButton {...props}>{label}</MuiButton>;
}

export default Button;