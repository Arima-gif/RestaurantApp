import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "@/lib/queryClient";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Star, Clock, MapPin, Search, Navigation } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { Restaurant } from "@/lib/mock-data";
import { useLocation } from "wouter";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function TakeawayPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { setSelectedRestaurant, setServiceType } = useCartStore();
  const [, setLocation] = useLocation();

  const { data: restaurants, isLoading } = useQuery({
    queryKey: ['/api/restaurants'],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  const filteredRestaurants = (restaurants as Restaurant[])?.filter((restaurant: Restaurant) =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const handleSelectRestaurant = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setServiceType('takeaway');
    setLocation('/restaurant-menu');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Take Away Orders
            </h1>
            <p className="text-gray-600">
              Pick up your order from restaurants near you
            </p>
          </div>

          {/* Search */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="max-w-md">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Search className="inline w-4 h-4 mr-1" />
                Search Restaurants
              </label>
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or cuisine"
                data-testid="input-search-takeaway-restaurants"
              />
            </div>
          </div>

          {/* Restaurant List */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-40 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredRestaurants.map((restaurant: Restaurant) => (
                <Card 
                  key={restaurant.id} 
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    !restaurant.isOpen ? 'opacity-60' : ''
                  }`}
                  onClick={() => restaurant.isOpen && handleSelectRestaurant(restaurant)}
                  data-testid={`takeaway-restaurant-card-${restaurant.id}`}
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="w-full h-40 object-cover rounded-t-lg"
                      />
                      {!restaurant.isOpen && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-t-lg flex items-center justify-center">
                          <Badge variant="destructive">Closed</Badge>
                        </div>
                      )}
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-white text-black shadow-sm">
                          <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                          {restaurant.rating}
                        </Badge>
                      </div>
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-green-500 text-white">
                          Take Away
                        </Badge>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg text-gray-900">
                          {restaurant.name}
                        </h3>
                        <Badge variant="outline" className="text-xs">
                          {restaurant.cuisine}
                        </Badge>
                      </div>

                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          Ready in {restaurant.deliveryTime.replace('delivery', 'preparation')}
                        </div>
                        <div className="flex items-start">
                          <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-gray-900">Pickup Address:</div>
                            <div className="text-gray-600">{restaurant.address}</div>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-100 pt-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center text-sm text-blue-600">
                            <Navigation className="w-4 h-4 mr-1" />
                            Get Directions
                          </div>
                          <Button 
                            size="sm" 
                            disabled={!restaurant.isOpen}
                            data-testid={`button-takeaway-order-${restaurant.id}`}
                          >
                            {restaurant.isOpen ? 'Order Now' : 'Closed'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {filteredRestaurants.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No restaurants found matching your search.
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}