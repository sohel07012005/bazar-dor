"use client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";


export default function SignInForm() {
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
    email: user.email as string,
    password: user.password as string,
    rememberMe: true,
    callbackURL: "/",
});
  
 if(data){
    toast.success("Sign in successful");
   }
   if(error){
    toast.error("Sign in failed : " + error.message);
   }
    
   
  };

  const handleGooglesignIn = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
  });
};

const handleGithubsignIn = async () => {
    const data = await authClient.signIn.social({
        provider: "github"
    })
}


  return (
    <main className="flex min-h-screen flex-col items-center bg-[#f0f5f0] px-4 py-8 sm:py-10">
      <div className="mb-5 text-center">
        <h1 className="text-xl font-bold text-[#26332a]">
সাইন ইন        </h1>
        <p className="mt-1 text-xs text-gray-500">
বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন  </p>
      </div>

      <div className="w-full max-w-124 rounded-xl border border-[#e2ebe2] bg-white p-5">
        <form onSubmit={handleSubmit} className="space-y-3">

          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-xs font-medium text-gray-700"
            >
              ইমেইল
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
              className="h-10 w-full rounded-md border border-[#e2ebe2] bg-transparent px-3 text-sm outline-none focus:border-green-600 focus:ring-1 focus:ring-green-100"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-xs font-medium text-gray-700"
            >
              পাসওয়ার্ড
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="কমপক্ষে ৮ অক্ষরের"
              autoComplete="new-password"
              minLength={8}
              required
              className="h-10 w-full rounded-md border border-[#e2ebe2] bg-transparent px-3 text-sm outline-none focus:border-green-600 focus:ring-1 focus:ring-green-100"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-green-700 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
          >
            সাইন ইন
          </button>
        </form>

        <div className="my-4 flex items-center gap-2">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs text-gray-500">অথবা</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <button
            onClick={handleGooglesignIn}
            type="button"
            className="flex items-center justify-center gap-2 rounded-md border border-[#e2ebe2] px-2 py-2 text-xs font-medium text-gray-700 transition hover:bg-green-50"
          >
            <span className="font-bold text-blue-600">
              <FcGoogle size={18} />
            </span>
            Google দিয়ে চালিয়ে যান
          </button>

          <button
           onClick={handleGithubsignIn}
            type="button"
            className="flex items-center justify-center gap-2 rounded-md border border-[#e2ebe2] px-3 py-2 text-xs font-medium text-gray-700 transition hover:bg-green-50"
          >
            <FaGithub size={16} />
            GitHub দিয়ে চালিয়ে যান
          </button>
        </div>

        <p className="mt-4 text-center text-xs text-gray-500">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-green-700 hover:underline"
          >
            সাইন আপ করুন
          </Link>
        </p>
      </div>

      <Link
        href="/"
        className="mt-4 text-[15px] text-gray-400 hover:text-green-700"
      >
← হোম পেজে ফিরে যান      </Link>
    </main>
  );
}
