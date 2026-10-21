import { Suspense } from "react";
import { ProductType } from "@/types/ProductType";
import Link from "next/link";

type MarketType = {
  market: string;
  division: string;
  min: number;
  max: number;
};

type ProductDetailsType = ProductType & {
  id: number;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  markets: MarketType[];
};

type PageProps = {
  params: Promise<{ id: string }>;
};

const formatPrice = (price: number) => price.toLocaleString("bn-BD");

async function ProductDetails({ params }: PageProps) {
  const { id } = await params;

  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products: ProductDetailsType[] = await res.json();

  const product = products.find(
    (item) => item.slug === id || String(item.id) === id,
  );

  if (!product) {
    return (
      <main className="min-h-screen bg-[#f0f5f0] p-6">
        <div className="mx-auto max-w-6xl rounded-xl bg-white p-6">
          <h1 className="font-bold">পণ্য পাওয়া যায়নি</h1>
          <Link href="/" className="mt-3 inline-block text-green-700">
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </main>
    );
  }

  const markets = product.markets ?? [];

  const lowestPrice =
    markets.length > 0
      ? Math.min(...markets.map((market) => market.min))
      : product.today;

  const highestPrice =
    markets.length > 0
      ? Math.max(...markets.map((market) => market.max))
      : product.today;

  const averagePrice =
    markets.length > 0
      ? markets.reduce(
          (total, market) => total + (market.min + market.max) / 2,
          0,
        ) / markets.length
      : product.today;

  const changeDirection = product.change.dir;

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-3 py-5 text-[#26332a] sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <nav className="mb-5 flex flex-wrap items-center gap-2 text-xs text-gray-500">
          <Link href="/" className="hover:text-green-700">
            হোম
          </Link>
          <span>›</span>
          <Link
            href={`/category/${product.category}`}
            className="hover:text-green-700"
          >
            {product.categoryNameBn}
          </Link>
          <span>›</span>
          <span className="font-medium text-gray-700">{product.nameBn}</span>
        </nav>

        <section className="flex flex-col justify-between gap-4 rounded-xl border border-[#e2ebe2] bg-white p-4 sm:flex-row sm:items-center sm:p-5">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-[#edf4ed] text-2xl">
              {product.image}
            </div>

            <div className="min-w-0">
              <h1 className="text-xl font-bold sm:text-2xl">
                {product.nameBn}
              </h1>

              <p className="mt-1 text-xs text-gray-500">
                প্রতি {product.unit === "kg" ? "কেজি" : product.unit} ·{" "}
                {product.nameBn}
              </p>

              <p className="mt-2 text-xs text-gray-600">
                {product.change.dir === "up"
                  ? "গতকালের তুলনায় আজ দাম বেড়েছে"
                  : product.change.dir === "down"
                    ? "গতকালের তুলনায় আজ দাম কমেছে"
                    : "গতকালের তুলনায় আজ দামের কোনো পরিবর্তন হয়নি।"}

                {product.change.dir !== "flat" && (
                  <span className="ml-1 font-semibold text-gray-500">
                    {Math.abs(product.today - product.yesterday).toLocaleString(
                      "bn-BD",
                    )}
                    টাকা
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="shrink-0 rounded-xl bg-[#f0f5f0] px-5 py-3 text-center sm:min-w-28">
            <p className="text-xs text-gray-500">আজকের দাম</p>
            <p className="text-2xl font-bold">৳{formatPrice(product.today)}</p>
            <p className="text-xs text-gray-500">
              টাকা / {product.unit === "kg" ? "কেজি" : product.unit}
            </p>
            <p
              className={`mt-1 text-xs ${
                changeDirection === "up"
                  ? "text-red-600"
                  : changeDirection === "down"
                    ? "text-green-700"
                    : "text-gray-500"
              }`}
            >
              {changeDirection === "up"
                ? "▲"
                : changeDirection === "down"
                  ? "▼"
                  : "—"}{" "}
              {formatPrice(Math.abs(product.change.pct))}%
            </p>
          </div>
        </section>

      
        <section className="mt-4 rounded-xl border border-[#e2ebe2] bg-white p-3 sm:p-4">
          <h2 className="mb-3 text-sm font-bold">দামের সারসংক্ষেপ</h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-[#e2ebe2] p-4">
              <p className="text-xs text-gray-500">সর্বনিম্ন দাম</p>
              <p className="mt-1 text-lg font-bold text-green-700">
                {formatPrice(lowestPrice)} টাকা
              </p>
              <p className="mt-1 text-[11px] text-gray-500">
                সবচেয়ে কম দামের বাজার
              </p>
            </div>

            <div className="rounded-xl border border-[#e2ebe2] p-4">
              <p className="text-xs text-gray-500">সর্বোচ্চ দাম</p>
              <p className="mt-1 text-lg font-bold text-red-600">
                {formatPrice(highestPrice)} টাকা
              </p>
              <p className="mt-1 text-[11px] text-gray-500">
                সবচেয়ে বেশি দামের বাজার
              </p>
            </div>

            <div className="rounded-xl border border-[#e2ebe2] p-4">
              <p className="text-xs text-gray-500">গড় দাম</p>
              <p className="mt-1 text-lg font-bold text-green-700">
                ৳{formatPrice(Math.round(averagePrice))} টাকা
              </p>
              <p className="mt-1 text-[11px] text-gray-500">
                সব বাজারের গড় দাম
              </p>
            </div>
          </div>

          <h2 className="mb-3 mt-5 text-sm font-bold">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="overflow-x-auto rounded-xl border border-[#e2ebe2]">
            <table className="w-full min-w-155 border-collapse text-xs">
              <thead className="bg-[#f8fbf8] text-gray-500">
                <tr>
                  <th className="px-3 py-3 text-left font-medium">বাজার</th>
                  <th className="px-3 py-3 text-left font-medium">বিভাগ</th>
                  <th className="px-3 py-3 text-right font-medium">
                    সর্বনিম্ন
                  </th>
                  <th className="px-3 py-3 text-right font-medium">সর্বাধিক</th>
                  <th className="px-3 py-3 text-right font-medium">গড়</th>
                </tr>
              </thead>

              <tbody>
                {markets.map((market, index) => (
                  <tr
                    key={`${market.market}-${index}`}
                    className={`border-t border-[#e2e8e2] ${
                      index % 2 === 0 ? "bg-white" : "bg-[#f0f5f0]"
                    }`}
                  >
                    <td className="px-3 py-3 font-medium text-gray-700">
                      {market.market}
                    </td>
                    <td className="px-3 py-3 text-gray-600">
                      {market.division}
                    </td>
                    <td className="px-3 py-3 text-right text-gray-700">
                      {formatPrice(market.min)} টাকা
                    </td>
                    <td className="px-3 py-3 text-right text-gray-700">
                      {formatPrice(market.max)} টাকা
                    </td>
                    <td className="px-3 py-3 text-right font-semibold text-gray-800">
                      {formatPrice(Math.round((market.min + market.max) / 2))}{" "}
                      টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}

export default function Page({ params }: PageProps) {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#f0f5f0] p-6">
          <div className="mx-auto max-w-6xl animate-pulse space-y-4">
            <div className="h-4 w-40 rounded bg-gray-200" />
            <div className="h-28 rounded-xl bg-white" />
            <div className="h-48 rounded-xl bg-white" />
            <div className="h-80 rounded-xl bg-white" />
          </div>
        </main>
      }
    >
      <ProductDetails params={params} />
    </Suspense>
  );
}
