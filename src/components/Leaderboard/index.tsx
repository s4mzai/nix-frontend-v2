import { Link } from "react-router-dom";
import { AvatarImage } from "../AvatarImage";
import { Spinner } from "../Spinner";
import UserCard from "../UserCard";

function Leaderboard({ topUsers }) {
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="w-full max-w-3xl lg:w-2/3">
        <div className="pb-4">
          <h2 className="text-lg font-semibold">Leaderboard</h2>
          <p className="text-sm text-gray-500">
            Columnists with most publications
          </p>
        </div>
        <div>
          {topUsers.length > 0 ? (
            topUsers.map((user, index) => (
              <div key={index} className="flex flex-col gap-0.5">
                <div className="flex items-center rounded-t-lg px-4 py-3 my-1 bg-gray-50 hover:shadow-md">
                  <div className="flex items-center w-10">
                    <div className="font-semibold">#{index + 1}</div>
                  </div>
                  <div className="flex items-center w-15 mr-4">
                    <AvatarImage
                      alt="User avatar"
                      className="rounded-full"
                      height="50"
                      user_id={user._id}
                      thumbnail={true}
                      style={{
                        aspectRatio: "50/50",
                        objectFit: "cover",
                      }}
                      width="50"
                    />
                  </div>
                  <div className="flex items-center flex-1">
                    <Link
                      to={`https://team.dtutimes.com/member/member-profile/${user._id}`}
                    >
                      <div className="font-semibold">
                        {user.userDetails.name}
                      </div>
                    </Link>
                  </div>
                  <div className="flex items-center w-10">
                    <div className="font-semibold">
                      {user.totalPublishedBlogs}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex w-full h-full justify-center items-center">
              <Spinner />
            </div>
          )}
        </div>
      </div>

      <div className="w-full max-w-3xl lg:w-1/3 flex justify-center lg:justify-start mt-4 ml-4 lg:mt-0">
        {topUsers.length > 0 && (
          <div>
            <h3 className="text-lg text-center font-semibold mb-2 ml-3">
              Top Columnist
            </h3>
            <UserCard
              name={topUsers[0].userDetails.name}
              email={topUsers[0].userDetails.email}
              role={"Columnist"}
              avatar={topUsers[0]._id}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;
