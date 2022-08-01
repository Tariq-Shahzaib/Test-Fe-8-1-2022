import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomTextField from "../components/CustomTextField";
import CustomSelect from "../components/Select";
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
    width: "100%",
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
  gender: "",
};

// form validation goes here
const FORM_VALIDATION = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid Email").required("Required"),
  gender: Yup.string().required("Required"),
});

const handleSubmit = async (values) => {
  let fullName = values.firstName + " " + values.lastName;
  const loginFormData = new FormData();
  loginFormData.append("name", fullName);
  loginFormData.append("email", values.email);
  loginFormData.append("gender", values.gender);
  loginFormData.append("status", "active");

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
    alert("User Created Sucessfully");
    window.location.reload(true);
  } catch (error) {
    // TODO need to handle diffrent errors especially if user already exists
    alert("Something went wrong while creating user please try again later");
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
      onSubmit={(values, { resetForm }) => {
        handleSubmit(values);
        resetForm(INITIAL_FORM_STATE);
        console.log(values);
      }}
    >
      <Form>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h5" justify="center" align="center">
              Create User Form
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography>Name</Typography>
            <CustomTextField name="firstName" label="First Name" />
          </Grid>
          <Grid item xs={7}>
            <Typography>SurName</Typography>
            <CustomTextField name="lastName" label="Last Name" />
          </Grid>
          <Grid item xs={7}>
            <Typography>Email</Typography>

            <CustomTextField name="email" label="Email" />
          </Grid>
          <Grid item xs={7}>
            <Typography>Gender</Typography>
            <CustomSelect name="gender" label="Gender" />
          </Grid>

          <Grid item xs={7}>
            <SubmitButton> Create User </SubmitButton>
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
}
