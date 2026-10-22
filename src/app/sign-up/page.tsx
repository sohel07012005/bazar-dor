"use client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

export default function SignUpForm() {
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());
     
    const { data, error } = await authClient.signUp.email({
       name: user.name as string,
      email: user.email as string,
      password: user.password as string,
    });
   if(data){
    toast.success("Sign up successful");
    redirect("/");
   }
   if(error){
    toast.error("Error: " + error.message);
   }
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-[#f0f5f0] px-4 py-8 sm:py-10">
      <div className="mb-5 text-center">
        <h1 className="text-xl font-bold text-[#26332a]">
          অ্যাকাউন্ট তৈরি করুন
        </h1>
        <p className="mt-1 text-xs text-gray-500">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন{" "}
        </p>
      </div>

      <div className="w-full max-w-124 rounded-xl border border-[#e2ebe2] bg-white p-5">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-xs font-medium text-gray-700"
            >
              নাম
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="আপনার নাম"
              autoComplete="name"
              required
              className="h-10 w-full rounded-md border border-[#e2ebe2] bg-transparent px-3 text-sm outline-none focus:border-green-600 focus:ring-1 focus:ring-green-100"
            />
          </div>

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

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-1 block text-xs font-medium text-gray-700"
            >
              পাসওয়ার্ড নিশ্চিত করুন
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="আবার লিখুন"
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
            অ্যাকাউন্ট তৈরি করুন
          </button>
        </form>

        <div className="my-4 flex items-center gap-2">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs text-gray-500">অথবা</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-md border border-[#e2ebe2] px-2 py-2 text-xs font-medium text-gray-700 transition hover:bg-green-50"
          >
            <span className="font-bold text-blue-600">
              <FcGoogle size={18} />
            </span>
            Google দিয়ে চালিয়ে যান
          </button>

          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-md border border-[#e2ebe2] px-3 py-2 text-xs font-medium text-gray-700 transition hover:bg-green-50"
          >
            <FaGithub size={16} />
            GitHub দিয়ে চালিয়ে যান
          </button>
        </div>

        <p className="mt-4 text-center text-xs text-gray-500">
          অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-green-700 hover:underline"
          >
            সাইন ইন করুন
          </Link>
        </p>
      </div>

      <Link
        href="/sign-in"
        className="mt-4 text-[15px] text-gray-400 hover:text-green-700"
      >
        ← লগইন পেজে ফিরে যান
      </Link>
    </main>
  );
}
