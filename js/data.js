// js/data.js
// Product database - Simple array of product objects

const products = [
  {
    id: 1,
    name: "OKAZU Lovers Set (230ml/12 jars)",
    category: "Chili oil:Okazu",
    price: 135,
    oldPrice: 167.88,
    rating: 5,
    reviews: 32,
    image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?w=500",
    description: "Your new cooking BFF! You can add this to virtually everything. Try it on rice, on meat or tofu, in your burger, ramen and pretty much anything. These award winning products will have your taste buds lingering for more."
  },
  {
    id: 2,
    name: "OKAZU - CHILI MISO - Japanese miso chili oil condiment (230ml)",
    category: "Chili oil:Okazu",
    price: 13.99,
    oldPrice: null,
    rating: 4.7,
    reviews: 24,
    image: "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?w=500",
    description: "Chili Oil is an umami-rich chili, miso, and sesame oil based condiment often eaten with rice in Japan."
  },
  {
    id: 3,
    name: "Instant Miso Soup Tasting Set",
    category: "Miso Soup",
    price: 19.99,
    oldPrice: 24,
    rating: 4.8,
    reviews: 24,
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500",
    description: "A variety pack of instant miso soups. Quick, easy, and delicious traditional Japanese miso soup."
  },
  {
    id: 4,
    name: "ABO Matcha: Uji matcha, Organic, Ceremonial grade",
    category: "Instant Matcha",
    price: 34.00,
    oldPrice: null,
    rating: 4.6,
    reviews: 24,
    image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=500",
    description: "Premium ceremonial grade matcha from Uji, Japan. Organic and perfect for traditional tea ceremonies."
  },
  {
    id: 5,
    name: "OKAZU - ORIGINAL MISO - Japanese miso condiment (230ml)",
    category: "Chili oil:Okazu",
    price: 13.99,
    oldPrice: null,
    rating: 4.5,
    reviews: 18,
    image: "https://images.unsplash.com/photo-1609501676725-7186f017a4b7?w=500",
    description: "The original OKAZU flavor. Rich umami taste with miso and sesame oil."
  },
  {
    id: 6,
    name: "OKAZU - CURRY MISO - Japanese curry miso condiment (230ml)",
    category: "Chili oil:Okazu",
    price: 13.99,
    oldPrice: null,
    rating: 4.3,
    reviews: 16,
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500",
    description: "OKAZU with a curry twist! Combines Japanese curry spices with traditional miso."
  },
  {
    id: 7,
    name: "Organic White Miso Paste (500g)",
    category: "Miso Soup",
    price: 12.99,
    oldPrice: null,
    rating: 4.7,
    reviews: 31,
    image: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=500",
    description: "Authentic organic white miso paste. Mild, slightly sweet flavor."
  },
  {
    id: 8,
    name: "Organic Red Miso Paste (500g)",
    category: "Miso Soup",
    price: 14.99,
    oldPrice: null,
    rating: 4.6,
    reviews: 28,
    image: "https://images.unsplash.com/photo-1609501676725-7186f017a4b7?w=500",
    description: "Rich, fermented organic red miso. Deep umami flavor."
  },
  {
    id: 9,
    name: "Instant Matcha Latte Mix (200g)",
    category: "Instant Matcha",
    price: 18.99,
    oldPrice: 22.00,
    rating: 4.4,
    reviews: 35,
    image: "https://images.unsplash.com/photo-1536013421159-e9f7c4a4a6db?w=500",
    description: "Convenient instant matcha latte mix. Just add hot water or milk."
  },
  {
    id: 10,
    name: "Premium Green Tea Matcha (100g)",
    category: "Instant Matcha",
    price: 28.99,
    oldPrice: null,
    rating: 4.8,
    reviews: 42,
    image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=500",
    description: "High-quality culinary grade matcha. Perfect for smoothies and baking."
  },
  {
    id: 11,
    name: "OKAZU Multi-Pack Set (3 flavors x 230ml)",
    category: "Chili oil:Okazu",
    price: 39.99,
    oldPrice: 45.00,
    rating: 4.9,
    reviews: 48,
    image: "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?w=500",
    description: "Try all three OKAZU flavors! Includes Chili Miso, Original Miso, and Curry Miso."
  },
  {
    id: 12,
    name: "Instant Miso Soup - Classic (10 packets)",
    category: "Miso Soup",
    price: 9.99,
    oldPrice: null,
    rating: 4.2,
    reviews: 52,
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500",
    description: "Classic instant miso soup packets. Traditional flavor with wakame seaweed."
  },
  {
    id: 13,
    name: "Instant Miso Soup - Spicy (10 packets)",
    category: "Miso Soup",
    price: 10.99,
    oldPrice: null,
    rating: 4.1,
    reviews: 27,
    image: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=500",
    description: "Spicy variation of instant miso soup. Perfect for those who like heat."
  },
  {
    id: 14,
    name: "Matcha Ceremonial Set (Bowl + Whisk + Scoop)",
    category: "Instant Matcha",
    price: 45.99,
    oldPrice: 55.00,
    rating: 4.7,
    reviews: 19,
    image: "https://images.unsplash.com/photo-1582793988951-9aed5509eb97?w=500",
    description: "Complete matcha ceremony set. Includes traditional bamboo whisk and bowl."
  },
  {
    id: 15,
    name: "Organic Matcha Powder - Culinary Grade (250g)",
    category: "Instant Matcha",
    price: 24.99,
    oldPrice: null,
    rating: 4.5,
    reviews: 38,
    image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=500",
    description: "Bulk culinary matcha powder. Perfect for daily use."
  },
  {
    id: 16,
    name: "Miso Soup Variety Pack (15 packets - 5 flavors)",
    category: "Miso Soup",
    price: 16.99,
    oldPrice: null,
    rating: 4.6,
    reviews: 44,
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500",
    description: "Variety pack with 5 different miso soup flavors."
  },
  {
    id: 17,
    name: "OKAZU Gift Set - Premium Collection",
    category: "Coffee",
    price: 65.99,
    oldPrice: 80.00,
    rating: 4.9,
    reviews: 33,
    image: "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?w=500",
    description: "Beautiful gift set featuring OKAZU condiments in elegant packaging."
  },
  {
    id: 18,
    name: "Traditional Matcha Starter Kit",
    category: "Instant Matcha",
    price: 32.99,
    oldPrice: null,
    rating: 4.4,
    reviews: 29,
    image: "https://images.unsplash.com/photo-1536013421159-e9f7c4a4a6db?w=500",
    description: "Everything you need to start your matcha journey."
  }
];