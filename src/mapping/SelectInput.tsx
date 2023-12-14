import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

interface SelectInputProps {
  title: string;
  options: Record<number, string>;
  value?: number;
  onChange: (id: number) => void;
}

export default function SelectInput(props: SelectInputProps) {
  return (
    <FormControl>
      <InputLabel id="label">{props.title}</InputLabel>
      <Select
        labelId="label"
        label={props.title}
        value={props.value ?? ''}
        onChange={(e) => {
          props.onChange(e.target.value as number);
        }}
        sx={{ width: '200px' }}
      >
        {Object.entries(props.options).map(([id, value]) => (
          <MenuItem key={id} value={id}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
