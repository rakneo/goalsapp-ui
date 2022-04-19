// eslint-disable-next-line react-hooks/exhaustive-deps

import { useContext, useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import Skeleton from '@mui/material/Skeleton';
import { BaseStore } from '../../stores/baseStore';
import Header from '../../components/Header';
import ServerCard from '../../components/ServerCard';
import ServerForm from '../../components/ServerForm';
import {getAllServers, createServer, getServerById, updateServerById, deleteServerById} from "../../services/serverService";

const textStyle = {
  flexGrow: 1,
  fontFamily: 'Bebas Neue, cursive',
  color: 'primary.main',
  textAlign: 'center',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
};


export default function HomePage(props) {

   const {isModalOpen, openModal, closeModal} = useContext(BaseStore);

   const [serverId, setServerId] = useState(null);
   const [formInitialValues, setFormInitialValues] = useState({
     name: '',
     language: '',
     framework: '',
   });
   const [isUpdateMode, setIsUpdateMode] = useState(false);

   const queryClient = useQueryClient();

   const createServerMutation = useMutation(createServer, {
     onSuccess: () => {
       closeModal();
       queryClient.invalidateQueries('servers');
     }
   });

   const updateServerMutation = useMutation(updateServerById, {
     onSuccess: () => {
       setServerId(null);
       closeModal();
       queryClient.invalidateQueries('servers');
     }
   });

   const deleteServerMutation = useMutation(deleteServerById, {
     onSuccess: () => {
       setServerId(null);
       setIsUpdateMode(false);
       closeModal();
       queryClient.invalidateQueries('servers');
     }
   })

   const { data, isFetching , isLoading } = useQuery('servers', getAllServers);

   const getServerByIdQuery = useQuery(['serverById', serverId], () => getServerById(serverId), {
    enabled: false,
   });

   const theme = useTheme();
   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

   const onServerCardEditClicked = (goalId) => {
     setIsUpdateMode(true);
     setServerId(goalId);
   }

   const onServerCardDeleteClicked = (goalId) => {
     deleteServerMutation.mutate(goalId);
   }

   useEffect(() => {
     if(serverId && isUpdateMode) {
       getServerByIdQuery.refetch().then((result) => {
         setFormInitialValues({
           name: result?.data?.data?.name || '',
           language: result?.data?.data?.language || '',
           framework: new Date(result?.data?.data?.framework) || '',
         });
       });
       openModal();
     }
   }, [serverId]);

    return (
      <div>
        <Header />
        <Box sx={{flexGrow: 1,  p: 3}}>
        <Typography
          sx={{
            ...textStyle,
            fontSize: isMobile ? '1.5rem' : '2.5rem',
            mb: '2rem'
          }}
          variant="h6"
        >
          Welcome to the Server App
        </Typography>
        <Grid container spacing={3}>
          {(isLoading || isFetching) ? (
            <Grid item xs={12} sm={6} md={4}>
              <Skeleton
                animation="wave"
                variant="rectangular"
                sx={{ bgcolor: 'grey.200' }}
                width="100%"
                height={200}
              />
            </Grid>

          ) : (
            data?.totalItems !== 0 ? data?.data.map((server) => (
              <Grid item xs={12} sm={6} md={4} key={server.id}>
                <ServerCard
                  serverId={server.id}
                  serverName={server.name}
                  language={server.language}
                  framework={server.framework}
                  onEditClicked={onServerCardEditClicked}
                  onDeleteClicked={onServerCardDeleteClicked}
                />
              </Grid>
            )) :(
              <Grid item xs={12}>
                <Typography
                  sx={{
                    ...textStyle,
                    color: 'error.main',
                    fontSize: isMobile ? '1.5rem' : '2.5rem',
                    mb: '2rem'
                  }}
                  variant="h6"
                >
                  Oops ! You have no servers.
                </Typography>
              </Grid>
            )
          )}
        </Grid>
        </Box>
        <ServerForm
          formInitialValues={formInitialValues}
          isUpdateMode={isUpdateMode}
          open={isModalOpen}
          onOpen={openModal}
          onClose={(resetForm) => {  setIsUpdateMode(false); closeModal(); resetForm();}}
          onSubmit={
            (values, { resetForm }) => {
              if(isUpdateMode) {
                updateServerMutation.mutate({serverId, values})
              } else {
                createServerMutation.mutate(values);
              }
              resetForm();
            }
        }
        />
      </div>
    );
}
