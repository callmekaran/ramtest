/* eslint-disable no-unused-vars */
import { PenLine, Trash2 } from "lucide-react";
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import RoutesName from "variables/route";

const useRoleHook = () => {
  const defaultRoleData = [
    {
      id: "1",
      name: "Admin",
    },
    {
      id: "2",
      name: "Super Admin",
    },
    {
      id: "3",
      name: "User",
    },
  ];

  const columns = useMemo(
    () => [
      {
        header: "Role Name",
        accessorKey: "name",
        cell: (info) => info.getValue(),
      },
      {
        header: "Actions",
        cell: (info) => {
          const rowData = info.row.original; // This gives you the entire row object
          const { id } = rowData; // Extract id from row data
          return (
            <>
              <Button color="info" className="p-1">
                <PenLine size={20} strokeWidth={2} />
              </Button>
              <Button color="danger" className="p-1">
                <Trash2 size={20} strokeWidth={2} />
              </Button>
            </>
          );
        },
      },
    ],
    []
  );

  const [data, _setData] = useState(() => [...defaultRoleData]);
  const navigate = useNavigate();
  const { add_role, update_role } = RoutesName;

  return {
    columns,
    data,
    navigate,
    add_role,
    update_role,
  };
};

export default useRoleHook;
