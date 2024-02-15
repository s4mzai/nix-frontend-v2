import { PermErrCtx } from "@/contexts/permission_error";
import Permission from "@/data/permissions";
import React from "react";
import { Navigate, useNavigate, useRoutes } from "react-router-dom";
import { protectedRoutes } from "./protected";


const ProtectedRoute = () => {
  const { failedPermissions, setFailedPermissions } = React.useContext(PermErrCtx);
  const navigate = useNavigate();
  const element = useRoutes([...protectedRoutes]);
  // todo: fix this crappy code as localStorage should not be readily available in the component
  const auth_user = JSON.parse(localStorage.getItem("user"));

  if (!auth_user) {
    return <Navigate to="/login" />;
  }
  if (localStorage.getItem("token")) {
    return (
      <>
        {failedPermissions !== null && failedPermissions.length > 0 ?
          <div className='flex  justify-center items-center h-screen'>
            <div className='p-6 border-l-rose-700 border-4 border-l-8 rounded-e-xl'>
              The following permissions were not met for this action:
              <ul>
                {failedPermissions.map((err, index) => {
                  return <li className='ml-4 p-2' key={index}>&gt; {Permission[err]}</li>;
                })}
              </ul>
              <button
                className='rounded-xl border-black border-2 bg-slate-400 px-4 py-2 mt-6'
                onClick={() => {
                  setFailedPermissions(null);
                  navigate(-1);
                }}
              >
                Okay
              </button>
            </div>
          </div> : element
        }
      </>);
  } else {
    return <Navigate to="/login?sessionExpired=true" />;
  }
};

export default ProtectedRoute;
