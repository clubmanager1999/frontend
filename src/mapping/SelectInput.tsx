import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

interface SelectInputProps<T> {
  title: string;
  options: T[];
  value?: T;
  getId: (t?: T) => number | undefined;
  getName: (t?: T) => string | undefined;
  onChange: (t: T) => void;
}

export default function SelectInput<T>(props: SelectInputProps<T>) {
  const lookUp = Object.fromEntries(
    props.options.map((t) => [props.getId(t), t]),
  );

  return (
    <FormControl>
      <InputLabel id="label">{props.title}</InputLabel>
      <Select
        labelId="label"
        label={props.title}
        value={props.getId(props.value) ?? ''}
        onChange={(e) => {
          props.onChange(lookUp[e.target.value as number]);
        }}
        sx={{ width: '200px' }}
      >
        {props.options.map((t) => (
          <MenuItem key={props.getId(t)} value={props.getId(t)}>
            {props.getName(t)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
