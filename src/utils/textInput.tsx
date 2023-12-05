import { TextField } from '@mui/material';

export function textInput<T>(
  label: string,
  record: T | null | undefined,
  errors: Record<keyof T, string>,
  key: keyof T,
  onChange: (value: string) => void,
) {
  return (
    <TextField
      type="text"
      variant="outlined"
      color="secondary"
      label={label}
      value={record?.[key] ?? ''}
      error={!!errors[key]}
      helperText={errors[key]}
      onChange={(e) => onChange(e.target.value)}
      required
      sx={{ mb: 4, width: '200px' }}
    />
  );
}
