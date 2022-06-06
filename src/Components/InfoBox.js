import React from 'react'
import { Card, CardContent, Typography} from '@mui/material'
import '../CSS/InfoBox.css'


function InfoBox({title, cases, total}) {
  return (
      <div className="app__stats">

      <Card className="infoBox">
          <CardContent>
              {/* Title */}
              <Typography className="infoBox__title" color="textSeconday">
                  {title}
              </Typography>

              {/* No. Of Cases */}
              <h2 className="infoBox__cases">{cases}</h2>


              {/* Total */}
              <Typography className="infoBox__total" color="textSecondary">
                  {total} Total
              </Typography>
          </CardContent>

      </Card>
      </div>
  )
}

export default InfoBox