import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { CreditorDto } from '../data/creditor';

interface CreditorInputProps {
  creditor?: CreditorDto;
  creditors: CreditorDto[];
  onSelect: (creditor: CreditorDto) => void;
}

export default function CreditorInput(props: CreditorInputProps) {
  return (
    <FormControl>
      <InputLabel id="reference">Creditor</InputLabel>
      <Select
        labelId="reference"
        value={props.creditor?.id ?? ''}
        label="Creditor"
        onChange={(e) => {
          const id = e.target.value as number;
          props.onSelect(props.creditors.find((x) => x.id == id)!);
        }}
        sx={{ width: '200px' }}
      >
        {props.creditors.map((creditor) => (
          <MenuItem key={creditor.id} value={creditor.id}>
            {creditor.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
