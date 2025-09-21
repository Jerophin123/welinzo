'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Search, ShoppingBag, Star, Loader2, Filter, X, Eye } from 'lucide-react';
import { useCartStore, Product } from '@/store/cartStore';
import { apiService } from '@/services/apiService';

function SearchPageContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [showFilters, setShowFilters] = useState(false);
  
  const searchParams = useSearchParams();
  const { addItem } = useCartStore();

  useEffect(() => {
    const query = searchParams.get('q') || '';
    setSearchQuery(query);
    fetchAllProducts();
  }, [searchParams]);

  useEffect(() => {
    filterProducts();
  }, [products, searchQuery, sortBy, priceRange]);

  const fetchAllProducts = async () => {
    setLoading(true);
    try {
      const data = await apiService.getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Price filter
    filtered = filtered.filter(product =>
      product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        // Keep original order for relevance
        break;
    }

    setFilteredProducts(filtered);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    filterProducts();
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSortBy('relevance');
    setPriceRange({ min: 0, max: 1000 });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 md:px-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-card ios-rounded-2xl p-6 md:p-8 text-center relative z-50 w-full max-w-sm md:max-w-md mx-auto"
        >
          <Loader2 className="w-8 h-8 md:w-8 md:h-8 animate-spin text-blue-500 mx-auto mb-3 md:mb-4" />
          <p className="text-white text-sm md:text-base">Loading products...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-4 md:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 md:mb-8"
        >
          <div className="glass-card ios-rounded-2xl p-4 md:p-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center space-x-2 glass-button text-white px-4 py-2 md:px-6 md:py-3 ios-rounded-xl text-xs md:text-sm font-medium mb-4 md:mb-6 shadow-lg shadow-blue-500/20 spring-in"
            >
              <Search size={14} className="md:w-4 md:h-4" />
              <span>Product Search</span>
            </motion.div>
            
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
              <span className="gradient-text">Search</span> Products
            </h1>
            <p className="text-sm md:text-xl text-gray-300 max-w-2xl mx-auto">
              Find exactly what you&apos;re looking for with our powerful search and filter system.
            </p>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6 md:mb-8"
        >
          <div className="glass-card ios-rounded-2xl p-4 md:p-6">
            <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-3 md:gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full glass-input px-4 py-2.5 md:py-3 pr-10 md:pr-12 ios-rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                />
                <Search className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
              
              <div className="flex gap-3 md:gap-4">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  }}
                  type="button"
                  onClick={() => setShowFilters(!showFilters)}
                  className="glass-button px-4 py-2.5 md:px-6 md:py-3 ios-rounded-xl text-white font-medium flex items-center space-x-2 press-effect text-sm md:text-base"
                >
                  <Filter size={16} className="md:w-5 md:h-5" />
                  <span>Filters</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  }}
                  type="submit"
                  className="glass-button px-4 py-2.5 md:px-6 md:py-3 ios-rounded-xl text-white font-medium press-effect text-sm md:text-base"
                >
                  Search
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: showFilters ? 1 : 0, 
            height: showFilters ? 'auto' : 0 
          }}
          transition={{ duration: 0.3 }}
          className="mb-6 md:mb-8 overflow-hidden"
        >
          <div className="glass-card ios-rounded-2xl p-4 md:p-6">
            <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
              <div className="flex-1">
                <label className="block text-white font-medium mb-2 text-sm md:text-base">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full glass-input px-4 py-2 ios-rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                  <option value="name">Name</option>
                </select>
              </div>
              
              <div className="flex-1">
                <label className="block text-white font-medium mb-2 text-sm md:text-base">Price Range</label>
                <div className="flex gap-3 md:gap-4">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                    className="flex-1 glass-input px-4 py-2 ios-rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                    className="flex-1 glass-input px-4 py-2 ios-rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                  />
                </div>
              </div>
              
              <div className="flex items-end">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  }}
                  onClick={clearFilters}
                  className="glass-button px-4 py-2 md:px-6 md:py-2 ios-rounded-xl text-white font-medium flex items-center space-x-2 press-effect text-sm md:text-base"
                >
                  <X size={14} className="md:w-4 md:h-4" />
                  <span>Clear</span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-6 md:mb-8"
        >
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-white">
              {filteredProducts.length} Products Found
            </h2>
            {searchQuery && (
              <p className="text-gray-300 text-sm md:text-base">
                Results for &ldquo;{searchQuery}&rdquo;
              </p>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-card ios-rounded-2xl p-8 md:p-12 text-center"
            >
              <Search className="w-12 h-12 md:w-16 md:h-16 text-gray-400 mx-auto mb-3 md:mb-4" />
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">No Products Found</h3>
              <p className="text-gray-300 mb-4 md:mb-6 text-sm md:text-base">
                Try adjusting your search terms or filters to find what you&apos;re looking for.
              </p>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25
                }}
                onClick={clearFilters}
                className="glass-button px-4 py-2.5 md:px-6 md:py-3 ios-rounded-xl text-white font-medium press-effect text-sm md:text-base"
              >
                Clear All Filters
              </motion.button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={`${product.id}-${product.brand || 'default'}`}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  className="glass-card ios-rounded-2xl overflow-hidden group card-hover"
                >
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-40 md:h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 md:top-4 md:right-4">
                      <div className="glass-button ios-rounded-xl px-2 py-1 md:px-3 md:py-1 flex items-center space-x-1">
                        <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 fill-current" />
                        <span className="text-white text-xs md:text-sm font-medium">
                          {product.rating.rate}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 md:p-6">
                    <h3 className="text-xs md:text-lg font-semibold text-white mb-1 md:mb-2 line-clamp-2">
                      {product.title}
                    </h3>
                    <p className="text-gray-400 text-xs md:text-sm mb-2 md:mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-2 md:mb-4">
                      <span className="text-sm md:text-2xl font-bold text-white">
                        ${product.price}
                      </span>
                      <span className="text-xs md:text-sm text-gray-400">
                        {product.rating.count} reviews
                      </span>
                    </div>
                    
                    <div className="flex gap-1.5 md:gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 25
                        }}
                        onClick={() => addItem(product)}
                        className="flex-1 glass-button py-2 md:py-3 ios-rounded-xl text-white font-semibold flex items-center justify-center space-x-1 md:space-x-2 press-effect text-xs md:text-sm"
                      >
                        <ShoppingBag size={12} className="md:w-4 md:h-4" />
                        <span className="hidden sm:inline">Add to Cart</span>
                        <span className="sm:hidden">Add</span>
                      </motion.button>
                      <Link href={`/product/${product.id}`}>
                        <motion.button
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 25
                          }}
                          className="glass-button w-8 h-8 md:w-12 md:h-12 ios-rounded-xl flex items-center justify-center text-white press-effect"
                        >
                          <Eye size={12} className="md:w-4 md:h-4" />
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-card ios-rounded-2xl p-6 md:p-8 text-center">
          <Loader2 className="w-6 h-6 md:w-8 md:h-8 animate-spin mx-auto mb-3 md:mb-4 text-white" />
          <p className="text-white text-sm md:text-base">Loading search...</p>
        </div>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
}
