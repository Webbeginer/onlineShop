"use client";
import { useSession } from "next-auth/react";

const ProfilePage = () => {
  const { data: session } = useSession();

  return (
    <div className="w-1/3 h-96 bg-stone-500 rounded-xl flex flex-col justify-center items-center">
      <p>Profile</p>
      <p>Name: {session?.user?.name}</p>
      <p>Email: {session?.user?.email}</p>
    </div>
  );
};

export default ProfilePage;
