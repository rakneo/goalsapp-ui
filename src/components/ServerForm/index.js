import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Modal from "@mui/material/Modal";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";


const validationSchema = yup.object({
  name: yup
    .string("Enter your server name")
    .required("Server name is required"),
  language: yup
    .string("Enter your server language"),
  framework: yup
    .string("Enter your server framework")
    .required("Goal server is required"),
})


export default function ServerForm(props){

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
            {isUpdateMode ? 'Modify' : 'Define'} your Server
          </Typography>

            <TextField
              sx={{
                mb: 2,
              }}
              fullWidth
              id="name"
              label="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={!!(formik.touched.name && formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name ? formik.errors.name : ""}
              variant="outlined"
            />
            <TextField
              sx={{
                mb: 2,
              }}
              fullWidth
              id="language"
              label="Language"
              name="language"
              value={formik.values.language}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={!!(formik.touched.language && formik.errors.language)}
              helperText={formik.touched.language && formik.errors.language ? formik.errors.language : ""}
              variant="outlined"
            />
            <TextField
              sx={{
                mb: 2,
              }}
              fullWidth
              id="framework"
              label="Framework"
              name="framework"
              value={formik.values.framework}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={!!(formik.touched.framework && formik.errors.framework)}
              helperText={formik.touched.framework && formik.errors.framework ? formik.errors.framework : ""}
              variant="outlined"
            />
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
            onClick={formik.handleSubmit}
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
              {isUpdateMode ? 'update' : 'create'} server
            </Typography>
          </Button>
        </Box>
      </ form>
    </>
  );


  return !isMobile ? (
      <Modal
        open={open}
        onClose={() => onClose(formik.resetForm)}
        aria-labelledby="serverform-modal"
        aria-describedby="serverform-modal"
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
      onClose={() => onClose(formik.resetForm)}
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
