import React from "react";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import MyTable from "components/Table/Table";
import useRoleHook from "./useRoleHook";

const RoleList = () => {
  const { columns, data, navigate, add_role } = useRoleHook();
  return (
    <div className="content mb-0">
      <Row>
        <Col md="12">
          <Row className="px-4 pb-3 align-items-center">
            <Col md="6">Breadcrumbs</Col>
            <Col md="6" className="d-flex justify-content-end">
              <Button
                color="info"
                className="m-0"
                onClick={() => navigate(add_role)}
              >
                Add Role
              </Button>
            </Col>
          </Row>
          <Card>
            <CardBody>
              <MyTable
                {...{
                  data,
                  columns,
                }}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default RoleList;
