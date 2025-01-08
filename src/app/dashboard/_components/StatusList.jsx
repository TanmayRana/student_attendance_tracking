// import { getUniqueRecord } from "@/app/_services/service";
// import moment from "moment";
// import React, { useEffect, useState } from "react";
// import Card from "./Card";
// import { GraduationCap, TrendingDown, TrendingUp } from "lucide-react";

// const StatusList = ({ attendanceList }) => {
//   const [totalStudents, setTotalStudents] = useState(0);
//   const [presentPerc, setPresentPerc] = useState(0);

//   useEffect(() => {
//     if (attendanceList) {
//       const totalst = getUniqueRecord(attendanceList);
//       setTotalStudents(totalst.length);
//       const today = moment().format("D");
//       const presentprec =
//         (attendanceList.length / (totalst.length * Number(today))) * 100;

//       setPresentPerc(presentprec);

//       //   console.log("present", presentprec);
//     }
//   }, [attendanceList]);

//   return (
//     <div>
//       <Card
//         icon={<GraduationCap />}
//         title="Total Students"
//         value={totalStudents}
//       />
//       <Card
//         icon={<TrendingUp />}
//         title="Total % Present"
//         value={presentPerc.toFixed(1)}
//       />
//       <Card
//         icon={<TrendingDown />}
//         title="Total % Absent"
//         value={(100 - presentPerc).toFixed(1)}
//       />
//     </div>
//   );
// };

// export default StatusList;

import { getUniqueRecord } from "@/app/_services/service";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import { GraduationCap, TrendingDown, TrendingUp } from "lucide-react";

const StatusList = ({ attendanceList }) => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [presentPerc, setPresentPerc] = useState(0);

  useEffect(() => {
    if (attendanceList && attendanceList.length > 0) {
      // Get unique students
      const uniqueStudents = getUniqueRecord(attendanceList);
      setTotalStudents(uniqueStudents.length);

      // Calculate the percentage of present students
      const today = moment().date(); // Get the current day as a number
      const totalPossibleDays = Number(today);

      if (totalPossibleDays > 0 && uniqueStudents.length > 0) {
        const presentPercentage =
          (attendanceList.length /
            (uniqueStudents.length * totalPossibleDays)) *
          100;
        setPresentPerc(presentPercentage);
      } else {
        setPresentPerc(0); // Handle division by zero
      }
    } else {
      setTotalStudents(0);
      setPresentPerc(0);
    }
  }, [attendanceList]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-6">
      <Card
        icon={<GraduationCap />}
        title="Total Students"
        value={totalStudents}
      />
      <Card
        icon={<TrendingUp />}
        title="Total Present"
        value={presentPerc.toFixed(1) + "%"}
      />
      <Card
        icon={<TrendingDown />}
        title="Total Absent"
        value={(100 - presentPerc).toFixed(1) + "%"}
      />
    </div>
  );
};

export default StatusList;
