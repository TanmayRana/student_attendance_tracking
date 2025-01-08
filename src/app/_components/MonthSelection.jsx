"use client";

import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";
import { addMonths } from "date-fns";
import moment from "moment";
import { Calendar } from "@/components/ui/calendar";

const MonthSelection = ({ selectedMonth }) => {
  const today = new Date();

  const nextMonth = addMonths(new Date(), 0);
  const [month, setMonth] = useState(nextMonth);

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center gap-2 text-slate-500"
          >
            <CalendarDays className="h-5 w-5" />
            {moment(month).format("MMMM YYYY")}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            mode="single"
            className="flex flex-1 justify-center"
            month={month}
            onMonthChange={(month) => {
              selectedMonth(month);
              setMonth(month);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default MonthSelection;
