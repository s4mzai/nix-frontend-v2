import API from "@/services/API";
import { useContext } from "react";
import { CurrUserCtx } from "@/contexts/current_user";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "@/components/Spinner";

const AvatarImage = ({ src, alt, className }) => {
  return <img className={`rounded-full ${className}`} src={src} alt={alt} />;
};

const uri = API.getUri();

export default function Profile() {
  const navigate = useNavigate();
  const { ready, user } = useContext(CurrUserCtx);
  if (!ready)
    return (
      <div className="flex w-full h-full justify-center items-center">
        <Spinner />
      </div>
    );
  return (
    <div className="max-w-4xl mx-auto my-2 md:my-10 p-8 shadow rounded">
      <div className="space-y-6 mt-4">
        <div className="flex justify-between">
          
          <div className="flex justify-between">
            
            <div className="flex gap-1 items-center">
              
              <div className="md:w-36 md:h-36 w-24 h-24 bg-gray-200 rounded-full overflow-hidden">
                <AvatarImage
                  alt={user.name}
                  className="h-36 w-36"
                  src={`${API.getUri()}/images/get-avatar/${user.id}?thumbnail=true`}
                />
              </div>
              <div className="ms-4">
                <h1 className="text-left md:text-3xl text-2xl font-semibold text-gray-800 font-sans">
                  {user.name}
                </h1>
                <span className="text-left text-gray-600 md:text-md text-xs">{user.role}</span>
              </div>
            </div>
            
          </div>
          <div>
          <Link
            to={`/member/edit-details/${user.id}/`}
            className="bg-blue-500 md:text-md text-sm w-[100px] text-white p-2 rounded hover:bg-green-500"
          >
            Edit Info
          </Link>
        </div>
        </div>
        <p className="mb-6 font-normal text-gray-600 text-lg">
          {user.bio || "No bio available"}
        </p>
        <hr className="border-t border-gray-300 mt-6 mb-6 w-full" />

        <ul className="mb-6">
          <li className="mb-2">
            <span className="text-gray-600 font-semibold">Email:</span>
            <span className="text-gray-600 ml-1">{user.email}</span>
          </li>
        </ul>

        
      </div>
    </div>
  );
}
