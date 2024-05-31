import React from "react";
import { Steps } from "antd";
import { Button, Col, Row } from "reactstrap";
import useCompanyProfileSetupHook from "./useCompanyProfileSetupHook";

const { Step } = Steps;

const CompanyProfileSetup = () => {
  const { current, skip, next, prev, steps, items, createCompanyProfile } =
    useCompanyProfileSetupHook();

  return (
    <div className="content p-5">
      <div className="justify-content-center align-items-center mt-4">
        <Row className="justify-content-center m-0">
          <Col xs={12} sm={8} md={12}>
            <div className="">
              <div className="d-flex flex-column">
                <div className="mb-auto">
                  <h3 className="text-center">{steps[current].title}</h3>
                  <Steps current={current} progressDot>
                    {items.map((item) => (
                      <Step key={item.key} />
                    ))}
                  </Steps>
                  <div className="text-center rounded p-3">
                    {/* <div style={{height: '550px'}}> */}
                    {steps[current].content}
                    {/* </div> */}
                  </div>
                </div>
                <div className="justify-content-center align-items-center">
                  {current > 0 && (
                    <Button color="danger" className="mr-2" onClick={prev}>
                      Previous
                    </Button>
                  )}
                  {current < steps.length - 1 && (
                    <Button color="primary" className="mr-2" onClick={next}>
                      Next
                    </Button>
                  )}
                  {current === steps.length - 1 && (
                    <Button
                      color="primary"
                      className="mr-2"
                      onClick={createCompanyProfile}
                    >
                      Complete
                    </Button>
                  )}
                  <Button
                    color="link"
                    onClick={skip}
                    disabled={current === steps.length - 1}
                  >
                    Skip Now
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CompanyProfileSetup;
