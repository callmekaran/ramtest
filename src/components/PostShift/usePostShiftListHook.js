import { useQuery } from "@tanstack/react-query";
import { Modal, Space } from "antd";
import { get_api } from "api";
import dayjs from "dayjs";
import React from "react";
import { toast } from "react-toastify";
import usePostShiftHook from "./usePostShiftHook";
import { toHoursAndMinutes } from "components/GeneralComponents/Utils";
import { startCase } from "lodash";
import { delete_api } from "api";

const usePostShiftListHook = () => {
  const { unPaidHoursList } = usePostShiftHook();
  const getAllPostShifts = async () => {
    try {
      const { data } = await get_api("post-shifts");
      return data;
    } catch (err) {
      toast.error(err.message);
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["post_shift_list"],
    queryFn: () => getAllPostShifts(),
  });

  const warning = (id) => {
    Modal.warning({
      title: "Are you sure you want to delete this post shift?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        deletePostShift(id);
      },
      onCancel: () => {
        console.log("Cancel clicked..");
      },
    });
  };
  const deletePostShift = async (id) => {
    try {
      const { data, message } = await delete_api(`post-shifts/${id}`);
      await getAllPostShifts();
      toast.success(message);
      return data;
    } catch (err) {
      toast.error(err.message);
    }
  };
  const columns = [
    {
      title: "Date & Time",
      dataIndex: "date",
      key: "date",
      render: (text, record) => (
        <div key={record._id}>
          <h6>{dayjs(text).locale("en").format("ddd DD MMM YYYY")}</h6>
          <p>
            {record.start_time} - {record.end_time}
          </p>
        </div>
      ),
    },
    {
      title: "Total Hrs",
      dataIndex: "total_hours",
      key: "total_hours",
      render: (text, record) => <div key={record._id}>{text}</div>,
    },
    {
      title: "Unpaid",
      dataIndex: "unpaid_hours",
      key: "unpaid_hours",
      render: (text, record) => {
        const unPaidHour = unPaidHoursList.find((uph) => uph?.value === text);
        const uphours = toHoursAndMinutes(unPaidHour?.value.split("-")[0]);
        return <div key={record._id}>{uphours}</div>;
      },
    },
    {
      title: "Rate",
      dataIndex: "total_rate",
      key: "total_rate",
      render: (text, record) => {
        return <div key={record._id}>$ {text}</div>;
      },
    },
    {
      title: "Type",
      dataIndex: "hourly_rate_type",
      key: "hourly_rate_type",
      render: (text, record) => {
        return <div key={record._id}>{startCase(text)}</div>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle" key={record._id}>
          <i
            className="fas fa-edit"
            style={{ cursor: "pointer" }}
            onClick={() => console.log("edit clicked..")}
          />
          <i
            className="fas fa-trash-alt text-danger"
            style={{ cursor: "pointer" }}
            onClick={() => warning(record._id)}
          />
        </Space>
      ),
    },
  ];

  return {
    columns,
    data,
    isLoading,
  };
};

export default usePostShiftListHook;
