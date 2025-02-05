import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

type InputProps = TextFieldProps;

function Input(props: InputProps) {
  return <TextField {...props} />;
}

export default Input;