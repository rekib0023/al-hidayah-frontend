import { useTable } from "react-table";
import { useEffect, useMemo, useState } from "react";
import formatDate from "@/utils/dateFormatter";
import { axiosPrivate } from "@/utils/axios";
import Modal from "./Modal";
import StudentForm from "./StudentForm";

const StudentTable = ({ selectedClass }) => {
  const [studentData, setStudentData] = useState([]);
  useEffect(() => {
    fetchStudents();
    console.log(studentData);
  }, [selectedClass]);

  const fetchStudents = async () => {
    try {
      const response = await axiosPrivate.get(
        `/api/management/students?class=${selectedClass}`
      );
      setStudentData(response.data[selectedClass]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = (id) => {};

  const handleDeleteClick = async (id) => {
    try {
      const response = await axiosPrivate.delete(
        `/api/management/students/${id}`
      );
      console.log(response.data);
      fetchStudents();
    } catch (error) {
      console.log(error);
    }
  };

  return studentData ? (
    <Table
      students={studentData}
      handleEditClick={handleEditClick}
      handleDeleteClick={handleDeleteClick}
    />
  ) : (
    <div className="flex flex-col items-center justify-center h-48 w-screen">
      <div className="mb-2">No students enrolled</div>
      <Modal
        title="Add student"
        heading="Create student"
        body={<StudentForm classNumber={selectedClass} />}
      />
    </div>
  );
};

export default StudentTable;

const Table = ({ students, handleEditClick, handleDeleteClick }) => {
  const columns = useMemo(
    () => [
      { Header: "Roll No.", accessor: "rollNumber" },
      { Header: "First Name", accessor: "user.firstName" },
      { Header: "Last Name", accessor: "user.lastName" },
      { Header: "Batch", accessor: "batch" },
      {
        Header: "Date of Birth",
        accessor: "user.dob",
        Cell: ({ value }) => formatDate(value),
      },
      { Header: "Address", accessor: "user.address" },
      { Header: "Email", accessor: "user.email" },
      { Header: "Phone", accessor: "user.phone" },
      { Header: "Parents Detail", accessor: "parentsDetail" },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="inline-flex gap-1">
            <button
              className="btn-default border"
              s
              onClick={() => handleActionClick(row.original._id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </button>
            <button
              className="btn-default text-secondary border"
              s
              onClick={() => handleDeleteClick(row.original._id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const data = useMemo(() => students, [students]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <table
      {...getTableProps()}
      style={{ borderCollapse: "collapse", width: "100%" }}
    >
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                style={{
                  borderBottom: "1px solid #ddd",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td
                  {...cell.getCellProps()}
                  style={{
                    borderBottom: "1px solid #ddd",
                    padding: "8px",
                  }}
                >
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
