import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomTextField from "../components/CustomTextField";
import SubmitButton from "../components/SubmitButton";
import axios from "axios";
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

// TODO need to move in utils folder
const CREATE_USER_API_URL = "https://gorest.co.in/public/v2/users";
// TODO need to create .env file to store this
const TOKEN =
  "1b90c3e7ad44399cafca4d220ba91705e14fd24af8e9ce8bc33380b280581b5a";

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

const handleSubmit = async (values) => {
  const loginFormData = new FormData();
  loginFormData.append("name", values.firstName);
  loginFormData.append("email", values.email);
  loginFormData.append("gender", "female");
  loginFormData.append("status", "active");
  // loginFormData.append("password", formValue.password);

  try {
    // make axios post request
    const response = await axios({
      method: "post",
      url: CREATE_USER_API_URL,
      data: loginFormData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${TOKEN}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export default function CreateUser() {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        ...INITIAL_FORM_STATE,
      }}
      validationSchema={FORM_VALIDATION}
      onSubmit={(values) => {
        handleSubmit(values);
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
          <Grid item xs={6}></Grid>
        </Grid>
        <Grid item xs={6}>
          <SubmitButton> Create User </SubmitButton>
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
