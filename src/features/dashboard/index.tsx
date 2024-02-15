import React, { useEffect } from "react";
import API from "@/services/API";

const AvatarImage = ({ src, alt, className }) => {
  return <img className={`rounded-full ${className}`} src={src} alt={alt} />;
};

import TimesLogo from "@/assets/dtutimesIcon";

const uri = API.getUri();

export default function Dashbboard() {
  const auth_user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    console.log(auth_user);
  });
  return (
    <div className="flex justify-start flex-col xl:flex-row">
      <div className="flex justify-evenly flex-col lg:flex-row">
        <div className="m-6 w-[300px] h-[464px] border-black border-2 bg-gray-800 text-white rounded-xl overflow-hidden grid grid-rows-2">
          <div className="self-start flex flex-col">
            <div className="flex justify-between">
              <TimesLogo className="w-16 h-16" />

              <div className="pt-4 pr-4">
                <div className="text-base">DTU Times</div>
                <div className="text-xs">2024-25</div>
              dtutimesIcon</div>
            </div>
            <div className="flex mt-16 justify-center">
              <AvatarImage alt={auth_user.name} className="h-36 w-36" src={`${uri}/images/get/${auth_user.avatar}?thumbnail=144`} />
            </div>
          </div>
          <div className="bg-black p-6 text-center self-end">
            <div className="text-base pb-2">{auth_user.role}</div>
            <div className="text-lg font-semibold">{auth_user.name}</div>
          </div>
        </div>
        <div className="m-6 w-[300px] h-[464px] bg-id-back bg-cover border-black border-2 text-white rounded-xl overflow-hidden grid grid-rows-2">
          <div className="self-start flex flex-col">
          </div>
          <div className="bg-black bg-opacity-50 text-opacity-100 p-6 text-right self-end pl-14">
            <div className="text-lg font-semibold">{auth_user.bio}</div>
          </div>
        </div>
      </div>
      <div className="p-8">
        <h1 className="text-xl font-bold mb-4">Hello {auth_user.name},</h1>
        <p className="text-lg mb-4">Welcome to DTU Times!</p>
        <p>Well done on your role as {auth_user.role}!</p>
        <p className="text-sm my-4">This is your Dashboard where you can update your details shared with us! Make sure they are up-to-date as these are your official record available to DTU Times.</p>
        <div className="p-4 flex flex-col">
          <button className="p-4">Update Name</button>
          <button className="p-4">Update Avatar</button>
          <button className="p-4">Update Email</button>
          <button className="p-4">Update Bio</button>
        </div>
      </div>
    </div>
  );
}
