import { useEffect, useState } from 'react';
import { MappingDto } from '../data/mapping';
import { Button, Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useApiClient } from '../api/ApiClientContext';
import { useNavigate } from 'react-router-dom';
import { ReferenceDto } from '../data/reference';
import { Result } from '../api/HttpClient';
import { CreditorDto } from '../data/creditor';
import { DonorDto } from '../data/donor';
import { MemberDto } from '../data/member';
import { PurposeDto } from '../data/purpose';
import { AreaDto } from '../data/area';
import SelectInput from './SelectInput';
import ReferenceInput from './ReferenceInput';
import ReferenceTypeInput from './ReferenceTypeInput';
import { TextInput } from '../utils/TextInput';
import { useSetField } from '../utils/setField';

interface Options {
  creditors: CreditorDto[];
  donors: DonorDto[];
  members: MemberDto[];
  purposes: PurposeDto[];
  areas: AreaDto[];
}

function unwrap<T, E>(result: Result<T, E>) {
  if (result.error) {
    throw result.error;
  }

  return result.value;
}

export default function MappingDetail() {
  const defaultMapping: MappingDto = {
    id: 0,
    matcher: '',
  };

  const defaultOptions: Options = {
    creditors: [],
    donors: [],
    members: [],
    purposes: [],
    areas: [],
  };

  const [mapping, setMapping] = useState(defaultMapping);
  const [options, setOptions] = useState(defaultOptions);
  const [validationErrors, setValidationErrors] = useState(
    {} as Record<keyof MappingDto, string>,
  );
  const { id } = useParams();
  const api = useApiClient();
  const navigate = useNavigate();

  const setField = useSetField(setMapping);

  useEffect(() => {
    async function fetchData() {
      const creditors = unwrap(await api.creditors.getAll()) ?? [];
      const donors = unwrap(await api.donors.getAll()) ?? [];
      const members = unwrap(await api.members.getAll()) ?? [];
      const purposes = unwrap(await api.purposes.getAll()) ?? [];
      const areas = unwrap(await api.areas.getAll()) ?? [];

      setOptions({
        creditors,
        donors,
        members,
        purposes,
        areas,
      });

      if (!id || id == 'new') {
        return;
      }

      const mappingResult = await api.mappings.getById(id);

      if (mappingResult.error) {
        console.log(mappingResult.error);
        return;
      }

      if (!mappingResult.value) {
        return;
      }

      setMapping(mappingResult.value);
    }

    fetchData();
  }, [api, id]);

  async function save() {
    if (id && mapping) {
      if (id == 'new') {
        const result = await api.mappings.create(mapping);

        setValidationErrors({} as Record<keyof MappingDto, string>);

        if (result?.error?.fields) {
          setValidationErrors(result.error.fields);
          return;
        }

        if (result.status == 201) {
          navigate('/mappings');
        }
      } else {
        const result = await api.mappings.update(id, mapping);

        setValidationErrors({} as Record<keyof MappingDto, string>);

        if (result.error) {
          setValidationErrors(result.error.fields);
          return;
        }

        if (result.status == 204) {
          navigate('/mappings');
        }
      }
    }
  }

  const purposeOptions = Object.fromEntries(
    options.purposes.map((area) => [area.id, area.name]),
  );

  function setPurpose(id: number) {
    const purpose = options.purposes.find((area) => area.id == id)!;

    setMapping((m) => ({
      ...m,
      ...{ purpose },
    }));
  }

  const areaOptions = Object.fromEntries(
    options.areas.map((area) => [area.id, area.name]),
  );

  function setArea(id: number) {
    const area = options.areas.find((area) => area.id == id)!;

    setMapping((m) => ({
      ...m,
      ...{ area },
    }));
  }

  const activeTypes = {
    creditor: options.creditors.length > 0,
    donor: options.donors.length > 0,
    member: options.members.length > 0,
  };

  function setReferenceType(type: ReferenceDto['type']) {
    switch (type) {
      case 'creditor':
        if (options.creditors.length > 0) {
          setMapping((m) => ({
            ...m,
            ...{ reference: { type, creditor: options.creditors[0] } },
          }));
        }
        break;
      case 'donor':
        if (options.donors.length > 0) {
          setMapping((m) => ({
            ...m,
            ...{ reference: { type, donor: options.donors[0] } },
          }));
        }
        break;
      case 'member':
        if (options.members.length > 0) {
          setMapping((m) => ({
            ...m,
            ...{ reference: { type, member: options.members[0] } },
          }));
        }
        break;
    }
  }

  function setReference(reference: ReferenceDto) {
    setMapping((m) => ({
      ...m,
      ...{ reference },
    }));
  }

  return (
    <div>
      <form>
        <Stack spacing={2}>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <TextInput
              label="Matcher"
              record={mapping}
              errors={validationErrors}
              recordKey="matcher"
              onChange={(key, value) => setField(key, value)}
            />
          </Stack>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <SelectInput
              title="Purpose"
              options={purposeOptions}
              value={mapping.purpose?.id}
              onChange={(id) => setPurpose(id)}
            ></SelectInput>
          </Stack>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <SelectInput
              title="Area"
              options={areaOptions}
              value={mapping.area?.id}
              onChange={(id) => setArea(id)}
            ></SelectInput>
          </Stack>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <ReferenceTypeInput
              type={mapping?.reference?.type}
              activeTypes={activeTypes}
              onSelect={(type) => setReferenceType(type)}
            />
          </Stack>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <ReferenceInput
              mapping={mapping}
              options={options}
              onSelect={(reference) => setReference(reference)}
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
