import ProtectedLayout from "@/components/ProtectedLayout";
import StudentTable from "@/components/StudentTable";
import { UserType } from "@/utils/constants";
import { useState } from "react";

export default function StudentOverview() {
  const [selectedClass, setSelectedClass] = useState(1);

  const classes = Array.from({ length: 10 }, (_, index) => index + 1);

  return (
    <ProtectedLayout type={UserType.MANAGEMENT}>
      <div className="container-div">
        <ul className="flex mt-4 ">
          {classes.map((classN) => (
            <li
              key={classN}
              onClick={() => setSelectedClass(classN)}
              className={`mr-4 px-6 pt-2 pb-1 rounded-t-lg cursor-pointer ${
                classN === selectedClass ? "bg-gray-300" : " hover:bg-gray-300"
              }`}
            >
              Class {classN}
            </li>
          ))}
        </ul>
        <StudentTable selectedClass={selectedClass} />
      </div>
    </ProtectedLayout>
  );
}
