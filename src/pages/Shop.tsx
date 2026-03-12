import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const Shop = () => {
  const [searchParams] = useSearchParams();
  const [sort, setSort] = useState("popular");

  const activeOccasion = searchParams.get("occasion");

  const filtered = useMemo(() => {
    let result = [...products];

    if (activeOccasion) {
      result = result.filter((p) => p.occasion.includes(activeOccasion));
    }

    switch (sort) {
      case "price-low": return result.sort((a, b) => a.price - b.price);
      case "price-high": return result.sort((a, b) => b.price - a.price);
      case "rating": return result.sort((a, b) => b.rating - a.rating);
      default: return result.sort((a, b) => b.reviews - a.reviews);
    }
  }, [sort, activeOccasion]);

  return (
    <main className="container py-10">
      {activeOccasion ? (
        <div className="relative overflow-hidden rounded-3xl bg-muted/40 border border-border/60 mb-10 group max-w-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
          <div className="relative px-8 py-8 flex items-center gap-6">
            <div className="h-14 w-1 shadow-sm rounded-full bg-primary/40 shrink-0" />
            <div className="flex flex-col">
              <span className="text-[10px] font-bold tracking-[0.3em] text-primary/60 uppercase mb-1">Occasion</span>
              <h1 className="text-3xl md:text-4xl font-heading text-foreground">
                {activeOccasion} <span className="text-muted-foreground/40 font-light">Bouquets</span>
              </h1>
              <p className="text-xs text-muted-foreground mt-1 max-w-xs leading-relaxed italic">
                Hand-picked arrangements for {activeOccasion.toLowerCase()} moments.
              </p>
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors" />
        </div>
      ) : (
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-heading text-foreground mb-2">Our Collection</h1>
          <p className="text-muted-foreground">Every bouquet, hand-arranged with intention.</p>
        </div>
      )}

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-muted/30 p-4 rounded-xl border border-border/50">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground bg-background px-3 py-1 rounded-full shadow-sm border border-border hidden sm:inline-block">
            {filtered.length} bouquets found
          </span>
        </div>

        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-44 rounded-full bg-background">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popular">Most Popular</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Product Grid - Masonry-style with varying heights */}
      <div className="columns-2 md:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
        {filtered.map((product, i) => (
          <div key={product.id} className="break-inside-avoid">
            <ProductCard
              product={product}
              className={i % 3 === 0 ? "[&_img]:aspect-[3/4]" : "[&_img]:aspect-[4/5]"}
            />
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground">No bouquets match your criteria.</p>
        </div>
      )}
    </main>
  );
};

export default Shop;
