import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useService } from '../../../hooks/useService';

export default function Students() {

  const { data, fetch } = useService(window.api.getProfileList, []);

  return (
    <>
      <Typography variant={'h4'}>Список студентов</Typography>
      <Button onClick={() => fetch([])}>Обновить</Button>
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Имя</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              data ? data.map(value => <TableRow key={value.id}>
                <TableCell>{value.name}</TableCell>
              </TableRow>) : null
            }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
