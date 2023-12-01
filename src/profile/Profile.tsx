import { Stack, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAuth } from 'react-oidc-context';
import { ProfileDto } from '../data/profile';

function Profile() {
  const auth = useAuth();
  const [profile, setProfile] = useState(null as ProfileDto | null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:8080/api/profile', {
        headers: {
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });

      if (response.status == 200) {
        setProfile(await response.json());
      } else {
        if (response.status >= 400) {
          console.log(await response.text());
        }
      }
    }

    fetchData();
  }, [auth.user?.access_token]);

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
              value={profile?.firstName ?? ''}
              required
            />
            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="Last Name"
              value={profile?.lastName ?? ''}
              required
            />
          </Stack>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="Username"
              value={profile?.userName ?? ''}
              required
              sx={{ mb: 4 }}
            />
            <TextField
              type="email"
              variant="outlined"
              color="secondary"
              label="Email"
              value={profile?.email ?? ''}
              required
              sx={{ mb: 4 }}
            />
          </Stack>
        </Stack>
      </form>
    </div>
  );
}

export default Profile;
