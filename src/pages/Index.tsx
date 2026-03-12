import { Link } from "react-router-dom";
import { ArrowRight, Star, Truck, Leaf, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { products, reviews } from "@/data/products";
import heroBouquet from "@/assets/hero-bouquet.jpg";
import bouquetRoses from "@/assets/bouquet-roses.jpg";

const Index = () => {
  const featured = products.filter((p) => p.featured);
  const bestSellers = products.filter((p) => p.bestSeller);

  return (
    <main className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative min-h-[70vh] md:min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBouquet} alt="Premium bouquet by Bloom Bar" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-foreground/80 md:from-foreground/60 via-foreground/40 md:via-foreground/30 to-transparent" />
        </div>
        <div className="container relative z-10 py-12 md:py-20">
          <div className="max-w-xl space-y-4 md:space-y-6 animate-slide-up text-center md:text-left">
            <p className="text-xs md:text-sm font-medium tracking-widest uppercase text-secondary">Premium Floral Atelier</p>
            <h1 className="text-3xl md:text-6xl lg:text-7xl font-heading leading-tight md:leading-[1.1] text-background">
              Where Every Stem <br className="hidden md:block" /> Tells a Story
            </h1>
            <p className="text-sm md:text-lg text-background/80 max-w-md mx-auto md:mx-0 leading-relaxed">
              Handcrafted bouquets for life's most meaningful moments. Fresh, seasonal, and delivered with care.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4">
              <Link to="/shop" className="w-full sm:w-auto">
                <Button variant="hero" size="xl" className="w-full sm:w-auto text-sm md:text-base h-12 md:h-14">
                  Shop Now <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/custom" className="w-full sm:w-auto">
                <Button variant="heroOutline" size="xl" className="w-full sm:w-auto text-sm md:text-base h-12 md:h-14 border-background/80 text-background hover:bg-background hover:text-foreground">
                  Customize Bouquet
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar - Mobile Scrollable */}
      <section className="border-b border-border bg-muted/30">
        <div className="container py-4 flex md:justify-center overflow-x-auto no-scrollbar scroll-smooth gap-8 md:gap-16 text-[10px] md:text-sm text-muted-foreground whitespace-nowrap px-4">
          <span className="flex items-center gap-2 flex-shrink-0"><Truck className="h-4 w-4 text-primary" /> Same-Day Delivery</span>
          <span className="flex items-center gap-2 flex-shrink-0"><Leaf className="h-4 w-4 text-accent" /> Freshness Guaranteed</span>
          <span className="flex items-center gap-2 flex-shrink-0"><Gift className="h-4 w-4 text-primary" /> Gift Wrapping Included</span>
        </div>
      </section>

      {/* Featured Bouquets - Improved Mobile Layout */}
      <section className="container py-12 md:py-20">
        <div className="flex items-end justify-between mb-8 md:mb-12">
          <div>
            <p className="text-xs md:text-sm font-medium tracking-widest uppercase text-primary mb-2">Curated for You</p>
            <h2 className="text-2xl md:text-4xl font-heading text-foreground">Featured Bouquets</h2>
          </div>
          <Link to="/shop" className="flex items-center gap-1 text-xs md:text-sm font-medium text-primary hover:underline">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-6">
          {featured[0] && (
            <div className="md:col-span-7 md:row-span-2">
              <ProductCard product={featured[0]} className="h-full [&_img]:aspect-[4/3] md:[&_img]:aspect-[4/5]" />
            </div>
          )}
          <div className="grid grid-cols-2 md:grid-cols-1 md:col-span-5 gap-4 md:gap-6">
            {featured[1] && <ProductCard product={featured[1]} />}
            {featured[2] && <ProductCard product={featured[2]} />}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="container py-12 md:py-20">
        <div className="flex items-end justify-between mb-8 md:mb-12">
          <div>
            <p className="text-xs md:text-sm font-medium tracking-widest uppercase text-primary mb-2">Most Loved</p>
            <h2 className="text-2xl md:text-4xl font-heading text-foreground">Best Sellers</h2>
          </div>
          <Link to="/shop" className="flex items-center gap-1 text-xs md:text-sm font-medium text-primary hover:underline">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Reviews - Mobile Optimized */}
      <section className="bg-muted/10 py-12 md:py-20">
        <div className="container overflow-hidden">
          <div className="text-center mb-8 md:mb-12">
            <p className="text-xs md:text-sm font-medium tracking-widest uppercase text-primary mb-2">Kind Words</p>
            <h2 className="text-2xl md:text-4xl font-heading text-foreground">What Our Customers Say</h2>
          </div>
          <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 overflow-x-auto md:overflow-visible no-scrollbar pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
            {reviews.map((review) => (
              <div key={review.id} className="bg-background rounded-2xl p-5 md:p-6 shadow-sm border border-border/40 min-w-[280px] md:min-w-0">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 md:h-4 md:h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-4 italic">"{review.text}"</p>
                <div className="flex items-center justify-between border-t border-border/30 pt-4">
                  <span className="text-xs md:text-sm font-bold text-foreground">{review.name}</span>
                  <span className="text-[10px] md:text-xs text-muted-foreground">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Snippet - Stacked for Mobile */}
      <section className="bg-foreground text-background py-16 md:py-28 overflow-hidden">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="space-y-6 md:space-y-8 animate-slide-up text-center md:text-left order-2 md:order-1">
              <div className="space-y-3 md:space-y-4">
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-primary/80">Our Story</p>
                <h2 className="text-3xl md:text-5xl font-heading leading-tight">
                  Wrapped in Black, <br />
                  <span className="text-primary italic">Blooming in Bold</span>
                </h2>
              </div>
              <p className="text-sm md:text-lg text-background/70 leading-relaxed max-w-lg mx-auto md:mx-0">
                At Bloom Bar, we believe every stem tells a story. Our signature high-contrast aesthetic and symbolic arrangements are designed for life's main character moments.
              </p>
              <Link to="/about" className="block w-full sm:w-auto">
                <Button variant="hero" className="w-full sm:w-auto rounded-full px-8 h-12 text-sm">
                  Discover Our Story <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="relative order-1 md:order-2">
              <div className="aspect-[4/3] md:aspect-square rounded-2xl md:rounded-3xl overflow-hidden border border-background/10 shadow-2xl">
                <img 
                  src={bouquetRoses} 
                  alt="Bloom Bar Signature Aesthetic" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="absolute -bottom-4 -right-2 md:-bottom-6 md:-right-6 bg-primary text-primary-foreground p-5 md:p-8 rounded-xl md:rounded-2xl rotate-2 shadow-lg scale-90 md:scale-100">
                <p className="font-heading text-lg md:text-2xl">100% Unique</p>
                <p className="text-[10px] md:text-sm opacity-80">Narrative-driven floral design</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Compact for Mobile */}
      <section className="container py-12 md:py-20">
        <div className="bg-primary/95 rounded-3xl p-8 md:p-16 text-center shadow-xl">
          <h2 className="text-2xl md:text-4xl font-heading text-primary-foreground mb-3 font-bold">
            Create Something Truly Yours
          </h2>
          <p className="text-sm md:text-lg text-primary-foreground/80 max-w-md mx-auto mb-8 leading-relaxed">
            Design a custom bouquet that perfectly captures your sentiment. Choose flowers, colors, and wrapping.
          </p>
          <Link to="/custom" className="block w-full sm:w-auto max-w-xs mx-auto">
            <Button variant="heroOutline" size="xl" className="w-full h-12 md:h-14 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary text-sm font-bold">
              Build Your Bouquet <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </main>

  );
};

export default Index;
