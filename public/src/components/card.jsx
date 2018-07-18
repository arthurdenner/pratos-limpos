import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const CustomCard = ({ extra, subtitle, title }) => (
  <Card style={{ marginBottom: 20 }}>
    <CardContent>
      <Typography variant="headline" component="h1">
        {title}
      </Typography>
      <div style={{ display: 'flex' }}>
        <Typography variant="display2">
          {subtitle}
        </Typography>
        {extra && (
          <Typography
            style={{ alignSelf: 'flex-end', marginLeft: 10, marginBottom: 5 }}
          >
            {extra}
          </Typography>
        )}
      </div>
    </CardContent>
  </Card>
)

export default CustomCard;
