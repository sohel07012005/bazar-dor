import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import Categories from "./Categories";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import MarqueeProducts from "./MarqueeProducts";
import CurrentDate from "./CurrentDate";
import UserInfo from "./UserInfo";



const Navbar = async () => {
 
  return (
    <nav className="w-full bg-base-100">
      <div className="container mx-auto px-2 sm:px-0 flex h-14 items-center justify-between pt-4">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-700 text-white">
            <Image src="/logo-icon.png" alt="Logo" width={30} height={30} />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xl sm:text-2xl font-bold leading-5 text-base-content">
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
        <UserInfo></UserInfo>
      </div>

     <div className="border-t  border-gray-200 mt-4">
       <div className="container mx-auto px-3 ">
        <Suspense fallback={<div>ক্যাটাগরি লোড হচ্ছে...</div>}>
          <Categories />
        </Suspense>
      </div>
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
