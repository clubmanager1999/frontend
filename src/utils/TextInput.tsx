import { TextField } from '@mui/material';

interface TextInputProps<T> {
  label: string;
  record: T | null | undefined;
  errors: Record<keyof T, string>;
  recordKey: keyof T;
  onChange: (key: keyof T, value: string) => void;
}

export function TextInput<T>(props: TextInputProps<T>) {
  return (
    <TextField
      type="text"
      variant="outlined"
      color="secondary"
      label={props.label}
      value={props.record?.[props.recordKey] ?? ''}
      error={!!props.errors[props.recordKey]}
      helperText={props.errors[props.recordKey]}
      onChange={(e) => props.onChange(props.recordKey, e.target.value)}
      required
      sx={{ mb: 4, width: '200px' }}
    />
  );
}
