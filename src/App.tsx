import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Leaf, 
  Menu, 
  X, 
  ChevronRight, 
  Instagram, 
  Twitter, 
  ArrowRight,
  Heart,
  Search,
  Filter
} from 'lucide-react';
import { products } from './data';
import { Product, CartItem, Category } from './types';

export default function App() {
  const [viewing360Product, setViewing360Product] = useState<Product | null>(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [activeMaterials, setActiveMaterials] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const allMaterials = useMemo(() => {
    return Array.from(new Set(products.map(p => p.material)));
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const categoryMatch = activeCategory === 'All' || p.category === activeCategory;
      const materialMatch = activeMaterials.length === 0 || activeMaterials.includes(p.material);
      return categoryMatch && materialMatch;
    });
  }, [activeCategory, activeMaterials]);

  const toggleMaterial = (material: string) => {
    setActiveMaterials(prev => 
      prev.includes(material) 
        ? prev.filter(m => m !== material) 
        : [...prev, material]
    );
  };

  const addToCart = (product: Product, size: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map(item => (item.id === product.id && item.selectedSize === size) ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1, selectedSize: size }];
    });
    setSelectedProduct(null);
    setIsReviewOpen(false);
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string, size: string) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.selectedSize === size)));
  };

  const updateQuantity = (id: string, size: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id && item.selectedSize === size) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen selection:bg-primary selection:text-cream">
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-cream/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <button className="lg:hidden" onClick={() => setIsMenuOpen(true)}>
              <Menu size={24} />
            </button>
            <div className="hidden lg:flex items-center gap-6 font-sans text-xs uppercase tracking-widest font-medium">
              <button 
                onClick={() => setActiveCategory('Women')}
                className={`transition-colors hov-underline ${activeCategory === 'Women' ? 'text-primary' : 'text-earth/60 hover:text-earth'}`}
              >
                Women
              </button>
              <button 
                onClick={() => setActiveCategory('Men')}
                className={`transition-colors hov-underline ${activeCategory === 'Men' ? 'text-primary' : 'text-earth/60 hover:text-earth'}`}
              >
                Men
              </button>
              <button 
                onClick={() => setActiveCategory('Accessories')}
                className={`transition-colors hov-underline ${activeCategory === 'Accessories' ? 'text-primary' : 'text-earth/60 hover:text-earth'}`}
              >
                Accessories
              </button>
            </div>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2">
            <h1 
              className="text-3xl md:text-4xl font-semibold tracking-tighter cursor-pointer"
              onClick={() => setActiveCategory('All')}
            >
              CLORA
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <button className="hidden sm:block text-earth/60 hover:text-earth transition-colors">
              <Search size={20} strokeWidth={1.5} />
            </button>
            <button 
              className="relative flex items-center gap-1 group"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag size={22} strokeWidth={1.5} className="group-hover:text-primary transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-cream text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-sans">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden bg-[#EAE8E4]">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2670&auto=format&fit=crop"
            alt="Sustainable Fashion Hero"
            className="w-full h-full object-cover opacity-80"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cream/80 via-cream/20 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-6 text-primary">
              <Leaf size={20} />
              <span className="font-sans text-xs uppercase tracking-[0.3em] font-semibold">Slow Fashion • Ethical Store</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-medium leading-[0.95] mb-8 tracking-tighter">
              Timeless style,<br />
              <span className="italic font-light">kind to Earth.</span>
            </h2>
            <p className="text-xl md:text-2xl text-earth/80 mb-10 leading-relaxed font-light font-sans max-w-lg">
              We curate a collection of garments that are ethically made with high-performance natural fibers.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => {
                const el = document.getElementById('shop');
                el?.scrollIntoView({ behavior: 'smooth' });
              }} className="btn-primary flex items-center gap-2 group">
                Shop Collection
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-3 rounded-full border border-primary text-primary hover:bg-primary/5 transition-colors font-sans text-sm uppercase tracking-widest font-medium">
                Our Mission
              </button>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 right-10 hidden lg:block">
           <div className="flex flex-col gap-8 items-center">
              <div className="h-24 w-[1px] bg-primary/30" />
              <span className="rail-text text-primary/60">scroll to explore</span>
           </div>
        </div>
      </section>

      {/* Sustainable Impact Ticker */}
      <div className="py-12 border-b border-primary/10 overflow-hidden bg-cream">
        <div className="flex animate-marquee whitespace-nowrap gap-24 items-center">
           {[...Array(6)].map((_, i) => (
             <div key={i} className="flex items-center gap-4 text-primary/40 font-sans text-xs uppercase tracking-widest font-medium italic">
                <Leaf size={16} />
                <span>100% Recycled Water</span>
                <Leaf size={16} />
                <span>Carbon Neutral Shipping</span>
                <Leaf size={16} />
                <span>Fair Trade Certified</span>
             </div>
           ))}
        </div>
      </div>

      {/* Product Grid */}
      <section id="shop" className="py-32 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h3 className="text-5xl font-medium mb-4 tracking-tight">The Essentials</h3>
            <p className="text-earth/60 font-sans text-lg italic">Thoughtfully crafted for daily life.</p>
          </div>
          <div className="flex flex-col items-end gap-4">
            <div className="flex gap-4">
              {(['All', 'Women', 'Men', 'Accessories'] as Category[]).map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`pill-nav ${activeCategory === cat ? 'bg-primary text-cream border-primary' : ''}`}
                >
                  {cat}
                </button>
              ))}
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`pill-nav flex items-center gap-2 ${isFilterOpen || activeMaterials.length > 0 ? 'bg-earth text-cream border-earth' : ''}`}
              >
                <Filter size={14} />
                Filter {activeMaterials.length > 0 && `(${activeMaterials.length})`}
              </button>
            </div>
            
            <AnimatePresence>
              {isFilterOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-cream border border-primary/10 p-6 rounded-2xl shadow-xl z-20 flex flex-wrap gap-3 max-w-md justify-end"
                >
                  <div className="w-full mb-2 flex justify-between items-center">
                    <span className="font-sans text-[10px] uppercase tracking-widest font-bold text-earth/40 text-left">Filter by Material</span>
                    {activeMaterials.length > 0 && (
                      <button 
                        onClick={() => setActiveMaterials([])}
                        className="text-[10px] font-sans uppercase tracking-widest font-bold text-primary hover:text-earth transition-colors"
                      >
                        Clear All
                      </button>
                    )}
                  </div>
                  {allMaterials.map(mat => (
                    <button
                      key={mat}
                      onClick={() => toggleMaterial(mat)}
                      className={`px-4 py-2 rounded-full border text-[11px] font-sans uppercase tracking-wider transition-all ${activeMaterials.includes(mat) ? 'bg-primary text-cream border-primary' : 'border-primary/10 hover:border-primary'}`}
                    >
                      {mat}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div 
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group relative"
              >
                <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-[#F2F0ED]">
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-cream/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-sans uppercase tracking-widest font-semibold border border-primary/10">
                      {product.material}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <button className="p-2 rounded-full bg-cream/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500">
                      <Heart size={18} strokeWidth={1.5} />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setViewing360Product(product);
                        setRotation(0);
                      }}
                      className="p-2 rounded-full bg-cream/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:text-primary"
                      title="360° View"
                    >
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>
                        <Leaf size={18} strokeWidth={1.5} />
                      </motion.div>
                    </button>
                  </div>
                  <motion.button 
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedProduct(product);
                      setSelectedSize('M');
                    }}
                    className="absolute bottom-6 left-6 right-6 bg-earth text-cream py-3 rounded-md translate-y-12 group-hover:translate-y-0 transition-transform duration-500 font-sans text-xs uppercase tracking-widest font-medium flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={14} /> Add to Cart
                  </motion.button>
                </div>
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-medium">{product.name}</h4>
                    <span className="text-lg opacity-60">${product.price}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex gap-0.5 text-primary">
                       {[...Array(5)].map((_, i) => <Leaf key={i} size={10} fill="currentColor" />)}
                    </div>
                    <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-earth/40 pt-0.5">124 Reviews</span>
                  </div>
                  <p className="text-earth/50 text-sm line-clamp-2 mb-3 leading-relaxed font-sans">{product.description}</p>
                  <div className="flex items-center gap-2 text-primary font-sans text-[11px] uppercase tracking-wider font-semibold">
                    <Leaf size={12} />
                    <span>{product.impact}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Impact Section */}
      <section className="bg-primary text-cream py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="font-sans text-xs uppercase tracking-[0.4em] block mb-6 opacity-60">Sustainability</span>
            <h3 className="text-5xl md:text-6xl font-medium mb-8 leading-tight tracking-tight">Our clothes are made <br /><span className="italic font-light opacity-80">from nature, for nature.</span></h3>
            <div className="space-y-10">
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full border border-cream/20 flex items-center justify-center shrink-0">
                  <span className="text-xl">01</span>
                </div>
                <div>
                  <h5 className="text-xl mb-2 font-sans font-semibold">Transparency first</h5>
                  <p className="text-cream/60 leading-relaxed font-sans text-lg">We track every stage of production from raw fiber to final stitch, ensuring ethical wages and environmental safety.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full border border-cream/20 flex items-center justify-center shrink-0">
                  <span className="text-xl">02</span>
                </div>
                <div>
                  <h5 className="text-xl mb-2 font-sans font-semibold">Circular Design</h5>
                  <p className="text-cream/60 leading-relaxed font-sans text-lg">Every Clora piece is designed to be fully recyclable or biodegradable, closing the loop on textile waste.</p>
                </div>
              </div>
              <button className="flex items-center gap-2 text-cream hov-underline pb-1 border-b border-cream/30 hover:border-cream transition-all font-sans text-sm uppercase tracking-widest mt-4">
                Read our full impact report <ArrowRight size={16} />
              </button>
            </div>
          </div>
          <div className="relative">
             <div className="aspect-[4/5] rounded-[40px] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=2670&auto=format&fit=crop" 
                  alt="Environmental Focus" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
             </div>
             <div className="absolute -bottom-10 -left-10 bg-accent text-earth p-8 rounded-3xl max-w-[280px] shadow-2xl">
                <p className="text-2xl font-medium leading-tight mb-4 italic">"True luxury is knowing your clothes don't cost the Earth."</p>
                <div className="flex items-center gap-2 font-sans text-xs uppercase tracking-widest font-semibold opacity-70">
                   <div className="w-6 h-[1px] bg-earth" />
                   <span>The Founder</span>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-cream border-t border-primary/10 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 lg:col-span-1">
            <h2 className="text-4xl font-bold tracking-tighter mb-6">CLORA</h2>
            <p className="text-earth/60 font-sans leading-relaxed mb-6">
              Empowering a sustainable future through mindful creation and conscious consumption.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center hover:bg-primary hover:text-cream transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center hover:bg-primary hover:text-cream transition-all">
                <Twitter size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h5 className="font-sans text-xs uppercase tracking-[0.3em] font-bold mb-8 text-primary">Shop</h5>
            <ul className="space-y-4 font-sans text-sm text-earth/60 font-medium uppercase tracking-widest">
              <li><a href="#" className="hover:text-primary transition-colors">Women</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Men</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">New Arrivals</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Archived Pieces</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-sans text-xs uppercase tracking-[0.3em] font-bold mb-8 text-primary">Explore</h5>
            <ul className="space-y-4 font-sans text-sm text-earth/60 font-medium uppercase tracking-widest">
              <li><a href="#" className="hover:text-primary transition-colors">Sustainability</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Ethical Supply Chain</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Materials We Use</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-sans text-xs uppercase tracking-[0.3em] font-bold mb-8 text-primary">Impact Newsletter</h5>
            <p className="text-earth/60 font-sans text-sm mb-6 leading-relaxed">
              Join 50k+ others getting weekly updates on sustainable living and new drops.
            </p>
            <div className="flex border-b border-primary/30 pb-2 group focus-within:border-primary transition-colors">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="bg-transparent border-none outline-none font-sans text-xs tracking-widest w-full py-2 placeholder:text-earth/30"
              />
              <button className="text-primary hover:scale-110 transition-transform">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 flex flex-col md:row justify-between items-center pt-8 border-t border-primary/5 text-[10px] font-sans uppercase tracking-[0.2em] text-earth/40 font-semibold gap-4">
          <p>© 2026 CLORA ECO STORES. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Cookies</a>
          </div>
        </div>
      </footer>
      
      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-40">
        <motion.button 
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2 }}
          className="w-16 h-16 rounded-full bg-primary text-cream shadow-[0_20px_50px_rgba(90,90,64,0.3)] flex items-center justify-center group relative"
        >
          <div className="absolute right-20 bg-cream/90 backdrop-blur-sm px-4 py-2 rounded-xl border border-primary/10 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-primary italic">Responsible Fashion Inquiry?</span>
          </div>
          <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 4, repeat: Infinity }}>
            <Leaf size={24} />
          </motion.div>
        </motion.button>
      </div>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-earth/40 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-cream z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-8 flex justify-between items-center border-b border-primary/10">
                <h3 className="text-2xl font-medium tracking-tight">Your Selection</h3>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-primary/5 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                    <ShoppingBag size={64} strokeWidth={1} className="mb-4" />
                    <p className="font-sans text-sm uppercase tracking-widest font-semibold">Your bag is empty</p>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {cart.map(item => (
                      <div key={`${item.id}-${item.selectedSize}`} className="flex gap-6">
                        <div className="w-24 aspect-[3/4] overflow-hidden bg-secondary rounded-lg shrink-0">
                          <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                             <h4 className="font-medium text-lg leading-tight">{item.name}</h4>
                             <button onClick={() => removeFromCart(item.id, item.selectedSize)} className="text-earth/40 hover:text-earth transition-colors">
                               <X size={16} />
                             </button>
                          </div>
                          <div className="font-sans text-[11px] text-earth/50 uppercase tracking-widest mb-4">
                            {item.material} / {item.selectedSize}
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center border border-primary/20 rounded-md">
                               <button 
                                 onClick={() => updateQuantity(item.id, item.selectedSize, -1)}
                                 className="px-3 py-1 hover:bg-primary/5 rounded-l-md"
                               >-</button>
                               <span className="px-3 py-1 font-sans text-xs border-x border-primary/20">{item.quantity}</span>
                               <button 
                                 onClick={() => updateQuantity(item.id, item.selectedSize, 1)}
                                 className="px-3 py-1 hover:bg-primary/5 rounded-r-md"
                               >+</button>
                            </div>
                            <span className="font-medium">${item.price * item.quantity}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-8 border-t border-primary/10 bg-secondary/20">
                <div className="flex justify-between items-center mb-6 font-sans">
                  <span className="text-xs uppercase tracking-[0.2em] font-bold text-earth/60">Subtotal</span>
                  <span className="text-2xl font-medium tracking-tighter">${cartTotal}</span>
                </div>
                <p className="text-[10px] font-sans uppercase tracking-widest text-earth/40 mb-8 font-semibold">
                  Taxes and shipping calculated at checkout.
                </p>
                <button className="w-full btn-primary !rounded-xl !py-5 flex items-center justify-center gap-3">
                  Secure Checkout <ChevronRight size={18} />
                </button>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="w-full text-center mt-6 font-sans text-[10px] tracking-widest uppercase font-bold text-earth/40 hover:text-primary transition-colors"
                >
                  Continue Browsing
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Size Selection Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 bg-earth/40 backdrop-blur-sm z-[80]"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-cream z-[90] shadow-2xl rounded-[32px] overflow-hidden flex flex-col md:flex-row"
            >
              <div className="w-full md:w-1/2 aspect-square md:aspect-auto">
                <img src={selectedProduct.images[0]} alt={selectedProduct.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="p-8 flex-1 flex flex-col justify-center">
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-3xl font-medium tracking-tight">{selectedProduct.name}</h3>
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <p className="text-xl opacity-60">${selectedProduct.price}</p>
                    <div className="flex items-center gap-1 text-primary">
                       <Heart size={14} fill="currentColor" />
                       <span className="font-sans text-[10px] font-bold tracking-widest pt-0.5">4.9 (124 reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mb-8 p-1 bg-secondary/30 rounded-xl w-fit">
                   <button 
                     onClick={() => setIsReviewOpen(false)}
                     className={`px-6 py-2 rounded-lg font-sans text-[10px] uppercase tracking-widest font-bold transition-all ${!isReviewOpen ? 'bg-cream text-earth shadow-sm' : 'text-earth/40 hover:text-earth'}`}
                   >
                     Details
                   </button>
                   <button 
                     onClick={() => setIsReviewOpen(true)}
                     className={`px-6 py-2 rounded-lg font-sans text-[10px] uppercase tracking-widest font-bold transition-all ${isReviewOpen ? 'bg-cream text-earth shadow-sm' : 'text-earth/40 hover:text-earth'}`}
                   >
                     Reviews
                   </button>
                </div>
                
                {!isReviewOpen ? (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <div className="mb-8">
                      <span className="font-sans text-[10px] uppercase tracking-widest font-bold text-earth/40 mb-4 block">Select Size</span>
                      <div className="flex gap-3">
                        {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`w-10 h-10 rounded-full border transition-all flex items-center justify-center font-sans text-xs font-bold ${selectedSize === size ? 'bg-primary text-cream border-primary' : 'border-primary/10 text-earth hover:border-primary'}`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, x: 10 }} 
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-8 max-h-[200px] overflow-y-auto space-y-4 pr-4 custom-scrollbar"
                  >
                    {[1, 2, 3].map(i => (
                      <div key={i} className="border-b border-primary/5 pb-4">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-sans text-[10px] font-bold uppercase tracking-widest">Verified Buyer</span>
                          <div className="flex gap-0.5 text-primary">
                             {[...Array(5)].map((_, i) => <Leaf key={i} size={8} fill="currentColor" />)}
                          </div>
                        </div>
                        <p className="text-sm italic text-earth/60 leading-relaxed font-sans">"The quality is exceptional. You can feel the difference in the organic cotton."</p>
                      </div>
                    ))}
                  </motion.div>
                )}

                <div className="space-y-4">
                  <button 
                    onClick={() => addToCart(selectedProduct, selectedSize)}
                    className="w-full btn-primary !rounded-xl !py-4"
                  >
                    Add to Bag
                  </button>
                  <button 
                    onClick={() => setSelectedProduct(null)}
                    className="w-full text-center font-sans text-[10px] tracking-widest uppercase font-bold text-earth/40 hover:text-primary transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 360° Interactive Viewer Modal */}
      <AnimatePresence>
        {viewing360Product && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setViewing360Product(null)}
              className="fixed inset-0 bg-earth/90 backdrop-blur-xl z-[100] cursor-zoom-out"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="fixed inset-0 z-[110] pointer-events-none flex items-center justify-center p-6"
            >
              <div className="bg-cream/10 backdrop-blur-md rounded-[48px] w-full max-w-5xl h-full max-h-[85vh] p-12 relative flex flex-col items-center justify-center pointer-events-auto border border-cream/20 shadow-[0_0_100px_rgba(0,0,0,0.5)]">
                <button 
                  onClick={() => setViewing360Product(null)}
                  className="absolute top-10 right-10 p-4 rounded-full bg-cream/10 text-cream hover:bg-cream hover:text-earth transition-all z-20"
                >
                  <X size={32} />
                </button>

                <div className="absolute top-10 left-10 text-cream">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-4xl font-light tracking-tight">{viewing360Product.name}</h4>
                    <span className="px-2 py-0.5 rounded-sm border border-cream/40 text-[8px] tracking-[0.2em] font-bold h-fit mt-2">4K ULTRA-RES</span>
                  </div>
                  <div className="flex items-center gap-3 font-sans text-xs uppercase tracking-[0.4em] opacity-60">
                    <Leaf size={16} /> 360° Interactive View
                  </div>
                </div>

                <div className="relative w-full h-full flex items-center justify-center perspective-[2000px]">
                  <motion.div 
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0}
                    onDrag={(_, info) => {
                      setRotation(prev => prev + info.delta.x * 0.5);
                    }}
                    className="relative cursor-grab active:cursor-grabbing preserve-3d"
                    style={{
                       rotateY: rotation,
                       transition: { type: 'spring', damping: 20, stiffness: 100 }
                    } as any}
                  >
                    <div className="relative aspect-[3/4] h-[60vh] rounded-2xl overflow-hidden shadow-2xl">
                      <img 
                        src={viewing360Product.images[0]} 
                        alt={viewing360Product.name} 
                        className="w-full h-full object-cover select-none pointer-events-none"
                        referrerPolicy="no-referrer"
                      />
                      {/* Depth Simulation Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 mix-blend-overlay pointer-events-none" />
                    </div>
                    {/* Simulated 4K Shadow */}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-black/40 blur-2xl rounded-full opacity-50" />
                  </motion.div>
                </div>

                <div className="absolute bottom-12 flex flex-col items-center gap-6">
                  <div className="flex flex-col items-center gap-3">
                    <span className="font-sans text-[10px] uppercase tracking-[0.5em] text-cream opacity-40 font-bold">Slide left or right to explore detail</span>
                    <div className="w-48 h-[2px] bg-cream/10 rounded-full overflow-hidden">
                       <motion.div 
                         className="h-full bg-primary" 
                         animate={{ width: `${((Math.abs(rotation) % 360) / 360) * 100}%` }}
                       />
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                     <div className="px-6 py-2 rounded-full border border-cream/20 font-sans text-[10px] uppercase tracking-widest text-cream/60">
                        4K Resolution Reference
                     </div>
                     <div className="px-6 py-2 rounded-full border border-cream/20 font-sans text-[10px] uppercase tracking-widest text-cream/60">
                        Zero Carbon View
                     </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .perspective-[2000px] { perspective: 2000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .rail-text {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          letter-spacing: 0.2em;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          text-transform: uppercase;
          font-size: 10px;
        }
        
        .hov-underline {
          position: relative;
        }
        
        .hov-underline::after {
          content: '';
          position: absolute;
          width: 0;
          height: 1px;
          bottom: -2px;
          left: 0;
          background-color: currentColor;
          transition: width 0.3s ease;
        }
        
        .hov-underline:hover::after {
          width: 100%;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-marquee {
          animation: marquee 40s linear infinite;
        }

        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />
    </div>
  );
}
