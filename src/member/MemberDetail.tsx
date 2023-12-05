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
import { textInput } from '../utils/textInput';
import { useNavigate } from 'react-router-dom';

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
  const { id } = useParams();
  const api = useApiClient();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const membershipsResult = await api.fetchMemberships();

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

      const memberResult = await api.fetchMember(id);

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

  function memberTextInput(label: string, key: keyof MemberDto) {
    return textInput<MemberDto>(label, member, key, (value) => {
      if (member) {
        setMember({ ...member, ...{ [key]: value } });
      }
    });
  }

  function addressTextInput(label: string, key: keyof AddressDto) {
    return textInput<AddressDto>(label, member?.address, key, (value) => {
      if (member) {
        const newAddress = { ...member.address, ...{ [key]: value } };
        setMember({ ...member, ...{ address: newAddress } });
      }
    });
  }

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
            sx={{ mb: 4, width: '200px' }}
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
            sx={{ mb: 4, width: '200px' }}
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
        const result = await api.createMember(member);

        if (result.status == 201) {
          navigate('/members');
        }
      } else {
        const result = await api.updateMember(id, member);

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
            {memberTextInput('First Name', 'firstName')}
            {memberTextInput('Last Name', 'lastName')}
          </Stack>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            {memberTextInput('Username', 'userName')}
            {memberTextInput('Email', 'email')}
          </Stack>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            {addressTextInput('Street', 'street')}
            {addressTextInput('Streetnumber', 'streetNumber')}
          </Stack>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            {addressTextInput('City', 'city')}
            {addressTextInput('Zip', 'zip')}
          </Stack>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            {memberShipInput()}
          </Stack>
        </Stack>
        <Button variant="contained" onClick={() => save()}>
          Save
        </Button>
      </form>
    </div>
  );
}
