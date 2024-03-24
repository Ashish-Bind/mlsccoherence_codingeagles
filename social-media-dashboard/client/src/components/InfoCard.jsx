import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'

export default function InfoCard({ name, unit, minWidth = 275 }) {
  return (
    <Card sx={{ minWidth: minWidth }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {unit}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
