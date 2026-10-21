type Product = {
  id: number;
  image: string;
  nameBn: string;
  today: number;
  unit: string;
  change: {
    dir: string;
    pct: number;
  };
};

const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
};

const MarqueeProducts = async () => {
  const products = await fetchProducts();

  return (
    <div className="flex flex-row gap-10 justify-start items-center">
      {products.map((product: Product) => (
        <div key={product.id} className="flex items-center gap-2">
          <span>{product.image}</span>
          <span>{product.nameBn}</span>
          <span>{`${product.today}টাকা/${product.unit}`}</span>
          {product.change.dir === "up" ? (
            <span className="text-red-700">
              ▲ {Math.abs(product.change.pct)}%
            </span>
          ) : product.change.dir === "down" ? (
            <span className="text-green-700">
              ▼ {Math.abs(product.change.pct)}%
            </span>
          ) : (
            <span> 0%</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default MarqueeProducts;
