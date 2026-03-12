import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";

const Wishlist = () => {
  const { wishlist } = useCart();
  const wishlisted = products.filter((p) => wishlist.includes(p.id));

  if (wishlisted.length === 0) {
    return (
      <main className="container py-20 text-center">
        <Heart className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
        <h1 className="text-2xl font-heading text-foreground mb-2">Your wishlist is empty</h1>
        <p className="text-muted-foreground mb-6">Save your favorite bouquets for later.</p>
        <Link to="/shop"><Button>Browse Bouquets</Button></Link>
      </main>
    );
  }

  return (
    <main className="container py-8">
      <h1 className="text-3xl font-heading text-foreground mb-8">Your Wishlist</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {wishlisted.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </main>
  );
};

export default Wishlist;
