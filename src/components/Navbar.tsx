import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import Categories from "./Categories";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import MarqueeProducts from "./MarqueeProducts";
import CurrentDate from "./CurrentDate";


const Navbar = () => {
  return (
    <nav className="w-full bg-base-100">
      <div className="container mx-auto flex h-14 items-center justify-between pt-4">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-700 text-white">
            <Image src="/logo-icon.png" alt="Logo" width={30} height={30} />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-2xl font-bold leading-5 text-base-content">
              বাজার দর
            </span>

            <Suspense
              fallback={
                <span className="text-[15px] leading-5 text-base-content/60">
                  তারিখ লোড হচ্ছে...
                </span>
              }
            >
              <CurrentDate />
            </Suspense>
          </div>
        </Link>

        <div className="flex items-center gap-3 sm:gap-5">
          <Link
            href="/sign-in"
            className="text-[15px] font-medium text-base-content transition-colors hover:text-green-700"
          >
            সাইন ইন
          </Link>

          <Link
            href="/sign-up"
            className="btn btn-sm px-4 py-2 rounded-lg border-none bg-green-700 text-[15px] font-semibold text-white shadow-sm hover:bg-green-800"
          >
            সাইন আপ
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-3 border-t mt-4 border-gray-200">
        <Suspense fallback={<div>ক্যাটাগরি লোড হচ্ছে...</div>}>
          <Categories />
        </Suspense>
      </div>
      <div className="py-3 border-y border-gray-200">
        <MarqueeText direction="right" duration={10}>
         <Suspense fallback={<div>লোড হচ্ছে...</div>}>
                <MarqueeProducts />
        </Suspense>
    </MarqueeText>
      </div>
    
    </nav>
  );
};

export default Navbar;
