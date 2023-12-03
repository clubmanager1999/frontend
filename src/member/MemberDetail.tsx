import { useEffect, useState } from 'react';
import { MemberDto } from '../data/member';
import { useAuth } from 'react-oidc-context';
import { Stack, TextField } from '@mui/material';
import { useParams } from 'react-router-dom';

export default function MemberDetail() {
  const auth = useAuth();
  const [member, setMember] = useState(null as MemberDto | null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://localhost:8080/api/members/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });

      if (response.status == 200) {
        setMember(await response.json());
      } else {
        if (response.status >= 400) {
          console.log(await response.text());
        }
      }
    }

    fetchData();
  }, [auth.user?.access_token, id]);

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
