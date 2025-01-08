"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "./phone-input";
import { useForm } from "react-hook-form";
import GlobalApi from "@/app/_services/GlobalApi";
import { toast } from "sonner";
import { LoaderIcon } from "lucide-react";

const AddNewStudent = ({ refreshData }) => {
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

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

  const onSubmit = async (data) => {
    setLoading(true);

    // Combine form data with phone input
    const formData = { ...data, phone };

    try {
      const resp = await GlobalApi.CreateNewStudent(formData);

      if (resp.data.result) {
        setOpen(false);
        toast.success("Student added successfully!");
        reset(); // Reset the form fields
        refreshData();
        setPhone(""); // Reset phone input
      }
    } catch (error) {
      console.error("Error adding student:", error);
      toast.error("Failed to add student.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => setOpen(true)}>+ Add New Student</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogDescription>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="py-2 space-y-2">
                  <label>First Name</label>
                  <Input
                    placeholder="First Name"
                    {...register("name", {
                      required: "First name is required",
                    })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col py-2 space-y-2">
                  <label>Select Grade</label>
                  <select
                    className="p-3 border rounded-lg"
                    {...register("grade", { required: "Grade is required" })}
                  >
                    <option value="">Select Grade</option>
                    {grades?.map((item, index) => (
                      <option key={index} value={item.grade}>
                        {item.grade}
                      </option>
                    ))}
                  </select>
                  {errors.grade && (
                    <p className="text-red-500 text-sm">
                      {errors.grade.message}
                    </p>
                  )}
                </div>

                <div className="py-2 space-y-2">
                  <label>Contact Number</label>
                  <PhoneInput
                    value={phone}
                    onChange={setPhone}
                    defaultCountry="IN"
                  />
                </div>
                <div className="py-2 space-y-2">
                  <label>Address</label>
                  <Input placeholder="Address" {...register("address")} />
                </div>

                <div className="flex gap-3 items-center justify-end mt-5">
                  <Button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      reset(); // Reset the form
                      setPhone(""); // Reset phone input
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? <LoaderIcon className="animate-spin" /> : "Save"}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewStudent;
