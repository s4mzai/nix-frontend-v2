import Permission from "@/data/permissions";
import { createContext, useState } from "react";
import { Navigate, useNavigate, useRoutes } from "react-router-dom";
import { toast } from "react-toastify";
import { protectedRoutes } from "./protected";
const appContext = createContext();

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const auth_user = JSON.parse(localStorage.getItem("user"));
  const user_perms = auth_user?.is_superuser ? "*" : (auth_user?.permissions || []);
  const [permissionError, setPermissionError] = useState([]);
  const [permissions, setPermsUser] = useState(user_perms);
  const updateValue = (data) => {
    const err_code = data?.response?.status;
    if (err_code) {
      switch (err_code) {
      case 401:
        navigate("/login?sessionExpired=true");
        break;
      case 403:
        toast.error("Permission denied by the server! Relogin to update permissions.");
        break;
      default:
        toast.error(data?.response?.data?.message || data?.message || "An error occurred!");
      }
    }
  };
  const setPermErr = (data) => {
    setPermissionError(data);
  };
  const setPerms = (data) => {
    setPermsUser(data);
  };
  const element = useRoutes([...protectedRoutes]);
  if (!auth_user) {
    return <Navigate to="/login" />;
  }
  if (localStorage.getItem("token")) {
    return (
      <appContext.Provider value={{ updateValue, setPermErr, permissions, setPerms }}>
        {permissionError && permissionError.length > 0 ?
          <div className='flex  justify-center items-center h-screen'>
            <div className='p-6 border-l-rose-700 border-4 border-l-8 rounded-e-xl'>
              The following permissions were not met for this action:
              <ul>
                {permissionError.map((err, index) => {
                  return <li className='ml-4 p-2' key={index}>&gt; {Permission[err]}</li>;
                })}
              </ul>
              <button
                className='rounded-xl border-black border-2 bg-slate-400 px-4 py-2 mt-6'
                onClick={() => {
                  setPermissionError([]);
                  navigate(-1);
                }}
              >
                Okay
              </button>
            </div>
          </div> : element
        }
      </appContext.Provider>);
  } else {
    return <Navigate to="/login?sessionExpired=true" />;
  }
};

export default ProtectedRoute;
export { appContext };
