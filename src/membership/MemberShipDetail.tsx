import { useEffect, useState } from 'react';
import { MembershipDto } from '../data/membership';
import { Button, Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useApiClient } from '../api/ApiClientContext';
import { TextInput } from '../utils/TextInput';
import { useNavigate } from 'react-router-dom';
import { useSetField } from '../utils/setField';
import NoSubmitForm from '../form/NoSubmitForm';

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

  const setField = useSetField(setMembership);

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

  async function save() {
    if (id && membership) {
      if (id == 'new') {
        const result = await api.memberships.create(membership);

        setValidationErrors({} as Record<keyof MembershipDto, string>);

        if (result.error?.fields) {
          setValidationErrors(result.error.fields);
          return;
        }

        if (result.status == 201) {
          navigate('/memberships');
        }
      } else {
        const result = await api.memberships.update(id, membership);

        setValidationErrors({} as Record<keyof MembershipDto, string>);

        if (result.error?.fields) {
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
      <NoSubmitForm>
        <Stack spacing={2} direction="row">
          <TextInput
            label="Name"
            record={membership}
            errors={validationErrors}
            recordKey="name"
            onChange={(key, value) => setField(key, value)}
          />
          <TextInput
            label="Fee"
            record={membership}
            errors={validationErrors}
            recordKey="fee"
            onChange={(key, value) => setField(key, value)}
          />
        </Stack>
        <Button
          variant="contained"
          sx={{ marginTop: 2 }}
          onClick={() => save()}
        >
          Save
        </Button>
      </NoSubmitForm>
    </div>
  );
}
