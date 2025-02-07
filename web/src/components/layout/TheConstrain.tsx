import {
  Breakpoint,
  Container,
  ContainerProps,
  useMediaQuery,
  useTheme,
} from '@mui/material';

export default function TheConstrain(props: ContainerProps) {
  const theme = useTheme();
  const isUpMaxWidth = useMediaQuery(
    theme.breakpoints.up(props.maxWidth || 'lg'),
  );
  return (
    <Container
      maxWidth="lg"
      disableGutters
      {...props}
      sx={{ paddingX: isUpMaxWidth ? 0 : '16px', ...props.sx }}
    />
  );
}
