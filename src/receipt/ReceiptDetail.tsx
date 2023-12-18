import { useEffect, useState } from 'react';
import { ReceiptDto } from '../data/receipt';
import { Button, Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useApiClient } from '../api/ApiClientContext';
import { TextInput } from '../utils/TextInput';
import { useNavigate } from 'react-router-dom';
import { useSetField } from '../utils/setField';
import CreditorInput from './CreditorInput';
import { CreditorDto } from '../data/creditor';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const ISO_LOCAL_DATE = 'YYYY-MM-DD';

export default function ReceiptDetail() {
  const defaultReceipt: ReceiptDto = {
    id: 0,
    name: '',
    validFrom: '',
    validTo: '',
  };

  const [receipt, setReceipt] = useState(defaultReceipt);
  const [creditors, setCreditors] = useState([] as CreditorDto[]);
  const [validationErrors, setValidationErrors] = useState(
    {} as Record<keyof ReceiptDto, string>,
  );
  const { id } = useParams();
  const api = useApiClient();
  const navigate = useNavigate();

  const setField = useSetField(setReceipt);

  useEffect(() => {
    async function fetchData() {
      const result = await api.creditors.getAll();

      if (result.error) {
        console.log(result.error);
        return;
      }

      if (result.value) {
        setCreditors(result.value);
      }

      if (!id || id == 'new') {
        return;
      }

      const receiptResult = await api.receipts.getById(id);

      if (receiptResult.error) {
        console.log(receiptResult.error);
        return;
      }

      if (!receiptResult.value) {
        return;
      }

      setReceipt(receiptResult.value);
    }

    fetchData();
  }, [api, id]);

  async function save() {
    if (id) {
      if (id == 'new') {
        const result = await api.receipts.create(receipt);

        setValidationErrors({} as Record<keyof ReceiptDto, string>);

        if (result?.error?.fields) {
          setValidationErrors(result.error.fields);
          return;
        }

        if (result.status == 201) {
          navigate('/receipts');
        }
      } else {
        const result = await api.receipts.update(id, receipt);

        setValidationErrors({} as Record<keyof ReceiptDto, string>);

        if (result?.error?.fields) {
          setValidationErrors(result.error.fields);
          return;
        }

        if (result.status == 204) {
          navigate('/receipts');
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
              label="Name"
              record={receipt}
              errors={validationErrors}
              recordKey="name"
              onChange={(key, value) => setField(key, value)}
            />
          </Stack>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <DatePicker
              label="Valid from"
              value={dayjs(receipt.validFrom)}
              onChange={(v) => setField('validFrom', v?.format(ISO_LOCAL_DATE))}
            />
            <DatePicker
              label="Valid to"
              value={dayjs(receipt.validTo)}
              onChange={(v) => setField('validTo', v?.format(ISO_LOCAL_DATE))}
            />
          </Stack>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <CreditorInput
              creditor={receipt.creditor}
              creditors={creditors}
              onSelect={(creditor) => setField('creditor', creditor)}
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
