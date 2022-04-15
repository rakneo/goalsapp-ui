import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Chip from '@mui/material/Chip';

export default function GoalCard(props){

  const { goalId, goalName, description, dueDateTime, onEditClicked, onDeleteClicked } = props;

  return (
    <div>
      <Card>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Goal
          </Typography>
          <Typography variant="h5" component="div" sx={{ mb: 1.5 }}>
            {goalName}
          </Typography>
          <Typography variant="body2">
            {description}
          </Typography>
          <Chip
            sx={{
              mt: 1,
              fontWeight: 'bold',
              fontSize: '0.75rem',
            }}
            label={`Due ${dueDateTime ? dueDateTime : 'not provided'}`}
            color="primary"
          >

          </Chip>
        </CardContent>
        <CardActions
          sx={{
            backgroundColor: 'info.main',
            justifyContent: 'space-between',
          }}
        >
          <IconButton
            variant="contained"
            size="large"
            color="error"
            onClick={() => onDeleteClicked(goalId)}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            variant="contained"
            size="large"
            color="default"
            onClick={() => onEditClicked(goalId)}
          >
            <EditIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}
