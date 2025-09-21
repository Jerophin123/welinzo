'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Grid3X3, ShoppingBag, Star, Eye, Heart } from 'lucide-react';
import { useCartStore, Product } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { apiService } from '@/services/apiService';

interface CategoryInfo {
  name: string;
  count: number;
  displayName: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<CategoryInfo[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(false);
  
  const { addItem } = useCartStore();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory !== 'all') {
      fetchProductsByCategory(selectedCategory);
    } else {
      fetchProducts();
    }
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const data = await apiService.getWorkingCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    setProductsLoading(true);
    try {
      const data = await apiService.getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setProductsLoading(false);
      setLoading(false);
    }
  };

  const fetchProductsByCategory = async (category: string) => {
    setProductsLoading(true);
    try {
      const data = await apiService.getProductsByCategory(category);
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products by category:', error);
    } finally {
      setProductsLoading(false);
    }
  };



  const handleWishlistToggle = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
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
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="glass-card ios-rounded-2xl p-6 md:p-12 text-center relative z-50 w-full max-w-sm md:max-w-md mx-auto"
        >
          <div className="w-10 h-10 md:w-16 md:h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3 md:mb-4"></div>
          <p className="text-white text-sm md:text-lg">Loading categories...</p>
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
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="glass-card ios-rounded-2xl p-4 md:p-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center space-x-2 glass-button text-white px-4 py-2 md:px-6 md:py-3 ios-rounded-xl text-xs md:text-sm font-medium mb-4 md:mb-6 shadow-lg shadow-blue-500/20 spring-in"
            >
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-400 rounded-full animate-pulse shadow-sm shadow-blue-400/50"></div>
              <Grid3X3 size={14} className="md:w-4 md:h-4" />
              <span>Product Categories</span>
            </motion.div>
            
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
              <span className="gradient-text">Explore</span> Our Collection
            </h1>
            <p className="text-sm md:text-xl text-gray-300 max-w-2xl mx-auto">
              Discover amazing products across different categories, all with our premium liquid glass design.
            </p>
          </div>
        </motion.div>


        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-6 md:mb-8"
        >
          <div className="glass-card ios-rounded-2xl p-4 md:p-6">
            <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25
                }}
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 md:px-6 md:py-3 ios-rounded-xl font-medium transition-all duration-300 press-effect text-sm md:text-base ${
                  selectedCategory === 'all'
                    ? 'glass-button text-white'
                    : 'glass-button text-gray-300 hover:text-white'
                }`}
              >
                All Products
              </motion.button>
              
              {categories.map((category, index) => (
                <motion.button
                  key={category.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    delay: 0.1 * index,
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  }}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-4 py-2 md:px-6 md:py-3 ios-rounded-xl font-medium transition-all duration-300 press-effect text-sm md:text-base ${
                    selectedCategory === category.name
                      ? 'glass-button text-white'
                      : 'glass-button text-gray-300 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-1 md:space-x-2">
                    <span>{category.displayName}</span>
                    <span className="text-xs bg-gray-600/50 px-1.5 py-0.5 md:px-2 md:py-1 rounded-full">
                      {category.count}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-4 md:mb-6"
        >
          <p className="text-gray-300 text-sm md:text-base">
            {selectedCategory === 'all' 
              ? `Showing all ${products.length} products`
              : `Showing ${products.length} products in ${categories.find(c => c.name === selectedCategory)?.displayName || selectedCategory}`
            }
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-6 md:mb-8"
        >
          {productsLoading ? (
            <div className="flex items-center justify-center py-16 md:py-20">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="glass-card ios-rounded-2xl p-8 md:p-12 text-center"
              >
                <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3 md:mb-4"></div>
                <p className="text-white text-sm md:text-lg">Loading products...</p>
              </motion.div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
              {products.map((product, index) => (
                <motion.div
                  key={`${product.id}-${product.brand || 'default'}-${index}`}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  className="glass-card ios-rounded-2xl overflow-hidden group card-hover"
                >
                  <div className="relative">
                    <Link href={`/product/${product.id}`}>
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-40 md:h-64 object-cover group-hover:scale-110 transition-transform duration-300 cursor-pointer"
                      />
                    </Link>
                    
                    {/* Brand Badge */}
                    {product.brand && (
                      <div className="absolute top-3 left-3 md:top-4 md:left-4">
                        <div className="glass-button ios-rounded-xl px-2 py-1 md:px-3 md:py-1 bg-purple-500/20 border-purple-500/30 text-purple-400">
                          <span className="text-xs font-medium">{product.brand}</span>
                        </div>
                      </div>
                    )}

                    {/* Rating */}
                    <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4">
                      <div className="glass-button ios-rounded-xl px-2 py-1 md:px-3 md:py-1 flex items-center space-x-1">
                        <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 fill-current" />
                        <span className="text-white text-xs md:text-sm font-medium">
                          {product.rating.rate}
                        </span>
                      </div>
                    </div>
                    
                    {/* Wishlist Button */}
                    <div className="absolute top-3 right-3 md:top-4 md:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <motion.button
                        onClick={() => handleWishlistToggle(product)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 25
                        }}
                        className={`glass-button w-7 h-7 md:w-8 md:h-8 ios-rounded-xl flex items-center justify-center ${
                          isInWishlist(product.id) ? 'text-red-500' : 'text-gray-400'
                        }`}
                      >
                        <Heart size={14} className={`md:w-4 md:h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                      </motion.button>
                    </div>
                  </div>
                  
                  <div className="p-3 md:p-6">
                    <Link href={`/product/${product.id}`}>
                      <h3 className="text-xs md:text-lg font-semibold text-white mb-1 md:mb-2 line-clamp-2 hover:text-blue-300 transition-colors duration-300 cursor-pointer">
                        {product.title}
                      </h3>
                    </Link>
                    <p className="text-gray-400 text-xs md:text-sm mb-2 md:mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-2 md:mb-4">
                      <div className="flex flex-col">
                        <div className="flex items-center space-x-1 md:space-x-2">
                          {product.discountedPrice ? (
                            <>
                              <span className="text-sm md:text-2xl font-bold text-white">
                                ${product.discountedPrice}
                              </span>
                              <span className="text-xs md:text-lg text-gray-400 line-through">
                                ${product.oldPrice}
                              </span>
                            </>
                          ) : (
                            <span className="text-sm md:text-2xl font-bold text-white">
                              ${product.price}
                            </span>
                          )}
                        </div>
                        {product.brand && (
                          <span className="text-xs text-purple-400 bg-purple-500/20 px-1 py-0.5 md:px-2 md:py-1 rounded-full w-fit mt-1">
                            {product.brand}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-xs md:text-sm text-gray-400">
                          {product.rating.count} reviews
                        </span>
                        {product.stock !== undefined && (
                          <span className="text-xs text-gray-400">
                            Stock: {product.stock}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-1.5 md:gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => addItem(product)}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 25
                        }}
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

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="glass-card ios-rounded-2xl p-4 md:p-8">
            <h2 className="text-xl md:text-3xl font-bold text-white mb-3 md:mb-4">
              Can&apos;t Find What You&apos;re Looking For?
            </h2>
            <p className="text-sm md:text-xl text-gray-300 mb-4 md:mb-6 max-w-2xl mx-auto">
              Use our powerful search feature to find exactly what you need.
            </p>
            <Link href="/search">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25
                }}
                className="glass-button px-6 py-3 md:px-8 md:py-4 ios-rounded-2xl text-white font-semibold text-sm md:text-lg flex items-center space-x-2 mx-auto press-effect"
              >
                <span>Search Products</span>
                <ArrowRight size={16} className="md:w-5 md:h-5" />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
