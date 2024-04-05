import TimesLogo from "@/assets/dtutimesIcon";
import { AvatarImage } from "@/components/AvatarImage";
import Leaderboard from "@/components/Leaderboard";
import { Spinner } from "@/components/Spinner";
import { CurrUserCtx } from "@/contexts/current_user";
import { ErrorContext } from "@/contexts/error";
import API from "@/services/API";
import React from "react";
import { Link } from "react-router-dom";

interface TopUserData {
  _id: string;
  totalPublishedBlogs: number;
  userDetails: {
    name: string;
    email: string;
    bio: string;
  };
}

interface DashboardInitialState {
  topUserData: TopUserData;
  loading: boolean;
}

const initialState: DashboardInitialState = {
  topUserData: {
    _id: "",
    totalPublishedBlogs: 0,
    userDetails: {
      name: "",
      email: "",
      bio: "",
    },
  },
  loading: true,
};

const enum ActionType {
  SetTopUserData,
}

const reducer = (
  state: DashboardInitialState,
  action: { type: ActionType; payload },
) => {
  const updatedData = { ...state };
  switch (action.type) {
    case ActionType.SetTopUserData:
      updatedData.topUserData = action.payload;
      break;
    default:
      return updatedData;
  }
  return updatedData;
};

export default function Dashbboard() {
  const { ready, user } = React.useContext(CurrUserCtx);
  const { setError } = React.useContext(ErrorContext);

  const [state, dispatch] = React.useReducer(reducer, initialState);

  const { topUserData } = state;

  React.useEffect(() => {
    const topUserEndpoint = "dashboard/top-users";

    API.get(topUserEndpoint)
      .then((response) => {
        dispatch({
          type: ActionType.SetTopUserData,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  if (!ready)
    return (
      <div className="flex w-full h-full justify-center items-center">
        <Spinner />
      </div>
    );
  return (
    <div>
      <div className="flex justify-start flex-col xl:flex-row">
        <div className="flex justify-evenly flex-col lg:flex-row">
          <div className="m-6 w-[300px] h-[464px] border-black border-2 bg-gray-800 text-white rounded-xl overflow-hidden grid grid-rows-2">
            <div className="self-start flex flex-col">
              <div className="flex justify-between">
                <TimesLogo className="w-16 h-16" />

                <div className="pt-4 pr-4">
                  <div className="text-base">DTU Times</div>
                  <div className="text-xs">2024-25</div>
                </div>
              </div>
              <div className="flex mt-16 justify-center">
                <AvatarImage
                  alt={user.name}
                  className="h-36 w-36 rounded-full"
                  user_id={user.id}
                  thumbnail={true}
                />
              </div>
            </div>
            <div className="bg-black p-6 text-center self-end">
              <div className="text-base pb-2">{user.role}</div>
              <div className="text-lg font-semibold">{user.name}</div>
            </div>
          </div>
          <div className="m-6 w-[300px] h-[464px] bg-id-back bg-cover border-black border-2 text-white rounded-xl overflow-hidden grid grid-rows-2">
            <div className="self-start flex flex-col"></div>
            <div className="bg-black bg-opacity-50 text-opacity-100 p-6 text-right self-end pl-14">
              <div className="text-lg font-semibold">{user.bio}</div>
            </div>
          </div>
        </div>
        <div className="p-8">
          <h1>Hello {user.name},</h1>
          <p className="text-lg mb-4">Welcome to DTU Times!</p>
          <p>Well done on your role as {user.role}!</p>
          <p className="text-sm my-4">
            This is your Dashboard where you can update your details shared with
            us! Make sure they are up-to-date as these are your official record
            available to DTU Times.
          </p>
          <Link
            to={`/member/edit-details/${user.id}`}
            className="bg-blue-500 text-white p-2 rounded hover:bg-green-500"
          >
            Edit Details
          </Link>
        </div>
      </div>

      <div className="p-8">
        <div className=" my-4">
          <Leaderboard topUsers={topUserData} />
        </div>
      </div>
    </div>
  );
}
