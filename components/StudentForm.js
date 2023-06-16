import { useState } from "react";
import DefaultForm from "./DefaultForm";
import { axiosPrivate } from "@/utils/axios";
import { useRouter } from "next/router";

export default function StudentForm({ classNumber }) {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [dob, setDob] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const [batch, setBatch] = useState();
  const [classN, setClassN] = useState(classNumber);
  const [parentsDetail, setParentsDetail] = useState();
  const [errMsg, setErrMsg] = useState(null);

  const router = useRouter();

  const fields = [
    {
      id: "firstName",
      value: firstName,
      cb: setFirstName,
      inputType: "text",
      label: "First Name",
      placeholder: "Enter the first name",
    },
    {
      id: "lastName",
      value: lastName,
      cb: setLastName,
      inputType: "text",
      label: "Last Name",
      placeholder: "Enter the last name",
    },
    {
      id: "email",
      value: email,
      cb: setEmail,
      inputType: "email",
      label: "Email",
      placeholder: "Enter the email",
    },
    {
      id: "dob",
      value: dob,
      cb: setDob,
      inputType: "date",
      label: "Date of Birth",
      placeholder: "Select the date of birth",
    },
    {
      id: "address",
      value: address,
      cb: setAddress,
      inputType: "text",
      label: "Address",
      placeholder: "Enter the address",
    },
    {
      id: "phone",
      value: phone,
      cb: setPhone,
      inputType: "tel",
      label: "Phone",
      placeholder: "Enter the phone number",
    },
    {
      id: "batch",
      value: batch,
      cb: setBatch,
      inputType: "text",
      label: "Batch",
      placeholder: "Enter the batch",
    },
    {
      id: "classN",
      value: classN,
      cb: setClassN,
      inputType: "number",
      label: "Class",
      placeholder: "Enter the class",
    },
    {
      id: "parentsDetail",
      value: parentsDetail,
      cb: setParentsDetail,
      inputType: "text",
      label: "Parents Detail",
      placeholder: "Enter parents' details",
    },
  ];

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const data = {
      firstName,
      lastName,
      email,
      dob,
      address,
      phone,
      batch,
      classN,
      parentsDetail,
    };
    try {
      await axiosPrivate.post("/api/management/students", data);
      router.reload();
    } catch (error) {
      console.log(error);
      if (error.response) {
        console.error("Server error:", error.response.data);
        setErrMsg(error.response.data);
      } else if (error.request) {
        console.error("No response from server:", error.request);
        setErrMsg("No response from server");
      } else {
        console.error("Error:", error.message);
        setErrMsg("Something went wrong");
      }
    }
  };

  const uploadStudent = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    const reader = new FileReader();

    reader.onload = async (e) => {
      const fileData = e.target.result;
      const arrayBuffer = new Uint8Array(fileData);
      formData.append("file", new Blob([arrayBuffer]));

      try {
        await axiosPrivate.post("/api/management/students/upload", formData);
        router.reload();
      } catch (error) {
        console.log(error);
        if (error.response) {
          console.error("Server error:", error.response.data);
          setErrMsg(error.response.data);
        } else if (error.request) {
          console.error("No response from server:", error.request);
          setErrMsg("No response from server");
        } else {
          console.error("Error:", error.message);
          setErrMsg("Something went wrong");
        }
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const uploadActionBtn = (
    <>
      <label
        className="btn-secondary w-full flex items-center justify-center cursor-pointer gap-2"
        htmlFor="uploadSheet"
      >
        Upload
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
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
          />
        </svg>
      </label>
      <input
        id="uploadSheet"
        type="file"
        accept=".xlsx"
        className="hidden"
        onChange={uploadStudent}
      />
    </>
  );

  return (
    <DefaultForm
      fields={fields}
      handleOnSubmit={handleOnSubmit}
      otherActionBtn={uploadActionBtn}
      errMsg={errMsg}
    />
  );
}
