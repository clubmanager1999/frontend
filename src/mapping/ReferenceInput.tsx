import { CreditorDto } from '../data/creditor';
import { DonorDto } from '../data/donor';
import { MemberDto } from '../data/member';
import { ReferenceDto } from '../data/reference';
import SelectInput from './SelectInput';

interface ReferenceTypeInputProps {
  reference: ReferenceDto | undefined;
  creditors: CreditorDto[];
  donors: DonorDto[];
  members: MemberDto[];
  onChange: (r: ReferenceDto) => void;
}

export default function ReferenceTypeInput(props: ReferenceTypeInputProps) {
  switch (props.reference?.type) {
    case 'creditor':
      return (
        <SelectInput
          title="Creditor"
          options={props.creditors}
          value={props.reference?.creditor}
          getId={(creditor) => creditor?.id}
          getName={(creditor) => creditor?.name}
          onChange={(creditor) =>
            props.onChange({
              type: 'creditor',
              creditor,
            })
          }
        />
      );
    case 'donor':
      return (
        <SelectInput
          title="Donors"
          options={props.donors}
          value={props.reference?.donor}
          getId={(donor) => donor?.id}
          getName={(donor) => `${donor?.firstName} ${donor?.lastName}`}
          onChange={(donor) =>
            props.onChange({
              type: 'donor',
              donor,
            })
          }
        />
      );
    case 'member':
      return (
        <SelectInput
          title="Creditor"
          options={props.members}
          value={props.reference?.member}
          getId={(member) => member?.id}
          getName={(member) => `${member?.firstName} ${member?.lastName}`}
          onChange={(member) =>
            props.onChange({
              type: 'member',
              member,
            })
          }
        />
      );
    default:
      return (
        <SelectInput
          title="Reference"
          options={[]}
          value={null}
          getId={() => undefined}
          getName={() => undefined}
          onChange={() => {}}
        />
      );
  }
}
