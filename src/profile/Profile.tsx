import { Stack, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { ProfileDto } from '../data/profile';
import { useApiClient } from '../api/ApiClientContext';

function Profile() {
  const [profile, setProfile] = useState(null as ProfileDto | null);
  const api = useApiClient();

  useEffect(() => {
    async function fetchData() {
      const result = await api.fetchProfile();

      if (result.value) {
        setProfile(result.value);
      }

      if (result.error) {
        console.log(result.error);
      }
    }

    fetchData();
  }, [api]);

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
