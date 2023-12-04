import { Button, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { ProfileDto } from '../data/profile';
import { useApiClient } from '../api/ApiClientContext';
import { AddressDto } from '../data/address';
import { textInput } from '../utils/textInput';

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

  function profileTextInput(label: string, key: keyof ProfileDto) {
    return textInput<ProfileDto>(label, profile, key, (value) => {
      if (profile) {
        setProfile({ ...profile, ...{ [key]: value } });
      }
    });
  }

  function addressTextInput(label: string, key: keyof AddressDto) {
    return textInput<AddressDto>(label, profile?.address, key, (value) => {
      if (profile) {
        const newAddress = { ...profile.address, ...{ [key]: value } };
        setProfile({ ...profile, ...{ address: newAddress } });
      }
    });
  }

  function update() {
    if (profile) {
      api.updateProfile(profile);
    }
  }

  return (
    <div>
      <form>
        <Stack spacing={2}>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            {profileTextInput('First Name', 'firstName')}
            {profileTextInput('Last Name', 'lastName')}
          </Stack>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            {profileTextInput('Username', 'userName')}
            {profileTextInput('Email', 'email')}
          </Stack>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            {addressTextInput('Street', 'street')}
            {addressTextInput('Streetnumber', 'streetNumber')}
          </Stack>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            {addressTextInput('City', 'city')}
            {addressTextInput('Zip', 'zip')}
          </Stack>
        </Stack>
        <Button variant="contained" onClick={() => update()}>
          Save
        </Button>
      </form>
    </div>
  );
}

export default Profile;
