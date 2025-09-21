import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Generate minimal, neutral avatars suitable for all users
const generateAvatar = (email: string): string => {
  const avatarStyles = [
    'identicon',    // Minimal geometric patterns
    'bottts',       // Simple robot-style avatars
    'jdenticon',    // Clean geometric designs
    'initials'      // Simple letter-based avatars
  ];
  
  const backgroundColors = [
    '6366f1,3b82f6', // Blue gradient
    '64748b,475569', // Gray gradient
    '1e293b,334155', // Dark gray gradient
    '0f172a,1e293b'  // Very dark gradient
  ];
  
  // Use email hash to consistently select style and colors
  const hash = email.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  const style = avatarStyles[Math.abs(hash) % avatarStyles.length];
  const colors = backgroundColors[Math.abs(hash) % backgroundColors.length];
  
  // For initials style, use the first letter of the email
  if (style === 'initials') {
    const initial = email.charAt(0).toUpperCase();
    return `https://api.dicebear.com/7.x/${style}/svg?seed=${email}&backgroundColor=${colors}&backgroundType=gradientLinear&size=128&fontSize=0.4&fontWeight=600&text=${initial}`;
  }
  
  return `https://api.dicebear.com/7.x/${style}/svg?seed=${email}&backgroundColor=${colors}&backgroundType=gradientLinear&size=128`;
};

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        // Mock authentication - in real app, this would call an API
        if (email && password) {
          const user: User = {
            id: '1',
            email,
            name: email.split('@')[0],
            avatar: generateAvatar(email)
          };
          
          set({
            user,
            isAuthenticated: true
          });
          return true;
        }
        return false;
      },
      register: async (name: string, email: string, password: string) => {
        // Mock registration - in real app, this would call an API
        if (name && email && password) {
          const user: User = {
            id: '1',
            email,
            name,
            avatar: generateAvatar(email)
          };
          
          set({
            user,
            isAuthenticated: true
          });
          return true;
        }
        return false;
      },
      logout: () => {
        set({
          user: null,
          isAuthenticated: false
        });
      },
      updateProfile: (updates: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...updates }
          });
        }
      }
    }),
    {
      name: 'auth-storage',
    }
  )
);
