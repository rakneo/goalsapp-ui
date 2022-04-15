import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Modal from "@mui/material/Modal";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";


const validationSchema = yup.object({
  goalName: yup
    .string("Enter your goal name")
    .required("Goal name is required"),
  description: yup
    .string("Enter your goal description"),
  dueDateTime: yup
    .date("Enter your goal due date")
    .min(new Date(), "Goal due date must be in the future")
    .required("Goal due date is required"),
})


export default function GoalForm(props){

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { open, isUpdateMode, onOpen, onClose, onSubmit, formInitialValues } = props;



  const formik = useFormik({
    initialValues: formInitialValues,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values, formikHelpers) => {
      onSubmit(values, formikHelpers);
    }
  });

  const form = (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{
          backgroundColor: '#fff',
          p: 2,
          borderTopLeftRadius: '5px',
          borderTopRightRadius: '5px',
        }}>
          <Typography
            sx={{
              flexGrow: 1,
              fontFamily: 'Bebas Neue, cursive',
              color: 'primary.main',
              fontSize: !isMobile ? '2.5rem' : '2rem',
              fontWeight: 'bold',
              textAlign: 'center',
              mb: 2,
            }}
            variant={'h4'}
          >
            {isUpdateMode ? 'Modify' : 'Define'} your goal
          </Typography>

            <TextField
              sx={{
                mb: 2,
              }}
              fullWidth
              id="goalName"
              label="Goal Name"
              name="goalName"
              value={formik.values.goalName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={!!(formik.touched.goalName && formik.errors.goalName)}
              helperText={formik.touched.goalName && formik.errors.goalName ? formik.errors.goalName : ""}
              variant="outlined"
            />
            <TextField
              sx={{
                mb: 2,
              }}
              fullWidth
              id="description"
              label="Description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={!!(formik.touched.description && formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description ? formik.errors.description : ""}
              variant="outlined"
            />
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DateTimePicker
                renderInput={
                  (props) => <TextField
                    { ...props }
                    sx={{
                      mb: 2,
                    }}
                    fullWidth

                  />
                }
                label="Due Date and Time"
                name="dueDateTime"
                onChange={(date) => {
                  formik.setFieldValue("dueDateTime", date);
                }}
                value={formik.values.dueDateTime}

              />
            </LocalizationProvider>
        </Box>
        <Box
          sx={{
            backgroundColor: '#fff',
            borderBottomLeftRadius: '5px',
            borderBottomRightRadius: '5px',
            pl: isMobile ? 0 : 2,
            pr: isMobile ? 0 : 2,
            pb: isMobile ? 0 : 2,
          }}
        >
          <Button
            sx={{
              borderTopLeftRadius: isMobile ? 0 : '4px',
              borderTopRightRadius: isMobile ? 0 : '4px',
            }}
            fullWidth
            variant="contained"
            type="submit"
            size="large"
            color="success"
          >

            <Typography
              sx={{
                flexGrow: 1,
                fontFamily: 'Bebas Neue, cursive',
                color: '#fff',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                textAlign: 'center',
              }}
              variant={'h4'}
            >
              {isUpdateMode ? 'update' : 'create'} goal
            </Typography>
          </Button>
        </Box>
      </ form>
    </>
  );


  return !isMobile ? (
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="goalform-modal"
        aria-describedby="goalform-modal"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {form}
      </Modal>
  ) : (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      sx={{
        width: '100%',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {form}
    </SwipeableDrawer>
  );
}
