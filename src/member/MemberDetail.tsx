import { useEffect, useState } from 'react';
import { MemberDto } from '../data/member';
import { Stack, TextField } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useApiClient } from '../api/ApiClientContext';

export default function MemberDetail() {
  const [member, setMember] = useState(null as MemberDto | null);
  const { id } = useParams();
  const api = useApiClient();

  useEffect(() => {
    async function fetchData() {
      if (!id) {
        return;
      }

      const result = await api.fetchMember(id);

      if (result.value) {
        setMember(result.value);
      }

      if (result.error) {
        console.log(result.error);
      }
    }

    fetchData();
  }, [api, id]);

  return (
    <div>
      <form>
        <Stack spacing={2}>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="First Name"
              value={member?.firstName ?? ''}
              required
            />
            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="Last Name"
              value={member?.lastName ?? ''}
              required
            />
          </Stack>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="Username"
              value={member?.userName ?? ''}
              required
              sx={{ mb: 4 }}
            />
            <TextField
              type="email"
              variant="outlined"
              color="secondary"
              label="Email"
              value={member?.email ?? ''}
              required
              sx={{ mb: 4 }}
            />
          </Stack>
        </Stack>
      </form>
    </div>
  );
}
