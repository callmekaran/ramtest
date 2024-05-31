import { Modal, Spin, Steps } from "antd";
import usePostShiftHook from "./usePostShiftHook";
import { Button } from "reactstrap";
import { isEmpty } from "lodash";
import ShiftOverview from "./ShiftOverview";
const { Step } = Steps;

const PostShift = () => {
  const {
    openPostShiftModal,
    setOpenPostShiftModal,
    current,
    items,
    steps,
    prev,
    next,
    createPostShift,
    shiftOverview,
    unPaidHoursList,
    loading,
    isCurrentStepEmpty,
    resetStates,
    updatePostShift,
  } = usePostShiftHook();

  return (
    <div className="row justify-content-center">
      <div className="col-md-12">
        <Button
          color="transparent"
          outline
          className="btn-round border border-secondary bg-transparent text-dark mt-0 mb-0 ml-3"
          onClick={() => setOpenPostShiftModal(true)}
        >
          Post Shift
        </Button>
        <Modal
          open={openPostShiftModal}
          // onOk={handleOk}
          // confirmLoading={confirmLoading}
          onCancel={() => resetStates()}
          width="100%"
          style={{ overflow: "hidden" }}
          styles={{ body: { height: "calc(90vh - 56px)", overflow: "auto" } }}
          centered
          footer={null}
          destroyOnClose
        >
          <div>
            {isEmpty(shiftOverview) ? (
              <>
                <div className="w-100">
                  <h3 className="text-center">{steps[current].title}</h3>
                  <Steps current={current} labelPlacement="vertical">
                    {items.map((item) => (
                      <Step key={item.key} title={item.title} />
                    ))}
                  </Steps>
                  <div className="mt-4">
                    <div style={{ height: "500px" }}>
                      {steps[current].content}
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center align-items-center mt-3">
                  {current > 0 && (
                    <Button color="danger" className="mr-2" onClick={prev}>
                      Previous
                    </Button>
                  )}
                  {current < steps.length - 1 && (
                    <Button
                      color="primary"
                      className="mr-2"
                      onClick={next}
                      disabled={isCurrentStepEmpty()}
                    >
                      Next
                    </Button>
                  )}
                  {current === steps.length - 1 && (
                    <Button
                      color="primary"
                      className="mr-2"
                      onClick={createPostShift}
                      disabled={loading}
                    >
                      {loading && <Spin fullscreen />} Complete
                    </Button>
                  )}
                </div>
              </>
            ) : (
              <ShiftOverview
                shiftOverview={shiftOverview}
                unPaidHoursList={unPaidHoursList}
                setOpenPostShiftModal={setOpenPostShiftModal}
                resetStates={resetStates}
                updatePostShift={updatePostShift}
              />
            )}
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default PostShift;
