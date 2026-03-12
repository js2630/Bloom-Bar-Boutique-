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
                <DropdownMenu key={link.path}>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={`text-sm font-medium tracking-wide transition-colors flex items-center gap-1 hover:text-primary outline-none ${location.search.includes('filter') || location.search.includes('occasion') ? "text-primary" : "text-muted-foreground"
                        }`}
                    >
                      {link.label}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56 mt-2 p-2 rounded-2xl border-border/50 shadow-elevated animate-scale-in">
                    {occasionLinks.map((occ) => (
                      <DropdownMenuItem key={occ.label} asChild>
                        <Link
                          to={occ.path}
                          className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 cursor-pointer group transition-colors"
                        >
                          <span className="text-sm font-medium text-foreground/80 group-hover:text-primary transition-colors">
                            {occ.label}
                          </span>
                          <div className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-all duration-300" />
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
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
                <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-full border border-primary/20 hover:border-primary/50 hover:bg-primary/5 transition-all outline-none">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <User className="h-5 w-5" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 mt-3 p-2 rounded-[1.5rem] border-primary/10 shadow-2xl backdrop-blur-xl bg-background/95 animate-scale-in">
                <div className="p-4 mb-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-primary/60 mb-1">Signed in as</p>
                  <p className="text-sm font-heading font-bold text-foreground truncate">{user?.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                </div>
                
                <DropdownMenuSeparator className="bg-primary/5 mx-2" />
                
                <div className="p-1 space-y-1">
                  <DropdownMenuItem asChild>
                    <Link to="/wishlist" className="cursor-pointer p-3 rounded-xl hover:bg-primary/5 flex items-center gap-3 transition-colors group">
                      <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Heart className="h-4 w-4 text-accent" />
                      </div>
                      <span className="text-sm font-medium">My Favorites</span>
                    </Link>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem asChild>
                    <Link to="/cart" className="cursor-pointer p-3 rounded-xl hover:bg-primary/5 flex items-center gap-3 transition-colors group">
                      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <ShoppingBag className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm font-medium">My Cart</span>
                    </Link>
                  </DropdownMenuItem>
                </div>

                <DropdownMenuSeparator className="bg-primary/5 mx-2" />
                
                <div className="p-1">
                  <DropdownMenuItem 
                    onClick={logout}
                    className="p-3 rounded-xl focus:bg-destructive/5 focus:text-destructive text-destructive cursor-pointer flex items-center gap-3 transition-colors group"
                  >
                    <div className="h-8 w-8 rounded-lg bg-destructive/5 flex items-center justify-center group-hover:bg-destructive/10 transition-colors">
                      <LogOut className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-bold">Sign Out</span>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login" className="hidden md:block mr-2">
              <Button variant="ghost" size="icon" title="Login" className="h-10 w-10 rounded-full border border-primary/20 hover:border-primary/50 hover:bg-primary/5">
                <User className="h-5 w-5 text-primary/70" />
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
        <nav className="md:hidden border-t border-border bg-background animate-fade-in pb-6 shadow-elevated absolute w-full top-full left-0 z-40">
          <div className="container py-4 flex flex-col gap-4">
            {navLinks.map((link) => {
              if (link.label === "Occasions") {
                return (
                  <div key={link.path} className="flex flex-col gap-3 py-2 border-y border-border/50">
                    <Link
                      to={link.path}
                      onClick={() => setMobileOpen(false)}
                      className="text-base font-medium text-foreground tracking-wide font-heading"
                    >
                      {link.label}
                    </Link>
                    <div className="grid grid-cols-2 gap-3 pb-2">
                      {occasionLinks.map(occ => (
                        <Link
                          key={occ.label}
                          to={occ.path}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center justify-center p-3 rounded-xl bg-muted/30 hover:bg-muted/60 transition-colors text-xs font-medium text-foreground border border-transparent active:border-border"
                        >
                          {occ.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`text-base font-medium py-2 transition-colors ${location.pathname === link.path && !location.search.includes('filter') && !location.search.includes('occasion') ? "text-primary" : "text-muted-foreground"
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="pt-6 mt-6 border-t border-primary/10">
              {isAuthenticated ? (
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-4 px-4 py-3 bg-primary/5 rounded-[1.5rem] border border-primary/10">
                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-sm">
                      <User className="h-6 w-6" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-widest text-primary/60 leading-none mb-1">My Account</p>
                      <p className="text-sm font-heading font-bold text-foreground truncate">{user?.name}</p>
                      <p className="text-[10px] text-muted-foreground truncate">{user?.email}</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full justify-center gap-2 h-14 rounded-2xl text-destructive bg-destructive/5 hover:bg-destructive/10 border-destructive/20 font-bold transition-all active:scale-95"
                    onClick={() => {
                      logout();
                      setMobileOpen(false);
                    }}
                  >
                    <LogOut className="h-5 w-5" /> Sign Out
                  </Button>
                </div>
              ) : (
                <Link to="/login" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full justify-center gap-2 h-14 rounded-2xl font-bold shadow-lg shadow-primary/20 transition-all active:scale-95">
                    <User className="h-5 w-5" /> Sign In / Create Account
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
