import { useApiClient } from '../api/ApiClientContext';
import { DonorDto } from '../data/donor';
import DataTable, { DataColumn } from '../table/DataTable';

export default function DonorList() {
  const api = useApiClient();
  const columns: DataColumn<DonorDto>[] = [
    { title: 'Name', value: (m) => `${m.firstName} ${m.lastName}` },
    {
      title: 'Address',
      value: (m) =>
        `${m.address.street} ${m.address.streetNumber} ${m.address.city}`,
    },
  ];

  return (
    <DataTable
      client={api.donors}
      path={'/donors'}
      columns={columns}
      summarize={(m) => `${m?.firstName} ${m?.lastName}`}
    />
  );
}
