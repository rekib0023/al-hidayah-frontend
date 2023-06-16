import { useAuth } from "@/context/AuthProvider";
import axios from "@/utils/axios";
import { UserType } from "@/utils/constants";
import { saveToLocalStorage } from "@/utils/localStorage";
import { useRouter } from "next/router";
import { useState } from "react";

export default function LoginForm({ userType }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const { setUser } = useAuth();

  const router = useRouter();

  const handleEmailChange = (e) => {
    setErrMsg(null);
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setErrMsg(null);
    setPassword(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`api/login`, {
        email,
        password,
        type: userType,
      });
      const { user } = response.data;
      setUser(user);
      saveToLocalStorage("user", user);
      router.push("/");
    } catch (error) {
      if (error.response) {
        console.error("Server error:", error.response.data);
        setErrMsg(error.response.data.message);
      } else if (error.request) {
        console.error("No response from server:", error.request);
        setErrMsg("No response from server");
      } else {
        console.error("Error:", error.message);
        setErrMsg("Something went wrong");
      }
    }
  };

  return (
    <div className="bg-primary w-screen h-screen flex justify-center items-center">
      <div className="bg-white text-primary rounded-lg w-1/3 h-2/3 flex flex-col justify-center items-center">
        <div className="absolute top-0 left-0 mt-4 ml-8 text-sm">
          <button
            className="btn-primary inline-flex gap-1"
            onClick={() => {
              router.push("/");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            Go back
          </button>
        </div>
        {getHeader(userType)}
        {errMsg && (
          <div className="bg-secondary bg-opacity-20 text-secondary rounded w-4/5 text-center py-2 mt-4">
            <h1>{errMsg}</h1>
          </div>
        )}
        <form className="flex flex-col w-4/5 mt-8" onSubmit={onSubmit}>
          <label>Email</label>
          <input
            type="text"
            className="border border-gray-300 px-3 py-2 mt-1 mb-2 rounded"
            value={email}
            onChange={handleEmailChange}
          />
          <label>Password</label>
          <div className="w-full">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="border border-gray-300 px-3 py-2 mt-1 mb-2 rounded w-full"
                value={password}
                onChange={handlePasswordChange}
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 transform -translate-y-1/2"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  {showPassword ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  ) : (
                    <>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>
          <button type="submit" className="mt-4 btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

const getHeader = (userType) => {
  const ManagementHeader = (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-8 h-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
        />
      </svg>
      <h2 className="text-xl">
        <strong>Management Portal</strong>
      </h2>
    </>
  );
  const StaffHeader = (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-8 h-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
        />
      </svg>

      <h2 className="text-xl">
        <strong>Staff Portal</strong>
      </h2>
    </>
  );
  const StudentHeader = (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-8 h-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
        />
      </svg>

      <h2 className="text-xl">
        <strong>Student Portal</strong>
      </h2>
    </>
  );

  return userType === UserType.MANAGEMENT
    ? ManagementHeader
    : userType === UserType.STAFF
    ? StaffHeader
    : StudentHeader;
};
