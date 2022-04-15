import {useContext} from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Button} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {BaseStore} from "../../stores/baseStore";

export default function Header() {

    const { openModal } = useContext(BaseStore);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <AppBar position="sticky">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={
              {
                flexGrow: 1,
                fontFamily: 'Bebas Neue, cursive',
                fontSize: '2.5rem',
                color: '#fff',
                textAlign: 'left',
                textShadow: '0 0 2px #000',
                textTransform: 'uppercase',
              }
            }
          >
            Goals App
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<AddIcon />}
            onClick={() => openModal()}
          >
            <Typography
              className="header-title"
              variant="h6"
              component="div"
              sx={
                {
                  flexGrow: 1,
                  fontFamily: 'Bebas Neue, cursive',
                  fontSize: isMobile ? '1rem' : '1.5rem',
                  color: '#fff',
                  textAlign: 'right',
                  textTransform: 'uppercase',
                }
              }
            >
              Create Goal
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>
    );
}
