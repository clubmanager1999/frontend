import { useEffect, useState } from 'react';
import { MembershipDto } from '../data/membership';
import { Button, Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useApiClient } from '../api/ApiClientContext';
import { textInput } from '../utils/textInput';
import { useNavigate } from 'react-router-dom';

export default function MembershipDetail() {
  const defaultMembership: MembershipDto = {
    id: 0,
    name: '',
    fee: 0,
  };

  const [membership, setMembership] = useState(defaultMembership);
  const [validationErrors, setValidationErrors] = useState(
    {} as Record<keyof MembershipDto, string>,
  );
  const { id } = useParams();
  const api = useApiClient();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      if (!id || id == 'new') {
        return;
      }

      const membershipResult = await api.memberships.getById(id?.toString());

      if (membershipResult.error) {
        console.log(membershipResult.error);
        return;
      }

      if (!membershipResult.value) {
        return;
      }

      setMembership(membershipResult.value);
    }

    fetchData();
  }, [api, id]);

  function membershipTextInput(label: string, key: keyof MembershipDto) {
    return textInput<MembershipDto>(
      label,
      membership,
      validationErrors,
      key,
      (value) => {
        if (membership) {
          setMembership({ ...membership, ...{ [key]: value } });
        }
      },
    );
  }

  async function save() {
    if (id && membership) {
      if (id == 'new') {
        const result = await api.memberships.create(membership);

        setValidationErrors({} as Record<keyof MembershipDto, string>);

        if (result.error) {
          setValidationErrors(result.error.fields);
          return;
        }

        if (result.status == 201) {
          navigate('/memberships');
        }
      } else {
        const result = await api.memberships.update(id, membership);

        setValidationErrors({} as Record<keyof MembershipDto, string>);

        if (result.error) {
          setValidationErrors(result.error.fields);
          return;
        }

        if (result.status == 204) {
          navigate('/memberships');
        }
      }
    }
  }

  return (
    <div>
      <form>
        <Stack spacing={2} direction="row">
          {membershipTextInput('Name', 'name')}
          {membershipTextInput('Fee', 'fee')}
        </Stack>
        <Button
          variant="contained"
          sx={{ marginTop: 2 }}
          onClick={() => save()}
        >
          Save
        </Button>
      </form>
    </div>
  );
}
