import { Button, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { ProfileDto } from '../data/profile';
import { useApiClient } from '../api/ApiClientContext';
import { AddressDto } from '../data/address';
import { textInput } from '../utils/textInput';
import { unrapNestedFields } from '../utils/unrapNestedFields';

function Profile() {
  const [profile, setProfile] = useState(null as ProfileDto | null);
  const [validationErrors, setValidationErrors] = useState(
    {} as Record<keyof ProfileDto, string>,
  );
  const api = useApiClient();

  useEffect(() => {
    async function fetchData() {
      const profileResult = await api.profile.get();

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
    return textInput<ProfileDto>(
      label,
      profile,
      validationErrors,
      key,
      (value) => {
        if (profile) {
          setProfile({ ...profile, ...{ [key]: value } });
        }
      },
    );
  }

  function addressTextInput(label: string, key: keyof AddressDto) {
    const errors = unrapNestedFields(validationErrors, 'address.');

    return textInput<AddressDto>(
      label,
      profile?.address,
      errors,
      key,
      (value) => {
        if (profile) {
          const newAddress = { ...profile.address, ...{ [key]: value } };
          setProfile({ ...profile, ...{ address: newAddress } });
        }
      },
    );
  }

  async function update() {
    if (profile) {
      const result = await api.profile.update(profile);

      if (result?.error?.fields) {
        setValidationErrors(result.error.fields);
      }
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
