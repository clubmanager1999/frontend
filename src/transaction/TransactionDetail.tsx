import { useEffect, useState } from 'react';
import { TransactionDto } from '../data/transaction';
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
import SelectInput from '../mapping/SelectInput';
import ReferenceInput from '../mapping/ReferenceInput';
import ReferenceTypeInput from '../mapping/ReferenceTypeInput';
import { TextInput } from '../utils/TextInput';
import { useSetField } from '../utils/setField';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { ReceiptDto } from '../data/receipt';

const ISO_LOCAL_DATE = 'YYYY-MM-DD';

interface Options {
  creditors: CreditorDto[];
  donors: DonorDto[];
  members: MemberDto[];
  areas: AreaDto[];
  purposes: PurposeDto[];
  receipts: ReceiptDto[];
}

function unwrap<T, E>(result: Result<T, E>) {
  if (result.error) {
    throw result.error;
  }

  return result.value;
}

export default function TransactionDetail() {
  const defaultTransaction: TransactionDto = {
    id: 0,
    bookingDay: '',
    valueDay: '',
    name: '',
    description: '',
    amount: 0,
  };

  const defaultOptions: Options = {
    creditors: [],
    donors: [],
    members: [],
    areas: [],
    purposes: [],
    receipts: [],
  };

  const [transaction, setTransaction] = useState(defaultTransaction);
  const [options, setOptions] = useState(defaultOptions);
  const [validationErrors, setValidationErrors] = useState(
    {} as Record<keyof TransactionDto, string>,
  );
  const { id } = useParams();
  const api = useApiClient();
  const navigate = useNavigate();

  const setField = useSetField(setTransaction);

  useEffect(() => {
    async function fetchData() {
      const creditors = unwrap(await api.creditors.getAll()) ?? [];
      const donors = unwrap(await api.donors.getAll()) ?? [];
      const members = unwrap(await api.members.getAll()) ?? [];
      const areas = unwrap(await api.areas.getAll()) ?? [];
      const purposes = unwrap(await api.purposes.getAll()) ?? [];
      const receipts = unwrap(await api.receipts.getAll()) ?? [];

      setOptions({
        creditors,
        donors,
        members,
        areas,
        purposes,
        receipts,
      });

      if (!id || id == 'new') {
        return;
      }

      const transactionResult = await api.transactions.getById(id);

      if (transactionResult.error) {
        console.log(transactionResult.error);
        return;
      }

      if (!transactionResult.value) {
        return;
      }

      setTransaction(transactionResult.value);
    }

    fetchData();
  }, [api, id]);

  async function save() {
    if (id && transaction) {
      if (id == 'new') {
        const result = await api.transactions.create(transaction);

        setValidationErrors({} as Record<keyof TransactionDto, string>);

        if (result?.error?.fields) {
          setValidationErrors(result.error.fields);
          return;
        }

        if (result.status == 201) {
          navigate('/transactions');
        }
      } else {
        const result = await api.transactions.update(id, transaction);

        setValidationErrors({} as Record<keyof TransactionDto, string>);

        if (result.error?.fields) {
          setValidationErrors(result.error.fields);
          return;
        }

        if (result.status == 204) {
          navigate('/transactions');
        }
      }
    }
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
          setField('reference', {
            type,
            creditor: options.creditors[0],
          } as ReferenceDto);
        }
        break;
      case 'donor':
        if (options.donors.length > 0) {
          setField('reference', {
            type,
            donor: options.donors[0],
          } as ReferenceDto);
        }
        break;
      case 'member':
        if (options.members.length > 0) {
          setField('reference', {
            type,
            member: options.members[0],
          } as ReferenceDto);
        }
        break;
    }
  }

  return (
    <div>
      <form>
        <Stack spacing={2}>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <DatePicker
              label="Booking date"
              value={dayjs(transaction.bookingDay)}
              onChange={(v) =>
                setField('bookingDay', v?.format(ISO_LOCAL_DATE))
              }
            />
            <DatePicker
              label="Value date"
              value={dayjs(transaction.valueDay)}
              onChange={(v) => setField('valueDay', v?.format(ISO_LOCAL_DATE))}
            />
          </Stack>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <TextInput
              label="Name"
              record={transaction}
              errors={validationErrors}
              recordKey="name"
              onChange={(key, value) => setField(key, value)}
            />
          </Stack>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <TextInput
              label="Description"
              record={transaction}
              errors={validationErrors}
              recordKey="description"
              onChange={(key, value) => setField(key, value)}
            />
          </Stack>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <TextInput
              label="Amount"
              record={transaction}
              errors={validationErrors}
              recordKey="amount"
              onChange={(key, value) => setField(key, value)}
            />
          </Stack>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <SelectInput
              title="Area"
              options={options.areas}
              value={transaction.area}
              getName={(area) => area?.name}
              getId={(area) => area?.id}
              onChange={(area) => setField('area', area)}
            />
          </Stack>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <SelectInput
              title="Purpose"
              options={options.purposes}
              value={transaction.purpose}
              getName={(purpose) => purpose?.name}
              getId={(purpose) => purpose?.id}
              onChange={(purpose) => setField('purpose', purpose)}
            />
          </Stack>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <ReferenceTypeInput
              type={transaction?.reference?.type}
              activeTypes={activeTypes}
              onSelect={(type) => setReferenceType(type)}
            />
          </Stack>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <ReferenceInput
              reference={transaction.reference}
              creditors={options.creditors}
              donors={options.donors}
              members={options.members}
              onChange={(reference: ReferenceDto) =>
                setField('reference', reference)
              }
            />
          </Stack>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <SelectInput
              title="Receipt"
              options={options.receipts}
              value={transaction.receipt}
              getName={(receipt) => receipt?.name}
              getId={(receipt) => receipt?.id}
              onChange={(receipt) => setField('receipt', receipt)}
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
