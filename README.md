# Welinzo - Premium E-Commerce Experience

A modern, premium E-Commerce web application built with Next.js featuring Apple-style liquid glass effects, dark theme, and smooth animations.

## ✨ Features

### 🎨 Design & UI
- **Liquid Glass Effects**: Apple-inspired glassmorphism design throughout the app
- **Dark Theme**: Consistent dark theme with gradient backgrounds
- **Smooth Animations**: Framer Motion powered animations and transitions
- **Responsive Design**: Fully responsive across all device sizes
- **Premium Feel**: High-quality UI components with attention to detail

### 🛍️ E-Commerce Features
- **Product Catalog**: Dynamic product loading from FakeStore API
- **Category Filtering**: Browse products by categories
- **Advanced Search**: Search products with filters and sorting
- **Shopping Cart**: Full cart functionality with add/update/remove items
- **User Authentication**: Login/registration system with profile management
- **Secure Checkout**: Multi-step checkout process with form validation
- **Payment Gateway**: Mock Stripe integration for payment processing
- **Order Confirmation**: Detailed order summary and receipt

### 🚀 Technical Features
- **Next.js 15**: Latest Next.js with App Router
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Advanced animations and transitions
- **Zustand**: Lightweight state management
- **Lucide React**: Beautiful icon library
- **FakeStore API**: Real product data integration

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Icons**: Lucide React
- **API**: FakeStore API
- **Payment**: Mock Stripe integration

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd welinzo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Pages & Features

### 🏠 Home Page
- Hero section with liquid glass effects
- Feature highlights with animations
- Call-to-action sections
- Floating background elements

### 🛍️ Categories Page
- Dynamic category loading from API
- Product grid with glass cards
- Category filtering
- Add to cart functionality
- Product ratings and reviews

### 🔍 Search Page
- Advanced search functionality
- Real-time filtering
- Sort by price, rating, name
- Price range filtering
- Responsive search results

### 👤 Account Page
- User registration and login
- Profile management
- Account settings
- Authentication state management

### 🛒 Cart Page
- Shopping cart management
- Quantity updates
- Item removal
- Order summary
- Checkout integration

### 💳 Checkout Page
- Multi-step checkout process
- Shipping information form
- Payment form with validation
- Order review
- Secure payment processing

### ✅ Payment Success Page
- Order confirmation
- Receipt download
- Order tracking information
- Next steps guidance

## 🎨 Design System

### Liquid Glass Effects
- `glass`: Basic glass effect with backdrop blur
- `glass-card`: Enhanced glass effect for cards
- `glass-button`: Interactive glass buttons
- `glass-dark`: Dark variant for navigation

### Color Palette
- **Primary**: Blue to Purple gradients
- **Background**: Dark gradient (gray-900 to purple-900)
- **Text**: White and gray variants
- **Accents**: Blue, purple, green, red for different states

### Animations
- **Float Animation**: Subtle floating effect for background elements
- **Glow Animation**: Pulsing glow effect for buttons
- **Shimmer Effect**: Loading shimmer animation
- **Hover Effects**: Scale and transform on hover
- **Page Transitions**: Smooth page-to-page transitions

## 🔧 Customization

### Adding New Products
The app uses the FakeStore API for product data. To add custom products, you can:
1. Modify the API calls in the components
2. Create a custom API endpoint
3. Use a different product API

### Styling Customization
- Modify `globals.css` for global styles
- Update Tailwind config for custom colors
- Adjust glass effects in CSS classes
- Customize animations in Framer Motion

### State Management
- Cart state is managed with Zustand
- User authentication state is persistent
- All state is stored in localStorage

## 📦 Build & Deployment

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [FakeStore API](https://fakestoreapi.com/) for product data
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Lucide](https://lucide.dev/) for icons
- [Tailwind CSS](https://tailwindcss.com/) for styling

---

**Welinzo** - Experience the future of online shopping with premium design and smooth interactions.