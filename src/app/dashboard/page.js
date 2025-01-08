"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import MonthSelection from "../_components/MonthSelection";
import GradeSelect from "../_components/GradeSelect";
import GlobalApi from "../_services/GlobalApi";
import moment from "moment";
import StatusList from "./_components/StatusList";
import BarChartComponent from "./_components/BarChartComponent";
import PieChartComponent from "./_components/PieChartComponent";

const dashboard = () => {
  // const { setTheme } = useTheme();

  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedGrade, setSelectedGrade] = useState();
  const [attendanceList, setAttendanceList] = useState();
  const [totalPresentCountByData, setTotalPresentCountByData] = useState();

  useEffect(() => {
    GetTotalPresentCountByDate();
    getStudentAttendance();
  }, [selectedMonth || selectedGrade]);

  const getStudentAttendance = async () => {
    const result = await GlobalApi.GetAttendanceList(
      selectedGrade,
      moment(selectedMonth).format("MM/yyyy")
    );
    setAttendanceList(result.data);
  };

  const GetTotalPresentCountByDate = async () => {
    const result = await GlobalApi.TotalPresentCountByDate(
      moment(selectedMonth).format("MM/yyyy"),
      selectedGrade
    );
    setTotalPresentCountByData(result.data);
  };

  return (
    <div className="p-7">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Dashboard</h2>

        <div className="flex items-center gap-4">
          <MonthSelection selectedMonth={setSelectedMonth} />
          <GradeSelect setSelectedGrade={setSelectedGrade} />
        </div>
      </div>

      <StatusList attendanceList={attendanceList} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="">
          <BarChartComponent
            attendanceList={attendanceList}
            totalPresentCountByData={totalPresentCountByData}
          />
        </div>
        <div className="">
          <PieChartComponent attendanceList={attendanceList} />
        </div>
      </div>
    </div>
  );
};

export default dashboard;
