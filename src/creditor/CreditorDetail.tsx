import { useEffect, useState } from 'react';
import { CreditorDto } from '../data/creditor';
import { Button, Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useApiClient } from '../api/ApiClientContext';
import { textInput } from '../utils/textInput';
import { useNavigate } from 'react-router-dom';

export default function CreditorDetail() {
  const defaultCreditor: CreditorDto = {
    id: 0,
    name: '',
  };

  const [creditor, setCreditor] = useState(defaultCreditor);
  const [validationErrors, setValidationErrors] = useState(
    {} as Record<keyof CreditorDto, string>,
  );
  const { id } = useParams();
  const api = useApiClient();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      if (!id || id == 'new') {
        return;
      }

      const creditorResult = await api.creditors.getById(id);

      if (creditorResult.error) {
        console.log(creditorResult.error);
        return;
      }

      if (!creditorResult.value) {
        return;
      }

      setCreditor(creditorResult.value);
    }

    fetchData();
  }, [api, id]);

  function creditorTextInput(label: string, key: keyof CreditorDto) {
    return textInput<CreditorDto>(
      label,
      creditor,
      validationErrors,
      key,
      (value) => {
        if (creditor) {
          setCreditor({ ...creditor, ...{ [key]: value } });
        }
      },
    );
  }

  async function save() {
    if (id) {
      if (id == 'new') {
        const result = await api.creditors.create(creditor);

        setValidationErrors({} as Record<keyof CreditorDto, string>);

        if (result.error) {
          setValidationErrors(result.error.fields);
          return;
        }

        if (result.status == 201) {
          navigate('/creditors');
        }
      } else {
        const result = await api.creditors.update(id, creditor);

        setValidationErrors({} as Record<keyof CreditorDto, string>);

        if (result.error) {
          setValidationErrors(result.error.fields);
          return;
        }

        if (result.status == 204) {
          navigate('/creditors');
        }
      }
    }
  }

  return (
    <div>
      <form>
        <Stack spacing={2}>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            {creditorTextInput('Name', 'name')}
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
