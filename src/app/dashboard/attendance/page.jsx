"use client";

import GradeSelect from "@/app/_components/GradeSelect";
import MonthSelection from "@/app/_components/MonthSelection";
import GlobalApi from "@/app/_services/GlobalApi";
import { Button } from "@/components/ui/button";
import moment from "moment";
import React, { useState } from "react";
import AttendanceGrid from "./_components/AttendanceGrid";

const Attendance = () => {
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedGrade, setSelectedGrade] = useState();
  const [attendanceList, setAttendanceList] = useState();

  const onSearchHandler = async () => {
    const month = moment(selectedMonth).format("MM/YYYY");

    const result = await GlobalApi.GetAttendanceList(selectedGrade, month);

    setAttendanceList(result.data);
  };

  return (
    <div className="p-7">
      <h2 className="text-2xl font-bold">Attendance</h2>
      {/* Search option */}

      <div className=" flex gap-5 my-5 p-5 rounded-lg border shadow-sm">
        <div className="flex gap-2 items-center">
          <label className="text-slate-500">Select Month:</label>
          <MonthSelection selectedMonth={(value) => setSelectedMonth(value)} />
        </div>
        <div className="flex gap-2 items-center">
          <label className="text-slate-500">Select Grade:</label>
          <GradeSelect setSelectedGrade={(value) => setSelectedGrade(value)} />
        </div>
        <Button onClick={() => onSearchHandler()}>Search</Button>
      </div>

      {/* Students Attendance */}
      <AttendanceGrid
        attendanceList={attendanceList}
        selectedMonth={selectedMonth}
      />
    </div>
  );
};

export default Attendance;
