import AllProducts from "@/components/AllProducts";
import Banner from "@/components/Banner";
import DecreasedProducts from "@/components/DecreasedProducts";
import IncreasedProducts from "@/components/IncreasedProducts";


const page = () => {
  return (
    <div className="bg-[#f6fcf6] pb-10">
      <Banner />
      <div className="container mx-auto mt-10">
            <h1 className="text-xl font-bold">
              <span className="text-red-500"> ▲ </span>আজ দাম বেড়েছে
            </h1>
             <IncreasedProducts />
      </div>
      <div className="container mx-auto mt-10">
        <h1 className="text-xl font-bold">
          <span className="text-green-500"> ▼ </span>আজ দাম কমেছে
        </h1>
        <DecreasedProducts></DecreasedProducts>
      </div>
       <div id="all-products" className="container mx-auto mt-10">
        <h1 className="text-xl font-bold">
          সব পণ্য
        </h1>
        <AllProducts></AllProducts>
      </div>
    </div>
  );
};

export default page;
