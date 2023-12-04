import { Stack, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { ProfileDto } from '../data/profile';
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

function Profile() {
  const [profile, setProfile] = useState(null as ProfileDto | null);
  const api = useApiClient();

  useEffect(() => {
    async function fetchData() {
      const profileResult = await api.fetchProfile();

      if (profileResult.error) {
        console.log(profileResult.error);
        return;
      }

      if (!profileResult.value) {
        return;
      }

      setProfile(profileResult.value);
    }

    fetchData();
  }, [api]);

  return (
    <div>
      <form>
        <Stack spacing={2}>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            {textInput('First Name', profile?.firstName)}
            {textInput('Last Name', profile?.lastName)}
          </Stack>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            {textInput('Username', profile?.userName)}
            {textInput('Email', profile?.email)}
          </Stack>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            {textInput('Street', profile?.address.street)}
            {textInput('Streetnumber', profile?.address.streetNumber)}
          </Stack>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            {textInput('City', profile?.address.city)}
            {textInput('Zip', profile?.address.zip)}
          </Stack>
        </Stack>
      </form>
    </div>
  );
}

export default Profile;
