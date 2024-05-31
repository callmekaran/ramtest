import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

const RoleManagement = () => {
  return (
    <div className="content mb-0">
      <h2 className="card-title text-center mb-4">Add Role</h2>
      <Form>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            // onChange={handleChange}
            // onBlur={handleBlur}
            // value={values?.email}
            // className={getFieldClassName("email", errors, touched)}
          />
          {/* <ErrorDisplay name="email" errors={errors} touched={touched} /> */}
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            // onChange={handleChange}
            // onBlur={handleBlur}
            // value={values?.password}
            // className={getFieldClassName("password", errors, touched)}
          />
          {/* <ErrorDisplay name="password" errors={errors} touched={touched} /> */}
        </FormGroup>
        <div className="d-flex flex-column align-items-center justify-content-center">
          <Button color="primary" className="btn-round mb-3" type="submit">
            Sign In
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default RoleManagement;
