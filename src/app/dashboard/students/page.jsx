"use client";

import React, { useEffect, useState } from "react";
import AddNewStudent from "./_components/AddNewStudent";
import GlobalApi from "@/app/_services/GlobalApi";
import StudentListTable from "./_components/StudentListTable";

const Student = () => {
  const [students, setStudents] = useState();

  useEffect(() => {
    GetAllStudentsList();
  }, []);

  const GetAllStudentsList = async () => {
    try {
      const resp = await GlobalApi.GetAllStudents();

      setStudents(resp.data);
    } catch (error) {
      console.error("Error fetching grades:", error);
      toast.error("Failed to load grades.");
    }
  };

  return (
    <div className="p-7">
      <h2 className="font-bold text-2xl flex justify-between items-center">
        Students
        <AddNewStudent refreshData={GetAllStudentsList} />
      </h2>
      <StudentListTable students={students} refreshData={GetAllStudentsList} />
    </div>
  );
};

export default Student;
