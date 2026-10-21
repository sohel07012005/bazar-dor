import { Suspense } from "react";
import { ProductType } from "@/types/ProductType";
import CategoryProductList from "@/components/CategoryProductList";

type Props = {
  params: Promise<{ slug: string }>;
};

export default function Page({ params }: Props) {
  return (
    <Suspense fallback={<p>লোড হচ্ছে......</p>}>
      <CategoryProducts params={params} />
    </Suspense>
  );
}

async function CategoryProducts({ params }: Props) {
  const { slug } = await params;

  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products?category=${encodeURIComponent(slug)}`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const result = await res.json();
  const products: ProductType[] = Array.isArray(result) ? result : [];

  const res2 = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/categories",
  );

  if (!res2.ok) {
    throw new Error("Failed to fetch categories");
  }

  const categories = await res2.json();

  const category = categories.find(
    (cat: { slug: string }) => cat.slug === slug,
  );

  return (
    <main className="flex min-h-screen flex-col bg-[#f6fcf6]">
      <div className="container mx-auto flex-1 px-4">
        {/* Category Header */}
        <div className="mt-5 flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3">
          <div className="rounded-lg bg-[#edf4ed] p-2 text-xl">
            {category?.icon || "🛒"}
          </div>

          <div className="min-w-0">
            <h3 className="text-xl font-bold text-gray-800">
              {category?.nameBn || "সকল পণ্য"}
            </h3>

            <p className="text-[15px] text-gray-500">
              {products.length.toLocaleString("bn-BD")} টি পণ্যের আজকের দাম ও
              পরিবর্তন
            </p>
          </div>
        </div>
        <div className="py-10">
          <CategoryProductList products={products} />
        </div>
      </div>
    </main>
  );
}
