import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { ReferenceDto } from '../data/reference';

interface ReferenceTypeInputProps {
  type?: ReferenceDto['type'];
  activeTypes: Record<ReferenceDto['type'], boolean>;
  onSelect: (type: ReferenceDto['type']) => void;
}

export default function ReferenceTypeInput(props: ReferenceTypeInputProps) {
  return (
    <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">
        Reference type
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={props.type ?? ''}
        onChange={(e) => props.onSelect(e.target.value as ReferenceDto['type'])}
      >
        <FormControlLabel
          disabled={!props.activeTypes['creditor']}
          value="creditor"
          control={<Radio />}
          label="Creditor"
        />
        <FormControlLabel
          disabled={!props.activeTypes['donor']}
          value="donor"
          control={<Radio />}
          label="Donor"
        />
        <FormControlLabel
          disabled={!props.activeTypes['member']}
          value="member"
          control={<Radio />}
          label="Member"
        />
      </RadioGroup>
    </FormControl>
  );
}
