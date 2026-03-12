import { useState, useMemo } from "react";
import { ShoppingBag, Sparkles, Leaf, CalendarIcon, Info, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const flowerOptions = [
  { name: "Roses", pricePerStem: 80, icon: "🌹" },
  { name: "Lilies", pricePerStem: 120, icon: "🌸" },
  { name: "Peonies", pricePerStem: 150, icon: "🌺" },
  { name: "Tulips", pricePerStem: 100, icon: "🌷" },
  { name: "Sunflowers", pricePerStem: 90, icon: "🌻" },
  { name: "Orchids", pricePerStem: 200, icon: "💐" },
  { name: "Daisies", pricePerStem: 60, icon: "🌼" },
];

const colorOptions = ["Red", "Pink", "White", "Yellow", "Purple", "Mixed", "Pastel"];
const wrappingOptions = [
  { name: "Kraft Paper", price: 0 },
  { name: "Satin Wrap", price: 199 },
  { name: "Premium Box", price: 499 },
  { name: "Glass Vase", price: 799 },
];
const addonOptions = [
  { name: "None", price: 0 },
  { name: "Small Box of Chocolates", price: 399 },
  { name: "Mini Teddy Bear", price: 499 },
  { name: "Greeting Card", price: 99 },
];
const greeneryOptions = [
  { name: "Eucalyptus", price: 150 },
  { name: "Ferns", price: 100 },
  { name: "Baby's Breath", price: 200 },
];

const CustomBouquet = () => {
  const [selectedFlowers, setSelectedFlowers] = useState<{name: string, price: number}[]>([
    { name: flowerOptions[0].name, price: flowerOptions[0].pricePerStem }
  ]);
  const [color, setColor] = useState("Mixed");
  const [stems, setStems] = useState([12]);
  const [wrapping, setWrapping] = useState(wrappingOptions[0]);
  const [addon, setAddon] = useState(addonOptions[0]);
  const [greenery, setGreenery] = useState<typeof greeneryOptions[0] | null>(null);
  const [fragrance, setFragrance] = useState(false);
  const [date, setDate] = useState<Date>();

  const stemsCount = Number(stems[0]) || 0;

  const stemsTotal = useMemo(() => {
    if (selectedFlowers.length === 0) return 0;
    const avgStemPrice = selectedFlowers.reduce((sum, f) => sum + (Number(f.price) || 0), 0) / selectedFlowers.length;
    return Math.round(avgStemPrice * stemsCount);
  }, [selectedFlowers, stemsCount]);

  const totalPrice = useMemo(() => {
    const greeneryPrice = Number(greenery?.price) || 0;
    const fragrancePrice = fragrance ? 150 : 0;
    const wrappingPrice = Number(wrapping?.price) || 0;
    const addonPrice = Number(addon?.price) || 0;
    
    const total = stemsTotal + wrappingPrice + addonPrice + greeneryPrice + fragrancePrice;
    return isNaN(total) ? 0 : total;
  }, [stemsTotal, wrapping, addon, greenery, fragrance]);

  const toggleFlower = (f: typeof flowerOptions[0]) => {
    setSelectedFlowers(prev => {
      const exists = prev.find(item => item.name === f.name);
      if (exists) {
        if (prev.length === 1) return prev;
        return prev.filter(item => item.name !== f.name);
      }
      return [...prev, { name: f.name, price: Number(f.pricePerStem) }];
    });
  };

  return (
    <main className="container py-12 max-w-[1440px] px-4 md:px-8">
      <div className="text-center mb-12 animate-fade-in px-4">
        <span className="text-primary font-semibold tracking-widest uppercase text-xs">Couture Florals</span>
        <h1 className="text-4xl md:text-5xl font-heading mt-2">Design Your Masterpiece</h1>
        <p className="text-muted-foreground mt-4 text-balance">Customize every detail of your bouquet for a truly personal expression.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
        {/* Step 1: Flowers */}
        <section className="bg-card rounded-[2rem] border border-border shadow-xl shadow-primary/5 p-6 space-y-6 h-full min-h-[500px]">
          <div className="flex items-center gap-2 text-primary border-b border-border/50 pb-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold">1</div>
            <h3 className="text-lg font-heading text-foreground">Pick Blooms</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-auto max-h-[600px] pr-1 scrollbar-thin">
            {flowerOptions.map((f) => {
              const isSelected = selectedFlowers.some(sf => sf.name === f.name);
              return (
                <button
                  key={f.name}
                  onClick={() => toggleFlower(f)}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 gap-2 ${
                    isSelected 
                      ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20" 
                      : "bg-background border-border hover:border-primary/50"
                  }`}
                >
                  <span className="text-2xl">{f.icon}</span>
                  <span className="text-xs font-semibold">{f.name === "tulip" ? "Tulips" : f.name}</span>
                  <span className={`text-[10px] ${isSelected ? "text-primary-foreground/70" : "text-muted-foreground"}`}>₹{f.pricePerStem}/stem</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Step 2: Size & Accents */}
        <section className="bg-card rounded-[2rem] border border-border shadow-xl shadow-primary/5 p-6 space-y-8 h-full min-h-[500px]">
          <div className="flex items-center gap-2 text-primary border-b border-border/50 pb-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold">2</div>
            <h3 className="text-lg font-heading text-foreground">Size & Palette</h3>
          </div>
          
          <div className="space-y-8">
            <div className="bg-muted/30 p-5 rounded-2xl border border-border/50">
              <div className="flex justify-between items-end mb-4">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Stems Count</label>
                <span className="text-2xl font-heading text-primary">{stemsCount}</span>
              </div>
              <Slider value={stems} onValueChange={setStems} min={6} max={100} step={1} className="py-2" />
              <div className="flex justify-between text-[8px] text-muted-foreground mt-2">
                <span>Petit</span>
                <span>Signature</span>
                <span>Grand</span>
                <span>Royal</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-1">Foliage Accent</label>
                <Select value={greenery?.name || "none"} onValueChange={(v) => setGreenery(greeneryOptions.find(g => g.name === v) || null)}>
                  <SelectTrigger className="h-11 bg-background rounded-xl">
                    <SelectValue placeholder="Select Greenery" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No extra greenery</SelectItem>
                    {greeneryOptions.map((g) => (
                      <SelectItem key={g.name} value={g.name}>{g.name} (+₹{g.price})</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-1">Color Palette</label>
                <Select value={color} onValueChange={setColor}>
                  <SelectTrigger className="h-11 bg-background rounded-xl"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {colorOptions.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Step 3: Presentation & Date */}
        <section className="bg-card rounded-[2rem] border border-border shadow-xl shadow-primary/5 p-6 space-y-8 h-full min-h-[500px]">
          <div className="flex items-center gap-2 text-primary border-b border-border/50 pb-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold">3</div>
            <h3 className="text-lg font-heading text-foreground">Style & Date</h3>
          </div>
          
          <div className="space-y-6">
            <div className="bg-muted/30 p-5 rounded-2xl border border-border/50">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-4">Wrapping Style</label>
              <div className="grid grid-cols-1 gap-2">
                {wrappingOptions.slice(0, 3).map((w) => (
                  <button
                    key={w.name}
                    onClick={() => setWrapping(w)}
                    className={`flex items-center justify-between p-3 rounded-xl text-xs transition-all border ${
                      wrapping.name === w.name 
                        ? "bg-background border-primary text-primary shadow-sm" 
                        : "bg-transparent border-transparent hover:bg-background/50 text-muted-foreground"
                    }`}
                  >
                    <span>{w.name}</span>
                    <span className="font-bold">{w.price > 0 ? `+₹${w.price}` : "Free"}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-1">Delivery Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full h-11 justify-start text-left font-normal rounded-xl border-border bg-background",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                      {date ? format(date, "PPP") : <span className="text-xs">Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 rounded-2xl border-border shadow-2xl" align="center">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div 
                className={`flex items-center gap-3 p-4 rounded-2xl border transition-all cursor-pointer ${
                  fragrance ? "bg-primary/5 border-primary text-primary" : "bg-muted/30 border-border/50 text-muted-foreground"
                }`}
                onClick={() => setFragrance(!fragrance)}
              >
                <Checkbox 
                  checked={fragrance} 
                  className="rounded-full border-primary data-[state=checked]:bg-primary"
                />
                <div className="flex-1">
                  <p className="text-[10px] font-bold uppercase">Luxe Fragrance</p>
                  <p className="text-[9px] opacity-70">Signature Scent</p>
                </div>
                <span className="text-xs font-bold">+₹150</span>
              </div>
            </div>
          </div>
        </section>

        {/* Column 4: Summary Box */}
        <aside className="lg:sticky lg:top-24 space-y-6">
          <div className="bg-card rounded-[2rem] border-2 border-primary/20 shadow-2xl shadow-primary/10 p-6 md:p-8 space-y-8 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl opacity-50" />
            
            <h3 className="text-xl font-heading border-b border-border/50 pb-4 relative z-10">Your Summary</h3>
            
            <div className="space-y-4 relative z-10">
              <div className="flex justify-between items-start">
                <div className="space-y-1 max-w-[70%]">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase leading-tight">
                    {stemsCount} {selectedFlowers.map(f => f.name.toUpperCase()).join(", ")}
                  </span>
                  <p className="text-[10px] text-muted-foreground italic">Palette: {color}</p>
                </div>
                <span className="text-xs font-bold whitespace-nowrap">₹{stemsTotal.toLocaleString()}</span>
              </div>

              <div className="space-y-2 border-t border-border/30 pt-4">
                {greenery && (
                  <div className="flex justify-between text-[10px] items-center text-muted-foreground">
                    <span className="flex items-center gap-1"><Leaf className="h-3 w-3" /> {greenery.name}</span>
                    <span className="font-medium">+₹{greenery.price}</span>
                  </div>
                )}
                {wrapping.price > 0 && (
                  <div className="flex justify-between text-[10px] items-center text-muted-foreground">
                    <span className="underline decoration-primary/20">{wrapping.name}</span>
                    <span className="font-medium">+₹{wrapping.price}</span>
                  </div>
                )}
                {fragrance && (
                  <div className="flex justify-between text-[10px] items-center text-primary/80">
                    <span className="flex items-center gap-1"><Sparkles className="h-3 w-3" /> Luxe Scent</span>
                    <span className="font-medium">+₹150</span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-6 border-t-2 border-dashed border-primary/20 relative z-10">
              <div className="flex flex-col gap-1 mb-8">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Estimated Total</span>
                <span className="text-4xl md:text-5xl font-heading text-primary leading-none">₹{totalPrice.toLocaleString()}</span>
                <p className="text-[8px] text-muted-foreground mt-1 uppercase tracking-tighter">incl. hand-crafting & artisan fee</p>
              </div>

              <div className="space-y-3">
                <Button 
                  size="lg" 
                  className="w-full h-14 rounded-xl text-md shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  onClick={() => {
                    toast.success("Design saved! Added to your cart.");
                  }}
                >
                  <ShoppingBag className="h-5 w-5 mr-2" /> Add to Cart
                </Button>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="flex-1 h-12 rounded-xl border-primary/20 hover:bg-primary/5 text-xs font-bold uppercase tracking-wider"
                    onClick={() => {
                      const phone = "917010804538";
                      const dateStr = date ? format(date, "PPP") : "ASAP";
                      const details = `Artisan Bouquet Request:\n- Flowers: ${selectedFlowers.map(f => f.name).join(", ")}\n- Stems: ${stemsCount}\n- Palette: ${color}\n- Greenery: ${greenery?.name || "None"}\n- Fragrance: ${fragrance ? "Yes" : "No"}\n- Wrap: ${wrapping.name}\n- Date: ${dateStr}\n\nTotal: ₹${totalPrice.toLocaleString()}`;
                      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(details)}`, "_blank");
                      toast.success("Design sent to our experts!");
                    }}
                  >
                    Expert Advice
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    className="h-12 w-12 rounded-xl border-primary/20 hover:bg-primary/5"
                    onClick={() => {
                      const url = window.location.href;
                      if (navigator.share) {
                        navigator.share({
                          title: "My Custom Bouquet Design - Bloom Bar",
                          text: `Check out the custom bouquet I just designed at Bloom Bar!`,
                          url: url,
                        });
                      } else {
                        navigator.clipboard.writeText(url);
                        toast.success("Design link copied!");
                      }
                    }}
                    title="Share Design"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-xl border border-primary/10 relative z-10">
              <Info className="h-3 w-3 text-primary shrink-0" />
              <p className="text-[9px] leading-tight text-foreground/70">
                Artisan crafting takes 2-4 hours. 100% fresh arrival guaranteed.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default CustomBouquet;
