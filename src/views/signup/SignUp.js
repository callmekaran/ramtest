import React from "react";
import { Link } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button, Row, Col } from "reactstrap";
import {
  ErrorDisplay,
  getFieldClassName,
} from "components/GeneralComponents/Utils";
import useSignUpHook from "./useSignUpHook";
import CommonForm from "views/CommonForm";

function SignUp() {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
    signin,
  } = useSignUpHook();

  return (
    <CommonForm>
      <h2 className="card-title text-center mb-4">Sign Up</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Row>
            <Col>
              <Label for="first_name">First Name</Label>
              <Input
                type="text"
                name="first_name"
                id="first_name"
                placeholder="First Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.first_name}
                className={getFieldClassName("first_name", errors, touched)}
              />
              <ErrorDisplay
                name="first_name"
                errors={errors}
                touched={touched}
              />
            </Col>
            <Col>
              <Label for="last_name">Last Name</Label>
              <Input
                type="text"
                name="last_name"
                id="last_name"
                placeholder="Last Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.last_name}
                className={getFieldClassName("last_name", errors, touched)}
              />
              <ErrorDisplay
                name="last_name"
                errors={errors}
                touched={touched}
              />
            </Col>
          </Row>
        </FormGroup>
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
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
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
          <div className="ml-4">
            <Input
              type="checkbox"
              name="terms_and_conditions"
              id="terms_and_conditions"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.terms_and_conditions}
              className={getFieldClassName(
                "terms_and_conditions",
                errors,
                touched
              )}
            />
            <Label for="terms_and_conditions">
              By creating an account, you are agree to our{" "}
              <span className="text-primary fw-bold">Terms & Conditions</span>
            </Label>
            <ErrorDisplay
              name="terms_and_conditions"
              errors={errors}
              touched={touched}
            />
          </div>
        </FormGroup>
        <div className="d-flex flex-column align-items-center justify-content-center">
          <Button
            color="primary"
            className="mb-3"
            type="submit"
            block
            disabled={!values?.terms_and_conditions}
          >
            Sign Up
          </Button>
        </div>
        <hr />
        <FormGroup className="text-right">
          Already have an account?
          <Link to={signin} className="ml-1 fw-bold" type="Sign Up">
            Sign In
          </Link>
        </FormGroup>
      </Form>
    </CommonForm>
  );
}

export default SignUp;
