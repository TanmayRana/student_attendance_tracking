"use client";

import React, { useEffect, useState } from "react";
import GlobalApi from "../_services/GlobalApi";
import { toast } from "sonner";

const GradeSelect = ({ setSelectedGrade }) => {
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    GetAllGradesList();
  }, []);

  const GetAllGradesList = async () => {
    try {
      const resp = await GlobalApi.GetAllGrades();
      setGrades(resp.data.result || []);
    } catch (error) {
      console.error("Error fetching grades:", error);
      toast.error("Failed to load grades.");
    }
  };

  return (
    <div>
      <select
        className="p-2 border rounded-lg"
        onChange={(e) => setSelectedGrade(e.target.value)}
      >
        <option value="">Select Grade</option>
        {grades?.map((item, index) => (
          <option key={index} value={item.grade}>
            {item.grade}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GradeSelect;
