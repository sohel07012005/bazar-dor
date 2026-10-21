import { ProductType } from "@/types/ProductType";
import ProductCard from "./ProductCard";


const fetchProducts = async (): Promise<ProductType[]> => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
};

const AllProducts = async () => {
    const products = await fetchProducts();

   return (
  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 mt-3">
    {products.map((product: ProductType) => (
        <div key={product.id} className="flex items-center gap-2">
          <ProductCard product={product} />
        </div>
      ))}
  </div>
);
};

export default AllProducts;