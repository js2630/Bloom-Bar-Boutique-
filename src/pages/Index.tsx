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
    <main>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBouquet} alt="Premium bouquet by Bloom Bar" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/30 to-transparent" />
        </div>
        <div className="container relative z-10 py-20">
          <div className="max-w-xl space-y-6 animate-slide-up">
            <p className="text-sm font-medium tracking-widest uppercase text-secondary">Premium Floral Atelier</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading leading-[1.1] text-background">
              Where Every Stem Tells a Story
            </h1>
            <p className="text-base md:text-lg text-background/80 max-w-md leading-relaxed">
              Handcrafted bouquets for life's most meaningful moments. Fresh, seasonal, and delivered with care.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/shop">
                <Button variant="hero" size="xl">
                  Shop Now <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/custom">
                <Button variant="heroOutline" size="xl" className="border-background/80 text-background hover:bg-background hover:text-foreground">
                  Customize Bouquet
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-b border-border bg-muted/50">
        <div className="container py-6 flex flex-wrap justify-center gap-8 md:gap-16 text-sm text-muted-foreground">
          <span className="flex items-center gap-2"><Truck className="h-4 w-4 text-primary" /> Same-Day Delivery</span>
          <span className="flex items-center gap-2"><Leaf className="h-4 w-4 text-accent" /> Freshness Guaranteed</span>
          <span className="flex items-center gap-2"><Gift className="h-4 w-4 text-primary" /> Gift Wrapping Included</span>
        </div>
      </section>

      {/* Featured Bouquets - Asymmetric Grid */}
      <section className="container py-20">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-sm font-medium tracking-widest uppercase text-primary mb-2">Curated for You</p>
            <h2 className="text-3xl md:text-4xl font-heading text-foreground">Featured Bouquets</h2>
          </div>
          <Link to="/shop" className="hidden md:flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-12 gap-4 md:gap-6">
          {featured[0] && (
            <div className="col-span-2 md:col-span-7 md:row-span-2">
              <ProductCard product={featured[0]} className="h-full [&_img]:aspect-[4/5]" />
            </div>
          )}
          {featured[1] && (
            <div className="col-span-1 md:col-span-5">
              <ProductCard product={featured[1]} />
            </div>
          )}
          {featured[2] && (
            <div className="col-span-1 md:col-span-5">
              <ProductCard product={featured[2]} />
            </div>
          )}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="container py-20">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-sm font-medium tracking-widest uppercase text-primary mb-2">Most Loved</p>
            <h2 className="text-3xl md:text-4xl font-heading text-foreground">Best Sellers</h2>
          </div>
          <Link to="/shop" className="hidden md:flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-muted/50 py-20">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-sm font-medium tracking-widest uppercase text-primary mb-2">Kind Words</p>
            <h2 className="text-3xl md:text-4xl font-heading text-foreground">What Our Customers Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-background rounded-xl p-6 shadow-card">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">"{review.text}"</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{review.name}</span>
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Snippet */}
      <section className="bg-foreground text-background py-24 overflow-hidden">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-slide-up">
              <div className="space-y-4">
                <p className="text-sm font-medium tracking-[0.3em] uppercase text-primary">Our Story</p>
                <h2 className="text-4xl md:text-5xl font-heading leading-tight">
                  Wrapped in Black, <br />
                  <span className="text-primary italic">Blooming in Bold</span>
                </h2>
              </div>
              <p className="text-lg text-background/70 leading-relaxed max-w-lg">
                At Bloom Bar, we believe every stem tells a story. Our signature high-contrast aesthetic and symbolic arrangements are designed for life's main character moments.
              </p>
              <Link to="/about">
                <Button variant="hero" className="rounded-full px-8">
                  Discover Our Story <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden border border-background/10">
                <img 
                  src={bouquetRoses} 
                  alt="Bloom Bar Signature Aesthetic" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-8 rounded-2xl hidden md:block rotate-3">
                <p className="font-heading text-2xl">100% Unique</p>
                <p className="text-sm opacity-80">Narrative-driven floral design</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-20">
        <div className="bg-primary rounded-2xl p-10 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-heading text-primary-foreground mb-4">
            Create Something Truly Yours
          </h2>
          <p className="text-primary-foreground/80 max-w-md mx-auto mb-8">
            Design a custom bouquet that perfectly captures your sentiment. Choose flowers, colors, and wrapping.
          </p>
          <Link to="/custom">
            <Button variant="heroOutline" size="xl" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              Build Your Bouquet <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Index;
