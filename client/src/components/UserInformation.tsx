import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";

export default function UserInformation() {
  const theme = createTheme();

  type InitialValues = {
    email: string;
    password: string;
  };
  const initialValues: InitialValues = {
    email: "",
    password: "",
  };
  const FormSchema = Yup.object().shape({
    email: Yup.string()
      .email("Try: andrea@gmail.com")
      .required("Please enter your e-mail address"),
    password: Yup.string().required("Please enter your password"),
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
    //   "Try: SecurePassword34"
    // )
  });

  const userId = localStorage.getItem("userId");
  console.log(userId, "userId");

  const url = `http://localhost:8001/users/${userId}`;
  const token = localStorage.getItem("token");

  const [user, setUser] = useState("");
  useEffect(() => {
    axios
      .get(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => response.data)
      .then((data) => {
        setUser(data);
      });
  }, []);

  // console.log(user, "user");
  return (
    <ThemeProvider theme={theme}>
      <Typography style={{ marginTop: "100px" }}>
        Update UserInformation {user}
      </Typography>
      {/* <Typography> Your name is: {user}</Typography> */}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Update {user}
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Formik
              initialValues={initialValues}
              validationSchema={FormSchema}
              onSubmit={(values) => {
                const token = localStorage.getItem("token");
                const userId = localStorage.getItem("userId");
                axios
                  .put(
                    `http://localhost:8001/users/${userId}`,
                    values,
                    //send token to server-by headers
                    { headers: { Authorization: `Bearer ${token}` } }
                  )
                  .then((response) => {
                    console.log(response, "new information");
                  });
              }}
            >
              {({ errors, touched, handleChange, values }) => {
                return (
                  <Form>
                    <Box>
                      <TextField
                        margin="normal"
                        id="filled-basic"
                        label="Email"
                        variant="filled"
                        name="email"
                        onChange={handleChange}
                        autoComplete="email"
                        autoFocus
                      />
                      {errors.email && touched.email ? (
                        <Typography className="error-message">
                          {errors.email}
                        </Typography>
                      ) : null}
                    </Box>
                    <Box>
                      <TextField
                        id="filled-basic"
                        label="Password"
                        variant="filled"
                        name="password"
                        type="password"
                        onChange={handleChange}
                        autoComplete="email"
                        autoFocus
                      />
                      {errors.password && touched.password ? (
                        <Typography className="error-message">
                          {errors.password}
                        </Typography>
                      ) : null}
                    </Box>
                    <Button type="submit" color="primary" className="button">
                      Update
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
