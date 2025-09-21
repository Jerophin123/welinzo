'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  Search, 
  Home,
  Grid3X3,
  Heart
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';

export default function BottomNavigation() {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  
  const { getTotalItems } = useCartStore();
  const { getWishlistCount } = useWishlistStore();
  
  const totalItems = getTotalItems();
  const wishlistCount = getWishlistCount();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Bottom navigation items for mobile (similar to WhatsApp)
  const bottomNavItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/categories', label: 'Categories', icon: Grid3X3 },
    { href: '/search', label: 'Search', icon: Search },
    { href: '/wishlist', label: 'Wishlist', icon: Heart, badge: wishlistCount },
    { href: '/cart', label: 'Cart', icon: ShoppingCart, badge: totalItems },
  ];

  return (
    <div className="md:hidden fixed bottom-2 left-0 right-0 z-[9999] w-full px-4 pb-4">
      <motion.div
        initial={{ y: 100, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 30,
          mass: 0.8,
          delay: 0.2
        }}
        className="relative w-full"
      >
        {/* Floating Liquid Glass Background */}
        <div className="absolute inset-0 bg-transparent backdrop-blur-3xl rounded-3xl shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-transparent rounded-3xl"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-transparent rounded-3xl"></div>
        </div>
        
        {/* Navigation Items */}
        <div className="relative px-6 py-4 pb-safe">
          <div className="flex items-center justify-around max-w-sm mx-auto">
            {bottomNavItems.map((item, index) => {
              const isActive = pathname === item.href;
              const IconComponent = item.icon;
              
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                  }}
                  className="relative"
                >
                  <Link href={item.href} className="block">
                    <motion.div
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25
                      }}
                      className={`
                        relative flex flex-col items-center justify-center p-2 rounded-2xl
                        transition-all duration-300 ease-out
                        ${isActive 
                          ? 'bg-transparent backdrop-blur-xl shadow-xl' 
                          : 'bg-transparent backdrop-blur-lg hover:bg-transparent'
                        }
                      `}
                    >
                      {/* Active State Glow */}
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-2xl"
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30
                          }}
                        />
                      )}
                      
                      {/* Icon Container */}
                      <div className="relative z-10 flex items-center justify-center">
                        <IconComponent 
                          size={24} 
                          className={`
                            transition-all duration-300
                            ${isActive 
                              ? 'text-white drop-shadow-lg' 
                              : 'text-gray-400'
                            }
                          `}
                        />
                        
                        {/* Badge */}
                        {isMounted && item.badge && item.badge > 0 && (
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ 
                              type: "spring", 
                              stiffness: 500, 
                              damping: 30 
                            }}
                            className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-xl border-2 border-white/30"
                          >
                            {item.badge > 99 ? '99+' : item.badge}
                          </motion.div>
                        )}
                      </div>
                      
                      {/* Label */}
                      <motion.span
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className={`
                          text-xs font-semibold mt-1 transition-all duration-300
                          ${isActive 
                            ? 'text-white' 
                            : 'text-gray-500'
                          }
                        `}
                      >
                        {item.label}
                      </motion.span>
                      
                      {/* Liquid Ripple Effect */}
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 0.5 }}
                          transition={{
                            duration: 0.8,
                            ease: "easeOut"
                          }}
                          className="absolute inset-0 bg-gradient-to-br from-blue-500/35 via-purple-500/35 to-pink-500/35 rounded-2xl"
                        />
                      )}
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
        
        {/* Bottom Safe Area */}
        <div className="h-safe-bottom"></div>
      </motion.div>
    </div>
  );
}
