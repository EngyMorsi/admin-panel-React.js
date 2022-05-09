import React from "react";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
//import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const paperStyle = {
    padding: 60,
    width: 300,
    height: "80vh",
    margin: "0 auto",
  };
  const headerStyle = { margin: 20 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnStyle = { margin: "20px 90px" };

  let initialValues = {
    first_name: "",
    last_name: "",
    username: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    first_name: Yup.string()
      .min(3, "Too Short!")
      .max(15, "Too Long!")
      .required("Required"),
    last_name: Yup.string()
      .min(3, "Too Short!")
      .max(15, "Too Long!")
      .required("Required"),
    username: Yup.string()
      .min(3, "Too Short!")
      .max(15, "Too Long!")
      .required("Required"),
    password: Yup.string()
      .min(4, "Password must be 3 characters at minimum")
      .max(10, "Password must be 10 characters at maximum")
      .required("Required"),
  });
  const onSubmit = async (values, props) => {
    const { first_name, last_name, username, password } = values;
    let formData = new FormData();
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("username", username);
    formData.append("password", password);

    console.log(values);
    console.log(formData);

    try {
      const resp = await axios.post(
        "http://172.104.243.247:8000/api/admins/register",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log(resp.data);
      navigate("/login");
    } catch (err) {
      console.log(err.resp.data);
    }
    props.resetForm();
  };

  return (
    <Grid container item xs={12}>
      <Paper style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}></Avatar>
          <h2 style={headerStyle}>Sign Up</h2>
          <Typography variant="caption" gutterBottom>
            Please fill this form to create an account !
          </Typography>
        </Grid>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(props) => (
            <Form>
              <Field
                as={TextField}
                helperText={<ErrorMessage name="first_name" />}
                fullWidth
                name="first_name"
                label="first Name"
                placeholder="Enter your first Name"
              />
              <Field
                as={TextField}
                helperText={<ErrorMessage name="last_name" />}
                fullWidth
                name="last_name"
                label="last Name"
                placeholder="Enter your last Name"
              />
              <Field
                as={TextField}
                helperText={<ErrorMessage name="username" />}
                fullWidth
                name="username"
                label="username"
                placeholder="Enter UserName"
              />
              <Field
                as={TextField}
                helperText={<ErrorMessage name="password" />}
                fullWidth
                type="password"
                name="password"
                placeholder="Enter your password"
              />

              <Button
                style={btnStyle}
                type="submit"
                disabled={props.isSubmitting}
                variant="contained"
                color="primary"
              >
                {props.isSubmitting ? "Loading " : "Register"}
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
};

export default Signup;
