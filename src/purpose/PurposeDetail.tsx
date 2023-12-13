import { useEffect, useState } from 'react';
import { PurposeDto } from '../data/purpose';
import { Button, Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useApiClient } from '../api/ApiClientContext';
import { textInput } from '../utils/textInput';
import { useNavigate } from 'react-router-dom';

export default function PurposeDetail() {
  const defaultPurpose: PurposeDto = {
    id: 0,
    name: '',
  };

  const [purpose, setPurpose] = useState(defaultPurpose);
  const [validationErrors, setValidationErrors] = useState(
    {} as Record<keyof PurposeDto, string>,
  );
  const { id } = useParams();
  const api = useApiClient();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      if (!id || id == 'new') {
        return;
      }

      const purposeResult = await api.purposes.getById(id);

      if (purposeResult.error) {
        console.log(purposeResult.error);
        return;
      }

      if (!purposeResult.value) {
        return;
      }

      setPurpose(purposeResult.value);
    }

    fetchData();
  }, [api, id]);

  function purposeTextInput(label: string, key: keyof PurposeDto) {
    return textInput<PurposeDto>(
      label,
      purpose,
      validationErrors,
      key,
      (value) => {
        if (purpose) {
          setPurpose({ ...purpose, ...{ [key]: value } });
        }
      },
    );
  }

  async function save() {
    if (id) {
      if (id == 'new') {
        const result = await api.purposes.create(purpose);

        setValidationErrors({} as Record<keyof PurposeDto, string>);

        if (result.error) {
          setValidationErrors(result.error.fields);
          return;
        }

        if (result.status == 201) {
          navigate('/purposes');
        }
      } else {
        const result = await api.purposes.update(id, purpose);

        setValidationErrors({} as Record<keyof PurposeDto, string>);

        if (result.error) {
          setValidationErrors(result.error.fields);
          return;
        }

        if (result.status == 204) {
          navigate('/purposes');
        }
      }
    }
  }

  return (
    <div>
      <form>
        <Stack spacing={2}>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            {purposeTextInput('Name', 'name')}
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
