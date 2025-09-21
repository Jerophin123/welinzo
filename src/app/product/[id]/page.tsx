'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  ShoppingBag, 
  Heart, 
  Star, 
  Truck, 
  Shield, 
  RotateCcw, 
  Plus,
  Minus,
  Share2,
  Eye
} from 'lucide-react';
import { useCartStore, Product } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { apiService } from '@/services/apiService';
import ProductReviews from '@/components/ProductReviews';
import ProductComments from '@/components/ProductComments';
import Link from 'next/link';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { addItem } = useCartStore();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [relatedLoading, setRelatedLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  useEffect(() => {
    if (product) {
      fetchRelatedProducts();
    }
  }, [product]);

  const fetchProduct = async () => {
    try {
      const data = await apiService.getProduct(Number(params.id));
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedProducts = async () => {
    if (!product) return;
    
    try {
      setRelatedLoading(true);
      const data = await apiService.getRelatedProducts(product.id);
      setRelatedProducts(data);
    } catch (error) {
      console.error('Error fetching related products:', error);
    } finally {
      setRelatedLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addItem(product);
      }
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleWishlistToggle = () => {
    if (product) {
      if (isInWishlist(product.id)) {
        removeFromWishlist(product.id);
      } else {
        addToWishlist(product);
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 md:px-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="glass-card p-6 md:p-12 ios-rounded-2xl text-center relative z-50 w-full max-w-sm md:max-w-md mx-auto"
        >
          <div className="w-10 h-10 md:w-16 md:h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3 md:mb-4"></div>
          <p className="text-white text-sm md:text-lg">Loading product...</p>
        </motion.div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 md:p-12 ios-rounded-2xl text-center"
        >
          <p className="text-white text-sm md:text-lg mb-4 md:mb-6">Product not found</p>
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25
              }}
              className="glass-button px-4 py-2.5 md:px-6 md:py-3 ios-rounded-xl text-white font-semibold flex items-center space-x-2 mx-auto text-sm md:text-base"
            >
              <ArrowLeft size={16} className="md:w-5 md:h-5" />
              <span>Back to Home</span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  // Create multiple images for the product (using the same image for demo)
  const productImages = [product.image, product.image, product.image];

  return (
    <div className="min-h-screen py-4 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 md:mb-8"
        >
          <motion.button
            onClick={() => router.back()}
            whileHover={{ scale: 1.05, x: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25
            }}
            className="glass-button px-4 py-2.5 md:px-6 md:py-3 ios-rounded-xl text-white font-semibold flex items-center space-x-2 text-sm md:text-base"
          >
            <ArrowLeft size={16} className="md:w-5 md:h-5" />
            <span>Back</span>
          </motion.button>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12"
        >
          {/* Product Images */}
          <motion.div variants={itemVariants} className="space-y-4 md:space-y-6">
            {/* Main Image */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25
              }}
              className="glass-card ios-rounded-2xl overflow-hidden"
            >
              <img
                src={productImages[selectedImage]}
                alt={product.title}
                className="w-full h-64 md:h-96 object-cover"
              />
            </motion.div>

            {/* Thumbnail Images */}
            <div className="flex space-x-3 md:space-x-4">
              {productImages.map((image, index) => (
                <motion.button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  }}
                  className={`glass-button w-16 h-16 md:w-20 md:h-20 ios-rounded-xl overflow-hidden ${
                    selectedImage === index ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div variants={itemVariants} className="space-y-6 md:space-y-8">
            {/* Product Title and Rating */}
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl md:text-4xl font-bold text-white mb-3 md:mb-4"
              >
                {product.title}
              </motion.h1>
              
              {/* Category and Stock Status */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-3 md:mb-4"
              >
                {/* Category Badge */}
                <div className="glass-button px-3 py-1.5 md:px-4 md:py-2 ios-rounded-lg">
                  <span className="text-white/90 text-xs md:text-sm font-medium capitalize">
                    {product.category}
                  </span>
                </div>
                
                {/* In Stock Label */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg blur-sm group-hover:blur-md transition-all duration-300"></div>
                  <div className="relative glass-card px-3 py-1.5 md:px-4 md:py-2 ios-rounded-lg bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-300 shadow-lg shadow-green-500/10 hover:shadow-green-500/20">
                    <div className="flex items-center space-x-1.5 md:space-x-2">
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-400 rounded-full animate-pulse shadow-sm shadow-green-400/50"></div>
                      <span className="text-green-400 text-xs md:text-sm font-semibold">In Stock</span>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center space-x-3 md:space-x-4 mb-4 md:mb-6"
              >
                <div className="flex items-center space-x-1.5 md:space-x-2 glass-button px-3 py-1.5 md:px-4 md:py-2 ios-rounded-lg">
                  <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-current" />
                  <span className="text-white font-semibold text-sm md:text-base">{product.rating.rate}</span>
                </div>
                <span className="text-gray-400 text-xs md:text-base">({product.rating.count} reviews)</span>
              </motion.div>
            </div>

            {/* Price */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-4 md:p-6 ios-rounded-xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-xs md:text-sm mb-1">Price</p>
                  <p className="text-2xl md:text-3xl font-bold text-white">${product.price}</p>
                </div>
                <motion.button
                  onClick={handleWishlistToggle}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  }}
                  className={`glass-button w-10 h-10 md:w-12 md:h-12 ios-rounded-xl flex items-center justify-center ${
                    product && isInWishlist(product.id) ? 'text-red-500' : 'text-gray-400'
                  }`}
                >
                  <Heart size={20} className={`md:w-6 md:h-6 ${product && isInWishlist(product.id) ? 'fill-current' : ''}`} />
                </motion.button>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-card p-4 md:p-6 ios-rounded-xl"
            >
              <h3 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-3">Description</h3>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">{product.description}</p>
            </motion.div>

            {/* Quantity Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="glass-card p-4 md:p-6 ios-rounded-xl"
            >
              <h3 className="text-lg md:text-xl font-semibold text-white mb-3 md:mb-4">Quantity</h3>
              <div className="flex items-center space-x-3 md:space-x-4">
                <motion.button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  }}
                  className="glass-button w-8 h-8 md:w-10 md:h-10 ios-rounded-lg flex items-center justify-center text-white"
                >
                  <Minus size={16} className="md:w-5 md:h-5" />
                </motion.button>
                
                <div className="glass-button px-4 py-2 md:px-6 md:py-3 ios-rounded-lg">
                  <span className="text-white text-lg md:text-xl font-semibold">{quantity}</span>
                </div>
                
                <motion.button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  }}
                  className="glass-button w-8 h-8 md:w-10 md:h-10 ios-rounded-lg flex items-center justify-center text-white"
                >
                  <Plus size={16} className="md:w-5 md:h-5" />
                </motion.button>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="space-y-3 md:space-y-4"
            >
              <motion.button
                onClick={handleAddToCart}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25
                }}
                className="w-full glass-button py-3 md:py-4 ios-rounded-xl text-white font-semibold text-sm md:text-lg flex items-center justify-center space-x-2 md:space-x-3 press-effect"
              >
                <ShoppingBag size={20} className="md:w-6 md:h-6" />
                <span>Add to Cart - ${(product.price * quantity).toFixed(2)}</span>
              </motion.button>

              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  }}
                  className="glass-button py-2.5 md:py-3 ios-rounded-xl text-white font-semibold flex items-center justify-center space-x-1.5 md:space-x-2 press-effect text-sm md:text-base"
                >
                  <Share2 size={16} className="md:w-5 md:h-5" />
                  <span>Share</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  }}
                  className="glass-button py-2.5 md:py-3 ios-rounded-xl text-white font-semibold flex items-center justify-center space-x-1.5 md:space-x-2 press-effect text-sm md:text-base"
                >
                  <Eye size={16} className="md:w-5 md:h-5" />
                  <span>Preview</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25
                }}
                className="glass-card p-3 md:p-4 ios-rounded-xl text-center"
              >
                <Truck className="w-6 h-6 md:w-8 md:h-8 text-blue-400 mx-auto mb-1.5 md:mb-2" />
                <p className="text-white font-semibold text-xs md:text-sm">Free Shipping</p>
                <p className="text-gray-400 text-xs">On orders over $50</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25
                }}
                className="glass-card p-3 md:p-4 ios-rounded-xl text-center"
              >
                <RotateCcw className="w-6 h-6 md:w-8 md:h-8 text-green-400 mx-auto mb-1.5 md:mb-2" />
                <p className="text-white font-semibold text-xs md:text-sm">Easy Returns</p>
                <p className="text-gray-400 text-xs">30-day return policy</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25
                }}
                className="glass-card p-3 md:p-4 ios-rounded-xl text-center"
              >
                <Shield className="w-6 h-6 md:w-8 md:h-8 text-purple-400 mx-auto mb-1.5 md:mb-2" />
                <p className="text-white font-semibold text-xs md:text-sm">Secure Payment</p>
                <p className="text-gray-400 text-xs">SSL encrypted</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Product Reviews */}
        {product && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12 md:mt-16"
          >
            <ProductReviews productId={product.id} />
          </motion.section>
        )}

        {/* Product Comments */}
        {product && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-12 md:mt-16"
          >
            <ProductComments productId={product.id} />
          </motion.section>
        )}

        {/* Related Products Section */}
        {product && (
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-16 md:mt-20"
          >
            <div className="text-center mb-8 md:mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4"
              >
                Related <span className="gradient-text">Products</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="text-sm md:text-xl text-gray-300 max-w-2xl mx-auto"
              >
                Discover more products in the {product.category} category
              </motion.p>
            </div>

            {relatedLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {[...Array(4)].map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                    className="glass-card ios-rounded-2xl p-4 md:p-6 animate-pulse"
                  >
                    <div className="w-full h-40 md:h-48 bg-gray-700 rounded-lg mb-3 md:mb-4"></div>
                    <div className="h-3 md:h-4 bg-gray-700 rounded mb-1.5 md:mb-2"></div>
                    <div className="h-3 md:h-4 bg-gray-700 rounded w-3/4 mb-3 md:mb-4"></div>
                    <div className="h-6 md:h-8 bg-gray-700 rounded"></div>
                  </motion.div>
                ))}
              </div>
            ) : relatedProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {relatedProducts.map((relatedProduct, index) => (
                  <motion.div
                    key={relatedProduct.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
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
                      <Link href={`/product/${relatedProduct.id}`}>
                        <img
                          src={relatedProduct.image}
                          alt={relatedProduct.title}
                          className="w-full h-40 md:h-48 object-cover group-hover:scale-110 transition-transform duration-300 cursor-pointer"
                        />
                      </Link>
                      <div className="absolute top-3 right-3 md:top-4 md:right-4">
                        <div className="glass-button ios-rounded-xl px-2 py-1 md:px-3 md:py-1 flex items-center space-x-1">
                          <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 fill-current" />
                          <span className="text-white text-xs md:text-sm font-medium">
                            {relatedProduct.rating.rate}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 md:p-6">
                      <Link href={`/product/${relatedProduct.id}`}>
                        <h3 className="text-sm md:text-lg font-semibold text-white mb-1 md:mb-2 line-clamp-2 hover:text-blue-300 transition-colors duration-300 cursor-pointer">
                          {relatedProduct.title}
                        </h3>
                      </Link>
                      <p className="text-gray-400 text-xs md:text-sm mb-2 md:mb-4 line-clamp-2">
                        {relatedProduct.description}
                      </p>
                      
                      <div className="flex items-center justify-between mb-2 md:mb-4">
                        <span className="text-lg md:text-2xl font-bold text-white">
                          ${relatedProduct.price}
                        </span>
                        <span className="text-xs md:text-sm text-gray-400">
                          {relatedProduct.rating.count} reviews
                        </span>
                      </div>
                      
                      <div className="flex gap-1.5 md:gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => addItem(relatedProduct)}
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
                        <Link href={`/product/${relatedProduct.id}`}>
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
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="text-center py-12 md:py-16"
              >
                <div className="text-4xl md:text-6xl mb-3 md:mb-4">🔍</div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">No Related Products Found</h3>
                <p className="text-gray-400 mb-4 md:mb-6 text-sm md:text-base">Check back later for more products in this category.</p>
                <Link href="/categories">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="glass-button px-4 py-2.5 md:px-6 md:py-3 ios-rounded-xl text-white font-semibold press-effect text-sm md:text-base"
                  >
                    Browse All Categories
                  </motion.button>
                </Link>
              </motion.div>
            )}
          </motion.section>
        )}
      </div>
    </div>
  );
}
