'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-card ios-rounded-2xl p-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-24 h-24 glass-button ios-rounded-2xl mx-auto mb-8"
          >
            <span className="text-4xl">🔍</span>
          </motion.div>
          
          <h1 className="text-6xl font-bold mb-4">
            <span className="gradient-text">404</span>
          </h1>
          
          <h2 className="text-3xl font-bold text-white mb-4">
            Page Not Found
          </h2>
          
          <p className="text-xl text-gray-300 mb-8 max-w-lg mx-auto">
            Oops! The page you&apos;re looking for doesn&apos;t exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25
                }}
                className="glass-button px-8 py-4 ios-rounded-2xl text-white font-semibold text-lg flex items-center space-x-2 press-effect"
              >
                <Home size={20} />
                <span>Go Home</span>
              </motion.button>
            </Link>
            
            <Link href="/search">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25
                }}
                className="glass-button px-8 py-4 ios-rounded-2xl text-white font-semibold text-lg flex items-center space-x-2 press-effect"
              >
                <Search size={20} />
                <span>Search Products</span>
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

