import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Chip from '@mui/material/Chip';

export default function ServerCard(props){

  const { serverId, serverName, language, framework, onEditClicked, onDeleteClicked } = props;

  return (
    <div>
      <Card>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Server ID: {serverId}
          </Typography>
          <Typography variant="h5" component="div" sx={{ mb: 1.5 }}>
            Name : {serverName}
          </Typography>
          <Typography variant="body2">
            Language : {language}
          </Typography>
          <Chip
            sx={{
              mt: 1,
              fontWeight: 'bold',
              fontSize: '0.75rem',
            }}
            label={`Framework : ${framework}`}
            color="primary"
          />
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
            onClick={() => onDeleteClicked(serverId)}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            variant="contained"
            size="large"
            color="default"
            onClick={() => onEditClicked(serverId)}
          >
            <EditIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}
