import { useParams, Link } from "react-router-dom";
import { Heart, ShoppingBag, Truck, ArrowLeft, Minus, Plus, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useState } from "react";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [qty, setQty] = useState(1);
  const [message, setMessage] = useState("");

  if (!product) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-heading text-foreground mb-4">Bouquet not found</h1>
        <Link to="/shop"><Button variant="link">Back to Shop</Button></Link>
      </div>
    );
  }

  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

  const handleAdd = () => {
    addToCart(product, qty);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <main className="container py-8">
      <Link to="/shop" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Shop
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
        {/* Image */}
        <div className="rounded-xl overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="w-full aspect-[4/5] object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* Details */}
        <div className="space-y-6 py-4">
          {product.sameDay && (
            <span className="inline-block text-xs font-medium bg-secondary text-secondary-foreground px-3 py-1 rounded-full">
              Same Day Delivery Available
            </span>
          )}

          <h1 className="text-3xl md:text-4xl font-heading text-foreground">{product.name}</h1>

          <div className="flex items-center gap-3">
            <span className="text-2xl font-medium text-foreground">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-lg text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="text-amber-500">★</span> {product.rating} · {product.reviews} reviews
          </div>

          <p className="text-muted-foreground leading-relaxed">{product.description}</p>

          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Flowers Used</h4>
            <div className="flex flex-wrap gap-2">
              {product.flowers.map((f) => (
                <span key={f} className="text-xs bg-muted px-3 py-1 rounded-full text-muted-foreground">{f}</span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Truck className="h-4 w-4 text-primary" />
            {product.sameDay ? "Order before 2 PM for same-day delivery" : "Delivery in 1-2 business days"}
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Gift Message (optional)</label>
            <Textarea
              placeholder="Write a personal message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="resize-none"
              rows={3}
            />
          </div>

          {/* Quantity & Actions */}
          <div className="space-y-4 pt-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <div className="flex items-center border border-border rounded-xl bg-muted/50 justify-between sm:justify-center px-2 sm:px-0">
                <Button variant="ghost" size="icon" onClick={() => setQty(Math.max(1, qty - 1))} className="h-12 w-12 sm:h-10 sm:w-10">
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center text-sm font-bold">{qty}</span>
                <Button variant="ghost" size="icon" onClick={() => setQty(qty + 1)} className="h-12 w-12 sm:h-10 sm:w-10">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <Button onClick={handleAdd} size="lg" className="flex-1 h-12 gap-2 text-md font-semibold shadow-lg shadow-primary/20">
                <ShoppingBag className="h-5 w-5" /> Add to Cart
              </Button>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline"
                size="lg" 
                className="flex-1 h-12 gap-2 border-border hover:bg-muted font-medium"
                onClick={() => {
                  const phone = "917010804538";
                  const msg = `*Inquiry for ${product.name}*%0A%0AQuantity: ${qty}${message ? `%0AMessage: ${message}` : ''}%0A%0A_Please let me know the availability._`;
                  window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
                  toast.success("Inquiry sent! Redirecting...");
                }}
              >
                Send Inquiry
              </Button>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    const url = window.location.href;
                    if (navigator.share) {
                      navigator.share({
                        title: product.name,
                        text: `Check out this beautiful ${product.name} at Bloom Bar!`,
                        url: url,
                      });
                    } else {
                      navigator.clipboard.writeText(url);
                      toast.success("Link copied!");
                    }
                  }}
                  className="h-12 w-12 shrink-0 border-border"
                >
                  <Share2 className="h-5 w-5" />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => { toggleWishlist(product.id); toast.success(isInWishlist(product.id) ? "Removed" : "Added to wishlist"); }}
                  className="h-12 w-12 shrink-0 border-border"
                >
                  <Heart className={`h-5 w-5 ${isInWishlist(product.id) ? "fill-accent text-accent" : ""}`} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      <section className="mt-20">
        <h2 className="text-2xl font-heading text-foreground mb-8">Customers Also Bought</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default ProductDetail;
