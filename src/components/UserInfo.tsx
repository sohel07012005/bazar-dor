"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaCircleUser } from "react-icons/fa6";


const UserInfo = () => {
  const { data: session} = authClient.useSession();

  const handleSignOut = async () => { await authClient.signOut();
    redirect("/")}

  return (
    <div>
      {session?.user ? (
        <div className="flex items-center gap-3 sm:gap-5">
         
         <Link href="/profile" className="hover:text-green-700 flex items-center gap-1">
         <FaCircleUser size={28} />
         <p className="text-[10px] sm:text-lg font-semibold">{session.user.name}</p></Link>
          
          <button onClick={handleSignOut} className="btn btn-sm px-4 py-2 rounded-lg border-none bg-green-700 text-xs sm:text-[15px] font-semibold text-white shadow-sm hover:bg-green-800">
            সাইন আউট
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3 sm:gap-5">
          <Link
            href="/sign-in"
            className="text-xs sm:text-[15px] font-medium text-base-content transition-colors hover:text-green-700"
          >
            সাইন ইন
          </Link>

          <Link
            href="/sign-up"
            className="btn btn-sm px-4 py-2 rounded-lg border-none bg-green-700 text-xs sm:text-[15px] font-semibold text-white shadow-sm hover:bg-green-800"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
