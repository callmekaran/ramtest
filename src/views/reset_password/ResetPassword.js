import React from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import useResetPasswordHook from "./useResetPasswordHook";
import { ErrorDisplay } from "components/GeneralComponents/Utils";
import { getFieldClassName } from "components/GeneralComponents/Utils";
import CommonForm from "views/CommonForm";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const {
    handleSubmit,
    handleBlur,
    handleChange,
    touched,
    errors,
    showPassword,
    handleShowPassword,
    values,
    signin,
  } = useResetPasswordHook();

  return (
    <CommonForm>
      <h2 className="card-title text-center mb-4">Reset Password</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Enter your password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            className={getFieldClassName("password", errors, touched)}
          />
          <ErrorDisplay name="password" errors={errors} touched={touched} />
        </FormGroup>
        <FormGroup>
          <Label for="password">Confirm Password</Label>
          <Input
            type={showPassword ? "text" : "password"}
            name="confirm"
            id="password"
            placeholder="Re-enter password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.confirm}
            className={getFieldClassName("confirm", errors, touched)}
          />
          <ErrorDisplay name="confirm" errors={errors} touched={touched} />
        </FormGroup>
        <FormGroup className="pl-4">
          <Input
            type="checkbox"
            name="show_password"
            id="show_password"
            checked={showPassword}
            onChange={handleShowPassword}
          />
          <Label for="show_password">Show Password</Label>
        </FormGroup>
        <Button
          color="primary"
          className="btn-round mb-3 align-items-center"
          type="submit"
        >
          Reset Password
        </Button>
        <hr />
        <FormGroup className="text-center fw-bold">
          <Link to={signin} className="ml-2" type="Sign Up">
            Back to Sign In
          </Link>
        </FormGroup>
      </Form>
    </CommonForm>
  );
}

export default ForgotPassword;
