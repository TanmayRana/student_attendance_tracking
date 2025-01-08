"use client";

import { getUniqueRecord } from "@/app/_services/service";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Pie, PieChart, ResponsiveContainer } from "recharts";

const PieChartComponent = ({ attendanceList }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (attendanceList && attendanceList.length > 0) {
      // Get unique students
      const uniqueStudents = getUniqueRecord(attendanceList);

      // Calculate the percentage of present students
      const today = moment().date(); // Get the current day as a number
      const totalPossibleDays = Number(today);

      if (totalPossibleDays > 0 && uniqueStudents.length > 0) {
        const presentPercentage =
          (attendanceList.length /
            (uniqueStudents.length * totalPossibleDays)) *
          100;

        setData([
          {
            name: "Total Present",
            value: parseFloat(presentPercentage).toFixed(1),
            fill: "#4c8cf8",
          },
          {
            name: " Total Absent",
            value: 100 - parseFloat(presentPercentage).toFixed(1),
            fill: "#1fe6d1",
          },
        ]);
      }
    }
  }, [attendanceList]);
  return (
    <div className="p-5 border rounded-lg shadow-sm">
      <h2 className="text-xl font-bold">Montly Attendance</h2>
      <ResponsiveContainer width={"100%"} height={300}>
        <PieChart width={730} height={250}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#82ca9d"
            label={({ value }) => ` ${value}%`}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;
