import { Link } from "react-router-dom";
import { Instagram, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background/80">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <h3 className="font-heading text-2xl text-background mb-4">Bloom Bar</h3>
            <p className="text-sm leading-relaxed text-background/60">
              Where every stem tells a story. Premium bouquets crafted with love for life's most meaningful moments.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-background mb-4 tracking-wide uppercase">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {["Shop", "Custom Bouquet", "About"].map((link) => (
                <Link key={link} to={`/${link.toLowerCase().replace(" ", "-")}`} className="text-sm text-background/60 hover:text-background transition-colors">
                  {link}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-background mb-4 tracking-wide uppercase">Contact</h4>
            <div className="flex flex-col gap-3 text-sm text-background/60">
              <span className="flex items-center gap-2"><Phone className="h-4 w-4" /> +91 70108 04538</span>
              <span className="flex items-center gap-2"><Mail className="h-4 w-4" /> ShobanaSri@gmail.com</span>
              <a href="https://www.instagram.com/the.bloombar_in" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-background transition-colors">
                <Instagram className="h-4 w-4" /> @the.bloombar_in
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-background mb-4 tracking-wide uppercase">Newsletter</h4>
            <p className="text-sm text-background/60 mb-3">Fresh blooms & offers, straight to your inbox.</p>
            <div className="flex gap-2">
              <Input placeholder="Your email" className="bg-background/10 border-background/20 text-background placeholder:text-background/40 text-sm" />
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground shrink-0">Join</Button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-background/10 text-center text-xs text-background/40">
          © 2026 Bloom Bar. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
