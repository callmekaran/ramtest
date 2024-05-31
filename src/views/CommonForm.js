import React from "react";
import { Card, CardBody, Col } from "reactstrap";

const CommonForm = ({ children }) => {
  return (
    <div className="content">
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Col md="5">
          <Card>
            <CardBody>{children}</CardBody>
          </Card>
        </Col>
      </div>
    </div>
  );
};

export default CommonForm;
