import Image from "next/image";
import CurrentDate from "./CurrentDate";
import { Suspense } from "react";

const Banner = () => {
  return (
    <div className=" container mx-auto mt-10 bg-white flex flex-col sm:flex-row items-center justify-between rounded-xl border border-gray-200 p-5">
      <div className="px-2 sm:px-0">
        <span className="rounded-full bg-green-100 px-3 py-2 text-xs text-green-700">
         <Suspense
              fallback={
                <span className="text-[15px]">
                  তারিখ লোড হচ্ছে...
                </span>
              }
            >
              <CurrentDate />
            </Suspense>
        </span>

        <h1 className="mt-3 text-xl sm:text-3xl font-bold text-gray-800">
          আজকের বাজারের দাম এক নজরে
        </h1>

        <p className="mt-2 max-w-lg text-sm text-gray-500">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
          বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>

        <a
          href="#all-products"
          className="mt-4 inline-block rounded-md bg-green-700 px-4 py-2 text-sm text-white hover:bg-green-800"
        >
          সব পণ্য দেখুন
        </a>
      </div>

      <div className=" text-7xl sm:block">
        <Image src="/bazar-hero.png" alt="Banner" width={300} height={300} />
      </div>
    </div>
  );
};

export default Banner;
