import { DatePicker, Radio, Select, Slider, Space, TimePicker } from "antd";
import { useState } from "react";
import { Input, Label } from "reactstrap";
import dayjs from "dayjs";
import { post_api } from "api";
import { toast } from "react-toastify";
import { put_api } from "api";

const usePostShiftHook = () => {
  const [openPostShiftModal, setOpenPostShiftModal] = useState(false);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [postShiftObj, setPostShiftObj] = useState({
    date: null,
    start_time: null,
    end_time: null,
    hourly_rate_type: "fixed",
    unpaid_hours: null,
    hourly_rate: null,
    isPosted: false,
  });
  const [shiftOverview, setShiftOverview] = useState({});
  const unPaidHoursList = [
    {
      value: "15-mins",
      label: "15 Mins",
    },
    {
      value: "30-mins",
      label: "30 Mins",
    },
    {
      value: "45-mins",
      label: "45 Mins",
    },
    {
      value: "60-mins",
      label: "1 Hour",
    },
    {
      value: "90-mins",
      label: "1.5 hour",
    },
    {
      value: "120-mins",
      label: "2 Hours",
    },
  ];
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const skip = () => {
    setCurrent(current + 1);
  };

  const resetStates = () => {
    setOpenPostShiftModal(false);
    setPostShiftObj({
      date: null,
      start_time: null,
      end_time: null,
      hourly_rate_type: "fixed",
      unpaid_hours: null,
      hourly_rate: null,
      isPosted: false,
    });
    setShiftOverview({});
    setCurrent(0);
  };

  const createPostShift = async () => {
    try {
      setLoading(true);
      const { data, message } = await post_api(
        "post-shifts/create",
        postShiftObj
      );
      setShiftOverview(data);
      setLoading(false);
      toast.success(message);
      return data;
    } catch (err) {
      toast.error(err.message);
    }
  };

  const updatePostShift = async () => {
    try {
      const { data, message } = await put_api("post-shifts/update", {
        ...shiftOverview?.postShiftDetail,
        isPosted: true,
      });
      toast.success(message);
      resetStates();
      return data;
    } catch (err) {
      toast.error(err.message);
    }
  };

  const disabledDate = (current) => current && current < dayjs().startOf("day");

  const renderShiftSelection = () => {
    return (
      <>
        <Label className="font-weight-bold">Shift Details</Label>
        <div className="mt-3">
          <Label>Date</Label>
          <div>
            <DatePicker
              value={!!postShiftObj?.date && dayjs(postShiftObj?.date)}
              onChange={(date, dateString) => {
                setPostShiftObj((prev) => ({
                  ...prev,
                  date: dateString,
                }));
              }}
              disabledDate={disabledDate}
            />
          </div>
        </div>
        <div className="mt-3">
          <Label>Time</Label>
          <div>
            <TimePicker.RangePicker
              use12Hours
              format="h:mm A"
              onChange={(time, timeString) => {
                setPostShiftObj((prev) => ({
                  ...prev,
                  start_time: timeString[0],
                  end_time: timeString[1],
                }));
              }}
            />
          </div>
        </div>
      </>
    );
  };
  const renderUnpaidHours = () => {
    return (
      <>
        <Label className="font-weight-bold">Unpaid Hours</Label>
        <div>
          <Select
            value={postShiftObj?.unpaid_hours}
            showSearch
            placeholder="Select hours"
            optionFilterProp="children"
            onChange={(val) => {
              setPostShiftObj((prev) => ({
                ...prev,
                unpaid_hours: val,
              }));
            }}
            options={unPaidHoursList}
          />
        </div>
      </>
    );
  };
  const renderHourlyRate = () => {
    return (
      <>
        <Label className="font-weight-bold">Hourly Rate</Label>
        <div>
          <Radio.Group
            onChange={(e, v) => {
              setPostShiftObj((prev) => ({
                ...prev,
                hourly_rate_type: e.target.value,
              }));
            }}
            value={postShiftObj?.hourly_rate_type}
          >
            <Space direction="vertical">
              <Radio value="fixed" style={{ width: "100%" }}>
                Fixed{" "}
                {postShiftObj?.hourly_rate_type === "fixed" ? (
                  <Input
                    placeholder="Enter rate"
                    style={{
                      width: "calc(100% - 40px)",
                      marginLeft: 10,
                    }}
                    onChange={(e) => {
                      setPostShiftObj((prev) => ({
                        ...prev,
                        hourly_rate: e.target.value,
                      }));
                    }}
                  />
                ) : null}
              </Radio>
              <Radio value="negotiable" style={{ width: "100%" }}>
                Negotiable{" "}
                {postShiftObj?.hourly_rate_type === "negotiable" ? (
                  <Slider
                    range
                    defaultValue={[20, 50]}
                    style={{ width: "100%" }}
                    onChange={(val) => {
                      setPostShiftObj((prev) => ({
                        ...prev,
                        hourly_rate: val.toString(),
                      }));
                    }}
                  />
                ) : null}
              </Radio>
            </Space>
          </Radio.Group>
        </div>
      </>
    );
  };

  const steps = [
    {
      title: "Shift Selection",
      content: renderShiftSelection(),
    },
    {
      title: "Unpaid Hours",
      content: renderUnpaidHours(),
    },
    {
      title: "Hourly Rate",
      content: renderHourlyRate(),
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const isCurrentStepEmpty = () => {
    switch (current) {
      case 0:
        return (
          !postShiftObj.date ||
          !postShiftObj.start_time ||
          !postShiftObj.end_time
        );
      case 1:
        return !postShiftObj.unpaid_hours;
      case 2:
        return !postShiftObj.hourly_rate;
      default:
        return false;
    }
  };

  return {
    openPostShiftModal,
    setOpenPostShiftModal,
    steps,
    items,
    current,
    skip,
    next,
    prev,
    createPostShift,
    shiftOverview,
    unPaidHoursList,
    loading,
    isCurrentStepEmpty,
    resetStates,
    updatePostShift,
  };
};

export default usePostShiftHook;
