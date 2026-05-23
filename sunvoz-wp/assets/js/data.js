// ============================================================
// Sunvoz — Mock Data Store
// All data is exposed as global variables on `window`
// ============================================================

// ----------------------------------------------------------
// Categories
// ----------------------------------------------------------
window.CATEGORIES = [
  {
    id: 'kitchen',
    name: 'Kitchen & Dining',
    icon: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v16c0 3.3 2.7 6 6 6h0c3.3 0 6-2.7 6-6V4"/><line x1="18" y1="4" x2="18" y2="26"/><line x1="12" y1="10" x2="24" y2="10"/><path d="M32 4v8c0 2.2 1.8 4 4 4h0c2.2 0 4-1.8 4-4V4"/><line x1="36" y1="16" x2="36" y2="44"/></svg>',
    count: 5
  },
  {
    id: 'bathroom',
    name: 'Bath & Body',
    icon: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M24 4c-3 0-6 2-6 6 0 3 2 5 4 8"/><path d="M20 18c-1.5 2.5-2 5-2 8 0 6.6 5.4 12 12 12s12-5.4 12-12c0-3-0.5-5.5-2-8"/><ellipse cx="30" cy="18" rx="10" ry="3"/><circle cx="24" cy="28" r="2"/><circle cx="32" cy="24" r="1.5"/><circle cx="28" cy="32" r="1.5"/></svg>',
    count: 4
  },
  {
    id: 'living',
    name: 'Living Room',
    icon: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 28V18c0-2.2 1.8-4 4-4h24c2.2 0 4 1.8 4 4v10"/><path d="M6 28c0-2.2 1.8-4 4-4v8h28v-8c2.2 0 4 1.8 4 4v4H6v-4z"/><rect x="10" y="32" width="28" height="4" rx="1"/><line x1="14" y1="36" x2="14" y2="42"/><line x1="34" y1="36" x2="34" y2="42"/><path d="M30 10c2-3 5-6 5-6s-2 0-4 1c1-2 1-4 1-4s-2 2-3 4c-0.5-1.5-2-3-2-3s0 2 0.5 3.5"/></svg>',
    count: 5
  },
  {
    id: 'garden',
    name: 'Garden & Outdoor',
    icon: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M24 44V24"/><path d="M24 24c0-8-6-14-14-16 0 10 6 16 14 16z"/><path d="M24 30c0-6 5-11 12-12 0 8-5 12-12 12z"/><rect x="16" y="40" width="16" height="4" rx="2"/><circle cx="14" cy="10" r="2"/><circle cx="36" cy="16" r="1.5"/></svg>',
    count: 4
  },
  {
    id: 'office',
    name: 'Home Office',
    icon: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="6" width="32" height="24" rx="2"/><line x1="8" y1="26" x2="40" y2="26"/><path d="M20 30h8l2 8H18l2-8z"/><line x1="14" y1="38" x2="34" y2="38"/><line x1="16" y1="12" x2="24" y2="12"/><line x1="16" y1="16" x2="28" y2="16"/><line x1="16" y1="20" x2="20" y2="20"/></svg>',
    count: 2
  }
];

// ----------------------------------------------------------
// Products  (20 total)
// ----------------------------------------------------------
window.PRODUCTS = [
  // ---- KITCHEN (1–5) ----
  {
    id: 1,
    name: 'Bamboo Kitchen Utensil Set',
    slug: 'bamboo-kitchen-utensil-set',
    category: 'kitchen',
    price: 34.99,
    originalPrice: 44.99,
    rating: 4.8,
    reviewCount: 124,
    badge: 'bestseller',
    shortDesc: 'Hand-crafted bamboo utensils for everyday cooking, naturally durable and beautiful.',
    description: 'Elevate your cooking experience with this six-piece bamboo utensil set, meticulously hand-crafted from sustainably harvested bamboo. Each piece is sanded to a silky-smooth finish that won\'t scratch your favourite non-stick pans. Naturally antimicrobial and heat-resistant up to 200 °C, these utensils bring warmth and eco-conscious style to any kitchen.',
    features: [
      '100% organic bamboo — FSC certified',
      'Naturally antimicrobial & odour-resistant',
      'Heat-resistant up to 200 °C (392 °F)',
      'Won\'t scratch non-stick coatings',
      'Set includes spatula, spoon, slotted spoon, turner, tongs & fork'
    ],
    materials: 'Sustainably sourced Moso bamboo',
    dimensions: '30 cm average length',
    inStock: true,
    gradient: 'linear-gradient(135deg, #F6E6C8 0%, #FFECD2 50%, #FCF5E5 100%)',
    iconSvg: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 8v40c0 2.2 1.8 4 4 4h0c2.2 0 4-1.8 4-4V8"/><ellipse cx="24" cy="8" rx="4" ry="2"/><path d="M38 8l-2 18h8l-2-18"/><line x1="40" y1="26" x2="40" y2="52"/><circle cx="40" cy="52" r="2"/><line x1="24" y1="14" x2="24" y2="18"/></svg>'
  },
  {
    id: 2,
    name: 'Organic Cotton Dish Towels (3-Pack)',
    slug: 'organic-cotton-dish-towels-3-pack',
    category: 'kitchen',
    price: 24.99,
    originalPrice: null,
    rating: 4.6,
    reviewCount: 87,
    badge: 'eco',
    shortDesc: 'Ultra-absorbent organic cotton towels, woven with zero synthetic dyes.',
    description: 'These GOTS-certified organic cotton dish towels combine generous absorbency with a beautifully textured waffle weave. Dyed exclusively with plant-based pigments, they soften with every wash while retaining their shape. The three-pack includes Sage, Oat, and Stone colourways to complement any kitchen palette.',
    features: [
      'GOTS-certified 100% organic cotton',
      'Plant-based, non-toxic dyes',
      'Waffle weave — ultra absorbent & quick drying',
      'Pre-shrunk & machine washable',
      'Set of 3: Sage, Oat, Stone'
    ],
    materials: 'GOTS-certified organic cotton',
    dimensions: '70 × 50 cm each',
    inStock: true,
    gradient: 'linear-gradient(135deg, #F6E6C8 0%, #FFECD2 50%, #FCF5E5 100%)',
    iconSvg: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="14" y="8" width="36" height="48" rx="3"/><path d="M14 16h36"/><path d="M14 44h36"/><path d="M22 16v28"/><path d="M30 16v28"/><path d="M38 16v28"/><line x1="26" y1="10" x2="26" y2="14"/><line x1="34" y1="10" x2="34" y2="14"/></svg>'
  },
  {
    id: 3,
    name: 'Acacia Wood Salad Bowl',
    slug: 'acacia-wood-salad-bowl',
    category: 'kitchen',
    price: 49.99,
    originalPrice: null,
    rating: 4.9,
    reviewCount: 63,
    badge: null,
    shortDesc: 'A stunning hand-carved salad bowl made from responsibly harvested acacia wood.',
    description: 'This statement-piece salad bowl is individually hand-carved from a single block of acacia hardwood, meaning no two bowls are exactly alike. The rich, honey-toned grain darkens gracefully with age and regular oiling. Generously sized for family meals, it doubles as a gorgeous centrepiece on any dining table.',
    features: [
      'Hand-carved from a single piece of acacia',
      'Unique natural grain pattern on every bowl',
      'Food-safe, finished with organic linseed oil',
      'Generous 30 cm diameter — serves 4-6',
      'Comes with care guide & organic wood butter sample'
    ],
    materials: 'Responsibly harvested acacia hardwood',
    dimensions: '30 cm diameter × 12 cm deep',
    inStock: true,
    gradient: 'linear-gradient(135deg, #F6E6C8 0%, #FFECD2 50%, #FCF5E5 100%)',
    iconSvg: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="32" cy="22" rx="22" ry="10"/><path d="M10 22c0 12 10 22 22 22s22-10 22-22"/><path d="M16 26c4 8 10 14 16 14s12-6 16-14"/><path d="M24 20c0 0 4 2 8 2s8-2 8-2"/></svg>'
  },
  {
    id: 4,
    name: 'Ceramic Herb Planter Trio',
    slug: 'ceramic-herb-planter-trio',
    category: 'kitchen',
    price: 39.99,
    originalPrice: null,
    rating: 4.7,
    reviewCount: 41,
    badge: 'new',
    shortDesc: 'Minimalist ceramic planters designed to keep fresh herbs thriving on your windowsill.',
    description: 'Grow basil, rosemary, and mint right on your kitchen counter with this trio of handmade ceramic planters. Each pot features a hidden drainage saucer and a matte, speckled glaze that adds an artisanal touch. The self-watering wicking system keeps herbs hydrated for up to five days, making green-thumb living effortless.',
    features: [
      'Set of 3 hand-glazed ceramic pots',
      'Built-in self-watering wick system',
      'Hidden drainage saucer — no mess',
      'Matte speckled finish in Sand, Sage & Cream',
      'Includes coconut coir starter discs'
    ],
    materials: 'Kiln-fired stoneware ceramic, cotton wick',
    dimensions: '12 cm diameter × 14 cm tall each',
    inStock: true,
    gradient: 'linear-gradient(135deg, #F6E6C8 0%, #FFECD2 50%, #FCF5E5 100%)',
    iconSvg: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 34h8l-1 16h-6l-1-16z"/><path d="M28 34h8l-1 16h-6l-1-16z"/><path d="M40 34h8l-1 16h-6l-1-16z"/><line x1="16" y1="34" x2="48" y2="34"/><path d="M18 34c0-4 2-8 2-8s2 4 2 4"/><path d="M30 34c0-6 2-12 2-12s2 6 2 6"/><path d="M42 34c0-5 2-10 2-10s2 5 2 5"/><path d="M19 28c-2-1-3-3-3-3s2 0 3 1"/><path d="M33 24c2-2 4-2 4-2s-1 2-2 3"/><path d="M43 26c-1-2 0-4 0-4s2 1 2 3"/></svg>'
  },
  {
    id: 5,
    name: 'Natural Beeswax Food Wraps (Set of 5)',
    slug: 'natural-beeswax-food-wraps-set-of-5',
    category: 'kitchen',
    price: 18.99,
    originalPrice: null,
    rating: 4.5,
    reviewCount: 202,
    badge: 'eco',
    shortDesc: 'Reusable beeswax wraps to replace single-use plastic in your kitchen.',
    description: 'Say goodbye to plastic cling film with these all-natural beeswax food wraps. Made with organic cotton, sustainably sourced beeswax, tree resin, and jojoba oil, they mould to bowls and food with the warmth of your hands. Each set includes five sizes — from snack-wrap to full casserole — and lasts up to a year with proper care.',
    features: [
      'Replaces single-use plastic wrap',
      'Made with organic cotton & pure beeswax',
      'Naturally antibacterial & breathable',
      '5 sizes: XS, S, M, L, XL',
      'Compostable at end of life — lasts up to 1 year'
    ],
    materials: 'Organic cotton, beeswax, tree resin, jojoba oil',
    dimensions: '18 cm to 40 cm (assorted)',
    inStock: true,
    gradient: 'linear-gradient(135deg, #F6E6C8 0%, #FFECD2 50%, #FCF5E5 100%)',
    iconSvg: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="12" y="16" width="40" height="32" rx="4"/><path d="M12 28h40"/><path d="M12 38h40"/><path d="M26 16v32"/><path d="M38 16v32"/><circle cx="19" cy="22" r="2"/><circle cx="32" cy="33" r="2"/><circle cx="44" cy="42" r="2"/><path d="M8 20l4-4"/><path d="M8 44l4 4"/></svg>'
  },

  // ---- BATHROOM (6–10) ----
  {
    id: 6,
    name: 'Bamboo Toothbrush Set (4-Pack)',
    slug: 'bamboo-toothbrush-set-4-pack',
    category: 'bathroom',
    price: 12.99,
    originalPrice: null,
    rating: 4.7,
    reviewCount: 318,
    badge: 'bestseller',
    shortDesc: 'Biodegradable bamboo toothbrushes with charcoal-infused bristles.',
    description: 'Make the simplest of swaps with this four-pack of bamboo toothbrushes. The handles are crafted from fast-growing Moso bamboo and engraved with a unique wave pattern for easy grip, while the charcoal-infused nylon bristles help naturally whiten teeth. Each brush is individually numbered so every family member knows which one is theirs.',
    features: [
      'Moso bamboo handles — 100% biodegradable',
      'Charcoal-infused BPA-free bristles',
      'Individually numbered 1-4 for families',
      'Ergonomic wave-grip design',
      'Plastic-free kraft paper packaging'
    ],
    materials: 'Moso bamboo, charcoal-infused nylon-6 bristles',
    dimensions: '19 cm length',
    inStock: true,
    gradient: 'linear-gradient(135deg, #D4E9F7 0%, #E8F4FD 50%, #F0F8FF 100%)',
    iconSvg: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="18" y="6" width="8" height="16" rx="4"/><line x1="22" y1="22" x2="22" y2="56"/><rect x="22" y="54" width="0" height="0" rx="0"/><circle cx="22" cy="56" r="2"/><rect x="34" y="10" width="8" height="14" rx="4"/><line x1="38" y1="24" x2="38" y2="54"/><circle cx="38" cy="56" r="2"/><line x1="19" y1="12" x2="25" y2="12"/><line x1="35" y1="16" x2="41" y2="16"/></svg>'
  },
  {
    id: 7,
    name: 'Organic Lavender Soap Collection',
    slug: 'organic-lavender-soap-collection',
    category: 'bathroom',
    price: 22.99,
    originalPrice: 28.99,
    rating: 4.8,
    reviewCount: 156,
    badge: 'sale',
    shortDesc: 'Cold-pressed artisan soaps infused with organic French lavender essential oil.',
    description: 'Indulge in the calming scent of Provence with this trio of cold-pressed lavender soaps. Hand-poured in small batches using organic shea butter, coconut oil, and genuine French lavender buds, each bar lathers richly while keeping skin deeply moisturised. The naturally marbled purple-and-cream swirl makes them almost too beautiful to use.',
    features: [
      'Cold-pressed in small batches',
      'Organic shea butter & coconut oil base',
      'Real French lavender essential oil & buds',
      'Palm-oil free & cruelty-free',
      'Set of 3 bars — approx. 100 g each'
    ],
    materials: 'Organic shea butter, coconut oil, lavender essential oil',
    dimensions: '8 × 5 × 3 cm per bar',
    inStock: true,
    gradient: 'linear-gradient(135deg, #D4E9F7 0%, #E8F4FD 50%, #F0F8FF 100%)',
    iconSvg: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="14" y="24" width="36" height="22" rx="4"/><path d="M14 30h36"/><ellipse cx="32" cy="24" rx="14" ry="4"/><path d="M28 12c0-4 4-6 4-6s4 2 4 6"/><path d="M26 14c-2-2-2-5-2-5"/><path d="M38 14c2-2 2-5 2-5"/><circle cx="24" cy="36" r="2"/><circle cx="32" cy="38" r="1.5"/><circle cx="40" cy="35" r="1"/></svg>'
  },
  {
    id: 8,
    name: 'Natural Sea Sponge Set',
    slug: 'natural-sea-sponge-set',
    category: 'bathroom',
    price: 16.99,
    originalPrice: null,
    rating: 4.4,
    reviewCount: 74,
    badge: 'eco',
    shortDesc: 'Sustainably harvested Mediterranean sea sponges for a luxurious bathing experience.',
    description: 'Harvested by hand from the crystal-clear waters of the Mediterranean, these natural sea sponges create a cloud-like lather that synthetic loofahs simply can\'t replicate. They\'re hypoallergenic, incredibly soft on sensitive skin, and naturally resistant to odour. The set includes one large bath sponge and one small facial sponge.',
    features: [
      'Hand-harvested Mediterranean sea sponge',
      'Hypoallergenic — perfect for sensitive skin',
      'Naturally resistant to bacteria & odour',
      'Creates a rich, luxurious lather',
      'Includes 1 bath sponge & 1 facial sponge'
    ],
    materials: '100% natural sea sponge',
    dimensions: 'Bath: 12-14 cm, Facial: 6-8 cm',
    inStock: true,
    gradient: 'linear-gradient(135deg, #D4E9F7 0%, #E8F4FD 50%, #F0F8FF 100%)',
    iconSvg: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="32" cy="34" rx="18" ry="14"/><path d="M20 28c2-6 6-10 12-10s10 4 12 10"/><circle cx="26" cy="32" r="3"/><circle cx="36" cy="30" r="2.5"/><circle cx="30" cy="40" r="2"/><circle cx="38" cy="38" r="2.5"/><circle cx="24" cy="40" r="1.5"/></svg>'
  },
  {
    id: 9,
    name: 'Organic Turkish Cotton Towels',
    slug: 'organic-turkish-cotton-towels',
    category: 'bathroom',
    price: 54.99,
    originalPrice: null,
    rating: 4.9,
    reviewCount: 98,
    badge: 'new',
    shortDesc: 'Luxuriously soft, long-staple Turkish cotton towels woven with organic fibres.',
    description: 'Wrap yourself in cloud-soft luxury with these organic Turkish cotton bath towels. Woven from extra-long-staple fibres in the Aegean region, they become plusher and more absorbent with every wash. The minimalist jacquard border adds an elegant, spa-worthy detail that elevates any bathroom.',
    features: [
      'Extra-long-staple Turkish cotton, 600 GSM',
      'Gets softer & more absorbent with each wash',
      'OEKO-TEX Standard 100 certified',
      'Elegant jacquard border detail',
      'Set of 2 bath towels — Natural White'
    ],
    materials: 'Organic Turkish cotton, 600 GSM',
    dimensions: '140 × 70 cm each',
    inStock: true,
    gradient: 'linear-gradient(135deg, #D4E9F7 0%, #E8F4FD 50%, #F0F8FF 100%)',
    iconSvg: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 12h24c4 0 8 4 8 8v0c0 4-4 8-8 8H16"/><path d="M16 12v16"/><path d="M16 28h20c4 0 6 3 6 6v0c0 3-2 6-6 6H16"/><path d="M16 28v12"/><path d="M16 40h16c3 0 5 2 5 4v0c0 2-2 4-5 4H16"/><path d="M16 40v8"/></svg>'
  },
  {
    id: 10,
    name: 'Bamboo Bathroom Organizer',
    slug: 'bamboo-bathroom-organizer',
    category: 'bathroom',
    price: 32.99,
    originalPrice: null,
    rating: 4.5,
    reviewCount: 55,
    badge: null,
    shortDesc: 'A sleek bamboo caddy to keep your bathroom counter clutter-free and beautiful.',
    description: 'Tame bathroom clutter in style with this multi-compartment bamboo organiser. Designed with separated sections for toothbrushes, razors, cotton pads, and small bottles, it keeps everything within reach while looking effortlessly elegant. The water-resistant lacquer finish ensures it stays looking pristine in humid environments.',
    features: [
      'Multi-compartment design — 5 sections',
      'Water-resistant natural lacquer finish',
      'Anti-slip silicone feet',
      'Fits standard bathroom countertops',
      'Sustainably sourced Moso bamboo'
    ],
    materials: 'Moso bamboo with natural lacquer',
    dimensions: '28 × 12 × 10 cm',
    inStock: true,
    gradient: 'linear-gradient(135deg, #D4E9F7 0%, #E8F4FD 50%, #F0F8FF 100%)',
    iconSvg: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="10" y="20" width="44" height="28" rx="3"/><line x1="24" y1="20" x2="24" y2="48"/><line x1="40" y1="20" x2="40" y2="48"/><rect x="12" y="24" width="10" height="16" rx="1"/><line x1="30" y1="26" x2="30" y2="18"/><line x1="34" y1="28" x2="34" y2="16"/><circle cx="30" cy="16" r="2"/><circle cx="34" cy="14" r="2"/><rect x="42" y="26" width="10" height="10" rx="2"/></svg>'
  },

  // ---- LIVING (11–15) ----
  {
    id: 11,
    name: 'Soy & Coconut Wax Candle Set',
    slug: 'soy-coconut-wax-candle-set',
    category: 'living',
    price: 36.99,
    originalPrice: null,
    rating: 4.8,
    reviewCount: 189,
    badge: 'bestseller',
    shortDesc: 'Hand-poured soy & coconut wax candles with subtle botanical fragrances.',
    description: 'Set the mood with this trio of hand-poured candles blended from soy and coconut wax for a clean, long-lasting burn. Scented with pure essential oils — Forest Pine, Citrus Garden, and Vanilla Oakmoss — they fill your space with nature-inspired fragrance without the soot or toxins of paraffin. Poured into reusable amber glass vessels that double as votive holders.',
    features: [
      'Soy & coconut wax blend — clean, even burn',
      'Pure essential oil fragrances, phthalate-free',
      'Lead-free cotton wicks',
      '45-hour burn time per candle',
      'Reusable amber glass jars — set of 3'
    ],
    materials: 'Soy wax, coconut wax, essential oils, cotton wick',
    dimensions: '8 cm diameter × 9 cm tall each',
    inStock: true,
    gradient: 'linear-gradient(135deg, #D8F3DC 0%, #E8F5E9 50%, #F1F8E9 100%)',
    iconSvg: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="18" y="28" width="12" height="20" rx="2"/><rect x="34" y="24" width="14" height="24" rx="2"/><line x1="24" y1="28" x2="24" y2="26"/><path d="M24 26c0-4-2-6 0-10 2 4 0 6 0 10"/><line x1="41" y1="24" x2="41" y2="22"/><path d="M41 22c0-4-2-8 0-12 2 4 0 8 0 12"/><line x1="18" y1="34" x2="30" y2="34"/><line x1="34" y1="30" x2="48" y2="30"/></svg>'
  },
  {
    id: 12,
    name: 'Cork & Leather Coaster Set (6)',
    slug: 'cork-leather-coaster-set-6',
    category: 'living',
    price: 21.99,
    originalPrice: null,
    rating: 4.6,
    reviewCount: 42,
    badge: null,
    shortDesc: 'Elegant coasters combining natural cork with vegetable-tanned leather trim.',
    description: 'Protect your surfaces in style with these six premium coasters featuring a natural cork base bonded to a vegetable-tanned leather rim. The cork cushions glasses silently and absorbs condensation, while the leather border adds a refined, artisan touch. They arrive in a matching cork storage holder that looks stunning on any coffee table.',
    features: [
      'Natural Portuguese cork base',
      'Vegetable-tanned leather rim — no harsh chemicals',
      'Absorbs condensation & protects surfaces',
      'Set of 6 with cork storage holder',
      'Ages beautifully — develops unique patina'
    ],
    materials: 'Portuguese cork, vegetable-tanned leather',
    dimensions: '10 cm diameter × 0.6 cm thick',
    inStock: true,
    gradient: 'linear-gradient(135deg, #D8F3DC 0%, #E8F5E9 50%, #F1F8E9 100%)',
    iconSvg: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="32" cy="36" rx="18" ry="8"/><ellipse cx="32" cy="32" rx="18" ry="8"/><ellipse cx="32" cy="28" rx="18" ry="8"/><path d="M14 28v8"/><path d="M50 28v8"/><ellipse cx="32" cy="28" rx="12" ry="5" stroke-dasharray="3 2"/></svg>'
  },
  {
    id: 13,
    name: 'Handwoven Rattan Storage Basket',
    slug: 'handwoven-rattan-storage-basket',
    category: 'living',
    price: 58.99,
    originalPrice: 72.99,
    rating: 4.7,
    reviewCount: 76,
    badge: 'sale',
    shortDesc: 'Artisan-woven rattan basket for stylish, sustainable storage anywhere in your home.',
    description: 'This generously sized rattan basket is hand-woven by skilled artisans in Indonesia using sustainably sourced rattan cane. Its open-weave pattern allows air to circulate freely, making it ideal for storing blankets, toys, or laundry. Sturdy built-in handles and a reinforced base mean it\'s as functional as it is beautiful.',
    features: [
      'Hand-woven by Indonesian artisans',
      'Sustainably sourced rattan cane',
      'Reinforced base for heavy loads',
      'Built-in carry handles',
      'Open weave for ventilation — ideal for blankets & laundry'
    ],
    materials: 'Sustainably harvested rattan cane',
    dimensions: '40 × 40 × 35 cm',
    inStock: true,
    gradient: 'linear-gradient(135deg, #D8F3DC 0%, #E8F5E9 50%, #F1F8E9 100%)',
    iconSvg: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22h40l-4 28H16l-4-28z"/><ellipse cx="32" cy="22" rx="20" ry="6"/><path d="M12 22c4 2 12 3 20 3s16-1 20-3"/><path d="M18 30h28"/><path d="M16 38h32"/><path d="M8 20c-2-2-2-4 0-4h4"/><path d="M56 20c2-2 2-4 0-4h-4"/></svg>'
  },
  {
    id: 14,
    name: 'Linen Throw Pillow Covers (2-Pack)',
    slug: 'linen-throw-pillow-covers-2-pack',
    category: 'living',
    price: 29.99,
    originalPrice: null,
    rating: 4.5,
    reviewCount: 63,
    badge: 'new',
    shortDesc: 'Stonewashed European flax linen pillow covers with a relaxed, lived-in texture.',
    description: 'Add instant warmth and texture to your sofa or bed with these stonewashed linen pillow covers made from European flax. The enzyme-washed finish gives them a perfectly rumpled, relaxed aesthetic right out of the box. A hidden zipper closure keeps inserts secure, and the breathable linen regulates temperature beautifully in every season.',
    features: [
      '100% European flax linen — OEKO-TEX certified',
      'Stonewashed for a relaxed, lived-in look',
      'Hidden zipper closure',
      'Fits standard 45 × 45 cm inserts',
      'Set of 2 — Natural Oat colour'
    ],
    materials: 'European flax linen, OEKO-TEX certified',
    dimensions: '45 × 45 cm (covers only)',
    inStock: true,
    gradient: 'linear-gradient(135deg, #D8F3DC 0%, #E8F5E9 50%, #F1F8E9 100%)',
    iconSvg: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="12" y="16" width="40" height="32" rx="4"/><path d="M12 20c6-2 14-3 20-3s14 1 20 3"/><path d="M12 44c6 2 14 3 20 3s14-1 20-3"/><line x1="32" y1="24" x2="32" y2="40"/><line x1="24" y1="32" x2="40" y2="32"/><path d="M8 20l4-4"/><path d="M56 20l-4-4"/><path d="M8 44l4 4"/><path d="M56 44l-4 4"/></svg>'
  },
  {
    id: 15,
    name: 'Air-Purifying Plant Collection',
    slug: 'air-purifying-plant-collection',
    category: 'living',
    price: 45.99,
    originalPrice: null,
    rating: 4.6,
    reviewCount: 112,
    badge: 'eco',
    shortDesc: 'NASA-approved air-purifying plants in minimalist recycled-plastic pots.',
    description: 'Breathe cleaner air naturally with this curated trio of NASA-recommended air-purifying houseplants: a Snake Plant, a Peace Lily, and a Pothos. Each arrives in a handsome pot made from 100% recycled ocean plastic, complete with a built-in drainage system. Together, they effectively filter common indoor pollutants like formaldehyde and benzene.',
    features: [
      'Includes Snake Plant, Peace Lily & Pothos',
      'NASA-recommended for indoor air purification',
      'Pots made from 100% recycled ocean plastic',
      'Built-in drainage system — no saucers needed',
      'Care guide included — beginner-friendly'
    ],
    materials: 'Live plants, recycled ocean-plastic pots',
    dimensions: '15-25 cm tall at delivery',
    inStock: true,
    gradient: 'linear-gradient(135deg, #D8F3DC 0%, #E8F5E9 50%, #F1F8E9 100%)',
    iconSvg: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 40h20l2 12H20l2-12z"/><line x1="22" y1="40" x2="42" y2="40"/><path d="M32 40V28"/><path d="M32 28c-6-2-10-8-10-14 4 0 8 4 10 14z"/><path d="M32 28c6-2 10-8 10-14-4 0-8 4-10 14z"/><path d="M32 34c-4 0-8-4-10-8 4-1 8 2 10 8z"/><path d="M32 34c4 0 8-4 10-8-4-1-8 2-10 8z"/></svg>'
  },

  // ---- GARDEN (16–18) ----
  {
    id: 16,
    name: 'Indoor Herb Garden Kit',
    slug: 'indoor-herb-garden-kit',
    category: 'garden',
    price: 28.99,
    originalPrice: null,
    rating: 4.7,
    reviewCount: 145,
    badge: 'bestseller',
    shortDesc: 'Everything you need to grow fresh herbs indoors — seeds, soil, and stylish pots.',
    description: 'From unboxing to your first harvest in just three weeks, this all-inclusive indoor herb garden kit makes growing fresh basil, cilantro, and parsley utterly foolproof. The kit includes three biodegradable pots with a connected bamboo tray, organic seed packets, nutrient-rich coconut coir soil discs, and an illustrated growing guide. It\'s the perfect gift for aspiring home chefs.',
    features: [
      'Includes 3 biodegradable pots & bamboo tray',
      'Organic heirloom seeds: Basil, Cilantro & Parsley',
      'Coconut coir soil discs — just add water',
      'Illustrated step-by-step growing guide',
      'First harvest in approx. 3 weeks'
    ],
    materials: 'Biodegradable fibre pots, bamboo, coconut coir',
    dimensions: '32 × 12 × 10 cm (tray)',
    inStock: true,
    gradient: 'linear-gradient(135deg, #C8E6C9 0%, #DCEDC8 50%, #F1F8E9 100%)',
    iconSvg: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="10" y="36" width="44" height="6" rx="2"/><path d="M14 42l2 12h32l2-12"/><path d="M20 36V28c0-4 4-8 4-8"/><path d="M32 36V22c0-6 0-10 0-10"/><path d="M44 36V28c0-4-4-8-4-8"/><path d="M28 20c-3-1-6-1-6 2"/><path d="M36 18c3-1 6-1 6 2"/><circle cx="32" cy="10" r="2"/></svg>'
  },
  {
    id: 17,
    name: 'Copper Garden Tool Set',
    slug: 'copper-garden-tool-set',
    category: 'garden',
    price: 42.99,
    originalPrice: null,
    rating: 4.8,
    reviewCount: 67,
    badge: null,
    shortDesc: 'Heirloom-quality copper garden tools with ash-wood handles, built to last generations.',
    description: 'Inspired by Victorian-era horticultural tools, this three-piece set features genuine copper heads mounted on hand-turned ash-wood handles. Copper is naturally anti-fungal, meaning the tools won\'t transfer blight between plants, and they develop a gorgeous verdigris patina over time. The set includes a trowel, a cultivator, and a transplanting fork.',
    features: [
      'Genuine copper tool heads — anti-fungal',
      'Hand-turned ash-wood handles',
      'Develops beautiful verdigris patina over time',
      'Set: trowel, cultivator & transplanting fork',
      'Comes in a waxed canvas roll-up pouch'
    ],
    materials: 'Copper, ash wood, waxed canvas',
    dimensions: '30 cm average length',
    inStock: true,
    gradient: 'linear-gradient(135deg, #C8E6C9 0%, #DCEDC8 50%, #F1F8E9 100%)',
    iconSvg: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 10l6 18"/><path d="M10 10h8"/><line x1="17" y1="28" x2="20" y2="54"/><path d="M32 8v18"/><path d="M28 8h8"/><path d="M28 12h8"/><line x1="32" y1="26" x2="32" y2="54"/><path d="M46 10l4 6h-12l4-6z"/><line x1="46" y1="16" x2="46" y2="54"/><circle cx="20" cy="56" r="2"/><circle cx="32" cy="56" r="2"/><circle cx="46" cy="56" r="2"/></svg>'
  },
  {
    id: 18,
    name: 'Biodegradable Seed Starter Pots (24)',
    slug: 'biodegradable-seed-starter-pots-24',
    category: 'garden',
    price: 14.99,
    originalPrice: null,
    rating: 4.3,
    reviewCount: 93,
    badge: 'eco',
    shortDesc: 'Plant-and-forget peat-free starter pots that decompose directly into the soil.',
    description: 'Start your seedlings the sustainable way with these 24 peat-free, fully biodegradable starter pots made from compressed coconut coir and natural binding fibres. Simply sow, water, and when roots appear, plant the entire pot directly into your garden bed — no transplant shock, no plastic waste. Perfect for vegetables, herbs, and flowers.',
    features: [
      '100% peat-free — made from coconut coir',
      'Fully biodegradable — plant pot and all',
      'Eliminates transplant shock',
      'Set of 24 pots with drip tray',
      'Compatible with standard seed-starting systems'
    ],
    materials: 'Coconut coir, natural binding fibres',
    dimensions: '6 cm diameter × 6 cm tall each',
    inStock: true,
    gradient: 'linear-gradient(135deg, #C8E6C9 0%, #DCEDC8 50%, #F1F8E9 100%)',
    iconSvg: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 26h44v4H10z"/><path d="M14 30l2 20h8l2-20"/><path d="M28 30l2 20h8l2-20"/><path d="M18 26v-4c0-2 2-4 2-8"/><path d="M20 14c-2-2-1-4 1-4s3 2 1 4"/><path d="M34 26v-6c0-2 1-4 1-8"/><path d="M35 12c1-2 3-2 3 0s-2 3-3 2"/></svg>'
  },

  // ---- OFFICE (19–20) ----
  {
    id: 19,
    name: 'Cork Desk Organizer & Stand',
    slug: 'cork-desk-organizer-stand',
    category: 'office',
    price: 37.99,
    originalPrice: null,
    rating: 4.6,
    reviewCount: 38,
    badge: 'new',
    shortDesc: 'A premium cork desk organiser with an integrated laptop/tablet stand.',
    description: 'Declutter your workspace with this elegantly designed cork desk organiser featuring an adjustable laptop stand, pen holders, and a phone slot. Crafted from sustainably harvested Portuguese cork oak bark — the tree is never felled — it\'s lightweight, naturally anti-static, and warm to the touch. The modular design lets you rearrange compartments to suit your workflow.',
    features: [
      'Sustainably harvested Portuguese cork oak',
      'Integrated adjustable laptop/tablet stand',
      'Modular compartments — customise your layout',
      'Naturally anti-static & warm to the touch',
      'Includes pen holder, phone slot & catch tray'
    ],
    materials: 'Portuguese cork oak bark',
    dimensions: '38 × 22 × 12 cm',
    inStock: true,
    gradient: 'linear-gradient(135deg, #F0EBE0 0%, #F5F0E8 50%, #FAF8F5 100%)',
    iconSvg: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="28" width="48" height="20" rx="3"/><line x1="26" y1="28" x2="26" y2="48"/><line x1="42" y1="28" x2="42" y2="48"/><rect x="10" y="30" width="14" height="14" rx="1"/><line x1="30" y1="32" x2="30" y2="44"/><line x1="34" y1="34" x2="34" y2="44"/><line x1="38" y1="32" x2="38" y2="44"/><path d="M44 28V14l12-2v16"/><line x1="50" y1="14" x2="50" y2="28"/></svg>'
  },
  {
    id: 20,
    name: 'Recycled Leather Journal Set',
    slug: 'recycled-leather-journal-set',
    category: 'office',
    price: 26.99,
    originalPrice: 34.99,
    rating: 4.7,
    reviewCount: 84,
    badge: 'sale',
    shortDesc: 'Beautifully bound journals crafted from recycled leather off-cuts and FSC-certified paper.',
    description: 'Write sustainably with this set of two journals bound in genuine recycled leather, sourced from furniture-industry off-cuts that would otherwise go to landfill. Inside, 160 pages of FSC-certified, acid-free cream paper provide the perfect surface for fountain pens, pencils, or everyday ballpoints. The hand-stitched spine and raw-edge cover develop a unique character over time.',
    features: [
      'Covers from 100% recycled leather off-cuts',
      '160 pages of FSC-certified, acid-free paper',
      'Hand-stitched spine — lay-flat binding',
      'Set of 2: lined & dot-grid',
      'Inner pocket & ribbon bookmark'
    ],
    materials: 'Recycled leather, FSC-certified paper',
    dimensions: 'A5 — 21 × 14.8 cm each',
    inStock: true,
    gradient: 'linear-gradient(135deg, #F0EBE0 0%, #F5F0E8 50%, #FAF8F5 100%)',
    iconSvg: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="16" y="8" width="28" height="40" rx="2"/><path d="M16 8c-2 0-4 2-4 4v36c0 2 2 4 4 4"/><path d="M12 12h4"/><path d="M12 20h4"/><path d="M12 28h4"/><path d="M12 36h4"/><path d="M12 44h4"/><line x1="22" y1="16" x2="38" y2="16"/><line x1="22" y1="22" x2="36" y2="22"/><line x1="22" y1="28" x2="34" y2="28"/><line x1="22" y1="34" x2="30" y2="34"/><path d="M36 48l-2-8"/></svg>'
  }
];

// ----------------------------------------------------------
// Blog Posts
// ----------------------------------------------------------
window.BLOG_POSTS = [
  {
    id: 1,
    title: '10 Ways to Create an Eco-Friendly Kitchen',
    slug: '10-ways-eco-friendly-kitchen',
    excerpt: 'Small swaps, big impact — from beeswax wraps to bamboo utensils, discover the easiest changes you can make today to banish single-use plastic from your kitchen for good.',
    category: 'Sustainable Living',
    date: '2026-05-15',
    readTime: '5 min read',
    author: 'Sarah Chen',
    gradient: 'linear-gradient(135deg, #F6E6C8 0%, #FFECD2 50%, #FCF5E5 100%)'
  },
  {
    id: 2,
    title: 'The Art of Slow Living: A Beginner\'s Guide',
    slug: 'art-of-slow-living-beginners-guide',
    excerpt: 'In a world that glorifies hustle, slow living is a quiet rebellion. Learn how to design your home and routines around presence, simplicity, and intention.',
    category: 'Lifestyle',
    date: '2026-05-08',
    readTime: '7 min read',
    author: 'James Nguyen',
    gradient: 'linear-gradient(135deg, #D8F3DC 0%, #E8F5E9 50%, #F1F8E9 100%)'
  },
  {
    id: 3,
    title: 'Why Natural Materials Are Better for Your Home',
    slug: 'why-natural-materials-better-for-home',
    excerpt: 'From bamboo to organic cotton, natural materials don\'t just look beautiful — they improve air quality, reduce allergens, and connect us to the natural world.',
    category: 'Home Design',
    date: '2026-04-28',
    readTime: '6 min read',
    author: 'Sarah Chen',
    gradient: 'linear-gradient(135deg, #D4E9F7 0%, #E8F4FD 50%, #F0F8FF 100%)'
  },
  {
    id: 4,
    title: 'Indoor Gardening 101: Herbs You Can Grow Year-Round',
    slug: 'indoor-gardening-101-herbs-year-round',
    excerpt: 'No garden? No problem. These eight herbs thrive on a sunny windowsill and will save you money at the supermarket while adding life and fragrance to your space.',
    category: 'Gardening',
    date: '2026-04-15',
    readTime: '8 min read',
    author: 'Emma Rivera',
    gradient: 'linear-gradient(135deg, #C8E6C9 0%, #DCEDC8 50%, #F1F8E9 100%)'
  },
  {
    id: 5,
    title: 'Minimalist Bathroom: 7 Products You Actually Need',
    slug: 'minimalist-bathroom-7-products',
    excerpt: 'Pare back your bathroom to just the essentials. We break down the seven multi-tasking, eco-friendly products that replace an entire cabinet of plastic bottles.',
    category: 'Sustainable Living',
    date: '2026-04-02',
    readTime: '5 min read',
    author: 'James Nguyen',
    gradient: 'linear-gradient(135deg, #D4E9F7 0%, #E8F4FD 50%, #F0F8FF 100%)'
  },
  {
    id: 6,
    title: 'How We Source: Behind Sunvoz\'s Supply Chain',
    slug: 'how-we-source-behind-sunvoz-supply-chain',
    excerpt: 'Transparency matters. Take a behind-the-scenes look at how we partner with artisan communities and certified farms to bring you products that are as ethical as they are beautiful.',
    category: 'Our Story',
    date: '2026-03-20',
    readTime: '6 min read',
    author: 'Lina Park',
    gradient: 'linear-gradient(135deg, #F0EBE0 0%, #F5F0E8 50%, #FAF8F5 100%)'
  }
];

// ----------------------------------------------------------
// Testimonials
// ----------------------------------------------------------
window.TESTIMONIALS = [
  {
    id: 1,
    name: 'Emily Watson',
    role: 'Interior Designer',
    text: 'Sunvoz products have become my go-to recommendation for clients who want a sustainable home without sacrificing style. The rattan baskets and linen throws are absolutely stunning in person.',
    rating: 5,
    initials: 'EW'
  },
  {
    id: 2,
    name: 'Marcus Lee',
    role: 'Home Chef',
    text: 'The bamboo utensil set is hands-down the best kitchen purchase I\'ve made. They feel incredible in your hand, don\'t scratch my cast iron, and look beautiful hanging by the stove.',
    rating: 5,
    initials: 'ML'
  },
  {
    id: 3,
    name: 'Sofia Ramirez',
    role: 'Yoga Instructor',
    text: 'I love that every product arrives in plastic-free packaging. The lavender soap collection smells divine and has completely replaced my supermarket body wash. My skin has never been happier.',
    rating: 5,
    initials: 'SR'
  },
  {
    id: 4,
    name: 'Daniel Park',
    role: 'Architect',
    text: 'The attention to detail is remarkable — from the hand-stitched leather journals to the cork desk organiser. These aren\'t just eco products, they\'re design objects I\'m proud to display.',
    rating: 4,
    initials: 'DP'
  },
  {
    id: 5,
    name: 'Olivia Chen',
    role: 'New Mum',
    text: 'Switching to Sunvoz was part of making our home safer for our baby. The organic cotton towels are impossibly soft, and knowing there are no harmful chemicals gives me real peace of mind.',
    rating: 5,
    initials: 'OC'
  },
  {
    id: 6,
    name: 'Thomas Green',
    role: 'Environmental Scientist',
    text: 'Finally, a brand that walks the talk. The recycled ocean-plastic plant pots and biodegradable seed starters show genuine commitment to sustainability, not just greenwashing.',
    rating: 5,
    initials: 'TG'
  }
];

// ----------------------------------------------------------
// Material filter options
// ----------------------------------------------------------
window.MATERIALS = [
  'Bamboo',
  'Organic Cotton',
  'Cork',
  'Rattan',
  'Ceramic',
  'Wood',
  'Linen',
  'Recycled'
];
