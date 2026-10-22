"use client";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { FaCircleUser } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";

const page = () => {
  const { data: session } = authClient.useSession();

  const handleSignOut = async () => {
    await authClient.signOut();
    redirect("/")
  };

  const handleUpdateData = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newUserData = Object.fromEntries(formData.entries());

    await authClient.updateUser({
        ...newUserData
    })
    toast.success("Profile Updated Successfully")
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-[#f0f5f0] px-4 py-8 sm:py-10">
      <div className="mb-5 text-center">
        <h1 className="text-2xl font-bold text-[#26332a]">আমার প্রোফাইল</h1>
        <p className="mt-1 text-xs text-gray-500">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন{" "}
        </p>
      </div>
      <div className="w-full max-w-200 rounded-xl border border-[#e2ebe2] bg-white p-5">
        <div className="flex items-center justify-between">
          <div className="hover:text-green-700 flex items-center gap-3">
            <FaCircleUser size={50} />
            <div>
              <p className="text-xl sm:text-2xl font-semibold">{session?.user.name}</p>
              <p className="text-xs sm:text-[15px] text-gray-500">
                {session?.user.email}
              </p>
            </div>
          </div>

         <div>
             <button
            onClick={handleSignOut}
            className=" flex items-center justify-center btn btn-sm gap-1 rounded-lg border-2 border-red-400 bg-white px-2 sm:px-4 py-2 text-[10px] sm:text-[13px] font-semibold text-red-600 shadow-none hover:bg-red-50"
          >
            <FiLogOut size={14} />
            সাইন আউট
          </button>
         </div>
        </div>
      </div>

      <div className="mt-5 w-full max-w-200 rounded-xl border border-[#e2ebe2] bg-white p-5">
        <h1 className="text-xl font-semibold text-[#26332a]">তথ্য</h1>
        <form onSubmit={handleUpdateData} className="space-y-3">
          <div className="mt-5">
            <label
              htmlFor="name"
              className="mb-1 block text-[17px] font-medium text-gray-700"
            >
              নাম
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="আপনার নতুন নাম"
              autoComplete="name"
              required
              className="h-10 w-full rounded-md border border-[#e2ebe2] bg-transparent px-3 text-sm outline-none focus:border-green-600 focus:ring-1 focus:ring-green-100"
            />
          </div>
          <button type="submit"
            className="w-full rounded-md bg-green-700 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
          >
            আপডেট
          </button>
        </form>
      </div>
    </main>
  );
};

export default page;
