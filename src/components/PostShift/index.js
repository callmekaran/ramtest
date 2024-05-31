import { Spin, Table } from "antd";
import React from "react";
import usePostShiftListHook from "./usePostShiftListHook";

const PostShiftList = () => {
  const { columns, data, isLoading } = usePostShiftListHook();
  return (
    <div className="content mb-0">
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
        <Table columns={columns} dataSource={data} rowKey="_id" />
      )}
    </div>
  );
};

export default PostShiftList;
