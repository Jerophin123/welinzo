'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  CheckCircle, 
  Download, 
  Mail, 
  Package, 
  ArrowRight,
  Home,
  ShoppingBag,
  Clock,
  Truck,
  CreditCard
} from 'lucide-react';

export default function PaymentSuccessPage() {
  // Mock order data - in a real app, this would come from the payment processor or your backend
  const orderData = {
    orderNumber: 'SS-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    orderDate: new Date().toLocaleDateString(),
    estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    items: [
      { name: 'Sample Product 1', quantity: 2, price: 29.99 },
      { name: 'Sample Product 2', quantity: 1, price: 49.99 }
    ],
    subtotal: 109.97,
    tax: 8.80,
    shipping: 0,
    total: 118.77,
    paymentMethod: '**** **** **** 4242',
    shippingAddress: {
      name: 'John Doe',
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States'
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

  const handleDownloadReceipt = () => {
    // In a real app, this would generate and download a PDF receipt
    const receiptData = {
      orderNumber: orderData.orderNumber,
      date: orderData.orderDate,
      items: orderData.items,
      total: orderData.total
    };
    
    const dataStr = JSON.stringify(receiptData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `receipt-${orderData.orderNumber}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen py-4 md:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="glass-card ios-rounded-2xl p-4 md:p-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 glass-button ios-rounded-2xl mx-auto mb-4 md:mb-6 spring-in"
            >
              <CheckCircle size={32} className="md:w-10 md:h-10 text-white" />
            </motion.div>
            
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              <span className="gradient-text">Payment Successful!</span>
            </h1>
            <p className="text-sm md:text-xl text-gray-300 max-w-2xl mx-auto">
              Thank you for your purchase! Your order has been confirmed and will be processed shortly.
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Order Summary */}
          <motion.div variants={itemVariants} className="glass-card ios-rounded-2xl p-4 md:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 md:mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2 sm:mb-0">Order Summary</h2>
              <div className="text-left sm:text-right">
                <p className="text-gray-400 text-xs md:text-sm">Order Number</p>
                <p className="text-white font-mono font-bold text-sm md:text-base">{orderData.orderNumber}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              <div>
                <h3 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4">Order Details</h3>
                <div className="space-y-2 md:space-y-3">
                  <div className="flex items-center space-x-2 md:space-x-3">
                    <Clock size={16} className="md:w-5 md:h-5 text-blue-400" />
                    <div>
                      <p className="text-white font-medium text-sm md:text-base">Order Date</p>
                      <p className="text-gray-400 text-xs md:text-sm">{orderData.orderDate}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 md:space-x-3">
                    <Truck size={16} className="md:w-5 md:h-5 text-green-400" />
                    <div>
                      <p className="text-white font-medium text-sm md:text-base">Estimated Delivery</p>
                      <p className="text-gray-400 text-xs md:text-sm">{orderData.estimatedDelivery}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 md:space-x-3">
                    <CreditCard size={16} className="md:w-5 md:h-5 text-purple-400" />
                    <div>
                      <p className="text-white font-medium text-sm md:text-base">Payment Method</p>
                      <p className="text-gray-400 text-xs md:text-sm">{orderData.paymentMethod}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4">Shipping Address</h3>
                <div className="glass-button p-3 md:p-4 ios-rounded-xl">
                  <p className="text-white font-medium text-sm md:text-base">{orderData.shippingAddress.name}</p>
                  <p className="text-gray-300 text-xs md:text-sm">{orderData.shippingAddress.address}</p>
                  <p className="text-gray-300 text-xs md:text-sm">
                    {orderData.shippingAddress.city}, {orderData.shippingAddress.state} {orderData.shippingAddress.zipCode}
                  </p>
                  <p className="text-gray-300 text-xs md:text-sm">{orderData.shippingAddress.country}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Items Ordered */}
          <motion.div variants={itemVariants} className="glass-card ios-rounded-2xl p-4 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Items Ordered</h2>
            
            <div className="space-y-3 md:space-y-4">
              {orderData.items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center justify-between p-3 md:p-4 glass-button ios-rounded-xl"
                >
                  <div className="flex items-center space-x-2 md:space-x-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 glass-button ios-rounded-xl flex items-center justify-center">
                      <Package size={20} className="md:w-6 md:h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm md:text-base">{item.name}</p>
                      <p className="text-gray-400 text-xs md:text-sm">Quantity: {item.quantity}</p>
                    </div>

                  </div>
                  <p className="text-white font-bold text-sm md:text-base">${(item.price * item.quantity).toFixed(2)}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-white/10">
              <div className="space-y-2 md:space-y-3">
                <div className="flex justify-between text-gray-300 text-sm md:text-base">
                  <span>Subtotal</span>
                  <span>${orderData.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300 text-sm md:text-base">
                  <span>Shipping</span>
                  <span className="text-green-400">Free</span>
                </div>
                <div className="flex justify-between text-gray-300 text-sm md:text-base">
                  <span>Tax</span>
                  <span>${orderData.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg md:text-2xl font-bold text-white pt-2 md:pt-3 border-t border-white/10">
                  <span>Total Paid</span>
                  <span>${orderData.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div variants={itemVariants} className="glass-card ios-rounded-2xl p-4 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">What&apos;s Next?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div className="text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 glass-button ios-rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Mail size={24} className="md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-semibold text-white mb-2">Email Confirmation</h3>
                <p className="text-gray-400 text-xs md:text-sm">
                  You&apos;ll receive an email confirmation with your order details and tracking information.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 glass-button ios-rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Package size={24} className="md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-semibold text-white mb-2">Order Processing</h3>
                <p className="text-gray-400 text-xs md:text-sm">
                  Your order is being prepared and will be shipped within 1-2 business days.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 glass-button ios-rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Truck size={24} className="md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-base md:text-lg font-semibold text-white mb-2">Delivery Tracking</h3>
                <p className="text-gray-400 text-xs md:text-sm">
                  Track your package with the tracking number sent to your email.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="glass-card ios-rounded-2xl p-4 md:p-8">
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  }}
                  onClick={handleDownloadReceipt}
                  className="glass-button px-6 py-3 md:px-8 md:py-4 ios-rounded-2xl text-white font-semibold text-sm md:text-lg flex items-center space-x-2 press-effect"
                >
                  <Download size={16} className="md:w-5 md:h-5" />
                  <span>Download Receipt</span>
                </motion.button>
                
                <Link href="/categories">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 25
                    }}
                    className="glass-button px-6 py-3 md:px-8 md:py-4 ios-rounded-2xl text-white font-semibold text-sm md:text-lg flex items-center space-x-2 press-effect"
                  >
                    <ShoppingBag size={16} className="md:w-5 md:h-5" />
                    <span>Continue Shopping</span>
                    <ArrowRight size={16} className="md:w-5 md:h-5" />
                  </motion.button>
                </Link>
                
                <Link href="/">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 25
                    }}
                    className="glass-button px-6 py-3 md:px-8 md:py-4 ios-rounded-2xl text-white font-semibold text-sm md:text-lg flex items-center space-x-2 press-effect"
                  >
                    <Home size={16} className="md:w-5 md:h-5" />
                    <span>Back to Home</span>
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

