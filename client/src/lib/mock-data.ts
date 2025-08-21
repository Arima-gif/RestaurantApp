// Mock data for frontend-only operation
import { nanoid } from 'nanoid';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
  discount: number;
  isRecommended: boolean;
  isDeal: boolean;
}

export interface Order {
  id: string;
  tableNumber: number;
  items: string; // JSON string
  total: string;
  status: string;
  paymentMethod: string | null;
  tip: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceRequest {
  id: string;
  tableNumber: number;
  type: string;
  details: string | null;
  status: string;
  createdAt: Date;
}

export interface Review {
  id: string;
  orderId: string;
  rating: number;
  comment: string | null;
  createdAt: Date;
}

// Mock menu items
export const mockMenuItems: MenuItem[] = [
  {
    id: nanoid(),
    name: "Pizza Combo",
    description: "A juicy and flavorful pizza topped with marinated chicken fajita strips, bell peppers, onions, jalapeños, mozzarella cheese.",
    price: "550.00",
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    discount: 0,
    isRecommended: false,
    isDeal: false,
  },
  {
    id: nanoid(),
    name: "Chicken Biryani",
    description: "Fragrant basmati rice cooked with tender chicken pieces, aromatic spices, and fresh herbs.",
    price: "480.00",
    category: "Rice",
    image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    discount: 0,
    isRecommended: true,
    isDeal: false,
  },
  {
    id: nanoid(),
    name: "Beef Burger",
    description: "Grilled beef patty with fresh lettuce, tomatoes, onions, and special sauce in a toasted bun.",
    price: "420.00",
    category: "Burgers",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    discount: 0,
    isRecommended: false,
    isDeal: false,
  },
  {
    id: nanoid(),
    name: "Chicken Karahi",
    description: "Traditional Pakistani chicken curry cooked with tomatoes, ginger, and aromatic spices.",
    price: "650.00",
    category: "Pakistani",
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    discount: 0,
    isRecommended: false,
    isDeal: false,
  },
  {
    id: nanoid(),
    name: "Family Feast Deal",
    description: "2 Large Pizzas + Sides + Drinks. Perfect for families and groups.",
    price: "1250.00",
    category: "Deals",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    discount: 15,
    isRecommended: false,
    isDeal: true,
  },
  {
    id: nanoid(),
    name: "Lunch Combo Deal",
    description: "Burger + Fries + Drink combo at special price.",
    price: "350.00",
    category: "Deals",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    discount: 10,
    isRecommended: false,
    isDeal: true,
  },
];

// Mock orders
export const mockOrders: Order[] = [
  {
    id: nanoid(),
    tableNumber: 5,
    items: JSON.stringify([
      { id: mockMenuItems[0].id, name: mockMenuItems[0].name, price: mockMenuItems[0].price, quantity: 1 }
    ]),
    total: "550.00",
    status: "preparing",
    paymentMethod: "card",
    tip: "50.00",
    createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    updatedAt: new Date(Date.now() - 20 * 60 * 1000), // 20 minutes ago
  },
  {
    id: nanoid(),
    tableNumber: 3,
    items: JSON.stringify([
      { id: mockMenuItems[1].id, name: mockMenuItems[1].name, price: mockMenuItems[1].price, quantity: 2 }
    ]),
    total: "960.00",
    status: "ready",
    paymentMethod: "cash",
    tip: "0.00",
    createdAt: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
    updatedAt: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
  },
];

// Mock service requests
export const mockServiceRequests: ServiceRequest[] = [
  {
    id: nanoid(),
    tableNumber: 7,
    type: "water_bottle",
    details: JSON.stringify({ quantity: 2 }),
    status: "pending",
    createdAt: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
  },
  {
    id: nanoid(),
    tableNumber: 2,
    type: "play_song",
    details: JSON.stringify({ songName: "Shape of You", artist: "Ed Sheeran" }),
    status: "completed",
    createdAt: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
  },
];

// Mock reviews
export const mockReviews: Review[] = [
  {
    id: nanoid(),
    orderId: mockOrders[1].id,
    rating: 5,
    comment: "Excellent food and service!",
    createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
  },
];

// Theme colors
export const mockThemes = ["default", "blue", "purple"];

export const mockColors = {
  default: {
    primary: '#16a34a',
    primaryHover: '#15803d',
    secondary: '#f3f4f6',
    accent: '#fbbf24',
    background: '#f9fafb',
    surface: '#ffffff',
    text: {
      primary: '#111827',
      secondary: '#374151',
      muted: '#6b7280',
    },
    border: '#e5e7eb',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    food: {
      deal: '#dc2626',
      recommended: '#16a34a',
      category: '#8b5cf6',
    },
  },
  blue: {
    primary: '#2563eb',
    primaryHover: '#1d4ed8',
    secondary: '#eff6ff',
    accent: '#60a5fa',
    background: '#f8fafc',
    surface: '#ffffff',
    text: {
      primary: '#1e293b',
      secondary: '#475569',
      muted: '#64748b',
    },
    border: '#e2e8f0',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    food: {
      deal: '#dc2626',
      recommended: '#2563eb',
      category: '#8b5cf6',
    },
  },
  purple: {
    primary: '#7c3aed',
    primaryHover: '#6d28d9',
    secondary: '#f3e8ff',
    accent: '#a78bfa',
    background: '#fafaf9',
    surface: '#ffffff',
    text: {
      primary: '#18181b',
      secondary: '#3f3f46',
      muted: '#71717a',
    },
    border: '#e4e4e7',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    food: {
      deal: '#dc2626',
      recommended: '#7c3aed',
      category: '#8b5cf6',
    },
  },
};

// In-memory storage simulation
class MockStorage {
  private menuItems = [...mockMenuItems];
  private orders = [...mockOrders];
  private serviceRequests = [...mockServiceRequests];
  private reviews = [...mockReviews];

  // Menu Items
  async getMenuItems(): Promise<MenuItem[]> {
    return Promise.resolve([...this.menuItems]);
  }

  async getMenuItem(id: string): Promise<MenuItem | undefined> {
    return Promise.resolve(this.menuItems.find(item => item.id === id));
  }

  // Orders
  async getOrders(tableNumber?: number): Promise<Order[]> {
    let orders = [...this.orders];
    if (tableNumber) {
      orders = orders.filter(order => order.tableNumber === tableNumber);
    }
    return Promise.resolve(orders);
  }

  async createOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> {
    const order: Order = {
      ...orderData,
      id: nanoid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.orders.push(order);
    return Promise.resolve(order);
  }

  async updateOrderStatus(id: string, status: string): Promise<Order | undefined> {
    const orderIndex = this.orders.findIndex(order => order.id === id);
    if (orderIndex >= 0) {
      this.orders[orderIndex] = {
        ...this.orders[orderIndex],
        status,
        updatedAt: new Date(),
      };
      return Promise.resolve(this.orders[orderIndex]);
    }
    return Promise.resolve(undefined);
  }

  // Service Requests
  async getServiceRequests(tableNumber?: number): Promise<ServiceRequest[]> {
    let requests = [...this.serviceRequests];
    if (tableNumber) {
      requests = requests.filter(request => request.tableNumber === tableNumber);
    }
    return Promise.resolve(requests);
  }

  async createServiceRequest(requestData: Omit<ServiceRequest, 'id' | 'createdAt'>): Promise<ServiceRequest> {
    const request: ServiceRequest = {
      ...requestData,
      id: nanoid(),
      createdAt: new Date(),
    };
    this.serviceRequests.push(request);
    return Promise.resolve(request);
  }

  // Reviews
  async getReviews(orderId?: string): Promise<Review[]> {
    let reviews = [...this.reviews];
    if (orderId) {
      reviews = reviews.filter(review => review.orderId === orderId);
    }
    return Promise.resolve(reviews);
  }

  async createReview(reviewData: Omit<Review, 'id' | 'createdAt'>): Promise<Review> {
    const review: Review = {
      ...reviewData,
      id: nanoid(),
      createdAt: new Date(),
    };
    this.reviews.push(review);
    return Promise.resolve(review);
  }

  // Colors and Themes
  async getColors(theme: string = 'default') {
    return Promise.resolve(mockColors[theme as keyof typeof mockColors] || mockColors.default);
  }

  async getThemes() {
    return Promise.resolve(mockThemes);
  }
}

export const mockStorage = new MockStorage();