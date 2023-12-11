import { useEffect, useState } from 'react';
import { DonorDto } from '../data/donor';
import { Button, Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useApiClient } from '../api/ApiClientContext';
import { AddressDto } from '../data/address';
import { textInput } from '../utils/textInput';
import { useNavigate } from 'react-router-dom';
import { unrapNestedFields } from '../utils/unrapNestedFields';

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

  function donorTextInput(label: string, key: keyof DonorDto) {
    return textInput<DonorDto>(label, donor, validationErrors, key, (value) => {
      if (donor) {
        setDonor({ ...donor, ...{ [key]: value } });
      }
    });
  }

  function addressTextInput(label: string, key: keyof AddressDto) {
    const errors = unrapNestedFields(validationErrors, 'address.');

    return textInput<AddressDto>(
      label,
      donor?.address,
      errors,
      key,
      (value) => {
        if (donor) {
          const newAddress = { ...donor.address, ...{ [key]: value } };
          setDonor({ ...donor, ...{ address: newAddress } });
        }
      },
    );
  }

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
            {donorTextInput('First Name', 'firstName')}
            {donorTextInput('Last Name', 'lastName')}
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
