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
                <div key={link.path} className="relative group/occasions h-full flex items-center">
                  <Link
                    to={link.path}
                    className={`text-sm font-medium tracking-wide transition-colors flex items-center gap-1 py-6 hover:text-primary ${location.search.includes('filter') || location.search.includes('occasion') ? "text-primary" : "text-muted-foreground"
                      }`}
                  >
                    {link.label}
                    <ChevronDown className="h-4 w-4 transition-transform group-hover/occasions:rotate-180" />
                  </Link>

                  {/* Compact Elegant Dropdown */}
                  <div className="absolute top-full pt-2 left-0 opacity-0 translate-y-2 pointer-events-none group-hover/occasions:opacity-100 group-hover/occasions:translate-y-0 group-hover/occasions:pointer-events-auto transition-all duration-300 z-50">
                    <div className="bg-background/95 backdrop-blur-md shadow-elevated border border-border/50 rounded-2xl w-60 py-3 overflow-hidden animate-scale-in">
                      <div className="flex flex-col">
                        {occasionLinks.map((occ) => (
                          <Link
                            key={occ.label}
                            to={occ.path}
                            className="group/item flex items-center justify-between px-5 py-3 hover:bg-muted/50 transition-colors relative"
                          >
                            <span className="text-sm font-medium text-foreground/80 group-hover/item:text-primary transition-colors">
                              {occ.label}
                            </span>
                            <div className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300" />
                          </Link>
                        ))}
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
