import React from "react";
import { Card, Tag, Tabs, Row, Col, Avatar } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import { Button } from "reactstrap";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { toHoursAndMinutes } from "components/GeneralComponents/Utils";

const ShiftOverview = ({
  shiftOverview,
  unPaidHoursList,
  setOpenPostShiftModal,
  resetStates,
  updatePostShift,
}) => {
  const navigate = useNavigate();
  const { companyDetail, postShiftDetail } = shiftOverview ?? {};
  const unPaidHour = unPaidHoursList.find(
    (uph) => uph.value === postShiftDetail?.unpaid_hours
  );
  const uphours = toHoursAndMinutes(unPaidHour.value.split("-")[0]);

  const formattedDate = dayjs(postShiftDetail.date)
    .locale("en")
    .format("ddd DD MMM YYYY");
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <Card
            title={<h3 style={{ textAlign: "center" }}>Shift Overview</h3>}
            bordered={false}
          >
            <Row align="middle" justify="space-between">
              <Col>
                <Row align="middle" gutter={16}>
                  <Col>
                    <Avatar src="path-to-logo.png" size="large" />
                  </Col>
                  <Col>
                    <h5>Specsavers</h5>
                    <p>
                      <i className="fas fa-map-marker-alt" /> Baulkum Hills,
                      Sydney
                    </p>
                  </Col>
                </Row>
              </Col>
              <Col>
                <Tag color="green">Full day</Tag>
                <p className="text-muted"> 25 mins ago</p>
              </Col>
            </Row>

            <Row justify="space-between" align="middle" className="mb-3">
              <Col>
                <p>
                  <i className="far fa-calendar-alt" /> {formattedDate}
                </p>
                <p>
                  <i className="far fa-clock" /> {postShiftDetail?.start_time} -{" "}
                  {postShiftDetail?.end_time}
                </p>
              </Col>
              <Col>
                <p className="text-success">$80hr Fixed</p>
              </Col>
            </Row>
            <div className="row text-center mb-4">
              <div className="col">
                <p className="mb-0">{parseInt(postShiftDetail?.total_hours)}</p>
                <p className="mb-0">Hours</p>
              </div>
              <div className="col">
                <p className="mb-0">{uphours}</p>
                <p className="mb-0">Unpaid Hours</p>
              </div>
              <div className="col">
                <p className="mb-0">$ {postShiftDetail?.hourly_rate}</p>
                <p className="mb-0">Hourly Rate</p>
              </div>
              <div className="col">
                <p className="mb-0">$ {postShiftDetail?.total_rate}</p>
                <p className="mb-0">Total</p>
              </div>
            </div>
            <div className="mb-3">
              <Tabs defaultActiveKey="1" className="mb-3">
                <TabPane tab="Requirements" key="1">
                  <ul>
                    {companyDetail?.additionalRequirements.map((ar, i) => (
                      <li key={`${ar}-${i}`}>{ar}</li>
                    ))}
                  </ul>
                </TabPane>
                <TabPane tab="Services" key="2">
                  <ul>
                    {companyDetail?.services.map((ser, i) => (
                      <li key={`${ser}-${i}`}>{ser}</li>
                    ))}
                  </ul>
                </TabPane>
                <TabPane tab="Equipment" key="3">
                  <ul>
                    {companyDetail?.equipment.map((eq, i) => (
                      <li key={`${eq}-${i}`}>{eq}</li>
                    ))}
                  </ul>
                </TabPane>
              </Tabs>
            </div>
            <div className="mb-3">
              <h6>Testing Time</h6>
              <p>{companyDetail?.testingTime}</p>
            </div>
            <div className="d-flex justify-content-center">
              <Button color="primary" onClick={updatePostShift}>
                Post New Shift
              </Button>
              <Button
                color="primary"
                className="border border-secondary bg-transparent text-dark ml-4"
                onClick={() => {
                  setOpenPostShiftModal(false);
                  navigate("/dashboard");
                  resetStates();
                }}
              >
                Dashboard
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ShiftOverview;
