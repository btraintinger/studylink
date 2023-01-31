import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { styled } from '@mui/material/styles';
import { TutorOffering } from '../../../generated/graphql';

const STableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const STableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
function createData(
  name: string,
  extendedName: string,
  tutor: string,
  klasse: string,
  lehrer: string,
  grade: number
) {
  return {
    name,
    extendedName,
    tutor,
    klasse,
    lehrer,
    grade,
    info: {
      date: '29.01.2023',
      description:
        'Ich liebe Mathematik und möchte Dir gerne helfen, deine Noten zu verbessern. Wir haben den gleichen Lehrer, also weiß ich welchen Lernstoff du gerade absolviertst. Schreib mir einfach',
    },
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <STableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <STableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </STableCell>
        <STableCell align="left">{row.extendedName}</STableCell>
        <STableCell align="right">{row.name}</STableCell>
        <STableCell align="right">{row.tutor}</STableCell>
        <STableCell align="right">{row.klasse}</STableCell>
        <STableCell align="right">{row.grade}</STableCell>
      </STableRow>
      <STableRow>
        <STableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6"> INFO </Typography>
              <Typography> {row.info.date}</Typography>
              <Typography> {row.info.description}</Typography>
              <Typography> {row.info.aboutMe}</Typography>
            </Box>
          </Collapse>
        </STableCell>
      </STableRow>
    </React.Fragment>
  );
}
const rows = [
  createData(
    'HWE',
    'Hardwareentwicklung',
    'Peter Lustig',
    '5AHEL',
    'Siegbert Schrempf',
    2
  ),
  createData(
    'M',
    'Mathematik',
    'Sandra Lustig',
    '4AHEL',
    'Rudolf Frauenschuh',
    2
  ),
  createData('E', 'Englisch', 'Emil Erpel', '5BHEL', 'Julia Gimpl', 3),
  createData(
    'M',
    'Mathematik',
    'Simon Simonius',
    '3AHEL',
    'Rudolf Frauenschuh',
    1
  ),
];

export default function MainList(props: { columnNames: string[] }) {
  return (
    <TableContainer>
      <Table aria-label="collapsible table">
        <TableHead>
          <STableRow>
            <STableCell />
            {props.columnNames.map((column) => (
              <STableCell>{column}</STableCell>
            ))}
          </STableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
