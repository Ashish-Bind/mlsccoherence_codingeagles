import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein }
}

const rows = [
  createData('Become best', 159, 6.0, 24),
  createData('1K celebration', 237, 9.0, 373),
  createData('How to edit video', 262, 16.0, 24),
  createData('Guide to make yt channel', 305, 3.7, 67),
  createData('Guide on becoming a youtuber', 356, 16.0, 49),
]

export default function ReactTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Videos</TableCell>
            <TableCell align="right">Watch time</TableCell>
            <TableCell align="right">Views</TableCell>
            <TableCell align="right">Impressions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
