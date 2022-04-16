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
import GoalCard from '../../components/GoalCard';
import GoalForm from '../../components/GoalForm';
import {getAllGoals, createGoal, getGoalById, updateGoalById, deleteGoalById} from '../../services/goalService';

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

   const [goalId, setGoalId] = useState(null);
   const [formInitialValues, setFormInitialValues] = useState({
     goalName: '',
     description: '',
     dueDateTime: new Date(),
   });
   const [isUpdateMode, setIsUpdateMode] = useState(false);

   const queryClient = useQueryClient();

   const createGoalMutation = useMutation(createGoal, {
     onSuccess: () => {
       closeModal();
       queryClient.invalidateQueries('goals');
     }
   });

   const updateGoalMutation = useMutation(updateGoalById, {
     onSuccess: () => {
       setGoalId(null);
       closeModal();
       queryClient.invalidateQueries('goals');
     }
   });

   const deleteGoalMutation = useMutation(deleteGoalById, {
     onSuccess: () => {
       setGoalId(null);
       setIsUpdateMode(false);
       closeModal();
       queryClient.invalidateQueries('goals');
     }
   })

   const { data, isFetching , isLoading } = useQuery('goals', getAllGoals);

   const getGoalByIdQuery = useQuery(['goalById', goalId], () => getGoalById(goalId), {
    enabled: false,
   });

   const theme = useTheme();
   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

   const onGoalCardEditClicked = (goalId) => {
     setIsUpdateMode(true);
     setGoalId(goalId);
   }

   const onGoalCardDeleteClicked = (goalId) => {
     deleteGoalMutation.mutate(goalId);
   }

   useEffect(() => {
     if(goalId && isUpdateMode) {
       getGoalByIdQuery.refetch().then((result) => {
         setFormInitialValues({
           goalName: result?.data?.data?.goalName || '',
           description: result?.data?.data?.description || '',
           dueDateTime: new Date(result?.data?.data?.dueDateTime) || new Date(),
         });
       });
       openModal();
     }
   }, [goalId]);

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
          Welcome to the Goal's App
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
            data?.totalItems !== 0 ? data?.data.map((goal) => (
              <Grid item xs={12} sm={6} md={4} key={goal.id}>
                <GoalCard
                  goalId={goal.id}
                  goalName={goal.goalName}
                  description={goal.description}
                  dueDateTime={goal.dueDateTime}
                  onEditClicked={onGoalCardEditClicked}
                  onDeleteClicked={onGoalCardDeleteClicked}
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
                  Oops ! You have no goals.
                </Typography>
              </Grid>
            )
          )}
        </Grid>
        </Box>
        <GoalForm
          formInitialValues={formInitialValues}
          isUpdateMode={isUpdateMode}
          open={isModalOpen}
          onOpen={openModal}
          onClose={closeModal}
          onSubmit={
            (values, { resetForm }) => {
              if(isUpdateMode) {
                updateGoalMutation.mutate({goalId, values})
              } else {
                createGoalMutation.mutate(values);
              }
              resetForm();
            }
        }
        />
      </div>
    );
}
