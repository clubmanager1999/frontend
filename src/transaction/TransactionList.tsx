import { useApiClient } from '../api/ApiClientContext';
import { TransactionDto } from '../data/transaction';
import { ReferenceDto } from '../data/reference';
import DataTable, { DataColumn } from '../table/DataTable';

export default function TransactionList() {
  const api = useApiClient();
  const columns: DataColumn<TransactionDto>[] = [
    { title: 'Booking day', value: (m) => m.bookingDay },
    { title: 'Value day', value: (m) => m.valueDay },
    { title: 'Name', value: (m) => m.name },
    { title: 'Amount', value: (m) => m.amount.toString() },
    { title: 'Reference', value: (m) => referenceSummary(m.reference) ?? '' },
    { title: 'Receipt', value: (m) => m.name },
    { title: 'Purpose', value: (m) => m.name },
    { title: 'Area', value: (m) => m.area?.name ?? '' },
  ];

  function referenceSummary(reference?: ReferenceDto) {
    switch (reference?.type) {
      case 'creditor': {
        return reference.creditor.name;
      }
      case 'donor': {
        return `${reference.donor.firstName} ${reference.donor.lastName}`;
      }
      case 'member': {
        return `${reference.member.firstName} ${reference.member.lastName}`;
      }
    }
  }

  return (
    <DataTable
      client={api.transactions}
      path={'/transactions'}
      columns={columns}
      summarize={(m) => m?.description ?? ''}
    />
  );
}
