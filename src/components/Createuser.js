import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomTextField from "./CustomTextField";
const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// intial form state
const INITIAL_FORM_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
};

// form validation goes here

const FORM_VALIDATION = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid Email").required("Required"),
  phoneNumber: Yup.number()
    .integer()
    .typeError("Please enter a valid phone number")
    .required("Required"),
});

export default function CreateUser() {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        ...INITIAL_FORM_STATE,
      }}
      validationSchema={FORM_VALIDATION}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      <Form>
        <Grid contianer spacing={2}>
          <Grid item xs={12}>
            <Typography>Your Details</Typography>
          </Grid>
          <Grid item xs={6}>
            <CustomTextField name="firstName" label="First Name" />
          </Grid>
          <Grid item xs={6}>
            <CustomTextField name="lastName" label="Last Name" />
          </Grid>
          <Grid item xs={6}>
            <CustomTextField name="email" label="Email" />
          </Grid>
          <Grid item xs={6}>
            <CustomTextField name="phoneNumber" label="phone Number" />
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
}

/*   <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create User
          </Button>
        </form> */
