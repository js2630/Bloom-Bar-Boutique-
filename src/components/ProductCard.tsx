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
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />

        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
          <span className="absolute top-3 left-3 text-xs font-medium bg-secondary text-secondary-foreground px-3 py-1 rounded-full">
            Same Day
          </span>
        )}

        {/* Add to cart bar */}
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <Button
            onClick={handleAddToCart}
            className="w-full gap-2 rounded-lg"
            size="sm"
          >
            <ShoppingBag className="h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>

      <div className="mt-3 space-y-1">
        <h3 className="font-heading text-lg text-foreground group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
          )}
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <span className="text-amber-500">★</span>
          <span>{product.rating}</span>
          <span>({product.reviews})</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
