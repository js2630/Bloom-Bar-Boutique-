import { ArrowRight, Heart, Sparkles, Star, MapPin, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import bouquetRoses from "@/assets/bouquet-roses.jpg";
import bouquetMixed from "@/assets/bouquet-mixed.jpg";

const About = () => {
  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center bg-foreground text-background">
        <div className="absolute inset-0 opacity-40">
          <img 
            src={bouquetRoses} 
            alt="Bloom Bar Aesthetic" 
            className="w-full h-full object-cover grayscale brightness-50"
          />
        </div>
        <div className="container relative z-10 text-center space-y-6">
          <p className="text-sm font-medium tracking-[0.3em] uppercase text-primary animate-fade-in">
            Established in Chennai
          </p>
          <h1 className="text-5xl md:text-7xl font-heading leading-tight max-w-4xl mx-auto animate-slide-up">
            Where Every Stem <br />
            <span className="text-primary italic font-serif">Tells a Story</span>
          </h1>
          <p className="text-lg md:text-xl text-background/70 max-w-2xl mx-auto leading-relaxed animate-slide-up [animation-delay:200ms]">
            A boutique floral atelier dedicated to delivering happiness through curated, symbolic arrangements.
          </p>
        </div>
      </section>

      {/* Philosophy Section - High Contrast */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-primary/10 rounded-2xl scale-95 group-hover:scale-100 transition-transform duration-500" />
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-2xl">
                <img 
                  src={bouquetMixed} 
                  alt="Bloom Bar Concept" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-8 left-8 right-8 text-background translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-sm font-medium tracking-widest uppercase mb-2">Signature Look</p>
                  <h3 className="text-2xl font-heading">Wrapped in Black, Blooming in Bold</h3>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-heading text-foreground">Our Philosophy</h2>
                <div className="h-1.5 w-24 bg-primary rounded-full" />
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We believe flowers are more than just a product; they are a medium for personal expression. 
                Whether it's romance, resilience, or a simple reset, every bouquet we craft carries a specific narrative.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: Heart, title: "Symbolic Stems", text: "Each flower is chosen for its unique meaning and story." },
                  { icon: Sparkles, title: "Bold Aesthetic", text: "Signature high-contrast wrapping that makes blooms pop." },
                  { icon: Star, title: "Main Character Energy", text: "Radiant designs that stand out and capture the moment." },
                  { icon: MapPin, title: "Chennai Rooted", text: "Boutique floral service delivering joy across Chennai." },
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <item.icon className="h-6 w-6 text-primary" />
                    <h4 className="font-heading text-lg">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Showcase - Bloom Club & Bar */}
      <section className="py-24 bg-foreground text-background">
        <div className="container">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-heading">More Than Just Bouquets</h2>
            <p className="text-background/60 max-w-xl mx-auto">Discover our exclusive floral experiences designed to bring consistent happiness.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-background/5 border border-background/10 rounded-3xl p-10 hover:bg-background/10 transition-colors group">
              <h3 className="text-3xl font-heading mb-4 text-primary italic">Bloom Club</h3>
              <p className="text-background/70 mb-8 leading-relaxed">
                Join our premium flower subscription service. Weekly or monthly curated deliveries of seasonal stems that transform your space and mood.
              </p>
              <Link to="/shop">
                <Button variant="hero" className="group">
                  Join the Club <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
            <div className="bg-background/5 border border-background/10 rounded-3xl p-10 hover:bg-background/10 transition-colors group">
              <h3 className="text-3xl font-heading mb-4 text-primary italic">Mini Flower Bar</h3>
              <p className="text-background/70 mb-8 leading-relaxed">
                Interactive floral setups for your private events or pop-ups. Let your guests experience the art of "Build Your Own Blooms" with our signature stems.
              </p>
              <Link to="/custom">
                <Button variant="heroOutline" className="border-background/20 text-background hover:bg-background hover:text-foreground">
                  Book Experience
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Integration CTA */}
      <section className="py-24 bg-background">
        <div className="container max-w-4xl text-center">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 text-primary mb-6">
            <Instagram className="h-8 w-8" />
          </div>
          <h2 className="text-3xl md:text-5xl font-heading mb-6">Join Our Story on Instagram</h2>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
            Every day we share new stories, behind-the-scenes magic, and limited edition drops. 
            DM us @the_bloombar_in for personalized service and inquiries.
          </p>
          <a 
            href="https://www.instagram.com/the_bloombar_in" 
            target="_blank" 
            rel="noreferrer"
            className="inline-block"
          >
            <Button size="xl" className="rounded-full px-12 text-lg">
              Follow Us @the_bloombar_in
            </Button>
          </a>
        </div>
      </section>
    </main>
  );
};

export default About;
