import React from "react";
import { authenticationService } from "../../service/Authentication.service";
import { TextField, Grid, Button, Paper } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import LoadingButton from "@mui/lab/LoadingButton";
import Link from "@mui/material/Link";

import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  username: yup.string("Enter your Username").required("Username is required"),
  password: yup
    .string("Enter your password")
    .min(4, "Password should be of minimum 4 characters length")
    .required("Password is required"),
});
export default function Login() {
  const history = useHistory();
  const [loading, setLoading] = React.useState(false);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      // history.push("/sample");
      // authenticationService
      //   .login(params.username, params.password)
      //   .then((res) => {
      //     let { from } = this.props.location.state || { from: { pathname: "/" } };

      //     this.props.history.push(from);
      //     history.go(0);
      //   })
      //   .catch((data) => {
      //     let message;
      //     if (data === undefined) {
      //       message = "ERR_CONNECTION_REFUSED";
      //     } else {
      //       message = data.data.message;
      //     }
      //   });

      authenticationService.mockLogin();
      history.go();
    },
  });

  return (
    <Paper className="aaa" sx={{ p: 4, mt: 4, mx: "auto", maxWidth: 500 }}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} container justifyContent="center">
            <h1>Sign In</h1>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              id="username"
              name="username"
              label="Username"
              variant="outlined"
              required
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              id="password"
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              required
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
          <Grid item xs={12}>
            <LoadingButton
              fullWidth
              onClick={formik.handleSubmit}
              endIcon={<LoginIcon />}
              loading={loading}
              loadingPosition="end"
              variant="contained"
            >
              Sign In
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
      <Grid container item xs={12} mt={2}>
        <Grid item xs={12}>
          <Link
            href="/forgot-password"
            underline="hover"
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            Forgot password ?
          </Link>
        </Grid>
        {/* <Grid item xs={6}>
          <Link
            href="/register"
            underline="hover"
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            Don't have an account? Sign up
          </Link>
        </Grid> */}
      </Grid>
    </Paper>
  );
}
