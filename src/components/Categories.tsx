import Link from "next/link";

const fethCategories = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/categories", {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch categories");
    }

    return res.json();
}

const Categories = async () => {
    const data = await fethCategories();
    return (
        <div className="flex flex-row gap-10 justify-start items-center py-2">
            {data.map((category: { id: string; nameBn: string; name: string; icon: string }) => (
                <Link key={category.id} href="" className="flex items-center gap-2 hover:text-green-600 ">
                    <span>{category.icon}</span>
                    <h2>{category.nameBn}</h2>
                </Link>
            ))}
            
        </div>
    );
};

export default Categories;