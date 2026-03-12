import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Heart, Menu, X, ChevronDown, User, LogOut, Settings, Award } from "lucide-react";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Shop Bouquets", path: "/shop" },
  { label: "Occasions", path: "/shop?filter=occasions" },
  { label: "Custom Bouquet", path: "/custom" },
  { label: "About Us", path: "/about" },
];

const occasionLinks = [
  { label: "Birthday", path: "/shop?occasion=Birthday" },
  { label: "Anniversary", path: "/shop?occasion=Anniversary" },
  { label: "Love & Romance", path: "/shop?occasion=Love & Romance" },
  { label: "Congratulations", path: "/shop?occasion=Congratulations" },
  { label: "Thank You", path: "/shop?occasion=Thank You" },
];

const Navbar = () => {
  const { cartCount, wishlist } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16 md:h-20 px-4 md:px-8">
          <Link to="/" className="font-heading text-xl md:text-3xl tracking-tight text-foreground flex items-center gap-2">
            <img src="/favicon.svg" alt="Bloom Bar" className="h-7 w-7 md:h-8 md:w-8" />
            <span className="hidden xs:inline">Bloom Bar</span>
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

          <div className="flex items-center gap-1 md:gap-2">
            {/* Unique Profile Handling */}
            {isAuthenticated ? (
              <div className="hidden md:block">
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
                        <p className="text-[10px] leading-none text-muted-foreground mt-1 lowercase">
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
              </div>
            ) : (
              <Link to="/login" className="hidden md:block">
                <Button variant="ghost" size="icon" title="Login" className="h-10 w-10 rounded-full border border-transparent hover:border-border/50">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            )}
            
            <Link to="/wishlist">
              <Button variant="ghost" size="icon" className="relative h-9 w-9 md:h-10 md:w-10">
                <Heart className="h-5 w-5 md:h-5 md:w-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-accent text-accent-foreground text-[10px] flex items-center justify-center font-bold">
                    {wishlist.length}
                  </span>
                )}
              </Button>
            </Link>
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative h-9 w-9 md:h-10 md:w-10">
                <ShoppingBag className="h-5 w-5 md:h-5 md:w-5" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-9 w-9"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Nav Menu */}
        {mobileOpen && (
          <nav className="md:hidden fixed inset-0 top-16 bg-background z-40 animate-in slide-in-from-top duration-300">
            <div className="container py-8 flex flex-col gap-6 h-full overflow-y-auto pb-20">
              <Accordion type="single" collapsible className="w-full">
                {navLinks.map((link) => {
                  if (link.label === "Occasions") {
                    return (
                      <AccordionItem key={link.path} value="occasions" className="border-none">
                        <AccordionTrigger className="text-xl font-heading text-foreground hover:no-underline py-4">
                          {link.label}
                        </AccordionTrigger>
                        <AccordionContent className="pt-2 pb-6">
                          <div className="flex flex-col gap-1 pl-4 border-l-2 border-primary/20">
                            {occasionLinks.map((occ) => (
                              <Link
                                key={occ.label}
                                to={occ.path}
                                onClick={() => setMobileOpen(false)}
                                className="text-lg py-3 text-muted-foreground hover:text-primary transition-colors flex items-center justify-between"
                              >
                                {occ.label}
                                <ChevronDown className="h-4 w-4 -rotate-90 opacity-40" />
                              </Link>
                            ))}
                            <Link 
                              to="/shop" 
                              onClick={() => setMobileOpen(false)}
                              className="text-sm font-bold text-primary mt-4 py-2 uppercase tracking-widest"
                            >
                              View All Collections
                            </Link>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  }

                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileOpen(false)}
                      className={`text-xl font-heading py-4 border-b border-border/50 block transition-colors ${location.pathname === link.path ? "text-primary" : "text-foreground"
                        }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </Accordion>

              {!isAuthenticated && (
                <Link to="/login" onClick={() => setMobileOpen(false)} className="mt-4">
                  <Button className="w-full h-14 rounded-2xl text-lg font-bold gap-3 shadow-lg shadow-primary/20">
                    <User className="h-5 w-5" /> Sign In / Sign Up
                  </Button>
                </Link>
              )}
            </div>
          </nav>
        )}
      </header>

      {/* Unique Mobile Profile FAB - Only for Authenticated Users */}
      {isAuthenticated && (
        <div className="md:hidden fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3">
          <Drawer>
            <DrawerTrigger asChild>
              <Button size="lg" className="h-14 w-14 rounded-full shadow-2xl shadow-primary/40 border-2 border-background p-0 overflow-hidden group">
                <div className="bg-primary h-full w-full flex items-center justify-center group-active:scale-95 transition-transform">
                  <User className="h-6 w-6 text-primary-foreground" />
                </div>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="rounded-t-[2.5rem] border-t-0 bg-background pb-10">
              <DrawerHeader className="pt-8 text-center sm:text-center">
                <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4 border-2 border-primary/5 shadow-inner">
                  <User className="h-10 w-10 text-primary" />
                </div>
                <DrawerTitle className="text-2xl font-heading text-foreground">{user?.name}</DrawerTitle>
                <DrawerDescription className="text-muted-foreground text-sm lowercase mt-1 font-medium">{user?.email}</DrawerDescription>
                
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-widest mx-auto mt-3 border border-accent/20">
                  <Award className="h-3 w-3" /> Premium Member
                </div>
              </DrawerHeader>

              <div className="px-6 space-y-3 mt-4">
                <Link to="/wishlist" className="flex items-center justify-between p-5 rounded-[1.5rem] bg-muted/30 hover:bg-muted active:scale-[0.98] transition-all border border-border/50">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-background flex items-center justify-center shadow-soft">
                      <Heart className="h-5 w-5 text-accent fill-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">My Wishlist</p>
                      <p className="text-[10px] text-muted-foreground">{wishlist.length} items saved</p>
                    </div>
                  </div>
                  <ChevronDown className="h-4 w-4 -rotate-90 opacity-30" />
                </Link>

                <Link to="/cart" className="flex items-center justify-between p-5 rounded-[1.5rem] bg-muted/30 hover:bg-muted active:scale-[0.98] transition-all border border-border/50">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-background flex items-center justify-center shadow-soft">
                      <ShoppingBag className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">My Shopping Cart</p>
                      <p className="text-[10px] text-muted-foreground tracking-tight">{cartCount} items ready for checkout</p>
                    </div>
                  </div>
                  <ChevronDown className="h-4 w-4 -rotate-90 opacity-30" />
                </Link>
              </div>

              <DrawerFooter className="mt-8 px-6">
                <Button 
                  variant="outline" 
                  className="w-full h-14 rounded-[1.25rem] border-destructive/20 text-destructive hover:bg-destructive/5 font-bold gap-3"
                  onClick={logout}
                >
                  <LogOut className="h-5 w-5" /> Log Out
                </Button>
                <DrawerClose asChild>
                  <Button variant="ghost" className="w-full h-12 rounded-xl text-muted-foreground text-xs font-bold uppercase tracking-widest">
                    Maybe Later
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      )}
    </>
  );
};

export default Navbar;

