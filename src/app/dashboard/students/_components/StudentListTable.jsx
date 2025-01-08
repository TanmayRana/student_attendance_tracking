// "use client";
// import React, { useEffect, useState } from "react";
// import { AgGridReact } from "ag-grid-react";
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";

// import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
// import { Button } from "@/components/ui/button";
// import { Search, Trash } from "lucide-react";

// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";

// // Register all Community features
// ModuleRegistry.registerModules([AllCommunityModule]);

// const pagination = true;
// const paginationPageSize = 10;
// const paginationPageSizeSelector = [25, 50, 100];

// const StudentListTable = ({ students }) => {
//   const CustomButtons = (props) => {
//     return (
//       <AlertDialog>
//         <AlertDialogTrigger>
//           <Button variant="destructive" size="sm">
//             <Trash />
//           </Button>
//         </AlertDialogTrigger>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
//             <AlertDialogDescription>
//               This action cannot be undone. This will permanently delete your
//               account and remove your data from our servers.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel>Cancel</AlertDialogCancel>
//             <AlertDialogAction>Continue</AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     );
//   };

//   const [colDefs, setColDef] = useState([
//     { field: "id", filter: true },
//     { field: "name", filter: true },
//     { field: "address", filter: true },
//     { field: "phone", filter: true },
//     { field: "grade", filter: true },
//     { field: "action", cellRenderer: CustomButtons },
//   ]);

//   const [rowData, setRowData] = useState();
//   const [searchInput, setSearchInput] = useState();

//   useEffect(() => {
//     students && setRowData(students);
//   }, [students]);

//   return (
//     <div className="my-7 ">
//       <div className="ag-theme-alpine" style={{ height: 500 }}>
//         <div className="p-2 rounded-lg border shadow-sm flex gap-2 mb-4 max-w-sm items-center">
//           <Search />
//           <input
//             placeholder="Search..."
//             type="text"
//             className="w-full outline-none text-base"
//             onChange={(e) => setSearchInput(e.target.value)}
//           />
//         </div>
//         <AgGridReact
//           rowData={rowData}
//           columnDefs={colDefs}
//           pagination={pagination}
//           paginationPageSize={paginationPageSize}
//           paginationPageSizeSelector={paginationPageSizeSelector}
//           quickFilterText={searchInput}
//         />
//       </div>
//     </div>
//   );
// };

// export default StudentListTable;

"use client";
import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { Button } from "@/components/ui/button";
import { Search, Trash } from "lucide-react";
// import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
// import { AgGridReact } from "ag-grid-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import GlobalApi from "@/app/_services/GlobalApi";
import { toast } from "sonner";

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

const pagination = true;
const paginationPageSize = 10;
const paginationPageSizeSelector = [25, 50, 100];

const StudentListTable = ({ students, refreshData }) => {
  const deleteRecord = async (id) => {
    const res = await GlobalApi.DeleteStudentRecord(id);

    if (res.data) {
      toast.success("Student Deleted successfully");
      refreshData();
    }
  };

  const CustomButtons = (props) => (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button
          variant="destructive"
          size="sm"
          className="flex items-center gap-1"
        >
          <Trash className="w-4 h-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. It will permanently delete this
            record.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteRecord(props.data?.id)}>
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  const [colDefs, setColDefs] = useState([
    { field: "id", headerName: "ID", filter: true },
    { field: "name", headerName: "Name", filter: true },
    { field: "address", headerName: "Address", filter: true },
    { field: "phone", headerName: "Phone", filter: true },
    { field: "grade", headerName: "Grade", filter: true },
    {
      field: "action",
      headerName: "Actions",
      cellRenderer: CustomButtons,
      // sortable: false,
      // filter: false,
      // width: 150,
    },
  ]);

  const [rowData, setRowData] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    setRowData(students || []);
  }, [students]);

  return (
    <div className="my-7 ">
      <div className="p-4 bg-white border rounded-lg shadow-sm">
        <div className="flex items-center gap-2 mb-4 max-w-md">
          <Search className="text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring focus:ring-blue-300 text-sm"
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <div
          className="ag-theme-alpine "
          style={{ height: 400, width: "100%" }}
        >
          <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
            pagination={pagination}
            paginationPageSize={paginationPageSize}
            paginationPageSizeSelector={paginationPageSizeSelector}
            quickFilterText={searchInput}
            className=""
          />
        </div>
      </div>
    </div>
  );
};

export default StudentListTable;
