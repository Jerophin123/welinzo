'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles, ShoppingBag, Star, Users, Zap, TrendingUp, Award, Truck, Shield, Heart, Eye, Search, Clock, Percent, Flame, Gift, Tag, CreditCard, Package, Globe, Smartphone, Headphones, Camera, Gamepad2, BookOpen, Shirt, Home as HomeIcon, Car } from 'lucide-react';
import { useCartStore, Product } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { apiService } from '@/services/apiService';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [specialOffersProducts, setSpecialOffersProducts] = useState<Product[]>([]);
  const [hotDealsProducts, setHotDealsProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [specialOffersLoading, setSpecialOffersLoading] = useState(true);
  const [hotDealsLoading, setHotDealsLoading] = useState(true);
  const { addItem } = useCartStore();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();

  useEffect(() => {
    fetchFeaturedProducts();
    fetchSpecialOffers();
    fetchHotDeals();
  }, []);

  const handleWishlistToggle = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const fetchFeaturedProducts = async () => {
    try {
      const data = await apiService.getFeaturedProducts(8);
      setFeaturedProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSpecialOffers = async () => {
    try {
      const data = await apiService.getSpecialOffers(3);
      setSpecialOffersProducts(data);
    } catch (error) {
      console.error('Error fetching special offers:', error);
    } finally {
      setSpecialOffersLoading(false);
    }
  };

  const fetchHotDeals = async () => {
    try {
      const data = await apiService.getHotDeals(4);
      setHotDealsProducts(data);
    } catch (error) {
      console.error('Error fetching hot deals:', error);
    } finally {
      setHotDealsLoading(false);
    }
  };

  const features = [
    {
      icon: ShoppingBag,
      title: 'Premium Products',
      description: 'Curated selection of high-quality items from top brands'
    },
    {
      icon: Star,
      title: '5-Star Experience',
      description: 'Exceptional customer service and satisfaction guaranteed'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Quick delivery and instant checkout process'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Join thousands of satisfied customers worldwide'
    }
  ];

  const categories = [
    { name: 'Electronics', icon: '📱', count: '1,200+ items' },
    { name: 'Fashion', icon: '👕', count: '800+ items' },
    { name: 'Home & Garden', icon: '🏠', count: '600+ items' },
    { name: 'Sports', icon: '⚽', count: '400+ items' },
    { name: 'Books', icon: '📚', count: '300+ items' },
    { name: 'Beauty', icon: '💄', count: '500+ items' }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Fashion Enthusiast',
      content: 'Amazing quality products and lightning-fast delivery. Welinzo has become my go-to shopping destination!',
      rating: 5,
      avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=sarah'
    },
    {
      name: 'Mike Chen',
      role: 'Tech Reviewer',
      content: 'The electronics selection is incredible. Found exactly what I was looking for at great prices.',
      rating: 5,
      avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=mike'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Home Decor Lover',
      content: 'Beautiful home items with premium quality. The liquid glass design makes shopping a pleasure.',
      rating: 5,
      avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=emily'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Happy Customers' },
    { number: '10K+', label: 'Products' },
    { number: '99.9%', label: 'Uptime' },
    { number: '24/7', label: 'Support' }
  ];

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

  const itemVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.9 },
    visible: { 
      y: 0, 
      opacity: 1, 
      scale: 1,
    },
  };

  const heroVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
    },
  };


  return (
    <div className="min-h-screen mobile-container">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] md:min-h-[85vh] flex items-center justify-center mobile-safe hero-section">
        {/* Minimal Background Elements */}
        <div className="absolute inset-0">
          {/* Subtle gradient orbs */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-cyan-500/5 rounded-full blur-3xl float-animation"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/5 rounded-full blur-3xl float-animation" style={{ animationDelay: '3s' }}></div>
          
          {/* Apple-Style Floating Icons */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0, rotate: -180 }}
                        animate={{
                          opacity: 1,
                          y: [0, -20, 0],
                          rotate: [0, 5, 0],
                          scale: [1, 1.05, 1]
                        }}
                        whileHover={{
                          scale: 1.2,
                          rotate: 10,
                          transition: {
                            type: "spring",
                            stiffness: 400,
                            damping: 10
                          }
                        }}
                        transition={{
                          duration: 6,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="absolute top-[15%] left-[8%]"
                      >
            <div className="w-12 h-12 md:w-16 md:h-16 glass ios-rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/20 hover:bg-white/15 transition-all duration-300 liquid-flow">
              <ShoppingBag size={18} className="md:w-6 md:h-6 text-blue-400/90" />
            </div>
          </motion.div>

          <motion.div
            animate={{ 
              y: [0, 15, 0],
              rotate: [0, -5, 0],
              scale: [1, 1.03, 1]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute top-[45%] right-[18%]"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 glass ios-rounded-2xl flex items-center justify-center shadow-2xl shadow-pink-500/20 hover:bg-white/15 transition-all duration-300 liquid-flow">
              <Heart size={14} className="md:w-4.5 md:h-4.5 text-pink-400/90" />
            </div>
          </motion.div>

          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 3, 0],
              scale: [1, 1.04, 1]
            }}
            transition={{ 
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute bottom-[28%] left-[25%]"
          >
            <div className="w-14 h-14 md:w-18 md:h-18 glass ios-rounded-2xl flex items-center justify-center shadow-2xl shadow-yellow-500/20 hover:bg-white/15 transition-all duration-300 liquid-flow">
              <Star size={20} className="md:w-6.5 md:h-6.5 text-yellow-400/90" />
            </div>
          </motion.div>

          <motion.div
            animate={{ 
              y: [0, 12, 0],
              rotate: [0, -3, 0],
              scale: [1, 1.02, 1]
            }}
            transition={{ 
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
            className="absolute top-[22%] right-[12%]"
          >
            <div className="w-11 h-11 md:w-14 md:h-14 glass ios-rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/20 hover:bg-white/15 transition-all duration-300 liquid-flow">
              <Zap size={16} className="md:w-5 md:h-5 text-purple-400/90" />
            </div>
          </motion.div>

          <motion.div
            animate={{ 
              y: [0, -8, 0],
              rotate: [0, 4, 0],
              scale: [1, 1.06, 1]
            }}
            transition={{ 
              duration: 6.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5
            }}
            className="absolute bottom-[35%] right-[22%]"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 glass ios-rounded-2xl flex items-center justify-center shadow-2xl shadow-green-500/20 hover:bg-white/15 transition-all duration-300 liquid-flow">
              <Shield size={12} className="md:w-4 md:h-4 text-green-400/90" />
            </div>
          </motion.div>

                      {/* Additional Floating Icons - Hidden on Mobile */}
                      <motion.div
                        animate={{
                          y: [0, -12, 0],
                          rotate: [0, -3, 0],
                          scale: [1, 1.04, 1]
                        }}
                        transition={{
                          duration: 7.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 2.5
                        }}
                        className="absolute top-[18%] right-[14%] hidden md:block"
                      >
                        <div className="w-11 h-11 glass ios-rounded-xl flex items-center justify-center shadow-2xl shadow-cyan-500/20 hover:bg-white/15 transition-all duration-300 liquid-flow">
                          <Sparkles size={17} className="text-cyan-400/90" />
                        </div>
                      </motion.div>

                      <motion.div
                        animate={{
                          y: [0, 10, 0],
                          rotate: [0, 2, 0],
                          scale: [1, 1.03, 1]
                        }}
                        transition={{
                          duration: 8.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 3
                        }}
                        className="absolute bottom-[20%] left-[5%] hidden md:block"
                      >
                        <div className="w-15 h-15 glass ios-rounded-xl flex items-center justify-center shadow-2xl shadow-orange-500/20 hover:bg-white/15 transition-all duration-300 liquid-flow">
                          <TrendingUp size={21} className="text-orange-400/90" />
                        </div>
                      </motion.div>

                      <motion.div
                        animate={{
                          y: [0, -15, 0],
                          rotate: [0, -2, 0],
                          scale: [1, 1.05, 1]
                        }}
                        transition={{
                          duration: 6.8,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.8
                        }}
                        className="absolute top-[65%] left-[3%] hidden md:block"
                      >
                        <div className="w-13 h-13 glass ios-rounded-xl flex items-center justify-center shadow-2xl shadow-indigo-500/20 hover:bg-white/15 transition-all duration-300 liquid-flow">
                          <Users size={19} className="text-indigo-400/90" />
                        </div>
                      </motion.div>

                      <motion.div
                        animate={{
                          y: [0, 8, 0],
                          rotate: [0, 3, 0],
                          scale: [1, 1.02, 1]
                        }}
                        transition={{
                          duration: 9.2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 1.8
                        }}
                        className="absolute top-[12%] left-[68%] hidden md:block"
                      >
                        <div className="w-9 h-9 glass ios-rounded-xl flex items-center justify-center shadow-2xl shadow-emerald-500/20 hover:bg-white/15 transition-all duration-300 liquid-flow">
                          <Award size={15} className="text-emerald-400/90" />
                        </div>
                      </motion.div>

                      <motion.div
                        animate={{
                          y: [0, -6, 0],
                          rotate: [0, -4, 0],
                          scale: [1, 1.04, 1]
                        }}
                        transition={{
                          duration: 7.8,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 2.2
                        }}
                        className="absolute bottom-[32%] left-[48%] hidden md:block"
                      >
                        <div className="w-17 h-17 glass ios-rounded-xl flex items-center justify-center shadow-2xl shadow-rose-500/20 hover:bg-white/15 transition-all duration-300 liquid-flow">
                          <Truck size={23} className="text-rose-400/90" />
                        </div>
                      </motion.div>

                      <motion.div
                        animate={{
                          y: [0, 12, 0],
                          rotate: [0, 2, 0],
                          scale: [1, 1.03, 1]
                        }}
                        transition={{
                          duration: 8.8,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.3
                        }}
                        className="absolute top-[52%] right-[4%] hidden md:block"
                      >
                        <div className="w-12 h-12 glass ios-rounded-xl flex items-center justify-center shadow-2xl shadow-violet-500/20 hover:bg-white/15 transition-all duration-300 liquid-flow">
                          <Eye size={18} className="text-violet-400/90" />
                        </div>
                      </motion.div>

                      <motion.div
                        animate={{
                          y: [0, -9, 0],
                          rotate: [0, -1, 0],
                          scale: [1, 1.05, 1]
                        }}
                        transition={{
                          duration: 6.2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 3.5
                        }}
                        className="absolute bottom-[18%] right-[42%] hidden md:block"
                      >
                        <div className="w-14 h-14 glass ios-rounded-xl flex items-center justify-center shadow-2xl shadow-amber-500/20 hover:bg-white/15 transition-all duration-300 liquid-flow">
                          <Search size={20} className="text-amber-400/90" />
                        </div>
                      </motion.div>

                      {/* Additional Desktop-Only Floating Icons */}
                      <motion.div
                        animate={{
                          y: [0, 14, 0],
                          rotate: [0, 3, 0],
                          scale: [1, 1.03, 1]
                        }}
                        transition={{
                          duration: 7.3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 4.2
                        }}
                        className="absolute top-[8%] left-[22%] hidden lg:block"
                      >
                        <div className="w-8 h-8 glass ios-rounded-xl flex items-center justify-center shadow-2xl shadow-teal-500/20 hover:bg-white/15 transition-all duration-300 liquid-flow">
                          <CreditCard size={14} className="text-teal-400/90" />
                        </div>
                      </motion.div>

                      <motion.div
                        animate={{
                          y: [0, -11, 0],
                          rotate: [0, -2, 0],
                          scale: [1, 1.04, 1]
                        }}
                        transition={{
                          duration: 8.1,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 1.2
                        }}
                        className="absolute top-[78%] right-[16%] hidden lg:block"
                      >
                        <div className="w-16 h-16 glass ios-rounded-xl flex items-center justify-center shadow-2xl shadow-lime-500/20 hover:bg-white/15 transition-all duration-300 liquid-flow">
                          <Package size={22} className="text-lime-400/90" />
                        </div>
                      </motion.div>

                      <motion.div
                        animate={{
                          y: [0, 13, 0],
                          rotate: [0, 4, 0],
                          scale: [1, 1.02, 1]
                        }}
                        transition={{
                          duration: 6.7,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 2.8
                        }}
                        className="absolute bottom-[12%] left-[15%] hidden lg:block"
                      >
                        <div className="w-12 h-12 glass ios-rounded-xl flex items-center justify-center shadow-2xl shadow-sky-500/20 hover:bg-white/15 transition-all duration-300 liquid-flow">
                          <Globe size={18} className="text-sky-400/90" />
                        </div>
                      </motion.div>

                      <motion.div
                        animate={{
                          y: [0, -7, 0],
                          rotate: [0, -3, 0],
                          scale: [1, 1.05, 1]
                        }}
                        transition={{
                          duration: 7.9,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.7
                        }}
                        className="absolute top-[48%] left-[6%] hidden lg:block"
                      >
                        <div className="w-9 h-9 glass ios-rounded-xl flex items-center justify-center shadow-2xl shadow-fuchsia-500/20 hover:bg-white/15 transition-all duration-300 liquid-flow">
                          <Smartphone size={15} className="text-fuchsia-400/90" />
                        </div>
                      </motion.div>

                      <motion.div
                        animate={{
                          y: [0, 9, 0],
                          rotate: [0, 2, 0],
                          scale: [1, 1.03, 1]
                        }}
                        transition={{
                          duration: 8.4,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 3.1
                        }}
                        className="absolute bottom-[26%] right-[6%] hidden lg:block"
                      >
                        <div className="w-13 h-13 glass ios-rounded-xl flex items-center justify-center shadow-2xl shadow-emerald-500/20 hover:bg-white/15 transition-all duration-300 liquid-flow">
                          <Headphones size={19} className="text-emerald-400/90" />
                        </div>
                      </motion.div>

                      <motion.div
                        animate={{
                          y: [0, -13, 0],
                          rotate: [0, -4, 0],
                          scale: [1, 1.04, 1]
                        }}
                        transition={{
                          duration: 6.9,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 1.9
                        }}
                        className="absolute top-[16%] right-[28%] hidden lg:block"
                      >
                        <div className="w-11 h-11 glass ios-rounded-xl flex items-center justify-center shadow-2xl shadow-rose-500/20 hover:bg-white/15 transition-all duration-300 liquid-flow">
                          <Camera size={17} className="text-rose-400/90" />
                        </div>
                      </motion.div>

                      <motion.div
                        animate={{
                          y: [0, 8, 0],
                          rotate: [0, 3, 0],
                          scale: [1, 1.02, 1]
                        }}
                        transition={{
                          duration: 7.6,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 4.5
                        }}
                        className="absolute bottom-[22%] left-[8%] hidden lg:block"
                      >
                        <div className="w-15 h-15 glass ios-rounded-xl flex items-center justify-center shadow-2xl shadow-violet-500/20 hover:bg-white/15 transition-all duration-300 liquid-flow">
                          <Gamepad2 size={21} className="text-violet-400/90" />
                        </div>
                      </motion.div>

                      <motion.div
                        animate={{
                          y: [0, -10, 0],
                          rotate: [0, -2, 0],
                          scale: [1, 1.05, 1]
                        }}
                        transition={{
                          duration: 8.2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 2.3
                        }}
                        className="absolute top-[68%] right-[10%] hidden lg:block"
                      >
                        <div className="w-10 h-10 glass ios-rounded-xl flex items-center justify-center shadow-2xl shadow-amber-500/20 hover:bg-white/15 transition-all duration-300 liquid-flow">
                          <BookOpen size={16} className="text-amber-400/90" />
                        </div>
                      </motion.div>

                      <motion.div
                        animate={{
                          y: [0, 12, 0],
                          rotate: [0, 4, 0],
                          scale: [1, 1.03, 1]
                        }}
                        transition={{
                          duration: 6.8,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.9
                        }}
                        className="absolute bottom-[30%] left-[35%] hidden lg:block"
                      >
                        <div className="w-14 h-14 glass ios-rounded-xl flex items-center justify-center shadow-2xl shadow-pink-500/20 hover:bg-white/15 transition-all duration-300 liquid-flow">
                          <Shirt size={20} className="text-pink-400/90" />
                        </div>
                      </motion.div>

                      <motion.div
                        animate={{
                          y: [0, -8, 0],
                          rotate: [0, -3, 0],
                          scale: [1, 1.04, 1]
                        }}
                        transition={{
                          duration: 7.4,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 3.7
                        }}
                        className="absolute top-[24%] left-[52%] hidden lg:block"
                      >
                        <div className="w-12 h-12 glass ios-rounded-xl flex items-center justify-center shadow-2xl shadow-cyan-500/20 hover:bg-white/15 transition-all duration-300 liquid-flow">
                          <HomeIcon size={18} className="text-cyan-400/90" />
                        </div>
                      </motion.div>

                      <motion.div
                        animate={{
                          y: [0, 11, 0],
                          rotate: [0, 2, 0],
                          scale: [1, 1.02, 1]
                        }}
                        transition={{
                          duration: 8.6,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 1.6
                        }}
                        className="absolute bottom-[16%] left-[38%] hidden lg:block"
                      >
                        <div className="w-17 h-17 glass ios-rounded-xl flex items-center justify-center shadow-2xl shadow-orange-500/20 hover:bg-white/15 transition-all duration-300 liquid-flow">
                          <Car size={23} className="text-orange-400/90" />
                        </div>
                      </motion.div>
        </div>

        <motion.div
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mobile-safe"
        >
          {/* Minimal Hero Content */}
          <motion.div
            variants={itemVariants}
            className="mb-8 md:mb-8"
          >

            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold mb-4 md:mb-6 leading-tight"
            >
              <motion.div 
                className="flex items-center justify-center space-x-4"
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  delay: 0.4, 
                  duration: 1.2,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 10
                  }
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  }}
                  className="relative"
                >
                  <Zap 
                    size={60} 
                    className="text-blue-400 drop-shadow-lg md:w-20 md:h-20" 
                  />
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900"
                  />
                </motion.div>
                <motion.span className="gradient-text">
                  Welinzo
                </motion.span>
              </motion.div>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-2xl text-gray-300 mb-8 md:mb-16 max-w-3xl mx-auto leading-relaxed"
            >
              Discover premium products with our intuitive shopping experience
            </motion.p>

            {/* Apple-Style CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center mt-6 md:mt-8"
            >
                          <Link href="/categories">
                            <motion.button
                              whileHover={{
                                scale: 1.08,
                                y: -5,
                                rotateX: 5,
                                transition: {
                                  type: "spring",
                                  stiffness: 300,
                                  damping: 20
                                }
                              }}
                              whileTap={{ 
                                scale: 0.92,
                                transition: {
                                  type: "spring",
                                  stiffness: 400,
                                  damping: 15
                                }
                              }}
                              className="glass-button px-6 py-3 md:px-10 md:py-5 ios-rounded-2xl text-white font-semibold text-sm md:text-lg flex items-center space-x-2 md:space-x-3 press-effect"
                            >
                  <ShoppingBag size={16} className="md:w-5 md:h-5 text-white" />
                  <span>Start Shopping</span>
                  <ArrowRight size={14} className="md:w-4.5 md:h-4.5 text-white" />
                </motion.button>
              </Link>
              
                          <Link href="/search">
                            <motion.button
                              whileHover={{
                                scale: 1.08,
                                y: -5,
                                rotateX: 5,
                                transition: {
                                  type: "spring",
                                  stiffness: 300,
                                  damping: 20
                                }
                              }}
                              whileTap={{ 
                                scale: 0.92,
                                transition: {
                                  type: "spring",
                                  stiffness: 400,
                                  damping: 15
                                }
                              }}
                              className="glass-button px-6 py-3 md:px-10 md:py-5 ios-rounded-2xl text-white font-semibold text-sm md:text-lg flex items-center space-x-2 md:space-x-3 press-effect"
                            >
                  <Search size={16} className="md:w-5 md:h-5 text-white" />
                  <span>Search</span>
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
                  <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 mobile-safe overflow-hidden md:overflow-visible">
                    <motion.div
                      initial={{ opacity: 0, y: 50, scale: 0.9 }}
                      whileInView={{ 
                        opacity: 1, 
                        y: 0, 
                        scale: 1,
                        transition: {
                          type: "spring",
                          stiffness: 100,
                          damping: 20,
                          mass: 0.8,
                          staggerChildren: 0.1
                        }
                      }}
                      viewport={{ once: true, margin: "-100px" }}
                      className="max-w-6xl mx-auto mobile-safe"
                    >
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-white mb-3 md:mb-4">
              Why Choose <span className="gradient-text">Welinzo</span>?
            </h2>
            <p className="text-sm md:text-xl text-gray-300 max-w-2xl mx-auto">
              Experience the future of online shopping with our innovative features and premium design.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -15,
                  scale: 1.05,
                  rotateY: 5,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }
                }}
                whileTap={{ scale: 0.95 }}
                className="glass-card ios-rounded-2xl p-3 md:p-6 text-center group card-hover"
              >
                <motion.div
                  whileHover={{ 
                    rotate: 360,
                    scale: 1.1,
                    transition: {
                      type: "spring",
                      stiffness: 200,
                      damping: 15
                    }
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="inline-flex items-center justify-center w-10 h-10 md:w-16 md:h-16 glass-button ios-rounded-2xl mb-2 md:mb-4 mx-auto"
                >
                  <feature.icon size={20} className="md:size-8 text-white" />
                </motion.div>
                <h3 className="text-sm md:text-xl font-semibold text-white mb-1 md:mb-3">
                  {feature.title}
                </h3>
                <p className="text-xs md:text-base text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
        </div>
        </motion.div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-12 md:mb-16">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center space-x-2 glass-button text-white px-4 py-2 md:px-6 md:py-3 ios-rounded-xl text-xs md:text-sm font-medium mb-4 md:mb-6 shadow-lg shadow-blue-500/20 spring-in"
            >
              <TrendingUp size={14} className="md:w-4 md:h-4" />
              <span>Trending Now</span>
            </motion.div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4">
              Featured <span className="gradient-text">Products</span>
            </h2>
            <p className="text-sm md:text-xl text-gray-300 max-w-2xl mx-auto">
              Discover our most popular and trending products, carefully selected for you.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {[...Array(8)].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card ios-rounded-2xl p-4 md:p-6 animate-pulse"
                >
                  <div className="w-full h-40 md:h-48 bg-gray-700 rounded-lg mb-3 md:mb-4"></div>
                  <div className="h-3 md:h-4 bg-gray-700 rounded mb-1.5 md:mb-2"></div>
                  <div className="h-3 md:h-4 bg-gray-700 rounded w-3/4 mb-3 md:mb-4"></div>
                  <div className="h-6 md:h-8 bg-gray-700 rounded"></div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={`${product.id}-${product.brand || 'default'}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
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
                  className="glass-card ios-rounded-2xl overflow-hidden group card-hover"
                >
                  <div className="relative">
                    <Link href={`/product/${product.id}`}>
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-36 md:h-48 object-cover group-hover:scale-110 transition-transform duration-300 cursor-pointer"
                      />
                    </Link>
                    <div className="absolute top-2 right-2 md:top-4 md:right-4 flex flex-col space-y-1 md:space-y-2">
                      <div className="glass-button ios-rounded-xl px-1.5 py-0.5 md:px-3 md:py-1 flex items-center space-x-0.5 md:space-x-1">
                        <Star className="w-2.5 h-2.5 md:w-4 md:h-4 text-yellow-400 fill-current" />
                        <span className="text-white text-xs md:text-sm font-medium">
                          {product.rating.rate}
                        </span>
                      </div>
                      {product.isNew && (
                        <div className="glass-button ios-rounded-xl px-1.5 py-0.5 md:px-3 md:py-1 bg-green-500/20 border-green-500/30">
                          <span className="text-green-400 text-xs font-medium">NEW</span>
                        </div>
                      )}
                      {product.discountedPrice && product.oldPrice && (
                        <div className="glass-button ios-rounded-xl px-1.5 py-0.5 md:px-3 md:py-1 bg-red-500/20 border-red-500/30">
                          <span className="text-red-400 text-xs font-medium">
                            -{Math.round((parseFloat(product.oldPrice) - product.discountedPrice) / parseFloat(product.oldPrice) * 100)}%
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="absolute top-2 left-2 md:top-4 md:left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <motion.button 
                        onClick={() => handleWishlistToggle(product)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 25
                        }}
                        className={`glass-button w-6 h-6 md:w-8 md:h-8 ios-rounded-xl flex items-center justify-center press-effect ${
                          isInWishlist(product.id) ? 'text-red-500' : 'text-white hover:bg-white/20'
                        }`}
                      >
                        <Heart size={12} className={`md:w-4 md:h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
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
                          <span className="text-xs text-purple-400 bg-purple-500/20 px-1 py-0.5 md:px-2 md:py-1 rounded-full w-fit mt-0.5 md:mt-1">
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
                    
                    <div className="flex gap-1 md:gap-2">
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
                        <ShoppingBag size={10} className="md:w-4 md:h-4" />
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
                          className="glass-button w-7 h-7 md:w-12 md:h-12 ios-rounded-xl flex items-center justify-center text-white press-effect"
                        >
                          <Eye size={10} className="md:w-4 md:h-4" />
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <div className="text-center mt-8 md:mt-12">
            <Link href="/categories">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass-button px-6 py-3 md:px-8 md:py-4 ios-rounded-2xl text-white font-semibold text-sm md:text-lg flex items-center space-x-2 mx-auto press-effect"
              >
                <span>View All Products</span>
                <ArrowRight size={16} className="md:w-5 md:h-5" />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Special Offers Section */}
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 mobile-safe">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-8 md:mb-16">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center space-x-2 glass-button text-white px-4 py-2 md:px-6 md:py-3 ios-rounded-xl text-xs md:text-sm font-medium mb-4 md:mb-6 shadow-lg shadow-red-500/20 spring-in"
            >
              <Gift size={14} className="md:w-4 md:h-4" />
              <span>Limited Time Offers</span>
            </motion.div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4">
              Special <span className="gradient-text">Offers</span>
            </h2>
            <p className="text-sm md:text-xl text-gray-300 max-w-2xl mx-auto">
              Don&apos;t miss out on these exclusive deals and discounts. Limited time only!
            </p>
          </div>

          {specialOffersLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
              {[...Array(3)].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card ios-rounded-2xl p-3 md:p-6 animate-pulse"
                >
                  <div className="w-full h-36 md:h-48 bg-gray-700 rounded-lg mb-2 md:mb-4"></div>
                  <div className="h-3 md:h-4 bg-gray-700 rounded mb-1 md:mb-2"></div>
                  <div className="h-3 md:h-4 bg-gray-700 rounded w-3/4 mb-2 md:mb-4"></div>
                  <div className="h-5 md:h-8 bg-gray-700 rounded"></div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
              {specialOffersProducts.map((product, index) => {
                const originalPrice = product.price * 1.5; // Simulate original price
                const discount = calculateDiscount(originalPrice, product.price);
                const offerIcons = [Percent, Gift, Tag];
                
                return (
                  <motion.div
                    key={`${product.id}-${product.brand || 'default'}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      y: -15,
                      scale: 1.02,
                      rotateY: 2,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 25
                      }
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="glass-card ios-rounded-2xl overflow-hidden group card-hover relative"
                  >
                    {/* Discount Badge */}
                    <div className="absolute top-3 right-3 md:top-4 md:right-4 z-10">
                      <div className="glass-button ios-rounded-xl px-2 py-1 md:px-3 md:py-1 flex items-center space-x-1 bg-red-500/20 border border-red-500/30">
                        {React.createElement(offerIcons[index], { size: 12, className: "md:w-3.5 md:h-3.5 text-red-400" })}
                        <span className="text-red-400 text-xs md:text-sm font-bold">
                          {discount}% OFF
                        </span>
                      </div>
                    </div>

                    <div className="relative">
                      <Link href={`/product/${product.id}`}>
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-36 md:h-48 object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer"
                      />
                      </Link>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      
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
                          className={`glass-button w-6 h-6 md:w-8 md:h-8 ios-rounded-xl flex items-center justify-center press-effect ${
                            isInWishlist(product.id) ? 'text-red-500' : 'text-white hover:bg-white/20'
                          }`}
                        >
                          <Heart size={12} className={`md:w-4 md:h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                        </motion.button>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 z-20">
                        <div className="glass-button ios-rounded-xl px-2 py-1 md:px-3 md:py-1">
                          <span className="text-white/90 text-xs font-medium">
                            {product.category}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 md:p-6">
                      <div className="flex items-center justify-between mb-2 md:mb-3">
                        <Link href={`/product/${product.id}`}>
                          <h3 className="text-xs md:text-xl font-bold text-white hover:text-blue-300 transition-colors cursor-pointer line-clamp-2">
                            {product.title}
                          </h3>
                        </Link>
                        <div className="text-right">
                          <div className="text-sm md:text-2xl font-bold text-green-400">
                            ${product.price}
                          </div>
                          <div className="text-xs md:text-sm text-gray-400 line-through">
                            ${originalPrice.toFixed(2)}
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-xs md:text-lg font-semibold text-blue-300 mb-1 md:mb-2">
                        Special Offer
                      </p>
                      
                      <p className="text-gray-300 text-xs md:text-sm mb-2 md:mb-4 line-clamp-2">
                        {product.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1 md:space-x-2 text-xs md:text-sm text-gray-400">
                          <Clock size={10} className="md:w-3.5 md:h-3.5" />
                          <span className="hidden sm:inline">Limited time offer</span>
                          <span className="sm:hidden">Limited</span>
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
                          className="glass-button px-3 py-1.5 md:px-6 md:py-2 ios-rounded-xl text-white font-semibold text-xs md:text-sm flex items-center space-x-1 md:space-x-2 press-effect"
                        >
                          <ShoppingBag size={10} className="md:w-3.5 md:h-3.5" />
                          <span className="hidden sm:inline">Add to Cart</span>
                          <span className="sm:hidden">Add</span>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </section>

      {/* Hot Deals Section */}
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 mobile-safe">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-8 md:mb-16">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center space-x-2 glass-button text-white px-4 py-2 md:px-6 md:py-3 ios-rounded-xl text-xs md:text-sm font-medium mb-4 md:mb-6 shadow-lg shadow-orange-500/20 spring-in"
            >
              <Flame size={14} className="md:w-4 md:h-4" />
              <span>Hot Deals</span>
            </motion.div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4">
              🔥 <span className="gradient-text">Hot Deals</span>
            </h2>
            <p className="text-sm md:text-xl text-gray-300 max-w-2xl mx-auto">
              Limited quantity deals with countdown timers. Grab them before they&apos;re gone!
            </p>
          </div>

          {hotDealsLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
              {[...Array(4)].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card ios-rounded-2xl p-3 md:p-4 animate-pulse"
                >
                  <div className="w-full h-36 md:h-48 bg-gray-700 rounded-lg mb-2 md:mb-4"></div>
                  <div className="h-3 md:h-4 bg-gray-700 rounded mb-1 md:mb-2"></div>
                  <div className="h-3 md:h-4 bg-gray-700 rounded w-3/4 mb-2 md:mb-4"></div>
                  <div className="h-5 md:h-8 bg-gray-700 rounded"></div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
              {hotDealsProducts.map((product, index) => {
                const originalPrice = product.price * 1.3; // Simulate original price
                const discount = calculateDiscount(originalPrice, product.price);
                const timeLeft = generateTimeLeft();
                const stockInfo = generateStockInfo();
                
                return (
                  <motion.div
                    key={`${product.id}-${product.brand || 'default'}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
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
                    {/* Hot Deal Badge */}
                    <div className="absolute top-3 right-3 md:top-4 md:right-4 z-10">
                      <div className="glass-button ios-rounded-xl px-2 py-1 md:px-3 md:py-1 flex items-center space-x-1 bg-orange-500/20 border border-orange-500/30">
                        <Flame size={12} className="md:w-3.5 md:h-3.5 text-orange-400" />
                        <span className="text-orange-400 text-xs md:text-sm font-bold">
                          {discount}% OFF
                        </span>
                      </div>
                    </div>

                    <div className="relative">
                      <Link href={`/product/${product.id}`}>
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-36 md:h-48 object-cover group-hover:scale-110 transition-transform duration-300 cursor-pointer"
                        />
                      </Link>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                      
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
                          className={`glass-button w-6 h-6 md:w-8 md:h-8 ios-rounded-xl flex items-center justify-center press-effect ${
                            isInWishlist(product.id) ? 'text-red-500' : 'text-white hover:bg-white/20'
                          }`}
                        >
                          <Heart size={12} className={`md:w-4 md:h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                        </motion.button>
                      </div>

                      {/* Stock Progress */}
                      <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 z-20">
                        <div className="glass-button ios-rounded-xl px-2 py-1 md:px-3 md:py-1">
                          <span className="text-white/90 text-xs font-medium">
                            {stockInfo.sold}/{stockInfo.total} sold
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 md:p-4">
                      <Link href={`/product/${product.id}`}>
                        <h3 className="text-xs md:text-lg font-semibold text-white mb-1 md:mb-2 line-clamp-2 hover:text-blue-300 transition-colors cursor-pointer">
                          {product.title}
                        </h3>
                      </Link>
                      
                      <div className="flex items-center space-x-1 md:space-x-2 mb-2 md:mb-3">
                        <div className="flex items-center space-x-0.5 md:space-x-1">
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
                          <div className="text-sm md:text-xl font-bold text-green-400">
                            ${product.price}
                          </div>
                          <div className="text-xs md:text-sm text-gray-400 line-through">
                            ${originalPrice.toFixed(2)}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-gray-400 mb-0.5 md:mb-1">Time Left</div>
                          <div className="text-xs md:text-sm font-bold text-orange-400">
                            {timeLeft}
                          </div>
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="mb-3 md:mb-4">
                        <div className="flex justify-between text-xs text-gray-400 mb-0.5 md:mb-1">
                          <span>Sold</span>
                          <span>{Math.round((stockInfo.sold / stockInfo.total) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-1.5 md:h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${(stockInfo.sold / stockInfo.total) * 100}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            viewport={{ once: true }}
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
                        className="w-full glass-button py-2 md:py-3 ios-rounded-xl text-white font-semibold flex items-center justify-center space-x-1 md:space-x-2 press-effect text-xs md:text-sm"
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

          <div className="text-center mt-8 md:mt-12">
            <Link href="/hot-deals">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass-button px-6 py-3 md:px-8 md:py-4 ios-rounded-2xl text-white font-semibold text-sm md:text-lg flex items-center space-x-2 mx-auto press-effect"
              >
                <span>View All Hot Deals</span>
                <ArrowRight size={16} className="md:w-5 md:h-5" />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Categories Section */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-gray-900/50 to-blue-900/50">
        <div className="px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4">
              Shop by <span className="gradient-text">Category</span>
            </h2>
            <p className="text-sm md:text-xl text-gray-300 max-w-2xl mx-auto">
              Explore our wide range of categories and find exactly what you&apos;re looking for.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -15,
                  scale: 1.03,
                  rotateY: 3,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 25
                  }
                }}
                whileTap={{ scale: 0.98 }}
                className="glass-card ios-rounded-2xl p-3 md:p-6 text-center group card-hover cursor-pointer"
              >
                <div className="text-2xl md:text-4xl mb-2 md:mb-4">{category.icon}</div>
                <h3 className="text-sm md:text-lg font-semibold text-white mb-1 md:mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-400 text-xs md:text-sm">
                  {category.count}
                </p>
              </motion.div>
            ))}
          </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 300,
                  damping: 25
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.05,
                  y: -8,
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  }
                }}
                className="glass-card ios-rounded-2xl p-3 md:p-6 text-center group card-hover"
              >
                <motion.div 
                  className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text mb-2 md:mb-3"
                  whileHover={{
                    scale: 1.15,
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 10
                    }
                  }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-gray-300 font-medium group-hover:text-white transition-colors duration-300 text-xs md:text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-8 md:mb-16">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center space-x-2 glass-button text-white px-4 py-2 md:px-6 md:py-3 ios-rounded-xl text-xs md:text-sm font-medium mb-4 md:mb-6 shadow-lg shadow-purple-500/20 spring-in"
            >
              <Award size={14} className="md:w-4 md:h-4" />
              <span>Customer Reviews</span>
            </motion.div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4">
              What Our <span className="gradient-text">Customers</span> Say
            </h2>
            <p className="text-sm md:text-xl text-gray-300 max-w-2xl mx-auto">
              Don&apos;t just take our word for it. Here&apos;s what our satisfied customers have to say.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -15,
                  scale: 1.02,
                  rotateY: 2,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 25
                  }
                }}
                whileTap={{ scale: 0.98 }}
                className="glass-card ios-rounded-2xl p-4 md:p-8 card-hover"
              >
                <div className="flex items-center mb-4 md:mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 md:w-12 md:h-12 ios-rounded-xl mr-3 md:mr-4"
                  />
                  <div>
                    <h4 className="text-white font-semibold text-sm md:text-base">{testimonial.name}</h4>
                    <p className="text-gray-400 text-xs md:text-sm">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex items-center mb-3 md:mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Trust Indicators Section */}
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900/50 to-purple-900/50">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4">
              Why <span className="gradient-text">Trust</span> Welinzo?
            </h2>
            <p className="text-sm md:text-xl text-gray-300 max-w-2xl mx-auto">
              We&apos;re committed to providing you with the best shopping experience possible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="glass-card ios-rounded-2xl p-4 md:p-8 text-center card-hover"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 glass-button ios-rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6">
                <Shield size={24} className="md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-white mb-3 md:mb-4">Secure Payments</h3>
              <p className="text-gray-300 text-sm md:text-base">
                Your payment information is encrypted and secure with industry-standard SSL protection.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="glass-card ios-rounded-2xl p-4 md:p-8 text-center card-hover"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 glass-button ios-rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6">
                <Truck size={24} className="md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-white mb-3 md:mb-4">Fast Delivery</h3>
              <p className="text-gray-300 text-sm md:text-base">
                Get your orders delivered quickly with our reliable shipping partners worldwide.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="glass-card ios-rounded-2xl p-4 md:p-8 text-center card-hover"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 glass-button ios-rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6">
                <Award size={24} className="md:w-8 md:h-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-white mb-3 md:mb-4">Quality Guarantee</h3>
              <p className="text-gray-300 text-sm md:text-base">
                We stand behind every product with our 30-day money-back guarantee.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8,
            type: "spring",
            stiffness: 300,
            damping: 25
          }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to Experience the Future?
          </motion.h2>
          <motion.p 
            className="text-sm md:text-xl text-gray-300 mb-8 md:mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Join thousands of satisfied customers and discover why Welinzo is the premium choice for online shopping.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link href="/categories">
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  y: -3,
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25
                }}
                className="glass-button px-6 py-3 md:px-10 md:py-5 ios-rounded-2xl text-white font-semibold text-sm md:text-lg flex items-center space-x-2 md:space-x-3 mx-auto sm:mx-0 press-effect"
              >
                <span>Start Shopping</span>
                <ArrowRight size={16} className="md:w-5 md:h-5" />
              </motion.button>
            </Link>
            
            <Link href="/account">
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  y: -3,
                  boxShadow: "0 20px 40px rgba(168, 85, 247, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25
                }}
                className="glass-button px-6 py-3 md:px-10 md:py-5 ios-rounded-2xl text-white font-semibold text-sm md:text-lg mx-auto sm:mx-0 press-effect"
              >
                Create Account
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
