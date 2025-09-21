'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  LogIn, 
  UserPlus, 
  UserCircle,
  Edit3,
  X
} from 'lucide-react';
import Avatar from '@/components/Avatar';
import { useAuthStore } from '@/store/authStore';

export default function AccountPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [profileData, setProfileData] = useState({
    name: '',
    email: ''
  });
  
  const router = useRouter();
  const { user, isAuthenticated, login, register, logout, updateProfile } = useAuthStore();

  // Initialize profile data when user is loaded
  useState(() => {
    if (user) {
      setProfileData({
        name: user.name,
        email: user.email
      });
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let success = false;
      
      if (isLogin) {
        success = await login(formData.email, formData.password);
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }
        success = await register(formData.name, formData.email, formData.password);
      }

      if (success) {
        router.push('/');
      } else {
        setError(isLogin ? 'Invalid credentials' : 'Registration failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      updateProfile(profileData);
      setIsEditing(false);
    } catch (error) {
      setError('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
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

  if (isAuthenticated && user) {
    return (
      <div className="min-h-screen py-4 md:py-8 px-4 sm:px-6 lg:px-8 mobile-container">
        <div className="max-w-4xl mx-auto mobile-safe">
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
                <UserCircle size={14} className="md:w-4 md:h-4" />
                <span>User Profile</span>
              </motion.div>
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 leading-tight">
                Welcome back, <span className="gradient-text block sm:inline">{user.name}</span>
              </h1>
              <p className="text-sm md:text-xl text-gray-300">
                Manage your account settings and preferences.
              </p>
            </div>
          </motion.div>

          {/* Profile Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8"
          >
            {/* Profile Info */}
            <motion.div variants={itemVariants} className="glass-card ios-rounded-2xl p-4 md:p-8">
              <div className="flex flex-col gap-3 mb-4 md:mb-6">
                <h2 className="text-lg md:text-2xl font-bold text-white">Profile Information</h2>
              </div>

              <div className="space-y-4 md:space-y-6">
                <div className="flex flex-col items-center space-y-3">
                  <Avatar
                    src={user.avatar}
                    alt={user.name}
                    size="xl"
                  />
                  <div className="text-center">
                    <h3 className="text-lg md:text-xl font-semibold text-white">{user.name}</h3>
                    <p className="text-sm md:text-base text-gray-400 break-all px-2">{user.email}</p>
                    {!isEditing && (
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 25
                        }}
                        onClick={() => setIsEditing(true)}
                        className="glass-button px-4 py-2 md:px-6 md:py-3 ios-rounded-lg text-white flex items-center justify-center space-x-2 press-effect w-auto mx-auto mt-3 min-h-[40px] md:min-h-[44px]"
                      >
                        <Edit3 size={16} className="md:w-4 md:h-4" />
                        <span className="text-sm md:text-base font-medium">Edit Profile</span>
                      </motion.button>
                    )}
                  </div>
                </div>

                <AnimatePresence>
                  {isEditing && (
                    <motion.form
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      onSubmit={handleProfileUpdate}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-white font-medium mb-2 text-sm md:text-base">Name</label>
                        <input
                          type="text"
                          name="name"
                          value={profileData.name}
                          onChange={handleProfileChange}
                          className="w-full glass-input px-4 py-3 md:py-4 ios-rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base min-h-[44px] md:min-h-[48px]"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-white font-medium mb-2 text-sm md:text-base">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={profileData.email}
                          onChange={handleProfileChange}
                          className="w-full glass-input px-4 py-3 md:py-4 ios-rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base min-h-[44px] md:min-h-[48px]"
                          required
                        />
                      </div>

                      <div className="flex flex-col gap-3">
                        <motion.button
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 25
                          }}
                          type="submit"
                          disabled={loading}
                          className="w-full glass-button px-4 py-3 md:py-4 ios-rounded-xl text-white font-medium press-effect disabled:opacity-50 text-sm md:text-base min-h-[44px] md:min-h-[48px]"
                        >
                          {loading ? 'Saving...' : 'Save Changes'}
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 25
                          }}
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="glass-button px-4 py-3 md:py-4 ios-rounded-xl text-white font-medium press-effect flex items-center justify-center min-h-[44px] md:min-h-[48px]"
                        >
                          <X size={20} className="md:w-5 md:h-5" />
                        </motion.button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Account Actions */}
            <motion.div variants={itemVariants} className="glass-card ios-rounded-2xl p-4 md:p-8">
              <h2 className="text-lg md:text-2xl font-bold text-white mb-4 md:mb-6">Account Actions</h2>
              
              <div className="space-y-3 md:space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  }}
                  onClick={() => router.push('/cart')}
                  className="w-full glass-button p-3 md:p-4 ios-rounded-xl text-white flex items-center space-x-3 press-effect min-h-[56px] md:min-h-[64px]"
                >
                  <UserCircle size={18} className="md:w-5 md:h-5 flex-shrink-0" />
                  <div className="text-left min-w-0 flex-1">
                    <div className="font-medium text-sm md:text-base">View Cart</div>
                    <div className="text-xs md:text-sm text-gray-400">Manage your shopping cart</div>
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  }}
                  onClick={() => router.push('/categories')}
                  className="w-full glass-button p-3 md:p-4 ios-rounded-xl text-white flex items-center space-x-3 press-effect min-h-[56px] md:min-h-[64px]"
                >
                  <UserCircle size={18} className="md:w-5 md:h-5 flex-shrink-0" />
                  <div className="text-left min-w-0 flex-1">
                    <div className="font-medium text-sm md:text-base">Browse Products</div>
                    <div className="text-xs md:text-sm text-gray-400">Explore our product catalog</div>
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  }}
                  onClick={handleLogout}
                  className="w-full glass-button p-3 md:p-4 ios-rounded-xl text-red-400 flex items-center space-x-3 press-effect min-h-[56px] md:min-h-[64px]"
                >
                  <UserCircle size={18} className="md:w-5 md:h-5 flex-shrink-0" />
                  <div className="text-left min-w-0 flex-1">
                    <div className="font-medium text-sm md:text-base">Sign Out</div>
                    <div className="text-xs md:text-sm text-red-300">Logout from your account</div>
                  </div>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-4 md:py-8 px-4 sm:px-6 lg:px-8 mobile-container">
      <div className="max-w-md mx-auto mobile-safe">
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
              {isLogin ? <LogIn size={14} className="md:w-4 md:h-4" /> : <UserPlus size={14} className="md:w-4 md:h-4" />}
              <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
            </motion.div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 leading-tight">
              {isLogin ? 'Welcome Back' : 'Join Welinzo'}
            </h1>
            <p className="text-sm md:text-base text-gray-300">
              {isLogin 
                ? 'Sign in to your account to continue shopping' 
                : 'Create your account to start your premium shopping experience'
              }
            </p>
          </div>
        </motion.div>

        {/* Auth Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card ios-rounded-2xl p-4 md:p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-white font-medium mb-2 text-sm md:text-base">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-4 md:h-4" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full glass-input pl-10 pr-4 py-3 md:py-4 ios-rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base min-h-[44px] md:min-h-[48px]"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-white font-medium mb-2 text-sm md:text-base">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-4 md:h-4" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full glass-input pl-10 pr-4 py-3 md:py-4 ios-rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base min-h-[44px] md:min-h-[48px]"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-medium mb-2 text-sm md:text-base">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-4 md:h-4" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full glass-input pl-10 pr-10 py-3 md:py-4 ios-rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base min-h-[44px] md:min-h-[48px]"
                  placeholder="Enter your password"
                  required
                />
                <motion.button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white glass-button w-8 h-8 md:w-10 md:h-10 ios-rounded-lg flex items-center justify-center press-effect"
                >
                  {showPassword ? <EyeOff className="w-4 h-4 md:w-4 md:h-4" /> : <Eye className="w-4 h-4 md:w-4 md:h-4" />}
                </motion.button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-white font-medium mb-2 text-sm md:text-base">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-4 md:h-4" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full glass-input pl-10 pr-4 py-3 md:py-4 ios-rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base min-h-[44px] md:min-h-[48px]"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              </div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-button bg-red-500/10 border border-red-500/20 text-red-400 px-3 py-2 md:py-3 ios-rounded-xl text-sm md:text-base"
              >
                {error}
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25
              }}
              type="submit"
              disabled={loading}
              className="w-full glass-button px-4 py-3 md:py-4 ios-rounded-xl text-white font-semibold press-effect disabled:opacity-50 text-sm md:text-base min-h-[44px] md:min-h-[48px]"
            >
              {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
            </motion.button>
          </form>

          <div className="mt-4 md:mt-6 text-center">
            <p className="text-gray-400 text-sm md:text-base">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25
              }}
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setFormData({ name: '', email: '', password: '', confirmPassword: '' });
              }}
              className="glass-button px-4 py-3 md:py-4 ios-rounded-xl text-blue-400 hover:text-blue-300 font-medium mt-2 press-effect text-sm md:text-base min-h-[44px] md:min-h-[48px] w-full"
            >
              {isLogin ? 'Create Account' : 'Sign In'}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
