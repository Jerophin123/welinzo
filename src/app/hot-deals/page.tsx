'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ShoppingBag, Star, Flame, Filter, SortAsc, Heart } from 'lucide-react';
import { useCartStore, Product } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { apiService } from '@/services/apiService';

export default function HotDealsPage() {
  const [hotDealsProducts, setHotDealsProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('default');
  const [filterBy, setFilterBy] = useState('all');
  const { addItem } = useCartStore();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();

  useEffect(() => {
    fetchHotDeals();
  }, []);

  const fetchHotDeals = async () => {
    try {
      const data = await apiService.getHotDeals(50); // Get more hot deals for the page
      setHotDealsProducts(data);
    } catch (error) {
      console.error('Error fetching hot deals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWishlistToggle = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  // Helper function to calculate discount percentage
  const calculateDiscount = (originalPrice: number, salePrice: number) => {
    return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
  };

  // Helper function to generate random time left for hot deals
  const generateTimeLeft = () => {
    const days = Math.floor(Math.random() * 5) + 1;
    const hours = Math.floor(Math.random() * 24);
    const minutes = Math.floor(Math.random() * 60);
    return `${days}d ${hours}h ${minutes}m`;
  };

  // Helper function to generate random sold/total for hot deals
  const generateStockInfo = () => {
    const total = Math.floor(Math.random() * 200) + 50;
    const sold = Math.floor(Math.random() * total);
    return { sold, total };
  };

  // Filter and sort products
  const filteredAndSortedProducts = hotDealsProducts
    .filter(product => {
      if (filterBy === 'all') return true;
      return product.category.toLowerCase() === filterBy.toLowerCase();
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating.rate - a.rating.rate;
        case 'discount':
          const discountA = calculateDiscount(a.price * 1.3, a.price);
          const discountB = calculateDiscount(b.price * 1.3, b.price);
          return discountB - discountA;
        default:
          return 0;
      }
    });

  const categories = [
    'all', 
    'electronics', 
    'jewelery', 
    "men's clothing", 
    "women's clothing",
    'fashion',
    'home & garden',
    'sports & outdoors',
    'beauty & personal care',
    'cameras',
    'smartphones',
    'audio',
    'accessories',
    'furniture',
    'outdoor decor',
    'campaign gear',
    'athletic wear',
    'skincare',
    'makeup',
    'action cameras',
    'wireless earbuds',
    'sunglasses'
  ];

  return (
    <div className="min-h-screen mobile-container">
      {/* Header */}
      <section className="py-8 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 mobile-safe">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6 md:mb-8"
          >
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
                className="glass-button px-4 py-2.5 md:px-6 md:py-3 ios-rounded-xl text-white font-semibold flex items-center space-x-2 press-effect text-sm md:text-base"
              >
                <ArrowLeft size={16} className="md:w-5 md:h-5" />
                <span>Back to Home</span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Page Title */}
          <div className="text-center mb-8 md:mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="inline-flex items-center space-x-2 glass-button text-white px-4 py-2 md:px-6 md:py-3 ios-rounded-xl text-xs md:text-sm font-medium mb-4 md:mb-6 shadow-lg shadow-orange-500/20 spring-in"
            >
              <Flame size={14} className="md:w-4 md:h-4" />
              <span>Hot Deals</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4"
            >
              🔥 <span className="gradient-text">Hot Deals</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-sm md:text-xl text-gray-300 max-w-2xl mx-auto"
            >
              Limited quantity deals with countdown timers. Grab them before they&apos;re gone!
            </motion.p>
          </div>

          {/* Filters and Sort */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6 md:mb-8 justify-between items-center"
          >
            {/* Left Side - Dropdowns */}
            <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 w-full sm:w-auto">
              {/* Category Filter */}
              <div className="relative group w-full sm:w-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="relative glass-card pl-10 md:pl-12 pr-8 md:pr-10 py-2.5 md:py-3 ios-rounded-xl text-white bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none cursor-pointer w-full sm:min-w-[160px] md:min-w-[180px] transition-all duration-300 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 text-sm md:text-base"
                >
                  {categories.map((category) => (
                    <option key={category} value={category} className="bg-gray-900/95 text-white py-2">
                      {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
                <Filter size={16} className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-white/80 pointer-events-none md:w-4.5 md:h-4.5" />
                <div className="absolute right-2 md:right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-3 h-3 md:w-4 md:h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Sort Options */}
              <div className="relative group w-full sm:w-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="relative glass-card pl-10 md:pl-12 pr-8 md:pr-10 py-2.5 md:py-3 ios-rounded-xl text-white bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/50 appearance-none cursor-pointer w-full sm:min-w-[160px] md:min-w-[180px] transition-all duration-300 shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 text-sm md:text-base"
                >
                  <option value="default" className="bg-gray-900/95 text-white py-2">Default</option>
                  <option value="price-low" className="bg-gray-900/95 text-white py-2">Price: Low to High</option>
                  <option value="price-high" className="bg-gray-900/95 text-white py-2">Price: High to Low</option>
                  <option value="rating" className="bg-gray-900/95 text-white py-2">Highest Rated</option>
                  <option value="discount" className="bg-gray-900/95 text-white py-2">Highest Discount</option>
                </select>
                <SortAsc size={16} className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-white/80 pointer-events-none md:w-4.5 md:h-4.5" />
                <div className="absolute right-2 md:right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-3 h-3 md:w-4 md:h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Right Side - Filter Results */}
            <div className="flex items-center w-full sm:w-auto">
              <div className="glass-button px-3 md:px-4 py-2.5 md:py-3 ios-rounded-xl w-full sm:w-auto">
                <span className="text-white/90 text-xs md:text-sm font-medium">
                  {loading ? 'Loading...' : `${filteredAndSortedProducts.length} Hot Deals Found`}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Hot Deals Grid */}
      <section className="py-4 md:py-8 px-4 sm:px-6 lg:px-8 mobile-safe">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="max-w-7xl mx-auto"
        >
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
              {[...Array(12)].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card ios-rounded-2xl p-3 md:p-4 animate-pulse"
                >
                  <div className="w-full h-40 md:h-48 bg-gray-700 rounded-lg mb-3 md:mb-4"></div>
                  <div className="h-3 md:h-4 bg-gray-700 rounded mb-1.5 md:mb-2"></div>
                  <div className="h-3 md:h-4 bg-gray-700 rounded w-3/4 mb-3 md:mb-4"></div>
                  <div className="h-6 md:h-8 bg-gray-700 rounded"></div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
              {filteredAndSortedProducts.map((product, index) => {
                // Use actual discount price if available, otherwise simulate
                const hasActualDiscount = product.discountedPrice && product.discountedPrice < product.price;
                const originalPrice = hasActualDiscount ? product.price : product.price * 1.3;
                const salePrice = hasActualDiscount ? (product.discountedPrice || product.price) : product.price;
                const discount = calculateDiscount(originalPrice, salePrice);
                const timeLeft = generateTimeLeft();
                const stockInfo = generateStockInfo();
                
                return (
                  <motion.div
                    key={`${product.id}-${product.brand || 'default'}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ 
                      y: -12,
                      scale: 1.05,
                      rotateX: 5,
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 20
                      }
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="glass-card ios-rounded-2xl overflow-hidden group card-hover relative"
                  >
                    {/* Brand Badge */}
                    {product.brand && (
                      <div className="absolute top-3 left-3 md:top-4 md:left-4 z-10 hidden md:block">
                        <div className="glass-button ios-rounded-xl px-2 py-1 md:px-3 md:py-1 bg-purple-500/20 border-purple-500/30 text-purple-400">
                          <span className="text-xs font-medium">{product.brand}</span>
                        </div>
                      </div>
                    )}

                    {/* Hot Deal Badge */}
                    <div className={`absolute ${product.brand ? 'top-3 left-3 md:top-16 md:left-4' : 'top-3 left-3 md:top-4 md:left-4'} z-10`}>
                      <div className="glass-button ios-rounded-xl px-2 py-1 md:px-3 md:py-1 flex items-center space-x-1 bg-orange-500/20 border border-orange-500/30">
                        <Flame size={12} className="md:w-3.5 md:h-3.5 text-orange-400" />
                        <span className="text-orange-400 text-xs md:text-sm font-bold">
                          {discount}% OFF
                        </span>
                      </div>
                    </div>

                    {/* Stock Progress */}
                    <div className="absolute top-8 right-3 md:top-4 md:right-16 z-10">
                      <div className="glass-button ios-rounded-xl px-2 py-1 md:px-3 md:py-1">
                        <span className="text-white/90 text-xs font-medium">
                          {stockInfo.sold}/{stockInfo.total} sold
                        </span>
                      </div>
                    </div>

                    {/* Wishlist Button */}
                    <div className="absolute top-3 right-3 md:top-4 md:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                      <motion.button
                        onClick={() => handleWishlistToggle(product)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 25
                        }}
                        className={`glass-button w-7 h-7 md:w-8 md:h-8 ios-rounded-xl flex items-center justify-center press-effect ${
                          isInWishlist(product.id) ? 'text-red-500' : 'text-white hover:bg-white/20'
                        }`}
                      >
                        <Heart size={14} className={`md:w-4 md:h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                      </motion.button>
                    </div>

                    <div className="relative">
                      <Link href={`/product/${product.id}`}>
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-40 md:h-48 object-cover group-hover:scale-110 transition-transform duration-300 cursor-pointer"
                        />
                      </Link>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                    </div>
                    
                    <div className="p-3 md:p-4">
                      <Link href={`/product/${product.id}`}>
                        <h3 className="text-sm md:text-lg font-semibold text-white mb-1 md:mb-2 line-clamp-2 hover:text-blue-300 transition-colors cursor-pointer">
                          {product.title}
                        </h3>
                      </Link>
                      
                      <div className="flex items-center space-x-2 mb-2 md:mb-3">
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 fill-current" />
                          <span className="text-white text-xs md:text-sm font-medium">
                            {product.rating.rate}
                          </span>
                        </div>
                        <span className="text-gray-400 text-xs md:text-sm">
                          ({product.rating.count} reviews)
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between mb-3 md:mb-4">
                        <div>
                          <div className="text-lg md:text-xl font-bold text-green-400">
                            ${salePrice.toFixed(2)}
                          </div>
                          <div className="text-xs md:text-sm text-gray-400 line-through">
                            ${originalPrice.toFixed(2)}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-gray-400 mb-1">Time Left</div>
                          <div className="text-xs md:text-sm font-bold text-orange-400">
                            {timeLeft}
                          </div>
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="mb-3 md:mb-4">
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                          <span>Sold</span>
                          <span>{Math.round((stockInfo.sold / stockInfo.total) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-1.5 md:h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(stockInfo.sold / stockInfo.total) * 100}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="bg-gradient-to-r from-orange-500 to-red-500 h-1.5 md:h-2 rounded-full"
                          ></motion.div>
                        </div>
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => addItem(product)}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 25
                        }}
                        className="w-full glass-button py-2.5 md:py-3 ios-rounded-xl text-white font-semibold flex items-center justify-center space-x-1 md:space-x-2 press-effect text-xs md:text-sm"
                      >
                        <ShoppingBag size={12} className="md:w-4 md:h-4" />
                        <span className="hidden sm:inline">Add to Cart</span>
                        <span className="sm:hidden">Add</span>
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {!loading && filteredAndSortedProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 md:py-16"
            >
              <div className="text-4xl md:text-6xl mb-3 md:mb-4">🔥</div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">No Hot Deals Found</h3>
              <p className="text-gray-400 mb-4 md:mb-6 text-sm md:text-base">Try adjusting your filters to see more deals.</p>
              <button
                onClick={() => {
                  setFilterBy('all');
                  setSortBy('default');
                }}
                className="glass-button px-4 py-2.5 md:px-6 md:py-3 ios-rounded-xl text-white font-semibold press-effect text-sm md:text-base"
              >
                Reset Filters
              </button>
            </motion.div>
          )}
        </motion.div>
      </section>
    </div>
  );
}
