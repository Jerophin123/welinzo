'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  User, 
  Search, 
  Home,
  Grid3X3,
  LogOut,
  Heart,
  Zap
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useAuthStore } from '@/store/authStore';
import Avatar from '@/components/Avatar';

export default function Navigation() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  
  const { getTotalItems } = useCartStore();
  const { getWishlistCount } = useWishlistStore();
  const { user, isAuthenticated, logout } = useAuthStore();
  
  const totalItems = getTotalItems();
  const wishlistCount = getWishlistCount();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/categories', label: 'Categories', icon: Grid3X3 },
    { href: '/wishlist', label: 'Wishlist', icon: Heart, badge: wishlistCount },
    { href: '/cart', label: 'Cart', icon: ShoppingCart, badge: totalItems },
  ];


  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        mass: 0.8
      }}
                  className="fixed top-0 left-0 right-0 z-50 bg-black/10 backdrop-blur-lg"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 mobile-safe">
        <div className="flex items-center justify-between h-[70px] md:h-16">
          {/* Left Section - Logo */}
          <div className="flex items-center space-x-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25
                }}
                className="relative"
              >
                <Zap 
                  size={28} 
                  className="text-blue-400 drop-shadow-lg" 
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
              <div className="text-xl md:text-2xl font-bold gradient-text">
                Welinzo
              </div>
            </Link>
          </div>

          {/* Center Section - Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <motion.div
                key={item.href}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25
                }}
              >
                <Link
                  href={item.href}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-all duration-300 glass-button px-4 py-2 ios-rounded-lg"
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                  {isMounted && item.badge && item.badge > 0 && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 500, 
                        damping: 30 
                      }}
                      className="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center bounce-animation"
                    >
                      {item.badge}
                    </motion.span>
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Right Section - Search + User Menu + Mobile Actions */}
          <div className="flex items-center space-x-6">
            {/* Search Bar - Desktop */}
            <div className="hidden md:flex items-center">
              <motion.form 
                onSubmit={handleSearch} 
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25
                }}
              >
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="glass-input px-4 py-2 pr-10 ios-rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                />
                <motion.button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  }}
                >
                  <Search size={20} />
                </motion.button>
              </motion.form>
            </div>

            {/* User Menu - Desktop */}
            <div className="hidden md:flex items-center">
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <motion.div
                    whileHover={{ y: -2, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 25
                    }}
                  >
                    <Link
                      href="/account"
                      className="p-1 transition-all duration-300"
                    >
                      <Avatar
                        src={user?.avatar}
                        alt={user?.name || 'User'}
                        size="sm"
                      />
                    </Link>
                  </motion.div>
                  <motion.button
                    onClick={logout}
                    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-all duration-300 glass-button px-3 py-2 ios-rounded-lg"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 25
                    }}
                  >
                    <LogOut size={18} />
                    <span className="text-sm">Logout</span>
                  </motion.button>
                </div>
              ) : (
                <motion.div
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  }}
                >
                  <Link
                    href="/account"
                    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-all duration-300 glass-button px-3 py-2 ios-rounded-lg"
                  >
                    <User size={18} />
                    <span className="text-sm">Account</span>
                  </Link>
                </motion.div>
              )}
            </div>

            {/* Mobile Account Button */}
            <div className="md:hidden flex items-center">
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <motion.div
                    whileHover={{ y: -2, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 25
                    }}
                  >
                    <Link
                      href="/account"
                      className="p-1 transition-all duration-300"
                    >
                      <Avatar
                        src={user?.avatar}
                        alt={user?.name || 'User'}
                        size="sm"
                      />
                    </Link>
                  </motion.div>
                  <motion.button
                    onClick={logout}
                    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-all duration-300 glass-button px-3 py-2 ios-rounded-lg"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 25
                    }}
                  >
                    <LogOut size={18} />
                    <span className="text-sm">Logout</span>
                  </motion.button>
                </div>
              ) : (
                <motion.div
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  }}
                >
                  <Link
                    href="/account"
                    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-all duration-300 glass-button px-3 py-2 ios-rounded-lg"
                  >
                    <User size={18} />
                    <span className="text-sm">Account</span>
                  </Link>
                </motion.div>
              )}
            </div>
          </div>
        </div>

      </div>

    </motion.nav>
  );
}
