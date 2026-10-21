import { ProductType } from "@/types/ProductType";

type Props = {
  product: ProductType;
};

export default function ProductCard({ product }: Props) {
  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-3">
      <div className="flex items-center gap-2">
        <div className="rounded-lg bg-[#edf4ed] p-2 text-xl">
          {product.image}
        </div>

        <div className="min-w-0">
          <h3 className="text-[15px] font-semibold text-gray-800">
            {product.nameBn}
          </h3>

          <p className="text-[12px] text-gray-500">
            প্রতি {product.unit === "kg" ? "কেজি" : product.unit}
          </p>
        </div>
      </div>

      <div className="mt-2 flex items-end justify-between gap-2">
        <div>
          <p className="text-[12px] text-gray-500">
            আজকের দাম
          </p>

          <p className="text-[15px] font-bold text-gray-800">
            ৳{product.today} টাকা
          </p>
        </div>

        <span
          className={`whitespace-nowrap rounded-full px-2 py-1 text-[12px] ${
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
              : ""}
          {Math.abs(product.change.pct)}%
        </span>
      </div>
    </div>
  );
}