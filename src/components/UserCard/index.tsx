import { AvatarImage } from "../AvatarImage";

export default function UserCard({ name, email, role, avatar }) {
  return (
    <div id="container" className="mx-auto ">
      <div className="flex flex-col sm:flex-row ml-34">
        <div className="w-60 h-80 hover:shadow-xl bg-white px-10 py-8 flex flex-col justify-around rounded-lg shadow text-center">
          <div className="mb-3">
            <AvatarImage
              className="mx-auto rounded-full object-cover w-20 h-20"
              user_id={avatar}
              thumbnail={true}
              alt={name}
            />
          </div>
          <div>
            <h2 className="text-xl font-medium text-gray-700">{name}</h2>
            <span className="text-blue-500 block ">{role}</span>
            <div className="text-sm text-gray-500 block mb-5 break-words">
              {email}
            </div>
          </div>
          {/** todo: add link to profile */}
          <a
            href={`/member/member-profile/${avatar}`}
            className="px-4 py-2 bg-blue-500 text-white rounded-full"
          >
            Profile
          </a>
        </div>
      </div>
    </div>
  );
}
