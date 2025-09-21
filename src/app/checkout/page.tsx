'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  CreditCard, 
  Lock, 
  ArrowLeft, 
  Check,
  User,
  Mail,
  MapPin,
  Phone,
  Calendar,
  Shield
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US'
  });
  
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });
  
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();

  const totalPrice = getTotalPrice();
  const tax = totalPrice * 0.08;
  const finalTotal = totalPrice + tax;

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setPaymentInfo(prev => ({
      ...prev,
      cardNumber: formatted
    }));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    setPaymentInfo(prev => ({
      ...prev,
      expiryDate: formatted
    }));
  };

  const isShippingValid = () => {
    return Object.values(shippingInfo).every(value => value.trim() !== '');
  };

  const isPaymentValid = () => {
    return paymentInfo.cardNumber.replace(/\s/g, '').length === 16 &&
           paymentInfo.expiryDate.length === 5 &&
           paymentInfo.cvv.length === 3 &&
           paymentInfo.cardName.trim() !== '';
  };

  const handleNextStep = () => {
    if (currentStep === 1 && isShippingValid()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && isPaymentValid()) {
      setCurrentStep(3);
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Clear cart and redirect to success page
    clearCart();
    router.push('/payment-success');
  };

  const steps = [
    { number: 1, title: 'Shipping', icon: MapPin },
    { number: 2, title: 'Payment', icon: CreditCard },
    { number: 3, title: 'Review', icon: Check }
  ];

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-card rounded-2xl p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
          <p className="text-gray-300 mb-6">Add some items to your cart before checking out.</p>
          <button
            onClick={() => router.push('/categories')}
            className="glass-button px-6 py-3 rounded-lg text-white font-medium"
          >
            Continue Shopping
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-4 md:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
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
              <Lock size={14} className="md:w-4 md:h-4" />
              <span>Secure Checkout</span>
            </motion.div>
            
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
              <span className="gradient-text">Checkout</span>
            </h1>
            <p className="text-sm md:text-xl text-gray-300">
              Complete your purchase securely with our encrypted payment system.
            </p>
          </div>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6 md:mb-8"
        >
          <div className="glass-card ios-rounded-2xl p-3 md:p-6">
            <div className="flex items-center justify-center space-x-8 md:space-x-16">
              {steps.map((step, index) => (
                <div key={step.number} className="flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 * index }}
                    className={`flex items-center justify-center w-8 h-8 md:w-12 md:h-12 ios-rounded-2xl mb-1 md:mb-0 ${
                      currentStep >= step.number
                        ? 'glass-button text-white'
                        : 'glass-button text-gray-400'
                    }`}
                  >
                    <step.icon size={16} className="md:w-5 md:h-5" />
                  </motion.div>
                  
                  <div className="md:ml-3">
                    <p className={`font-medium text-xs md:text-sm ${
                      currentStep >= step.number ? 'text-white' : 'text-gray-400'
                    }`}>
                      {step.title}
                    </p>
                  </div>
                  
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card ios-rounded-2xl p-4 md:p-8"
            >
              {/* Step 1: Shipping Information */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Shipping Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label className="block text-white font-medium mb-2 text-sm md:text-base">First Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="text"
                          name="firstName"
                          value={shippingInfo.firstName}
                          onChange={handleShippingChange}
                          className="w-full glass-input pl-10 pr-4 py-2.5 md:py-3 ios-rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                          placeholder="Enter your first name"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-white font-medium mb-2 text-sm md:text-base">Last Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="text"
                          name="lastName"
                          value={shippingInfo.lastName}
                          onChange={handleShippingChange}
                          className="w-full glass-input pl-10 pr-4 py-2.5 md:py-3 ios-rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                          placeholder="Enter your last name"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-white font-medium mb-2 text-sm md:text-base">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="email"
                          name="email"
                          value={shippingInfo.email}
                          onChange={handleShippingChange}
                          className="w-full glass-input pl-10 pr-4 py-2.5 md:py-3 ios-rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-white font-medium mb-2 text-sm md:text-base">Phone</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="tel"
                          name="phone"
                          value={shippingInfo.phone}
                          onChange={handleShippingChange}
                          className="w-full glass-input pl-10 pr-4 py-2.5 md:py-3 ios-rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                          placeholder="Enter your phone number"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-white font-medium mb-2 text-sm md:text-base">Address</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="text"
                          name="address"
                          value={shippingInfo.address}
                          onChange={handleShippingChange}
                          className="w-full glass-input pl-10 pr-4 py-2.5 md:py-3 ios-rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                          placeholder="Enter your address"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-white font-medium mb-2 text-sm md:text-base">City</label>
                      <input
                        type="text"
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleShippingChange}
                        className="w-full glass-input px-4 py-2.5 md:py-3 ios-rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                        placeholder="Enter your city"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-white font-medium mb-2 text-sm md:text-base">State</label>
                      <input
                        type="text"
                        name="state"
                        value={shippingInfo.state}
                        onChange={handleShippingChange}
                        className="w-full glass-input px-4 py-2.5 md:py-3 ios-rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                        placeholder="Enter your state"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-white font-medium mb-2 text-sm md:text-base">ZIP Code</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={shippingInfo.zipCode}
                        onChange={handleShippingChange}
                        className="w-full glass-input px-4 py-2.5 md:py-3 ios-rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                        placeholder="Enter ZIP code"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Payment Information */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Payment Information</h2>
                  
                  <div className="mb-4 md:mb-6">
                    <label className="block text-white font-medium mb-3 md:mb-4 text-sm md:text-base">Payment Method</label>
                    <div className="flex space-x-3 md:space-x-4">
                      <motion.button
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 25
                        }}
                        onClick={() => setPaymentMethod('card')}
                        className={`flex-1 p-3 md:p-4 ios-rounded-xl glass-button press-effect ${
                          paymentMethod === 'card'
                            ? 'bg-blue-500/20'
                            : ''
                        }`}
                      >
                        <CreditCard className="w-5 h-5 md:w-6 md:h-6 text-white mx-auto mb-1 md:mb-2" />
                        <p className="text-white font-medium text-sm md:text-base">Credit Card</p>
                      </motion.button>
                    </div>
                  </div>

                  <div className="space-y-4 md:space-y-6">
                    <div>
                      <label className="block text-white font-medium mb-2 text-sm md:text-base">Card Number</label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="text"
                          name="cardNumber"
                          value={paymentInfo.cardNumber}
                          onChange={handleCardNumberChange}
                          className="w-full glass-input pl-10 pr-4 py-2.5 md:py-3 ios-rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-white font-medium mb-2 text-sm md:text-base">Cardholder Name</label>
                      <input
                        type="text"
                        name="cardName"
                        value={paymentInfo.cardName}
                        onChange={handlePaymentChange}
                        className="w-full glass-input px-4 py-2.5 md:py-3 ios-rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                        placeholder="Enter cardholder name"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                      <div>
                        <label className="block text-white font-medium mb-2 text-sm md:text-base">Expiry Date</label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                          <input
                            type="text"
                            name="expiryDate"
                            value={paymentInfo.expiryDate}
                            onChange={handleExpiryChange}
                            className="w-full glass-input pl-10 pr-4 py-2.5 md:py-3 ios-rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                            placeholder="MM/YY"
                            maxLength={5}
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-white font-medium mb-2 text-sm md:text-base">CVV</label>
                        <div className="relative">
                          <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                          <input
                            type="text"
                            name="cvv"
                            value={paymentInfo.cvv}
                            onChange={handlePaymentChange}
                            className="w-full glass-input pl-10 pr-4 py-2.5 md:py-3 ios-rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                            placeholder="123"
                            maxLength={3}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Review */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Review Your Order</h2>
                  
                  <div className="space-y-4 md:space-y-6">
                    <div>
                      <h3 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3">Shipping Address</h3>
                      <div className="glass-button p-3 md:p-4 ios-rounded-xl">
                        <p className="text-white text-sm md:text-base">
                          {shippingInfo.firstName} {shippingInfo.lastName}
                        </p>
                        <p className="text-gray-300 text-sm md:text-base">{shippingInfo.address}</p>
                        <p className="text-gray-300 text-sm md:text-base">
                          {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
                        </p>
                        <p className="text-gray-300 text-sm md:text-base">{shippingInfo.email}</p>
                        <p className="text-gray-300 text-sm md:text-base">{shippingInfo.phone}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3">Payment Method</h3>
                      <div className="glass-button p-3 md:p-4 ios-rounded-xl">
                        <p className="text-white text-sm md:text-base">**** **** **** {paymentInfo.cardNumber.slice(-4)}</p>
                        <p className="text-gray-300 text-sm md:text-base">{paymentInfo.cardName}</p>
                        <p className="text-gray-300 text-sm md:text-base">Expires: {paymentInfo.expiryDate}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 mt-6 md:mt-8">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  }}
                  onClick={() => currentStep > 1 ? setCurrentStep(currentStep - 1) : router.push('/cart')}
                  className="glass-button px-4 py-2.5 md:px-6 md:py-3 ios-rounded-xl text-white font-medium flex items-center justify-center space-x-2 press-effect text-sm md:text-base"
                >
                  <ArrowLeft size={16} className="md:w-5 md:h-5" />
                  <span>{currentStep > 1 ? 'Back' : 'Return to Cart'}</span>
                </motion.button>
                
                {currentStep < 3 ? (
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 25
                    }}
                    onClick={handleNextStep}
                    disabled={currentStep === 1 ? !isShippingValid() : !isPaymentValid()}
                    className="glass-button px-4 py-2.5 md:px-6 md:py-3 ios-rounded-xl text-white font-medium press-effect disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
                  >
                    Continue
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 25
                    }}
                    onClick={handlePayment}
                    disabled={loading}
                    className="glass-button px-4 py-2.5 md:px-6 md:py-3 ios-rounded-xl text-white font-medium press-effect disabled:opacity-50 text-sm md:text-base"
                  >
                    {loading ? 'Processing...' : 'Complete Payment'}
                  </motion.button>
                )}
              </div>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-card ios-rounded-2xl p-4 md:p-6 sticky top-4 md:top-8"
            >
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Order Summary</h2>
              
              <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-2 md:space-x-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-10 h-10 md:w-12 md:h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs md:text-sm font-medium line-clamp-1">
                        {item.title}
                      </p>
                      <p className="text-gray-400 text-xs">
                        Qty: {item.quantity} × ${item.price}
                      </p>
                    </div>
                    <p className="text-white font-medium text-sm md:text-base">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2 md:space-y-3 pt-3 md:pt-4 border-t border-white/10">
                <div className="flex justify-between text-gray-300 text-sm md:text-base">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300 text-sm md:text-base">
                  <span>Shipping</span>
                  <span className="text-green-400">Free</span>
                </div>
                <div className="flex justify-between text-gray-300 text-sm md:text-base">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg md:text-xl font-bold text-white pt-2 border-t border-white/10">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-white/10">
                <div className="flex items-center space-x-2 text-gray-400 text-xs md:text-sm">
                  <Lock size={14} className="md:w-4 md:h-4" />
                  <span>Secure SSL encrypted checkout</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
