"use client";

import { useState } from "react";
import type { ProductType } from "@/types/ProductType";
import ProductCard from "@/components/ProductCard";

type Props = {
  products: ProductType[];
};

export default function CategoryProductList({ products }: Props) {
  const [sort, setSort] = useState("default");

  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "low-to-high") return a.today - b.today;
    if (sort === "high-to-low") return b.today - a.today;
    return 0;
  });

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white p-3">
        <p className="text-sm text-gray-600">সাজান:</p>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-green-600"
        >
          <option value="default">ডিফল্ট</option>
          <option value="low-to-high">দাম: কম থেকে বেশি</option>
          <option value="high-to-low">দাম: বেশি থেকে কম</option>
        </select>
      </div>

      <p className="mb-2 text-sm text-gray-500">
        মোট {products.length.toLocaleString("bn-BD")} পণ্য দেখানো হচ্ছে
      </p>

      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="py-10 text-center text-gray-500">
          এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
        </p>
      )}
    </div>
  );
}