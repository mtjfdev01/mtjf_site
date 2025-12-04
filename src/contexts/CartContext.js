import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CartContext = createContext();

// localStorage key for cart data
const CART_STORAGE_KEY = 'apna_ghar_cart';

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Load cart from localStorage on component mount
  useEffect(() => {
    const loadCartFromStorage = () => {
      try {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          setCartItems(parsedCart);
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        // Clear corrupted data
        localStorage.removeItem(CART_STORAGE_KEY);
      }
    };

    loadCartFromStorage();
  }, []);

  // Save cart to localStorage whenever cartItems changes
  useEffect(() => {
    const saveCartToStorage = () => {
      try {
        if (cartItems.length > 0) {
          localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
        } else {
          // Clear localStorage if cart is empty
          localStorage.removeItem(CART_STORAGE_KEY);
        }
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    };

    saveCartToStorage();
  }, [cartItems]);

  const addToCart = (item, quantity) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        // Update quantity if item already exists
        return prevItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      } else {
        // Add new item to cart
        return [...prevItems, { ...item, quantity }];
      }
    });
  };

  const updateQuantity = (itemId, newQuantity) => { 
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeFromCart = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const clearCart = () => {
    setCartItems([]);
    // localStorage will be cleared automatically by the useEffect
    // but we can also clear it explicitly for immediate feedback
    localStorage.removeItem(CART_STORAGE_KEY);
  };

  const addCustomDonation = (amount, description = 'Custom Donation') => {
    // Validate amount
    if (!amount || amount <= 0) {
      console.error('Invalid donation amount:', amount);
      return false;
    }

    // Create custom donation item 
    const customItem = {
      id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // Unique ID
      title: description,
      subtitle: 'Custom Amount Donation',
      price: amount,
      quantity: 1,
      isCustom: true, // Flag to identify custom donations
      iconClass: null // Custom donations don't have icons
    };

    // Add to cart
    addToCart(customItem, 1);
    return true;
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const shortDonate = () => {
    const isOnHomePage = location.pathname === '/' || location.pathname === '/home';
    
    if (isOnHomePage) {
      // If already on home page, focus on donation form
      setTimeout(() => {
        const donationForm = document.getElementById('home-donation-form') || 
                            document.querySelector('.donation-form');
        if (donationForm) {
          donationForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Focus on the first input field in the form
          const firstInput = donationForm.querySelector('input, select, button');
          if (firstInput) {
            firstInput.focus();
          }
        }
      }, 100);
    } else {
      // Navigate to home page, then focus on donation form
      navigate('/');
      setTimeout(() => {
        const donationForm = document.getElementById('home-donation-form') || 
                            document.querySelector('.donation-form');
        if (donationForm) {
          donationForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Focus on the first input field in the form
          const firstInput = donationForm.querySelector('input, select, button');
          if (firstInput) {
            firstInput.focus();
          }
        }
      }, 300); // Slightly longer delay to allow navigation to complete
    }
  };

  const handleVolunteerRegistration = () => {
    const isOnVolunteerPage = location.pathname === '/volunteerRegistration';
    
    if (!isOnVolunteerPage) {
      navigate('/volunteerRegistration', { replace: false });
      // Scroll to top of page after navigation
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  const value = {
    cartItems,
    isCartOpen,
    addToCart,
    updateQuantity,
    removeFromCart,
    getCartTotal,
    getCartItemCount,
    clearCart,
    addCustomDonation,
    openCart,
    closeCart,
    shortDonate,
    handleVolunteerRegistration
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
