import { useEffect, useState } from 'react';
import { MemberDto } from '../data/member';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useApiClient } from '../api/ApiClientContext';
import AlertDialog from '../dialog/Dialog';

export default function MemberList() {
  const api = useApiClient();
  const [members, setMembers] = useState(null as MemberDto[] | null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [toDelete, setToDelete] = useState(null as MemberDto | null);

  useEffect(() => {
    async function fetchData() {
      const result = await api.members.getAll();

      if (result.value) {
        setMembers(result.value);
      }

      if (result.error) {
        console.log(result.error);
      }
    }

    fetchData();
  }, [api, dialogOpen]);

  async function deleteMember() {
    if (toDelete) {
      try {
        await api.members.delete(toDelete?.id.toString());
      } catch (e) {
        console.log(`Failed to delete member: ${e}`);
      }
    }

    setDialogOpen(false);
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Username</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Address</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Membership</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {members?.map((member) => (
              <TableRow
                key={member.firstName}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{member.userName}</TableCell>
                <TableCell>
                  {member.firstName} {member.lastName}
                </TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>
                  {member.address.street} {member.address.streetNumber}{' '}
                  {member.address.city}
                </TableCell>
                <TableCell>{member.membership.name}</TableCell>
                <TableCell>
                  <NavLink to={`/members/${member.id}`}>
                    <Button variant="contained">Edit</Button>
                  </NavLink>
                  <Button
                    variant="contained"
                    sx={{ marginLeft: '5px' }}
                    onClick={() => {
                      setToDelete(member);
                      setDialogOpen(true);
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <NavLink to={'/members/new'}>
        <Button sx={{ marginTop: '12px' }} variant="contained">
          Add
        </Button>
      </NavLink>
      <AlertDialog
        open={dialogOpen}
        title="Delete member"
        text={`Are you sure you want to delete ${toDelete?.firstName} ${toDelete?.lastName}`}
        onClose={() => {
          setDialogOpen(false);
          setToDelete(null);
        }}
        onConfirm={() => deleteMember()}
        onAbort={() => {
          setDialogOpen(false);
        }}
      />
    </div>
  );
}
