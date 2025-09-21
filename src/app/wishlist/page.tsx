'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ShoppingBag, Star, Heart, Trash2, Eye } from 'lucide-react';
import { useWishlistStore } from '@/store/wishlistStore';
import { useCartStore, Product } from '@/store/cartStore';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist, getWishlistCount } = useWishlistStore();
  const { addItem } = useCartStore();

  const handleAddToCart = (product: Product) => {
    addItem(product);
  };

  const handleRemoveFromWishlist = (productId: number) => {
    removeFromWishlist(productId);
  };

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
              className="inline-flex items-center space-x-2 glass-button text-white px-4 py-2 md:px-6 md:py-3 ios-rounded-xl text-xs md:text-sm font-medium mb-4 md:mb-6 shadow-lg shadow-red-500/20 spring-in"
            >
              <Heart size={14} className="md:w-4 md:h-4" />
              <span>My Wishlist</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4"
            >
              ❤️ <span className="gradient-text">Wishlist</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-sm md:text-xl text-gray-300 max-w-2xl mx-auto"
            >
              Your saved products ({getWishlistCount()} items)
            </motion.p>
          </div>

          {/* Clear All Button */}
          {wishlist.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex justify-end mb-6 md:mb-8"
            >
              <motion.button
                onClick={clearWishlist}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="glass-button px-4 py-2.5 md:px-6 md:py-3 ios-rounded-xl text-white font-semibold flex items-center space-x-2 press-effect hover:bg-red-500/20 hover:border-red-500/30 text-sm md:text-base"
              >
                <Trash2 size={16} className="md:w-4.5 md:h-4.5" />
                <span>Clear All</span>
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* Wishlist Items */}
      <section className="py-4 md:py-8 px-4 sm:px-6 lg:px-8 mobile-safe">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="max-w-7xl mx-auto"
        >
          {wishlist.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 md:py-16"
            >
              <div className="text-4xl md:text-6xl mb-3 md:mb-4">💔</div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Your Wishlist is Empty</h3>
              <p className="text-gray-400 mb-4 md:mb-6 text-sm md:text-base">Start adding products you love to your wishlist!</p>
              <Link href="/categories">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass-button px-4 py-2.5 md:px-6 md:py-3 ios-rounded-xl text-white font-semibold press-effect text-sm md:text-base"
                >
                  Browse Products
                </motion.button>
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
              {wishlist.map((product, index) => (
                <motion.div
                  key={`${product.id}-wishlist`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
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
                  {/* Remove from Wishlist Button */}
                  <div className="absolute top-3 right-3 md:top-4 md:right-4 z-10">
                    <motion.button
                      onClick={() => handleRemoveFromWishlist(product.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="glass-button w-7 h-7 md:w-8 md:h-8 ios-rounded-xl flex items-center justify-center text-red-400 hover:bg-red-500/20 hover:border-red-500/30 press-effect"
                    >
                      <Heart size={14} className="md:w-4 md:h-4 fill-current" />
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
                    <div className="absolute top-3 left-3 md:top-4 md:left-4">
                      <div className="glass-button ios-rounded-xl px-2 py-1 md:px-3 md:py-1 flex items-center space-x-1">
                        <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 fill-current" />
                        <span className="text-white text-xs md:text-sm font-medium">
                          {product.rating.rate}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 md:p-6">
                    <Link href={`/product/${product.id}`}>
                      <h3 className="text-sm md:text-lg font-semibold text-white mb-1 md:mb-2 line-clamp-2 hover:text-blue-300 transition-colors duration-300 cursor-pointer">
                        {product.title}
                      </h3>
                    </Link>
                    <p className="text-gray-400 text-xs md:text-sm mb-2 md:mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-2 md:mb-4">
                      <span className="text-lg md:text-2xl font-bold text-white">
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
                        onClick={() => handleAddToCart(product)}
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
      </section>
    </div>
  );
}
