import { useEffect, useState } from 'react';
import { AreaDto } from '../data/area';
import { Button, Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useApiClient } from '../api/ApiClientContext';
import { textInput } from '../utils/textInput';
import { useNavigate } from 'react-router-dom';

export default function AreaDetail() {
  const defaultArea: AreaDto = {
    id: 0,
    name: '',
  };

  const [area, setArea] = useState(defaultArea);
  const [validationErrors, setValidationErrors] = useState(
    {} as Record<keyof AreaDto, string>,
  );
  const { id } = useParams();
  const api = useApiClient();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      if (!id || id == 'new') {
        return;
      }

      const areaResult = await api.areas.getById(id);

      if (areaResult.error) {
        console.log(areaResult.error);
        return;
      }

      if (!areaResult.value) {
        return;
      }

      setArea(areaResult.value);
    }

    fetchData();
  }, [api, id]);

  function areaTextInput(label: string, key: keyof AreaDto) {
    return textInput<AreaDto>(label, area, validationErrors, key, (value) => {
      if (area) {
        setArea({ ...area, ...{ [key]: value } });
      }
    });
  }

  async function save() {
    if (id) {
      if (id == 'new') {
        const result = await api.areas.create(area);

        setValidationErrors({} as Record<keyof AreaDto, string>);

        if (result.error) {
          setValidationErrors(result.error.fields);
          return;
        }

        if (result.status == 201) {
          navigate('/areas');
        }
      } else {
        const result = await api.areas.update(id, area);

        setValidationErrors({} as Record<keyof AreaDto, string>);

        if (result.error) {
          setValidationErrors(result.error.fields);
          return;
        }

        if (result.status == 204) {
          navigate('/areas');
        }
      }
    }
  }

  return (
    <div>
      <form>
        <Stack spacing={2}>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            {areaTextInput('Name', 'name')}
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