import React from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import useForgotPasswordHook from "./useForgotPasswordHook";
import { getFieldClassName } from "components/GeneralComponents/Utils";
import { ErrorDisplay } from "components/GeneralComponents/Utils";
import CommonForm from "views/CommonForm";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const {
    handleSubmit,
    handleBlur,
    handleChange,
    values,
    touched,
    errors,
    signin,
  } = useForgotPasswordHook();

  return (
    <CommonForm>
      <h2 className="card-title text-center mb-4">Forgot Password</h2>
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
            value={values.email}
            className={getFieldClassName("email", errors, touched)}
          />
          <ErrorDisplay name="email" errors={errors} touched={touched} />
        </FormGroup>
        <Button
          color="primary"
          className="btn-round mb-3 align-items-center"
          type="submit"
        >
          Forgot Password
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
