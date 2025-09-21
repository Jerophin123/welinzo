// Enhanced API Service integrating both FakeStore API and ReactBD Server API
// https://fakestoreapiserver.reactbd.org/

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  // Additional fields from ReactBD API
  _id?: number;
  isNew?: boolean;
  oldPrice?: string;
  discountedPrice?: number;
  stock?: number;
  brand?: string;
  size?: string[];
  type?: string;
  // ID mapping fields
  originalId?: number;
  source?: 'fakestore' | 'reactbd';
}

// Type guard to check if product has ReactBD properties
export const hasReactBDProperties = (product: Product): product is Product & {
  isNew: boolean;
  oldPrice: string;
  discountedPrice: number;
  stock: number;
  brand: string;
  size: string[];
  type: string;
} => {
  return 'isNew' in product || 'oldPrice' in product || 'discountedPrice' in product;
};

export interface Review {
  _id: number;
  userId: number;
  productId: number;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface Category {
  _id: number;
  name: string;
  description: string;
  parentId?: number;
}

export interface Photo {
  _id: number;
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface Post {
  _id: number;
  userId: number;
  title: string;
  body: string;
}

class ApiService {
  private baseUrl = 'https://fakestoreapi.com';
  private reactbdUrl = 'https://fakestoreapiserver.reactbd.org/api';

  // Products API - Enhanced with ReactBD data and sequential ID mapping
  async getAllProducts(): Promise<Product[]> {
    try {
      // Fetch from main APIs only
      const [mainProducts, reactbdProducts] = await Promise.all([
        fetch(`${this.baseUrl}/products`).then(res => res.json()),
        fetch(`${this.reactbdUrl}/products`).then(res => res.json()).catch(() => ({ data: [] }))
      ]);

      console.log(`FakeStore products: ${mainProducts.length}`);
      console.log(`ReactBD products: ${reactbdProducts.data ? reactbdProducts.data.length : 0}`);

      // Remap FakeStore products starting from ID 1
      const remappedMainProducts = mainProducts.map((product: Record<string, unknown>, index: number) => ({
        ...product,
        id: index + 1, // Start from 1, continue sequentially
        originalId: product.id, // Keep original ID for reference
        source: 'fakestore' // Add source identifier
      }));

      // Start ReactBD products from where FakeStore products end
      let reactbdIdCounter = mainProducts.length + 1; // Continue from FakeStore's last ID + 1
      const remappedReactbdProducts: Product[] = [];
      
      if (reactbdProducts.data && Array.isArray(reactbdProducts.data)) {
        console.log(`Processing ${reactbdProducts.data.length} ReactBD products starting from ID ${reactbdIdCounter}`);
        
        reactbdProducts.data.forEach((product: Record<string, unknown>, index: number) => {
          const enhancedProduct: Product = {
            id: reactbdIdCounter++, // Continue from FakeStore's last ID + 1
            title: String(product.title || ''),
            price: parseFloat(String(product.price || 0)),
            description: String(product.description || ''),
            category: String(product.category || ''),
            image: String(product.image || ''),
            rating: {
              rate: Number(product.rating) || 0,
              count: Math.floor(Math.random() * 100) + 1
            },
            _id: Number(product._id) || 0, // Keep original ReactBD ID
            originalId: Number(product._id) || 0, // Keep original ID for reference
            isNew: Boolean(product.isNew),
            oldPrice: String(product.oldPrice || ''),
            discountedPrice: Number(product.discountedPrice) || 0,
            stock: Number(product.stock) || 0,
            brand: String(product.brand || ''),
            size: Array.isArray(product.size) ? product.size.map(String) : [],
            type: String(product.type || ''),
            source: 'reactbd' // Add source identifier
          };
          
          // Add ReactBD product (less strict duplicate checking to ensure we get ReactBD products)
          const isDuplicate = remappedMainProducts.find((p: Product) => 
            p.title === enhancedProduct.title && p.source === 'fakestore'
          );
          
          if (!isDuplicate) {
            remappedReactbdProducts.push(enhancedProduct);
            console.log(`Added ReactBD product: ID ${enhancedProduct.id}, Title: ${enhancedProduct.title}`);
          } else {
            console.log(`Skipped duplicate ReactBD product: ${enhancedProduct.title}`);
          }
        });
      } else {
        console.log('No ReactBD products data found or data is not an array');
      }

      // Combine both remapped product lists
      const mergedProducts = [...remappedMainProducts, ...remappedReactbdProducts];
      console.log(`Total merged products: ${mergedProducts.length}`);
      console.log(`FakeStore products in merged: ${mergedProducts.filter(p => p.source === 'fakestore').length}`);
      console.log(`ReactBD products in merged: ${mergedProducts.filter(p => p.source === 'reactbd').length}`);
      
      return mergedProducts;
    } catch (error) {
      console.error('Error fetching all products:', error);
      // Fallback to main API only
      const response = await fetch(`${this.baseUrl}/products`);
      const fallbackProducts = await response.json();
      return fallbackProducts.map((product: Record<string, unknown>, index: number) => ({
        ...product,
        id: index + 1,
        originalId: product.id,
        source: 'fakestore'
      }));
    }
  }

  async getProduct(id: number): Promise<Product> {
    console.log(`Looking for product with ID: ${id}`);
    
    // Always use the merged product list first since it contains all remapped products
    try {
      const allProducts = await this.getAllProducts();
      console.log(`Total products in merged list: ${allProducts.length}`);
      console.log(`FakeStore products: ${allProducts.filter(p => p.source === 'fakestore').length}`);
      console.log(`ReactBD products: ${allProducts.filter(p => p.source === 'reactbd').length}`);
      
      const foundProduct = allProducts.find(p => p.id === id);
      if (foundProduct) {
        console.log(`Found product: ID ${foundProduct.id}, Title: ${foundProduct.title}, Source: ${foundProduct.source}`);
        return foundProduct;
      } else {
        console.log(`Product with ID ${id} not found in merged list`);
        console.log('Available IDs:', allProducts.map(p => `${p.id}(${p.source})`).join(', '));
      }
    } catch (error) {
      console.error('Error fetching from merged products:', error);
    }

    // Fallback: If not found in merged list, try direct API calls
    // This should rarely happen since all products should be in the merged list
    if (id >= 1 && id <= 10) {
      // Try FakeStore API for IDs 1-10 (fallback only)
      try {
        const response = await fetch(`${this.baseUrl}/products/${id}`);
        if (response.ok) {
          const product = await response.json();
          return {
            ...product,
            id: id,
            originalId: product.id,
            source: 'fakestore',
            rating: product.rating || { rate: 0, count: 0 }
          };
        }
      } catch (error) {
        console.error('FakeStore API fallback failed:', error);
      }
    }

    throw new Error(`Product with ID ${id} not found`);
  }

  // Category mapping for different APIs
  private getCategoryMapping(category: string): string[] {
    const categoryLower = category.toLowerCase();
    const mappings: Record<string, string[]> = {
      'electronics': ['electronics', 'Electronics'],
      'jewelery': ['jewelery', 'jewelry'],
      "men's clothing": ["men's clothing", 'Fashion'],
      "women's clothing": ["women's clothing", 'Fashion'],
      'fashion': ['Fashion', "men's clothing", "women's clothing"],
      'home & garden': ['Home & Garden', 'Home Decoration'],
      'sports & outdoors': ['Sports & Outdoors', 'Equipments'],
      'beauty & personal care': ['Beauty & Personal Care', 'Beauty Product'],
      'cameras': ['Electronics', 'Cameras'],
      'smartphones': ['Electronics', 'Smartphones'],
      'audio': ['Electronics', 'Audio'],
      'accessories': ['Accessories', 'Fashion'],
      'furniture': ['Furniture', 'Home & Garden'],
      'outdoor decor': ['Outdoor Decor', 'Home & Garden'],
      'campaign gear': ['Campaign Gear', 'Sports & Outdoors'],
      'athletic wear': ['Athletic Wear', 'Sports & Outdoors'],
      'skincare': ['Skincare', 'Beauty & Personal Care'],
      'makeup': ['Makeup', 'Beauty & Personal Care'],
      'action cameras': ['Action Cameras', 'Electronics'],
      'wireless earbuds': ['Wireless Earbuds', 'Electronics'],
      'sunglasses': ['Sunglasses', 'Accessories']
    };
    
    return mappings[categoryLower] || [category];
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      console.log(`Fetching products for category: ${category}`);
      
      // Use the same sequential ID mapping approach as getAllProducts
      const allProducts = await this.getAllProducts();
      const categoryMappings = this.getCategoryMapping(category);
      
      console.log(`Category mappings for "${category}":`, categoryMappings);
      
      // Filter products by category using the same mapping logic
      const categoryProducts = allProducts.filter(product => {
        const productCategory = product.category.toLowerCase();
        return categoryMappings.some(mapping => 
          mapping.toLowerCase() === productCategory
        );
      });
      
      console.log(`Found ${categoryProducts.length} products for category "${category}"`);
      console.log(`FakeStore products: ${categoryProducts.filter(p => p.source === 'fakestore').length}`);
      console.log(`ReactBD products: ${categoryProducts.filter(p => p.source === 'reactbd').length}`);
      
      return categoryProducts;
    } catch (error) {
      console.error('Error fetching products by category:', error);
      // Fallback to main API only
      try {
        const response = await fetch(`${this.baseUrl}/products/category/${category}`);
        const fallbackProducts = await response.json();
        return fallbackProducts.map((product: Record<string, unknown>, index: number) => ({
          ...product,
          id: index + 1,
          originalId: product.id,
          source: 'fakestore'
        }));
      } catch (fallbackError) {
        console.error('Fallback also failed:', fallbackError);
        return [];
      }
    }
  }

  async getCategories(): Promise<string[]> {
    try {
      const [mainCategories, reactbdCategories] = await Promise.all([
        fetch(`${this.baseUrl}/products/categories`).then(res => res.json()),
        fetch(`${this.reactbdUrl}/categories`).then(res => res.json()).catch(() => ({ data: [] }))
      ]);

      // Start with main categories
      const mergedCategories = [...mainCategories];
      
      // Add ReactBD categories (these are the working ones)
      if (reactbdCategories.data) {
        reactbdCategories.data.forEach((category: Record<string, unknown>) => {
          const categoryName = String(category.name || '');
          if (categoryName && !mergedCategories.includes(categoryName.toLowerCase())) {
            mergedCategories.push(categoryName.toLowerCase());
          }
        });
      }

      // Return working categories that have products
      return mergedCategories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Fallback to main API categories
      try {
        const response = await fetch(`${this.baseUrl}/products/categories`);
        return response.json();
      } catch (fallbackError) {
        console.error('Fallback also failed:', fallbackError);
        return ['electronics', 'jewelery', "men's clothing", "women's clothing"];
      }
    }
  }

  // Enhanced product methods
  async getFeaturedProducts(limit: number = 8): Promise<Product[]> {
    const products = await this.getAllProducts();
    // Prioritize new products and high-rated ones
    const featured = products
      .filter(p => p.rating.rate >= 4.0 || p.isNew)
      .sort((a, b) => b.rating.rate - a.rating.rate);
    return featured.slice(0, limit);
  }

  async getSpecialOffers(limit: number = 3): Promise<Product[]> {
    const products = await this.getAllProducts();
    // Filter products with discounts
    const specialOffers = products.filter(product => 
      product.discountedPrice || 
      product.oldPrice || 
      product.price < 50
    );
    return specialOffers.slice(0, limit);
  }

  async getHotDeals(limit: number = 4): Promise<Product[]> {
    const products = await this.getAllProducts();
    // Filter products with high ratings, good prices, and discounts
    const hotDeals = products.filter(product => {
      const hasHighRating = product.rating.rate >= 4.0;
      const hasGoodPrice = product.price < 100;
      const hasDiscount = product.discountedPrice && product.discountedPrice < product.price;
      const isNewProduct = product.isNew;
      const hasStock = product.stock && product.stock > 0;
      
      // Prioritize products with discounts, then high ratings, then new products
      return (hasDiscount || hasHighRating || isNewProduct) && hasGoodPrice && hasStock;
    });
    
    // Sort by discount percentage (if available), then by rating, then by price
    const sortedHotDeals = hotDeals.sort((a, b) => {
      // First priority: products with actual discounts
      if (a.discountedPrice && b.discountedPrice) {
        const discountA = ((a.price - a.discountedPrice) / a.price) * 100;
        const discountB = ((b.price - b.discountedPrice) / b.price) * 100;
        return discountB - discountA;
      }
      if (a.discountedPrice && !b.discountedPrice) return -1;
      if (!a.discountedPrice && b.discountedPrice) return 1;
      
      // Second priority: rating
      if (b.rating.rate !== a.rating.rate) {
        return b.rating.rate - a.rating.rate;
      }
      
      // Third priority: price (lower is better for deals)
      return a.price - b.price;
    });
    
    return sortedHotDeals.slice(0, limit);
  }

  async searchProducts(query: string): Promise<Product[]> {
    const products = await this.getAllProducts();
    const searchTerm = query.toLowerCase();
    
    return products.filter(product =>
      product.title.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      (product.brand && product.brand.toLowerCase().includes(searchTerm)) ||
      (product.type && product.type.toLowerCase().includes(searchTerm))
    );
  }

  // Reviews API
  async getProductReviews(productId: number): Promise<Review[]> {
    try {
      const response = await fetch(`${this.reactbdUrl}/reviews`);
      const data = await response.json();
      return data.data.filter((review: Review) => review.productId === productId);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      return [];
    }
  }

  async getAllReviews(): Promise<Review[]> {
    try {
      const response = await fetch(`${this.reactbdUrl}/reviews`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching all reviews:', error);
      return [];
    }
  }

  // Comments API
  async getComments(): Promise<Comment[]> {
    try {
      const response = await fetch(`${this.reactbdUrl}/comments`);
      const data = await response.json();
      return data.data || data;
    } catch (error) {
      console.error('Error fetching comments:', error);
      return [];
    }
  }

  async getCommentsByPost(postId: number): Promise<Comment[]> {
    try {
      const response = await fetch(`${this.reactbdUrl}/comments`);
      const data = await response.json();
      const comments = data.data || data;
      return comments.filter((comment: Comment) => comment.postId === postId);
    } catch (error) {
      console.error('Error fetching comments by post:', error);
      return [];
    }
  }

  // Photos API
  async getPhotos(): Promise<Photo[]> {
    try {
      const response = await fetch(`${this.reactbdUrl}/photos`);
      const data = await response.json();
      return data.data || data;
    } catch (error) {
      console.error('Error fetching photos:', error);
      return [];
    }
  }

  async getPhoto(id: number): Promise<Photo | null> {
    try {
      const response = await fetch(`${this.reactbdUrl}/photos/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching photo:', error);
      return null;
    }
  }

  // Posts API
  async getPosts(): Promise<Post[]> {
    try {
      const response = await fetch(`${this.reactbdUrl}/posts`);
      const data = await response.json();
      return data.data || data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      return [];
    }
  }

  async getPost(id: number): Promise<Post | null> {
    try {
      const response = await fetch(`${this.reactbdUrl}/posts/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching post:', error);
      return null;
    }
  }

  // Utility methods
  async getProductsWithDiscount(): Promise<Product[]> {
    const products = await this.getAllProducts();
    return products.filter(product => 
      product.discountedPrice || 
      product.oldPrice
    );
  }

  async getNewProducts(): Promise<Product[]> {
    const products = await this.getAllProducts();
    return products.filter(product => product.isNew);
  }

  async getProductsByBrand(brand: string): Promise<Product[]> {
    const products = await this.getAllProducts();
    return products.filter(product => 
      product.brand && 
      product.brand.toLowerCase().includes(brand.toLowerCase())
    );
  }

  async getProductsByType(type: string): Promise<Product[]> {
    const products = await this.getAllProducts();
    return products.filter(product => 
      product.type && 
      product.type.toLowerCase().includes(type.toLowerCase())
    );
  }

  async getInStockProducts(): Promise<Product[]> {
    const products = await this.getAllProducts();
    return products.filter(product => 
      product.stock === undefined || 
      product.stock > 0
    );
  }

  async getRelatedProducts(productId: number): Promise<Product[]> {
    try {
      const product = await this.getProduct(productId);
      const categoryProducts = await this.getProductsByCategory(product.category);
      return categoryProducts.filter(p => p.id !== productId).slice(0, 4);
    } catch (error) {
      console.error('Error fetching related products:', error);
      return [];
    }
  }



  // Get premium products (high-priced items)
  async getPremiumProducts(limit: number = 8): Promise<Product[]> {
    const products = await this.getAllProducts();
    return products
      .filter(p => p.price > 100)
      .sort((a, b) => b.price - a.price)
      .slice(0, limit);
  }

  // Get budget products (low-priced items)
  async getBudgetProducts(limit: number = 8): Promise<Product[]> {
    const products = await this.getAllProducts();
    return products
      .filter(p => p.price < 50)
      .sort((a, b) => a.price - b.price)
      .slice(0, limit);
  }

  // Get working categories with product counts
  async getWorkingCategories(): Promise<{ name: string; count: number; displayName: string }[]> {
    try {
      const allProducts = await this.getAllProducts();
      const categoryCounts: Record<string, number> = {};
      
      console.log(`Counting products for categories from ${allProducts.length} total products`);
      
      // Count products by category
      allProducts.forEach(product => {
        const category = product.category.toLowerCase();
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
      });

      console.log('Category counts:', categoryCounts);

      // Create category display mapping
      const categoryDisplayNames: Record<string, string> = {
        'electronics': 'Electronics',
        'jewelery': 'Jewelry',
        "men's clothing": "Men's Clothing",
        "women's clothing": "Women's Clothing",
        'fashion': 'Fashion',
        'home & garden': 'Home & Garden',
        'sports & outdoors': 'Sports & Outdoors',
        'beauty & personal care': 'Beauty & Personal Care',
        'beauty product': 'Beauty Products',
        'equipments': 'Equipment',
        'home decoration': 'Home Decoration'
      };

      // Return categories with counts, sorted by count
      const workingCategories = Object.entries(categoryCounts)
        .filter(([_, count]) => count > 0)
        .map(([name, count]) => ({
          name,
          count,
          displayName: categoryDisplayNames[name] || name.charAt(0).toUpperCase() + name.slice(1)
        }))
        .sort((a, b) => b.count - a.count);
        
      console.log(`Working categories: ${workingCategories.length}`, workingCategories);
      return workingCategories;
    } catch (error) {
      console.error('Error getting working categories:', error);
      return [
        { name: 'electronics', count: 0, displayName: 'Electronics' },
        { name: 'jewelery', count: 0, displayName: 'Jewelry' },
        { name: "men's clothing", count: 0, displayName: "Men's Clothing" },
        { name: "women's clothing", count: 0, displayName: "Women's Clothing" }
      ];
    }
  }
}

// Export singleton instance
export const apiService = new ApiService();
export default apiService;
