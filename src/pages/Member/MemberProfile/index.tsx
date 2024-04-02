import API from "@/services/API";
import { useContext, useEffect, useState } from "react";
import { CurrUserCtx } from "@/contexts/current_user";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Spinner } from "@/components/Spinner";

const AvatarImage = ({ src, alt, className }) => {
  return <img className={`rounded-full ${className}`} src={src} alt={alt} />;
};

const uri = API.getUri();

export default function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { ready, user } = useContext(CurrUserCtx);
  const [userDetails, setUserDetails] = useState({
    name: "",
    role: "",
    email: "",
    bio: ""
  });
  if (!ready)
    return (
      <div className="flex w-full h-full justify-center items-center">
        <Spinner />
      </div>
    );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `/user/get-user/${id}`;
        console.log("API URL:", apiUrl); // Logging the API URL
        const response = await API.get(apiUrl);
        const userData = response.data.data;
        setUserDetails({
          name: userData.name,
          role: userData.role,
          email: userData.email,
          bio: userData.bio
        });

      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (id) {
      fetchData();
    }

    return () => {
      // Cleanup function 
    };
  }, [id]);
  return (
    <div className="max-w-4xl mx-auto my-10 p-8 shadow rounded">
      <div className="space-y-6 mt-4">
        <div className="flex flex-col">
          <div className="flex justify-between">
            <div className="flex gap-1 items-center">
              <div className="w-36 h-36 bg-gray-200 rounded-full overflow-hidden">
                <AvatarImage
                  alt={user.name}
                  className="h-36 w-36"
                  src={`${API.getUri()}/images/get-avatar/${id}?thumbnail=true`}
                />
              </div>
              <div className="ms-4">
                <h1 className="text-3xl font-semibold text-gray-800 font-sans">
                  {userDetails.name}
                </h1>
                <span className="text-gray-600">{userDetails.role}</span>
              </div>
            </div>
            <div>
              <Link
                to={`/member/edit-details/${id}/`}
                className="bg-blue-500 text-white p-2 rounded hover:bg-green-500"
              >
                Edit Info
              </Link>
            </div>
          </div>
        </div>
        <p className="mb-6 font-normal text-gray-600 text-lg">
          {userDetails.bio || "No bio available"}
        </p>
        <hr className="border-t border-gray-300 mt-6 mb-6 w-full" />

        <ul className="mb-6">
          <li className="mb-2">
            <span className="text-gray-600 font-semibold">Email:</span>
            <span className="text-gray-600 ml-1">{userDetails.email}</span>
          </li>
        </ul>

        {/* <div>
          <Link
            to={`/member/edit-details/${id}/`}
            className="bg-blue-500 text-white p-2 rounded hover:bg-green-500"
          >
            Edit Info
          </Link>
        </div> */}
      </div>
    </div>
  );
}
