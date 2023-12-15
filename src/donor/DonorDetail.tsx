import { useEffect, useState } from 'react';
import { DonorDto } from '../data/donor';
import { Button, Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useApiClient } from '../api/ApiClientContext';
import { AddressDto } from '../data/address';
import { TextInput } from '../utils/TextInput';
import { useNavigate } from 'react-router-dom';
import { unrapNestedFields } from '../utils/unrapNestedFields';
import { useSetField } from '../utils/setField';

export default function DonorDetail() {
  const defaultDonor: DonorDto = {
    id: 0,
    firstName: '',
    lastName: '',
    address: {
      street: '',
      streetNumber: '',
      zip: '',
      city: '',
    },
  };

  const [donor, setDonor] = useState(defaultDonor);
  const [validationErrors, setValidationErrors] = useState(
    {} as Record<keyof DonorDto, string>,
  );
  const { id } = useParams();
  const api = useApiClient();
  const navigate = useNavigate();

  const setField = useSetField(setDonor);
  const addressErrors = unrapNestedFields(validationErrors, 'address.');

  function setAddressField(key: keyof AddressDto, value: string) {
    const newAddress = { ...donor.address, ...{ [key]: value } };
    setField('address', newAddress);
  }

  useEffect(() => {
    async function fetchData() {
      if (!id || id == 'new') {
        return;
      }

      const donorResult = await api.donors.getById(id);

      if (donorResult.error) {
        console.log(donorResult.error);
        return;
      }

      if (!donorResult.value) {
        return;
      }

      setDonor(donorResult.value);
    }

    fetchData();
  }, [api, id]);

  async function save() {
    if (id && donor) {
      if (id == 'new') {
        const result = await api.donors.create(donor);

        setValidationErrors({} as Record<keyof DonorDto, string>);

        if (result.error) {
          setValidationErrors(result.error.fields);
          return;
        }

        if (result.status == 201) {
          navigate('/donors');
        }
      } else {
        const result = await api.donors.update(id, donor);

        setValidationErrors({} as Record<keyof DonorDto, string>);

        if (result.error) {
          setValidationErrors(result.error.fields);
          return;
        }

        if (result.status == 204) {
          navigate('/donors');
        }
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
              record={donor}
              errors={validationErrors}
              recordKey="firstName"
              onChange={(key, value) => setField(key, value)}
            />
            <TextInput
              label="Last Name"
              record={donor}
              errors={validationErrors}
              recordKey="lastName"
              onChange={(key, value) => setField(key, value)}
            />
          </Stack>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <TextInput
              label="Street"
              record={donor.address}
              errors={addressErrors}
              recordKey="street"
              onChange={(key, value) => setAddressField(key, value)}
            />
            <TextInput
              label="Streetnumber"
              record={donor.address}
              errors={addressErrors}
              recordKey="streetNumber"
              onChange={(key, value) => setAddressField(key, value)}
            />
          </Stack>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <TextInput
              label="City"
              record={donor.address}
              errors={addressErrors}
              recordKey="city"
              onChange={(key, value) => setAddressField(key, value)}
            />
            <TextInput
              label="Zip"
              record={donor.address}
              errors={addressErrors}
              recordKey="zip"
              onChange={(key, value) => setAddressField(key, value)}
            />
          </Stack>
        </Stack>
        <Button
          sx={{ marginTop: 2 }}
          variant="contained"
          onClick={() => save()}
        >
          Save
        </Button>
      </form>
    </div>
  );
}
