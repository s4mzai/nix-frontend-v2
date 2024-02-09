import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import API from "@/services/API";

const AvatarImage = ({ src, alt, className }) => {
    return <img className={`rounded-full ${className}`} src={src} alt={alt} />
}

import dtutimesIcon from '../../assets/dtutimesIcon.svg';

const uri = API.getUri();

export default function Dashbboard() {
    const auth_user = useSelector((state) => state.auth.user);
    useEffect(() => {
        console.log(auth_user);
    });
    return (
        <div className="flex justify-start flex-col xl:flex-row">
            <div className="flex justify-evenly flex-col lg:flex-row">
                <div className="m-6 w-[300px] h-[464px] bg-gray-800 text-white rounded-xl overflow-hidden grid grid-rows-2">
                    <div className="self-start flex flex-col">
                        <div className="flex justify-between">
                            <img src={dtutimesIcon} className="h-16 w-16" />

                            <div className="pt-4 pr-4">
                                <div className="text-base">DTU Times</div>
                                <div className="text-xs">2024-25</div>
                            </div>
                        </div>
                        <div className="flex mt-16 justify-center">
                            <AvatarImage alt="Aditya Khuntia" className="h-36 w-36" src={`${uri}/images/get/avatar.jpg?thumbnail=144`} />
                        </div>
                    </div>
                    <div className="bg-black p-6 text-center self-end">
                        <div className="text-base pb-2">Columnist</div>
                        <div className="text-lg font-semibold">{auth_user.name}</div>
                    </div>
                </div>
                <div className="m-6 w-[300px] h-[464px] bg-id-back bg-cover text-white rounded-xl overflow-hidden grid grid-rows-2">
                    <div className="self-start flex flex-col">
                    </div>
                    <div className="bg-black bg-opacity-50 text-opacity-100 p-6 text-right self-end pl-14">
                        <div className="text-lg font-semibold">To be or not to be hhhhhaaa!! oh no shakespear is dead! lets get the tasty robots to lineup and generate a new shakespear for us</div>
                    </div>
                </div>
            </div>
            <div className="p-8">
                <h1 className="text-xl font-bold mb-4">Hello {auth_user.name.split(" ")[0]},</h1>
                <p className="text-lg">Welcome to DTU Times!</p>
                <p>Well done on your role as {auth_user.role?.name}</p>
            </div>
        </div>
    )
}