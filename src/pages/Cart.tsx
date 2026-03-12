import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  useEffect(() => {
    if (user && !customerName) {
      setCustomerName(user.name);
    }
  }, [user]);

  const deliveryFee = cartTotal > 2000 ? 0 : 199;

  const handleWhatsAppOrder = () => {
    if (!isAuthenticated) {
      toast.error("Please login to place an order");
      navigate("/login", { state: { from: { pathname: "/cart" } } });
      return;
    }

    if (!customerName || !customerPhone || !address) {
      toast.error("Please fill in all delivery details");
      return;
    }

    const phone = "917010804538";
    const heading = "*New Order from Bloom Bar Website*%0A%0A";
    const customerInfo = `*Customer:* ${customerName}%0A*Phone:* ${customerPhone}%0A*Address:* ${address}%0A%0A`;
    const itemsList = "*Order Items:*%0A" + items.map(item => `- ${item.product.name} (x${item.quantity}): ₹${(item.product.price * item.quantity).toLocaleString()}`).join('%0A');
    const total = `%0A%0A*Total Amount: ₹${(cartTotal + deliveryFee).toLocaleString()}*`;
    const footer = "%0A%0A_Order placed via website. Please confirm._";
    
    const message = heading + customerInfo + itemsList + total + footer;
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
    
    setIsOrderPlaced(true);
    toast.success("Order received! We are processing your request...");
    
    // Clear cart after a small delay to allow the state change to be visible
    setTimeout(() => {
      clearCart();
    }, 2000);
  };

  if (isOrderPlaced) {
    return (
      <main className="container py-20 text-center animate-fade-in">
        <div className="max-w-md mx-auto space-y-6 bg-muted/30 p-10 rounded-3xl border border-primary/10 shadow-xl">
          <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-3xl font-heading text-foreground">Order Successfully Placed!</h1>
          <p className="text-muted-foreground whitespace-pre-line">
            Thank you for shopping with Bloom Bar. 
            We have received your order details and our team 
            will contact you shortly for confirmation.
          </p>
          <Link to="/shop">
            <Button className="w-full h-12 text-lg">Continue Shopping</Button>
          </Link>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="container py-20 text-center">
        <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
        <h1 className="text-2xl font-heading text-foreground mb-2">Your cart is empty</h1>
        <p className="text-muted-foreground mb-6">Add some beautiful bouquets to get started.</p>
        <Link to="/shop"><Button>Browse Bouquets</Button></Link>
      </main>
    );
  }

  return (
    <main className="container py-8">
      <Link to="/shop" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
        <ArrowLeft className="h-4 w-4" /> Continue Shopping
      </Link>

      <h1 className="text-3xl font-heading text-foreground mb-8">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex gap-4 bg-muted/50 rounded-xl p-4">
              <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.name} className="w-24 h-24 rounded-lg object-cover" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/product/${product.id}`} className="font-heading text-lg text-foreground hover:text-primary transition-colors">
                  {product.name}
                </Link>
                <p className="text-sm text-muted-foreground">₹{product.price.toLocaleString()}</p>
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center border border-border rounded-lg">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(product.id, quantity - 1)}>
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center text-sm">{quantity}</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(product.id, quantity + 1)}>
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => { removeFromCart(product.id); toast.success("Removed from cart"); }}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="text-right">
                <span className="font-medium text-foreground">₹{(product.price * quantity).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Summary & Checkout Form */}
        <div className="space-y-6">
          <div className="bg-muted/50 rounded-xl p-6 h-fit space-y-4">
            <h3 className="font-heading text-xl text-foreground">Delivery Details</h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Full Name</label>
                <Input 
                  placeholder="John Doe" 
                  value={customerName} 
                  onChange={(e) => setCustomerName(e.target.value)} 
                  className="bg-background"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Phone Number</label>
                <Input 
                  placeholder="+91 XXXXX XXXXX" 
                  value={customerPhone} 
                  onChange={(e) => setCustomerPhone(e.target.value)} 
                  className="bg-background"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Delivery Address</label>
                <Textarea 
                  placeholder="Street address, City, Pincode" 
                  value={address} 
                  onChange={(e) => setAddress(e.target.value)} 
                  className="bg-background min-h-[80px]"
                />
              </div>
            </div>
          </div>

          <div className="bg-muted/50 rounded-xl p-6 h-fit space-y-4">
            <h3 className="font-heading text-xl text-foreground">Order Summary</h3>

            <div className="flex gap-2">
              <Input placeholder="Coupon code" value={coupon} onChange={(e) => setCoupon(e.target.value)} className="text-sm" />
              <Button variant="outline" size="sm" onClick={() => toast.info("Coupon feature coming soon!")}>Apply</Button>
            </div>

            <div className="space-y-2 pt-2 border-t border-border text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>₹{cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Delivery</span>
                <span>{deliveryFee === 0 ? "Free" : `₹${deliveryFee}`}</span>
              </div>
              <div className="flex justify-between font-medium text-foreground pt-2 border-t border-border text-base">
                <span>Total</span>
                <span>₹{(cartTotal + deliveryFee).toLocaleString()}</span>
              </div>
            </div>

            <Button 
              className="w-full h-14 text-lg font-medium shadow-lg shadow-primary/20 transition-all active:scale-[0.98]" 
              size="lg" 
              onClick={handleWhatsAppOrder}
            >
              Confirm & Place Order
            </Button>

            <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest">
              Secured Checkout via Message
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
