"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Category = {
  id: string | number;
  slug: string;
  nameBn: string;
  icon: string;
};

const Categories = () => {
  const pathname = usePathname();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch(
        "https://openapi.programming-hero.com/api/bazardor/categories"
      );

      if (!res.ok) throw new Error("Failed to fetch categories");

      const data = await res.json();
      setCategories(data);
    };

    fetchCategories().catch(console.error);
  }, []);

  return (
    <div className="flex flex-row items-center justify-start gap-3 py-2">
      {categories.map((category) => {
        const isActive = pathname === `/category/${category.slug}`;

        return (
          <Link
            key={category.id}
            href={`/category/${category.slug}`}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 transition-colors ${
              isActive
                ? "bg-green-600 text-white shadow-sm"
                : "bg-white text-gray-700 hover:bg-green-50"
            }`}
          >
            <span>{category.icon}</span>
            <h2 className="text-sm font-medium">{category.nameBn}</h2>
          </Link>
        );
      })}
    </div>
  );
};

export default Categories;