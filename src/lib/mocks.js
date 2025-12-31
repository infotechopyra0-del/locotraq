// Mock data for BNAH E-commerce

export const categories = [
  { id: 1, name: 'New Arrivals', slug: 'new-arrivals', image: 'https://images.unsplash.com/photo-1673908869716-abb13b862661?w=800' },
  { id: 2, name: 'Tops', slug: 'tops', image: 'https://images.unsplash.com/photo-1585728748176-455ac5eed962?w=800' },
  { id: 3, name: 'Abayas', slug: 'abayas', image: 'https://images.unsplash.com/photo-1736342182642-e2042084f47c?w=800' },
  { id: 4, name: 'Co-ords', slug: 'co-ords', image: 'https://images.unsplash.com/photo-1762605135376-ae5af70a5628?w=800' },
  { id: 5, name: 'Dresses', slug: 'dresses', image: 'https://images.unsplash.com/photo-1640154852340-9de73a0643a8?w=800' },
  { id: 6, name: 'Skirts', slug: 'skirts', image: 'https://images.unsplash.com/photo-1634047112761-39f4df1296dc?w=800' },
  { id: 7, name: 'Pants', slug: 'pants', image: 'https://images.unsplash.com/photo-1684894059566-25ca8b8007bd?w=800' },
  { id: 8, name: 'Sale', slug: 'sale', image: 'https://images.unsplash.com/photo-1510495631661-903668f58af2?w=800' }
];

export const products = [
  {
    id: 1,
    name: 'Elaria Open Abaya - Butter Yellow',
    slug: 'elaria-open-abaya-butter-yellow',
    price: 132.00,
    salePrice: null,
    category: 'abayas',
    images: [
      'https://images.unsplash.com/photo-1736342182642-e2042084f47c?w=800',
      'https://images.unsplash.com/photo-1736342182213-6c037467cb38?w=800'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Butter Yellow', 'Black', 'White'],
    description: 'Elegant open abaya crafted from premium fabric. Perfect for modest and stylish everyday wear.',
    inStock: true,
    featured: true
  },
  {
    id: 2,
    name: 'Siara Wrap Shirt - Cedar',
    slug: 'siara-wrap-shirt-cedar',
    price: 110.00,
    salePrice: null,
    category: 'tops',
    images: [
      'https://images.unsplash.com/photo-1585728748176-455ac5eed962?w=800',
      'https://images.unsplash.com/photo-1673908869716-abb13b862661?w=800'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Cedar', 'White', 'Lime', 'Butter Yellow'],
    description: 'Contemporary wrap shirt with asymmetric design. Made from breathable fabric for all-day comfort.',
    inStock: false,
    featured: true
  },
  {
    id: 3,
    name: 'Sydney Button Up Shirt - Butter Yellow',
    slug: 'sydney-button-up-shirt-butter-yellow',
    price: 44.00,
    salePrice: null,
    category: 'tops',
    images: [
      'https://images.unsplash.com/photo-1673908869716-abb13b862661?w=800',
      'https://images.unsplash.com/photo-1640154852340-9de73a0643a8?w=800'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Butter Yellow', 'Petal Pink', 'White'],
    description: 'Classic button-up shirt in premium cotton blend. A versatile piece for your modest wardrobe.',
    inStock: true,
    featured: true
  },
  {
    id: 4,
    name: 'Anaya Open Blouse - Slate',
    slug: 'anaya-open-blouse-slate',
    price: 118.00,
    salePrice: null,
    category: 'tops',
    images: [
      'https://images.unsplash.com/photo-1762605135376-ae5af70a5628?w=800',
      'https://images.unsplash.com/photo-1634047112761-39f4df1296dc?w=800'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Slate', 'Pistachio', 'White'],
    description: 'Flowing open blouse with elegant draping. Perfect for layering and creating sophisticated looks.',
    inStock: true,
    featured: true
  },
  {
    id: 5,
    name: 'Anaya Wide Leg Pants - Slate',
    slug: 'anaya-wide-leg-pants-slate',
    price: 103.00,
    salePrice: null,
    category: 'pants',
    images: [
      'https://images.unsplash.com/photo-1684894059566-25ca8b8007bd?w=800',
      'https://images.unsplash.com/photo-1762605135376-ae5af70a5628?w=800'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Slate', 'Black', 'Beige'],
    description: 'Comfortable wide-leg pants with a flattering silhouette. Made from high-quality fabric for movement and comfort.',
    inStock: true,
    featured: true
  },
  {
    id: 6,
    name: 'Anaya A Line Skirt - Slate',
    slug: 'anaya-a-line-skirt-slate',
    price: 96.00,
    salePrice: null,
    category: 'skirts',
    images: [
      'https://images.unsplash.com/photo-1640154852340-9de73a0643a8?w=800',
      'https://images.unsplash.com/photo-1634047112761-39f4df1296dc?w=800'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Slate', 'Black', 'Beige'],
    description: 'Classic A-line skirt with modest length. Perfect for both casual and formal occasions.',
    inStock: true,
    featured: true
  },
  {
    id: 7,
    name: 'Elaria Open Abaya - Black',
    slug: 'elaria-open-abaya-black',
    price: 132.00,
    salePrice: null,
    category: 'abayas',
    images: [
      'https://images.unsplash.com/photo-1736342182213-6c037467cb38?w=800',
      'https://images.unsplash.com/photo-1736342182642-e2042084f47c?w=800'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Butter Yellow', 'White'],
    description: 'Timeless black open abaya. An essential piece for every modest fashion wardrobe.',
    inStock: true,
    featured: true
  },
  {
    id: 8,
    name: 'Sydney A Line Skirt - Butter Yellow',
    slug: 'sydney-a-line-skirt-butter-yellow',
    price: 74.00,
    salePrice: null,
    category: 'skirts',
    images: [
      'https://images.unsplash.com/photo-1673908869716-abb13b862661?w=800',
      'https://images.unsplash.com/photo-1585728748176-455ac5eed962?w=800'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Butter Yellow', 'Petal Pink', 'Black'],
    description: 'Bright and cheerful A-line skirt. Add a pop of color to your modest wardrobe.',
    inStock: true,
    featured: true
  },
  {
    id: 9,
    name: 'The Gelato Dress',
    slug: 'the-gelato-dress',
    price: 162.00,
    salePrice: null,
    category: 'dresses',
    images: [
      'https://images.unsplash.com/photo-1762605135376-ae5af70a5628?w=800',
      'https://images.unsplash.com/photo-1640154852340-9de73a0643a8?w=800'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Multi-stripe', 'Solid Cream'],
    description: 'Playful striped dress perfect for summer. Comfortable and stylish for any occasion.',
    inStock: true,
    featured: true
  },
  {
    id: 10,
    name: 'Cupro Tie Up Top - Pearl Pink',
    slug: 'cupro-tie-up-top-pearl-pink',
    price: 110.00,
    salePrice: null,
    category: 'tops',
    images: [
      'https://images.unsplash.com/photo-1634047112761-39f4df1296dc?w=800',
      'https://images.unsplash.com/photo-1673908869716-abb13b862661?w=800'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Pearl Pink', 'Periwinkle', 'White'],
    description: 'Luxurious cupro fabric tie-up top. Soft draping and elegant finish.',
    inStock: true,
    featured: true
  },
  {
    id: 11,
    name: 'The Dahlia Dress - Dusty Mauve',
    slug: 'the-dahlia-dress-dusty-mauve',
    price: 132.00,
    salePrice: null,
    category: 'dresses',
    images: [
      'https://images.unsplash.com/photo-1640154852340-9de73a0643a8?w=800',
      'https://images.unsplash.com/photo-1762605135376-ae5af70a5628?w=800'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Dusty Mauve', 'Sage Green', 'Black'],
    description: 'Romantic maxi dress with flowing silhouette. Perfect for special occasions.',
    inStock: true,
    featured: true
  },
  {
    id: 12,
    name: 'Leana Batwing Abaya - Periwinkle',
    slug: 'leana-batwing-abaya-periwinkle',
    price: 140.00,
    salePrice: null,
    category: 'abayas',
    images: [
      'https://images.unsplash.com/photo-1736342182642-e2042084f47c?w=800',
      'https://images.unsplash.com/photo-1736342182213-6c037467cb38?w=800'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Periwinkle', 'Black', 'Taupe'],
    description: 'Statement batwing abaya with modern design. Comfortable and fashion-forward.',
    inStock: true,
    featured: true
  }
];

export const instagramPosts = [
  { id: 1, image: 'https://images.unsplash.com/photo-1673908869716-abb13b862661?w=400', link: '#' },
  { id: 2, image: 'https://images.unsplash.com/photo-1585728748176-455ac5eed962?w=400', link: '#' },
  { id: 3, image: 'https://images.unsplash.com/photo-1762605135376-ae5af70a5628?w=400', link: '#' },
  { id: 4, image: 'https://images.unsplash.com/photo-1640154852340-9de73a0643a8?w=400', link: '#' },
  { id: 5, image: 'https://images.unsplash.com/photo-1736342182642-e2042084f47c?w=400', link: '#' },
  { id: 6, image: 'https://images.unsplash.com/photo-1634047112761-39f4df1296dc?w=400', link: '#' }
];

export const stores = [
  {
    id: 1,
    name: 'Boutique Nour Al Houda - Bankstown',
    address: '62 Kitchener Parade, Bankstown NSW 2200',
    phone: '(02) 9708 8889',
    hours: 'Mon-Sat: 10am - 6pm, Sun: 11am - 5pm'
  },
  {
    id: 2,
    name: 'Boutique Nour Al Houda - Lakemba',
    address: '45 Haldon Street, Lakemba NSW 2195',
    phone: '(02) 9759 4466',
    hours: 'Mon-Sat: 10am - 6pm, Sun: 11am - 5pm'
  },
  {
    id: 3,
    name: 'Boutique Nour Al Houda - Granville',
    address: '78 South Street, Granville NSW 2142',
    phone: '(02) 9637 7788',
    hours: 'Mon-Sat: 10am - 6pm, Sun: 11am - 5pm'
  }
];

export const faqs = [
  {
    id: 1,
    question: 'What are your shipping options?',
    answer: 'We offer free standard shipping on all Australian orders over $100. Express shipping is available for $15. International shipping rates vary by location.'
  },
  {
    id: 2,
    question: 'What is your return policy?',
    answer: 'We accept returns within 30 days of purchase. Items must be unworn, unwashed, and in original condition with tags attached. Refunds are processed within 5-7 business days.'
  },
  {
    id: 3,
    question: 'How do I care for my garments?',
    answer: 'Most of our pieces are machine washable on gentle cycle. We recommend washing in cold water and hanging to dry. Check individual care labels for specific instructions.'
  },
  {
    id: 4,
    question: 'Do you offer international shipping?',
    answer: 'Yes! We ship worldwide. International shipping times vary by location, typically 7-14 business days. Customs fees may apply.'
  },
  {
    id: 5,
    question: 'How do I find my size?',
    answer: 'Please refer to our size guide on each product page. Our garments are designed for modest fit. If you are between sizes, we recommend sizing up.'
  },
  {
    id: 6,
    question: 'Can I track my order?',
    answer: 'Yes! Once your order ships, you will receive a tracking number via email. You can also track your order in your account dashboard.'
  }
];