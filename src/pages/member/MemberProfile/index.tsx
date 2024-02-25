import API from "@/services/API";
import { useContext } from "react";
import { CurrUserCtx } from "@/contexts/current_user";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@/components/Spinner";

const AvatarImage = ({ src, alt, className }) => {
  return <img className={`rounded-full ${className}`} src={src} alt={alt} />;
};

const uri = API.getUri();

export default function Profile() {
  // const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  const { ready, user } = useContext(CurrUserCtx);
  if (!ready) return <div className="flex w-full h-full justify-center items-center"><Spinner /></div>;
  return (
    <div className="max-w-4xl mx-auto my-10 p-8 shadow rounded">
      <div className="space-y-6 mt-4">
        <div className="flex flex-col">
          <div className="flex items-center">
            <div className="w-36 h-36 bg-gray-200 rounded-full overflow-hidden">
              <AvatarImage alt={user.name} className="h-36 w-36" src={`${uri}/images/get-avatar/${user.id}?thumbnail=true`} />
            </div>
            <div className="ms-4">
              <h1 className="text-3xl font-semibold text-gray-800 font-sans">{user.name}</h1>
              <span className="text-gray-600">{user.role}</span>
            </div>
          </div>
        </div>
        <p className="mb-6 font-normal text-gray-600 text-lg">
          {user.bio || "No bio available"}
        </p>
        <hr className="border-t border-gray-300 mt-6 mb-6 w-full" />

        <ul className="mb-6">
          <li className="mb-2">
            <span className="text-gray-600 font-semibold">Email:</span>
            <span className="text-gray-600 ml-1">
              {user.email}
            </span>
          </li>
          <li className="mb-2">
            <span className="text-gray-600">You joined on</span> 
            <span className="text-gray-600 ml-1">{user.date_joined || "01-01-2024"}</span>
          </li>
        </ul>

        <div>
          <button className="bg-blue-500 text-white p-2 rounded hover:bg-green-500" onClick={() => navigate(`/member/${user.id}/edit-details`)}>Edit Info</button>
        </div>
      </div>
    </div>
  );
}
