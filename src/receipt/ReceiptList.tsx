import { useApiClient } from '../api/ApiClientContext';
import { ReceiptDto } from '../data/receipt';
import DataTable, { DataColumn } from '../table/DataTable';

export default function ReceiptList() {
  const api = useApiClient();
  const columns: DataColumn<ReceiptDto>[] = [
    { title: 'Name', value: (m) => m.name },
    { title: 'Valid from', value: (m) => m.validFrom },
    { title: 'Valid to', value: (m) => m.validTo },
    { title: 'Creditor', value: (m) => m.creditor?.name ?? '' },
  ];

  return (
    <DataTable
      client={api.receipts}
      path={'/receipts'}
      columns={columns}
      summarize={(m) => m?.name ?? ''}
    />
  );
}
