import { useEffect, useState } from 'react';
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
import AlertDialog from '../dialog/Dialog';
import { CrudClient } from '../api/CrudClient';

export interface Data {
  id: number;
}

export interface DataColumn<T> {
  title: string;
  value: (t: T) => string;
}

export interface DataTableProps<T> {
  client: CrudClient<T>;
  path: string;
  columns: DataColumn<T>[];
  summarize: (t: T | null) => string;
}

export default function DataTable<T extends Data>(props: DataTableProps<T>) {
  const [dataObjects, setDataObjects] = useState(null as T[] | null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [toDelete, setToDelete] = useState(null as T | null);

  useEffect(() => {
    async function fetchData() {
      const result = await props.client.getAll();

      if (result.value) {
        setDataObjects(result.value);
      }

      if (result.error) {
        console.log(result.error);
      }
    }

    fetchData();
  }, [props.client, dialogOpen]);

  async function deleteObject() {
    if (toDelete) {
      try {
        await props.client.delete(toDelete?.id.toString());
      } catch (e) {
        console.log(`Failed to delete object: ${e}`);
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
              {props.columns.map((column) => (
                <TableCell key={column.title} sx={{ fontWeight: 'bold' }}>
                  {column.title}
                </TableCell>
              ))}
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {dataObjects?.map((dataObject) => (
              <TableRow
                key={dataObject.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {props.columns.map((column) => (
                  <TableCell key={column.title}>
                    {column.value(dataObject)}
                  </TableCell>
                ))}
                <TableCell>
                  <NavLink to={`${props.path}/${dataObject.id}`}>
                    <Button variant="contained">Edit</Button>
                  </NavLink>
                  <Button
                    variant="contained"
                    sx={{ marginLeft: '5px' }}
                    onClick={() => {
                      setToDelete(dataObject);
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
      <NavLink to={`${props.path}/new`}>
        <Button sx={{ marginTop: 2 }} variant="contained">
          Add
        </Button>
      </NavLink>
      <AlertDialog
        open={dialogOpen}
        title="Delete"
        text={`Are you sure you want to delete ${props.summarize(toDelete)}`}
        onClose={() => {
          setDialogOpen(false);
          setToDelete(null);
        }}
        onConfirm={() => deleteObject()}
        onAbort={() => {
          setDialogOpen(false);
        }}
      />
    </div>
  );
}
