import { useEffect, useState } from 'react';
import { MemberDto } from '../data/member';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { MembershipDto } from '../data/membership';
import { useApiClient } from '../api/ApiClientContext';

function textInput(label: string, value?: string) {
  return (
    <TextField
      type="text"
      variant="outlined"
      color="secondary"
      label={label}
      value={value ?? ''}
      required
      sx={{ mb: 4, width: '200px' }}
    />
  );
}

export default function MemberDetail() {
  const [member, setMember] = useState(null as MemberDto | null);
  const [memberships, setMemberships] = useState(
    null as MembershipDto[] | null,
  );
  const { id } = useParams();
  const api = useApiClient();

  useEffect(() => {
    async function fetchData() {
      if (!id) {
        return;
      }

      const membershipsResult = await api.fetchMemberships();

      if (membershipsResult.error) {
        console.log(membershipsResult.error);
        return;
      }

      if (!membershipsResult.value) {
        return;
      }

      setMemberships(membershipsResult.value);

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

  return (
    <div>
      <form>
        <Stack spacing={2}>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            {textInput('First Name', member?.firstName)}
            {textInput('Last Name', member?.lastName)}
          </Stack>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            {textInput('Username', member?.userName)}
            {textInput('Email', member?.email)}
          </Stack>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            {textInput('Street', member?.address.street)}
            {textInput('Streetnumber', member?.address.streetNumber)}
          </Stack>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            {textInput('City', member?.address.city)}
            {textInput('Zip', member?.address.zip)}
          </Stack>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <FormControl>
              <InputLabel id="demo-simple-select-label">Membership</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={member?.membership.id ?? 0}
                label="Membership"
                sx={{ mb: 4, width: '200px' }}
              >
                {memberships?.map((m) => (
                  <MenuItem key={m.id} value={m.id}>
                    {m.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Stack>
      </form>
    </div>
  );
}
