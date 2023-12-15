import { useEffect, useState } from 'react';
import { MemberDto } from '../data/member';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { MembershipDto } from '../data/membership';
import { useApiClient } from '../api/ApiClientContext';
import { AddressDto } from '../data/address';
import { TextInput } from '../utils/TextInput';
import { useNavigate } from 'react-router-dom';
import { unrapNestedFields } from '../utils/unrapNestedFields';
import { useSetField } from '../utils/setField';

export default function MemberDetail() {
  const defaultMember: MemberDto = {
    id: 0,
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    address: {
      street: '',
      streetNumber: '',
      zip: '',
      city: '',
    },
    membership: {
      id: null as unknown as number,
      name: '',
      fee: 0,
    },
  };

  const [member, setMember] = useState(defaultMember);
  const [memberships, setMemberships] = useState(
    null as MembershipDto[] | null,
  );
  const [validationErrors, setValidationErrors] = useState(
    {} as Record<keyof MemberDto, string>,
  );
  const { id } = useParams();
  const api = useApiClient();
  const navigate = useNavigate();

  const setField = useSetField(setMember);
  const addressErrors = unrapNestedFields(validationErrors, 'address.');

  function setAddressField(key: keyof AddressDto, value: string) {
    const newAddress = { ...member.address, ...{ [key]: value } };
    setField('address', newAddress);
  }

  useEffect(() => {
    async function fetchData() {
      const membershipsResult = await api.memberships.getAll();

      if (membershipsResult.error) {
        console.log(membershipsResult.error);
        return;
      }

      if (!membershipsResult.value) {
        return;
      }

      setMemberships(membershipsResult.value);

      const memberships = membershipsResult.value;

      if (id == 'new' && memberships.length > 0) {
        setMember((member) => ({
          ...member,
          ...{ membership: memberships[0] },
        }));
        return;
      }

      if (!id) {
        return;
      }

      const memberResult = await api.members.getById(id);

      if (memberResult.error) {
        console.log(memberResult.error);
        return;
      }

      if (!memberResult.value) {
        return;
      }

      setMember(memberResult.value);
    }

    fetchData();
  }, [api, id]);

  function findMembership(id: number) {
    if (memberships) {
      for (const membership of memberships) {
        if (membership.id == id) {
          return membership;
        }
      }
    }
  }

  function setMembership(id: number) {
    if (member) {
      const newMembership = findMembership(id);

      if (newMembership) {
        setMember({ ...member, ...{ membership: newMembership } });
      }
    }
  }

  function memberShipInput() {
    if (memberships) {
      return (
        <FormControl>
          <InputLabel id="demo-simple-select-label">Membership</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={member?.membership.id ?? memberships[0].id}
            label="Membership"
            onChange={(e) => setMembership(e.target.value as number)}
            sx={{ width: '200px' }}
          >
            {memberships?.map((m) => (
              <MenuItem key={m.id} value={m.id}>
                {m.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    } else {
      return (
        <FormControl>
          <InputLabel id="demo-simple-select-label">Membership</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={0}
            label="Membership"
            sx={{ width: '200px' }}
          >
            <MenuItem value={0}>Loading...</MenuItem>
          </Select>
        </FormControl>
      );
    }
  }

  async function save() {
    if (id && member) {
      if (id == 'new' && member.membership.id) {
        const result = await api.members.create(member);

        setValidationErrors({} as Record<keyof MemberDto, string>);

        if (result.error) {
          setValidationErrors(result.error.fields);
          return;
        }

        if (result.status == 201) {
          navigate('/members');
        }
      } else {
        const result = await api.members.update(id, member);

        setValidationErrors({} as Record<keyof MemberDto, string>);

        if (result.error) {
          setValidationErrors(result.error.fields);
          return;
        }

        if (result.status == 204) {
          navigate('/members');
        }
      }
    }
  }

  return (
    <div>
      <form>
        <Stack spacing={2}>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <TextInput
              label="First Name"
              record={member}
              errors={validationErrors}
              recordKey="firstName"
              onChange={(key, value) => setField(key, value)}
            />
            <TextInput
              label="Last Name"
              record={member}
              errors={validationErrors}
              recordKey="lastName"
              onChange={(key, value) => setField(key, value)}
            />
          </Stack>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <TextInput
              label="Username"
              record={member}
              errors={validationErrors}
              recordKey="userName"
              onChange={(key, value) => setField(key, value)}
            />
            <TextInput
              label="Email"
              record={member}
              errors={validationErrors}
              recordKey="email"
              onChange={(key, value) => setField(key, value)}
            />
          </Stack>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <TextInput
              label="Street"
              record={member.address}
              errors={addressErrors}
              recordKey="street"
              onChange={(key, value) => setAddressField(key, value)}
            />
            <TextInput
              label="Streetnumber"
              record={member.address}
              errors={addressErrors}
              recordKey="streetNumber"
              onChange={(key, value) => setAddressField(key, value)}
            />
          </Stack>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <TextInput
              label="City"
              record={member.address}
              errors={addressErrors}
              recordKey="city"
              onChange={(key, value) => setAddressField(key, value)}
            />
            <TextInput
              label="Zip"
              record={member.address}
              errors={addressErrors}
              recordKey="zip"
              onChange={(key, value) => setAddressField(key, value)}
            />
          </Stack>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            {memberShipInput()}
          </Stack>
        </Stack>
        <Button
          sx={{ marginTop: 2 }}
          variant="contained"
          onClick={() => save()}
        >
          Save
        </Button>
      </form>
    </div>
  );
}
