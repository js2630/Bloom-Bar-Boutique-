import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Heart, Menu, X, ChevronDown, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Shop Bouquets", path: "/shop" },
  { label: "Occasions", path: "/shop?filter=occasions" },
  { label: "Custom Bouquet", path: "/custom" },
  { label: "About Us", path: "/about" },
];

const occasionLinks = [
  { label: "Birthday", path: "/shop?occasion=Birthday", image: "/assets/sunflower_bouquet.png" },
  { label: "Anniversary", path: "/shop?occasion=Anniversary", image: "/assets/purple_roses_bouquet.png" },
  { label: "Love & Romance", path: "/shop?occasion=Love & Romance", image: "/assets/red_roses_bouquet.png" },
  { label: "Congratulations", path: "/shop?occasion=Congratulations", image: "/assets/orange_mixed_bouquet.png" },
  { label: "Thank You", path: "/shop?occasion=Thank You", image: "/assets/hot_pink_bouquet.png" },
];

const Navbar = () => {
  const { cartCount, wishlist } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileOccasionsOpen, setMobileOccasionsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="font-heading text-2xl md:text-3xl tracking-tight text-foreground flex items-center gap-2">
          <img src="/favicon.svg" alt="Bloom Bar" className="h-8 w-8" />
          Bloom Bar
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 h-full">
          {navLinks.map((link) => {
            if (link.label === "Occasions") {
              return (
                <div key={link.path} className="relative group/occasions h-full flex items-center">
                  <Link
                    to={link.path}
                    className={`text-sm font-medium tracking-wide transition-colors flex items-center gap-1 py-6 hover:text-primary ${location.search.includes('filter') || location.search.includes('occasion') ? "text-primary" : "text-muted-foreground"
                      }`}
                  >
                    {link.label}
                    <ChevronDown className="h-4 w-4 transition-transform group-hover/occasions:rotate-180" />
                  </Link>

                  
                  {/* Visual Dropdown */}
                  <div className="absolute top-full pt-2 left-1/2 -translate-x-1/2 opacity-0 translate-y-3 pointer-events-none group-hover/occasions:opacity-100 group-hover/occasions:translate-y-0 group-hover/occasions:pointer-events-auto transition-all duration-300 z-50">
                    <div className="bg-background/95 backdrop-blur-xl shadow-elevated border border-border/50 rounded-[2rem] w-[450px] p-6 overflow-hidden animate-scale-in">
                      <div className="grid grid-cols-2 gap-3">
                        {occasionLinks.map((occ) => (
                          <Link
                            key={occ.label}
                            to={occ.path}
                            className="group/item flex items-center gap-4 p-3 rounded-2xl hover:bg-primary/5 transition-all duration-300 border border-transparent hover:border-primary/10"
                          >
                            <div className="h-12 w-12 rounded-xl overflow-hidden bg-muted group-hover/item:scale-105 transition-transform duration-500">
                              <img src={occ.image} alt={occ.label} className="h-full w-full object-cover" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-foreground group-hover/item:text-primary transition-colors">
                                {occ.label}
                              </span>
                              <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Collection</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-4 pt-4 border-t border-border/50 text-center">
                        <Link to="/shop" className="text-xs font-bold text-primary hover:underline uppercase tracking-widest">
                          View All Moments →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium tracking-wide transition-colors hover:text-primary flex items-center h-full ${location.pathname === link.path && !location.search.includes('filter') && !location.search.includes('occasion') ? "text-primary" : "text-muted-foreground"
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-full bg-muted/50 border border-border/50 hover:bg-muted transition-all">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-2 p-2 rounded-2xl border-border/50 shadow-elevated animate-scale-in">
                <DropdownMenuLabel className="font-normal p-3">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-bold leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground mt-1">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-border/50" />
                <DropdownMenuItem asChild>
                  <Link to="/wishlist" className="cursor-pointer p-3 rounded-xl hover:bg-muted/50 flex items-center gap-3">
                    <Heart className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">My Wishlist</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/cart" className="cursor-pointer p-3 rounded-xl hover:bg-muted/50 flex items-center gap-3">
                    <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">My Cart</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border/50" />
                <DropdownMenuItem 
                  onClick={logout}
                  className="p-3 rounded-xl focus:bg-destructive/5 focus:text-destructive text-destructive cursor-pointer flex items-center gap-3 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="text-sm font-bold">Log Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login" className="hidden md:block mr-2">
              <Button variant="ghost" size="icon" title="Login" className="h-10 w-10 rounded-full border border-transparent hover:border-border/50">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          )}
          
          <Link to="/wishlist">
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-accent text-accent-foreground text-[10px] flex items-center justify-center font-medium">
                  {wishlist.length}
                </span>
              )}
            </Button>
          </Link>
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-border bg-background animate-fade-in pb-10 shadow-elevated absolute w-full top-full left-0 z-40 max-h-[85vh] overflow-y-auto">
          <div className="container py-6 flex flex-col gap-5">
            {navLinks.map((link) => {
              if (link.label === "Occasions") {
                return (
                  <div key={link.path} className="flex flex-col py-2 px-2 bg-muted/20 rounded-[2rem] border border-border/50 transition-all duration-300">
                    <button 
                      onClick={() => setMobileOccasionsOpen(!mobileOccasionsOpen)}
                      className="flex items-center justify-between w-full p-4 rounded-2xl group"
                    >
                      <span className="text-sm font-bold uppercase tracking-widest text-primary font-heading">{link.label}</span>
                      <ChevronDown className={`h-4 w-4 text-primary transition-transform duration-300 ${mobileOccasionsOpen ? "rotate-180" : ""}`} />
                    </button>
                    
                    <div className={`grid grid-cols-1 gap-2 px-2 overflow-hidden transition-all duration-300 ${mobileOccasionsOpen ? "max-h-[500px] pb-4 opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
                      {occasionLinks.map(occ => (
                        <Link
                          key={occ.label}
                          to={occ.path}
                          onClick={() => {
                            setMobileOpen(false);
                            setMobileOccasionsOpen(false);
                          }}
                          className="flex items-center gap-4 p-3 rounded-2xl bg-background border border-border/50 active:scale-[0.98] transition-all"
                        >
                          <div className="h-10 w-10 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                            <img src={occ.image} alt={occ.label} className="h-full w-full object-cover" />
                          </div>
                          <span className="text-sm font-bold text-foreground">{occ.label}</span>
                          <ChevronDown className="h-3 w-3 ml-auto -rotate-90 text-muted-foreground/50" />
                        </Link>
                      ))}
                      <Link 
                        to="/shop" 
                        onClick={() => {
                          setMobileOpen(false);
                          setMobileOccasionsOpen(false);
                        }} 
                        className="text-[10px] text-center mt-3 underline text-muted-foreground uppercase font-bold"
                      >
                        See All Collections
                      </Link>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`text-lg font-heading py-2 px-4 rounded-2xl transition-colors border-l-4 ${location.pathname === link.path && !location.search.includes('filter') && !location.search.includes('occasion') 
                    ? "text-primary bg-primary/5 border-primary" 
                    : "text-foreground border-transparent hover:bg-muted/50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="pt-4 mt-4 border-t border-border">
              {isAuthenticated ? (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 px-2">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold leading-none">{user?.name}</p>
                      <p className="text-[10px] text-muted-foreground mt-1">{user?.email}</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start gap-2 h-12 rounded-xl text-destructive hover:text-destructive hover:bg-destructive/5 border-destructive/20"
                    onClick={() => {
                      logout();
                      setMobileOpen(false);
                    }}
                  >
                    <LogOut className="h-4 w-4" /> Sign Out
                  </Button>
                </div>
              ) : (
                <Link to="/login" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full justify-start gap-2 h-12 rounded-xl">
                    <User className="h-4 w-4" /> Sign In / Sign Up
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
