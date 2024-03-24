import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

function createData(title, desc, time) {
  return { title, desc, time }
}

export default function ReactTable({ data, title }) {
  const rows = data.map(({ snippet }) => {
    return createData(snippet.title, snippet.description, snippet.publishedAt)
  })
  console.log(data)

  return (
    <TableContainer component={Paper}>
      <Table sx={{ maxWidth: 1150 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Videos</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Publish</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.title}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.desc}</TableCell>
              <TableCell align="right">{Date(row.publishedAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
