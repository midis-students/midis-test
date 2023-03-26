import {
  Box,
  Collapse,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useExerciseResult } from '@/hooks/query/exercise';
import { useParams } from 'react-router-dom';
import Loader from '@/components/Loader';
import { useState } from 'react';
import { Profile } from '@/lib/api/type';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

type UserRow = {
  user: Profile;
  tasks: Array<{ id: number; name: string; isCorrect: boolean }>;
};

export default function ResultTab() {
  const { exercise } = useParams();
  const { data, isLoading, isSuccess } = useExerciseResult(Number(exercise));

  if (isLoading) return <Loader />;
  if (!isSuccess) return <>Opps error</>;

  const rows: UserRow[] = [];

  data.tasks.forEach((task) => {
    task.answers.forEach((answer) => {
      let row = rows.find((row) => row.user.id === answer.user.id);
      if (!row) {
        row = {
          user: answer.user,
          tasks: [],
        };
        rows.push(row);
      }

      const taskInRow = row.tasks.find((t) => t.id === task.id);
      if (!taskInRow) {
        row.tasks.push({
          id: task.id,
          name: task.name,
          isCorrect: answer.isCorrect,
        });
      }
    });
  });

  return (
    <>
      <Typography variant="h4">{data.name}</Typography>
      <Box
        sx={{
          overflow: 'auto',
          maxHeight: '80vh',
          p: 1,
        }}
      >
        <TableContainer component={Paper}>
          <Table sx={{ width: '100%', p: 1 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: '10px' }} />
                <TableCell>Студент</TableCell>
                <TableCell>Группа</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <Row key={row.user.id} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

const Row = ({ row }: { row: UserRow }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.user.name}</TableCell>
        <TableCell>{row.user.group}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
          size={'small'}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Задачи
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Название</TableCell>
                    <TableCell align="right">Результат</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.tasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell component="th" scope="row">
                        {task.name}
                      </TableCell>
                      <TableCell align="right">
                        {task.isCorrect ? (
                          <CheckIcon color="success" />
                        ) : (
                          <CloseIcon color="error" />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};
