import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";
import { useCartStore } from "@/lib/store";
import { MenuItem } from "@/lib/mock-data";
import { useLocation } from "wouter";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Star, Clock, MapPin, DollarSign } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FoodCard from "@/components/food-card";
import CartModal from "@/components/modals/cart-modal";
import AddToCartModal from "@/components/modals/add-to-cart-modal";
import DeliveryDetailsModal from "@/components/modals/delivery-details-modal";
import PaymentModal from "@/components/modals/payment-modal";
import SplitBillModal from "@/components/modals/split-bill-modal";
import ReviewModal from "@/components/modals/review-modal";
import OrderConfirmationModal from "@/components/modals/order-confirmation-modal";

export default function RestaurantMenuPage() {
  const { selectedRestaurant, serviceType, getCartCount } = useCartStore();
  const [, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const { data: menuItems, isLoading } = useQuery({
    queryKey: ['/api/menu-items'],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  if (!selectedRestaurant) {
    setLocation('/');
    return null;
  }

  const categories = ["all", ...((menuItems as MenuItem[]) ? Array.from(new Set((menuItems as MenuItem[]).map((item: MenuItem) => item.category))) : [])];
  
  const filteredItems = (menuItems as MenuItem[])?.filter((item: MenuItem) => 
    selectedCategory === "all" || item.category === selectedCategory
  ) || [];

  const handleBack = () => {
    switch (serviceType) {
      case 'delivery':
        setLocation('/delivery');
        break;
      case 'takeaway':
        setLocation('/takeaway');
        break;
      default:
        setLocation('/');
    }
  };

  const getServiceBadge = () => {
    switch (serviceType) {
      case 'delivery':
        return <Badge className="bg-green-500 text-white">Delivery</Badge>;
      case 'takeaway':
        return <Badge className="bg-blue-500 text-white">Take Away</Badge>;
      case 'dine-in':
        return <Badge className="bg-purple-500 text-white">Dine In</Badge>;
      default:
        return null;
    }
  };

  const getServiceInfo = () => {
    switch (serviceType) {
      case 'delivery':
        return (
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Delivery in {selectedRestaurant.deliveryTime}
            </div>
            <div className="flex items-center">
              <DollarSign className="w-4 h-4 mr-2" />
              Delivery Fee: PKR {selectedRestaurant.deliveryFee}
            </div>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              {selectedRestaurant.distance} away
            </div>
          </div>
        );
      case 'takeaway':
        return (
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Ready for pickup in {selectedRestaurant.deliveryTime.replace('delivery', 'preparation')}
            </div>
            <div className="flex items-start">
              <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium text-gray-900">Pickup Address:</div>
                <div className="text-gray-600">{selectedRestaurant.address}</div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <Button
              variant="outline"
              onClick={handleBack}
              className="flex items-center"
              data-testid="button-back-to-restaurants"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Restaurants
            </Button>
          </div>

          {/* Restaurant Header */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src={selectedRestaurant.image}
                  alt={selectedRestaurant.name}
                  className="w-full md:w-48 h-32 object-cover rounded-lg"
                />
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        {selectedRestaurant.name}
                      </h1>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{selectedRestaurant.rating}</span>
                        </div>
                        <Badge variant="outline">{selectedRestaurant.cuisine}</Badge>
                        {getServiceBadge()}
                      </div>
                    </div>
                  </div>

                  {getServiceInfo()}

                  {serviceType === 'delivery' && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Minimum Order:</strong> PKR {selectedRestaurant.minimumOrder}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Category Filter */}
          <div className="mb-6">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-64" data-testid="select-category">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Menu Items */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item: MenuItem) => (
                <FoodCard key={item.id} item={item} />
              ))}
            </div>
          )}

          {filteredItems.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No items found in this category.
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />

      {/* Cart indicator */}
      {getCartCount() > 0 && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={() => useCartStore.getState().setCartOpen(true)}
            className="rounded-full w-16 h-16 shadow-lg"
            data-testid="button-open-cart"
          >
            <div className="text-center">
              <div className="text-xs">Cart</div>
              <div className="text-lg font-bold">{getCartCount()}</div>
            </div>
          </Button>
        </div>
      )}

      {/* Modals */}
      <CartModal />
      <AddToCartModal />
      <DeliveryDetailsModal />
      <PaymentModal />
      <SplitBillModal />
      <ReviewModal />
      <OrderConfirmationModal />
    </div>
  );
}