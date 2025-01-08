"use client";
import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import moment from "moment";
import GlobalApi from "@/app/_services/GlobalApi";
import { toast } from "sonner";
import { getUniqueRecord } from "@/app/_services/service";

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

const pagination = true;
const paginationPageSize = 10;
const paginationPageSizeSelector = [25, 50, 100];

const AttendanceGrid = ({ attendanceList, selectedMonth }) => {
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: "studentId", headerName: "Student ID", filter: true },
    { field: "name", headerName: "Name", filter: true },
  ]);

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const numberOfDays = daysInMonth(
    moment(selectedMonth).format("yyyy"),
    moment(selectedMonth).format("MM")
  );

  const daysArray = Array.from(
    { length: numberOfDays },
    (_, index) => index + 1
  );

  useEffect(() => {
    if (attendanceList) {
      const userList = getUniqueRecord(attendanceList);

      setRowData(userList);

      daysArray.forEach((date) => {
        setColumnDefs((prev) => [
          ...prev,
          {
            field: date.toString(),
            headerName: date,
            width: 50,
            editable: true,
          },
        ]);
        userList.forEach((obj) => {
          obj[date] = isPresent(obj.studentId, date);
        });
      });
    }
  }, [attendanceList]);

  const isPresent = (studentId, day) => {
    const result = attendanceList.find(
      (record) => record.studentId === studentId && record.day === day
    );
    return result ? true : false;
  };

  const onMarkAttendance = async (day, studentId, presentStatus) => {
    const date = moment(selectedMonth).format("MM/yyyy");
    if (presentStatus) {
      const data = {
        studentId: studentId,
        day: day,
        present: presentStatus,
        date: date,
      };
      const result = await GlobalApi.MarkAttendance(data);

      if (result.status === 200) {
        toast.success(`Attendance marked for student ID: ${studentId}`);
      }
    } else {
      const result = await GlobalApi.MarkAbsent(studentId, day, date);
      if (result.status === 200) {
        toast.success(`Attendance marked absent for student ID: ${studentId}`);
      }
    }
  };

  return (
    <div>
      <div style={{ height: 500 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
          onCellValueChanged={(e) => {
            console.log(e.colDef.field, e.data.studentId, e.newValue);

            onMarkAttendance(e.colDef.field, e.data.studentId, e.newValue);
          }}
        />
      </div>
    </div>
  );
};

export default AttendanceGrid;
