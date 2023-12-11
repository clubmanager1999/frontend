import { useApiClient } from '../api/ApiClientContext';
import { CreditorDto } from '../data/creditor';
import DataTable, { DataColumn } from '../table/DataTable';

export default function CreditorList() {
  const api = useApiClient();
  const columns: DataColumn<CreditorDto>[] = [
    { title: 'Name', value: (m) => m.name },
  ];

  return (
    <DataTable
      client={api.creditors}
      path={'/creditors'}
      columns={columns}
      summarize={(m) => m?.name ?? ''}
    />
  );
}
