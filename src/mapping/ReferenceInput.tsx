import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { CreditorDto } from '../data/creditor';
import { DonorDto } from '../data/donor';
import { MappingDto } from '../data/mapping';
import { MemberDto } from '../data/member';
import { ReferenceDto } from '../data/reference';

interface ReferenceOptions {
  creditors: CreditorDto[];
  donors: DonorDto[];
  members: MemberDto[];
}

interface ReferenceInputProps {
  mapping: MappingDto;
  options: ReferenceOptions;
  onSelect: (reference: ReferenceDto) => void;
}

function getId(reference: ReferenceDto) {
  switch (reference.type) {
    case 'creditor':
      return reference.creditor.id;
    case 'donor':
      return reference.donor.id;
    case 'member':
      return reference.member.id;
  }
}

function getValues(mapping: MappingDto, options: ReferenceOptions) {
  switch (mapping.reference.type) {
    case 'creditor':
      return options.creditors.map((x) => ({
        id: x.id,
        title: x.name,
        value: x,
      }));
    case 'donor':
      return options.donors.map((x) => ({
        id: x.id,
        title: `${x.firstName} ${x.lastName}`,
        value: x,
      }));
    case 'member':
      return options.members.map((x) => ({
        id: x.id,
        title: `${x.firstName} ${x.lastName}`,
        value: x,
      }));
  }
}

function getReference(
  id: number,
  type: ReferenceDto['type'],
  options: ReferenceOptions,
): ReferenceDto {
  switch (type) {
    case 'creditor': {
      const creditor = options.creditors.find((x) => x.id == id)!;

      return { type: 'creditor', creditor };
    }
    case 'donor': {
      const donor = options.donors.find((x) => x.id == id)!;

      return { type: 'donor', donor };
    }
    case 'member': {
      const member = options.members.find((x) => x.id == id)!;

      return { type: 'member', member };
    }
  }
}

export default function ReferenceInput(props: ReferenceInputProps) {
  return (
    <FormControl>
      <InputLabel id="reference">Reference</InputLabel>
      <Select
        labelId="reference"
        value={getId(props.mapping.reference)}
        label="Membership"
        onChange={(e) => {
          props.onSelect(
            getReference(
              e.target.value as number,
              props.mapping.reference.type,
              props.options,
            ),
          );
        }}
        sx={{ width: '200px' }}
      >
        {getValues(props.mapping, props.options).map((x) => (
          <MenuItem key={x.id} value={x.id}>
            {x.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
