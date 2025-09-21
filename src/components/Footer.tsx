'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  CreditCard,
  Truck,
  Shield,
  Award,
  ArrowUp,
  Zap
} from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    shop: [
      { name: 'All Products', href: '/categories' },
      { name: 'Electronics', href: '/categories?category=electronics' },
      { name: 'Fashion', href: '/categories?category=women\'s clothing' },
      { name: 'Home & Garden', href: '/categories?category=home' },
      { name: 'Sports', href: '/categories?category=sports' },
      { name: 'Books', href: '/categories?category=books' }
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Shipping Info', href: '/shipping' },
      { name: 'Returns', href: '/returns' },
      { name: 'Size Guide', href: '/size-guide' },
      { name: 'Track Order', href: '/track' }
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Blog', href: '/blog' },
      { name: 'Partners', href: '/partners' },
      { name: 'Investors', href: '/investors' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Accessibility', href: '/accessibility' },
      { name: 'Sitemap', href: '/sitemap' }
    ]
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' }
  ];

  const paymentMethods = [
    { name: 'Visa', icon: CreditCard },
    { name: 'Mastercard', icon: CreditCard },
    { name: 'American Express', icon: CreditCard },
    { name: 'PayPal', icon: CreditCard }
  ];

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

  return (
    <footer className="bg-black">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="mb-4 md:mb-6">
              <div className="flex items-center space-x-2 md:space-x-3 mb-3 md:mb-4">
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
                    size={24} 
                    className="md:w-8 md:h-8 text-blue-400 drop-shadow-lg" 
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
                    className="absolute -top-1 -right-1 w-2 h-2 md:w-3 md:h-3 bg-green-400 rounded-full border-2 border-gray-900"
                  />
                </motion.div>
                <h3 className="text-xl md:text-3xl font-bold gradient-text">Welinzo</h3>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4 md:mb-6 text-sm md:text-base">
                Experience the future of online shopping with our premium liquid glass design, 
                smooth animations, and intuitive shopping experience. Your trusted destination 
                for quality products and exceptional service.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
              <div className="flex items-center space-x-2 md:space-x-3">
                <Mail className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                <span className="text-gray-300 text-sm md:text-base">support@welinzo.com</span>
              </div>
              <div className="flex items-center space-x-2 md:space-x-3">
                <Phone className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                <span className="text-gray-300 text-sm md:text-base">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 md:space-x-3">
                <MapPin className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                <span className="text-gray-300 text-sm md:text-base">123 Commerce St, Digital City, DC 12345</span>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-white font-semibold mb-3 md:mb-4 text-sm md:text-base">Follow Us</h4>
              <div className="flex space-x-3 md:space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="glass-button w-10 h-10 md:w-12 md:h-12 ios-rounded-xl flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 press-effect"
                  >
                    <social.icon size={16} className="md:w-5 md:h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Shop Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-white font-semibold mb-4 md:mb-6 text-sm md:text-base">Shop</h4>
            <ul className="space-y-2 md:space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm md:text-base"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-white font-semibold mb-4 md:mb-6 text-sm md:text-base">Support</h4>
            <ul className="space-y-2 md:space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm md:text-base"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-white font-semibold mb-4 md:mb-6 text-sm md:text-base">Company</h4>
            <ul className="space-y-2 md:space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm md:text-base"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-8 md:mt-16 pt-6 md:pt-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 md:w-12 md:h-12 glass-button ios-rounded-2xl flex items-center justify-center">
                <Shield size={20} className="md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <h5 className="text-white font-semibold text-sm md:text-base">Secure Shopping</h5>
                <p className="text-gray-400 text-xs md:text-sm">SSL encrypted checkout</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 md:w-12 md:h-12 glass-button ios-rounded-2xl flex items-center justify-center">
                <Truck size={20} className="md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <h5 className="text-white font-semibold text-sm md:text-base">Fast Delivery</h5>
                <p className="text-gray-400 text-xs md:text-sm">Free shipping on orders $50+</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 md:w-12 md:h-12 glass-button ios-rounded-2xl flex items-center justify-center">
                <Award size={20} className="md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <h5 className="text-white font-semibold text-sm md:text-base">Quality Guarantee</h5>
                <p className="text-gray-400 text-xs md:text-sm">30-day return policy</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Payment Methods */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-8 md:mt-12 pt-6 md:pt-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="w-full md:w-auto">
              <h5 className="text-white font-semibold mb-3 md:mb-4 text-sm md:text-base">We Accept</h5>
              <div className="flex flex-wrap gap-2 md:gap-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.name}
                    className="glass-button px-3 py-2 md:px-4 md:py-2 ios-rounded-xl flex items-center space-x-2 press-effect"
                  >
                    <method.icon size={16} className="md:w-5 md:h-5 text-white" />
                    <span className="text-white text-xs md:text-sm">{method.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Back to Top Button */}
            <motion.button
              whileHover={{ 
                scale: 1.05,
                y: -3,
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 25
                }
              }}
              whileTap={{ 
                scale: 0.95,
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 25
                }
              }}
              onClick={scrollToTop}
              className="glass-button px-6 py-3 md:px-8 md:py-4 ios-rounded-2xl text-white font-semibold flex items-center space-x-2 md:space-x-3 mt-4 md:mt-0 press-effect w-full md:w-auto justify-center"
            >
              <ArrowUp size={16} className="md:w-5 md:h-5" />
              <span className="text-sm md:text-base">Back to Top</span>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-gray-400 text-xs md:text-sm mb-3 md:mb-0 text-center md:text-left">
              © 2025 Welinzo. All rights reserved.
            </div>
            
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 md:gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-white text-xs md:text-sm transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
