
import { ProductType } from "@/types/ProductType";
import Link from "next/link";

type Props = {
  product: ProductType;
};

export default function ProductCard({ product }: Props) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="block h-full w-full min-w-0"
    >
      <div className="flex h-full w-full min-w-0 flex-col rounded-xl border-2 border-gray-200 bg-white p-3 transition-colors hover:border-green-700">
        <div className="flex min-w-0 items-center gap-2">
          <div className="shrink-0 rounded-lg bg-[#edf4ed] p-2 text-xl">
            {product.image}
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="truncate text-[15px] font-semibold text-gray-800">
              {product.nameBn}
            </h3>

            <p className="text-[12px] text-gray-500">
              প্রতি {product.unit === "kg" ? "কেজি" : product.unit}
            </p>
          </div>
        </div>

        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
          <div className="min-w-0">
            <p className="text-[12px] text-gray-500">আজকের দাম</p>

            <p className="whitespace-nowrap text-[15px] font-bold text-gray-800">
              ৳{product.today} টাকা
            </p>
          </div>

          <span
            className={`shrink-0 whitespace-nowrap rounded-full px-2 py-1 text-[12px] ${
              product.change.dir === "up"
                ? "bg-red-50 text-red-600"
                : product.change.dir === "down"
                  ? "bg-green-50 text-green-600"
                  : "bg-gray-100 text-gray-500"
            }`}
          >
            {product.change.dir === "up"
              ? "▲"
              : product.change.dir === "down"
                ? "▼"
                : "-"}
            {Math.abs(product.change.pct)}%
          </span>
        </div>
      </div>
    </Link>
  );
}