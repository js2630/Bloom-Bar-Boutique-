import { Heart, ShoppingBag, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Product } from "@/data/products";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className = "" }: ProductCardProps) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(product.id);
    toast.success(isInWishlist(product.id) ? "Removed from wishlist" : "Added to wishlist");
  };

  return (
    <Link to={`/product/${product.id}`} className={`group block ${className}`}>
      <div className="relative overflow-hidden rounded-xl bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Overlay actions */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300 pointer-events-none" />

        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 md:group-hover:opacity-100 transition-opacity duration-300">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleWishlist}
            className="h-9 w-9 rounded-full bg-background/90 hover:bg-background shadow-soft"
          >
            <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? "fill-accent text-accent" : "text-foreground"}`} />
          </Button>
          <Link to={`/product/${product.id}`}>
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-background/90 hover:bg-background shadow-soft">
              <Eye className="h-4 w-4 text-foreground" />
            </Button>
          </Link>
        </div>

        {product.sameDay && (
          <span className="absolute top-3 left-3 text-[10px] md:text-xs font-bold bg-primary text-primary-foreground px-2 md:px-3 py-1 rounded-full shadow-lg">
            Same Day
          </span>
        )}

        {/* Add to cart bar - visible on mobile by default or better positioned */}
        <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3 translate-y-full group-hover:translate-y-0 md:group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-background/80 to-transparent md:bg-none">
          <Button
            onClick={handleAddToCart}
            className="w-full gap-2 rounded-xl md:rounded-lg h-10 md:h-9 text-xs md:text-sm shadow-lg shadow-primary/20"
            size="sm"
          >
            <ShoppingBag className="h-3.5 w-3.5 md:h-4 md:h-4" />
            Add to Cart
          </Button>
        </div>
      </div>

      <div className="mt-4 px-1 space-y-1">
        <h3 className="font-heading text-base md:text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm md:text-base font-bold text-foreground">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-[10px] md:text-xs text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
            )}
          </div>
          <div className="flex items-center gap-1 text-[10px] md:text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full">
            <span className="text-amber-500">★</span>
            <span className="font-medium text-foreground">{product.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
