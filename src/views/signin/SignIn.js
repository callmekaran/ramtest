import React from "react";
import { Link } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import {
  ErrorDisplay,
  getFieldClassName,
} from "components/GeneralComponents/Utils";
import useSignInHook from "./useSignInHook";
import CommonForm from "views/CommonForm";
import { GoogleLogin } from "@react-oauth/google";

function SignIn() {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
    signup,
    forgotPassword,
    googleLogin,
  } = useSignInHook();

  return (
    <CommonForm>
      <h2 className="card-title text-center mb-4">Sign In</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values?.email}
            className={getFieldClassName("email", errors, touched)}
          />
          <ErrorDisplay name="email" errors={errors} touched={touched} />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values?.password}
            className={getFieldClassName("password", errors, touched)}
          />
          <ErrorDisplay name="password" errors={errors} touched={touched} />
        </FormGroup>
        <FormGroup>
          <div className="d-flex justify-content-between align-items-center">
            <div className="ml-4 mr-2">
              <Input
                type="checkbox"
                name="remember_me"
                id="remember_me"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.remember_me}
                className={getFieldClassName("remember_me", errors, touched)}
              />
              <Label for="remember_me" className="text-primary fw-bold">
                {" "}
                Remember Me
              </Label>
            </div>
            <Link to={forgotPassword} className="fw-bold">
              Forgot Password?
            </Link>
          </div>
        </FormGroup>
        <div className="d-flex flex-column align-items-center justify-content-center">
          <Button color="primary" className="mb-3" type="submit" block>
            Sign In
          </Button>
          <span>OR</span>
          {/* <Button
            color="danger"
            className="mb-3"
            onClick={() => googleLogin()}
            block
          >
            <i className="fab fa-google mr-2"></i> Sign In with Google
          </Button> */}
          <GoogleLogin
            onSuccess={() => {
              googleLogin();
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
        <hr />
        <FormGroup className="text-right">
          Don't have an account?{" "}
          <Link to={signup} className="ml-2 fw-bold" type="Sign Up">
            Click here to Sign Up
          </Link>
        </FormGroup>
      </Form>
    </CommonForm>
  );
}

export default SignIn;
