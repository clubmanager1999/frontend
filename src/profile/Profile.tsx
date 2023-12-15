import { Button, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { ProfileDto } from '../data/profile';
import { useApiClient } from '../api/ApiClientContext';
import { AddressDto } from '../data/address';
import { TextInput } from '../utils/TextInput';
import { unrapNestedFields } from '../utils/unrapNestedFields';
import { useSetField } from '../utils/setField';

function Profile() {
  const defaultProfile: ProfileDto = {
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

  const [profile, setProfile] = useState(defaultProfile);
  const [validationErrors, setValidationErrors] = useState(
    {} as Record<keyof ProfileDto, string>,
  );
  const api = useApiClient();

  const setField = useSetField(setProfile);
  const addressErrors = unrapNestedFields(validationErrors, 'address.');

  function setAddressField(key: keyof AddressDto, value: string) {
    const newAddress = { ...profile.address, ...{ [key]: value } };
    setField('address', newAddress);
  }

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
            <TextInput
              label="First Name"
              record={profile}
              errors={validationErrors}
              recordKey="firstName"
              onChange={(key, value) => setField(key, value)}
            />
            <TextInput
              label="Last Name"
              record={profile}
              errors={validationErrors}
              recordKey="lastName"
              onChange={(key, value) => setField(key, value)}
            />
          </Stack>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <TextInput
              label="Username"
              record={profile}
              errors={validationErrors}
              recordKey="userName"
              onChange={(key, value) => setField(key, value)}
            />
            <TextInput
              label="Email"
              record={profile}
              errors={validationErrors}
              recordKey="email"
              onChange={(key, value) => setField(key, value)}
            />
          </Stack>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <TextInput
              label="Street"
              record={profile.address}
              errors={addressErrors}
              recordKey="street"
              onChange={(key, value) => setAddressField(key, value)}
            />
            <TextInput
              label="Streetnumber"
              record={profile.address}
              errors={addressErrors}
              recordKey="streetNumber"
              onChange={(key, value) => setAddressField(key, value)}
            />
          </Stack>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <TextInput
              label="City"
              record={profile.address}
              errors={addressErrors}
              recordKey="city"
              onChange={(key, value) => setAddressField(key, value)}
            />
            <TextInput
              label="Zip"
              record={profile.address}
              errors={addressErrors}
              recordKey="zip"
              onChange={(key, value) => setAddressField(key, value)}
            />
          </Stack>
        </Stack>
        <Button
          sx={{ marginTop: 2 }}
          variant="contained"
          onClick={() => update()}
        >
          Save
        </Button>
      </form>
    </div>
  );
}

export default Profile;
